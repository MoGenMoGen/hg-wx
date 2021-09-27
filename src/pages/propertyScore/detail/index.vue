<template>
  <div class="home">
    <!-- 评分信息 -->
    <div class="top-box">
      <span class="top-title">{{title}}</span>
      <span class="top-name">发布者：{{userName}}</span>
      <span class="top-time">{{time}}~{{endTime}}</span>
    </div>
    <!-- 评价得分 -->
    <div class="score-box" v-if="status">
      <span style="display: flex;align-items: center;">评价得分：<span class="score-red">{{score}}分</span></span>
    </div>
    <!-- 评分选项 -->
    <div class="select-box" v-if="!status&&isOver!=3">
      <block v-for="(item,index) in formList" :key="index">
        <div class="select-item" style="flex-direction: column;">
          <span class="select-title">{{index+1}}、{{item.label}}</span>
          <div class="select-result">
            <radio-group class="radio-group" @change="radioChange(index,$event)">
              <label class="radio" v-for="(newItem, newIndex) in item.dicData" :key="newIndex">
                <radio :value="newIndex" /> {{newItem.label}}
              </label>
            </radio-group>
          </div>
        </div>
      </block>
      <div class="btn">
        <button @click="cancel()">取消</button>
        <button @click="submit()">提交</button>
      </div>
    </div>
    <!-- 评分结果 -->
    <div class="select-box" v-if="status">
      <block v-for="(item,index) in list" :key="index">
        <div class="select-item">
          <span class="select-title">{{index+1}}、</span>
          <div class="select-right">
            <span class="select-title">{{item.title}}</span>
            <span class="select-result">{{item.answer}}</span>
          </div>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: 0,
        isOver: 0,
        status: false,
        title: '',
        userName: "",
        time: '',
        endTime: '',
        score: 0,
        list: [],
        formList: [],
        formData: [],
        myScore: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      let pData = {
        pid: this.id
      }
      let data = {
        id: this.id
      }
      this.api.verifyToken().then(() => {
        this.api.isScore(pData).then(res => {
          this.status = res.data
          if (!this.status) {
            this.getDetail(data)
          } else {
            this.getDetail(data)
            this.getMyDetail(pData)
          }
        })

      });
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {

    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {

      toPage(url) {
        this.until.aHref(url)
      },
      radioChange(index, e) {
        let index1 = Number(e.target.value)
        this.formList[index].answer = this.formList[index].dicData[index1].label
        this.formList[index].score = this.formList[index].dicData[index1].value
      },
      getDetail(data) {
        this.api.getScoreDetail(data).then(res => {
          this.time = res.data.startTime.substring(0, 16)
          this.endTime = res.data.endTime.substring(0, 16)
          this.isOver = res.data.status
          this.title = res.data.title
          this.userName = res.data.userName
          this.formList = JSON.parse(res.data.content).column
        })
      },
      getMyDetail(data) {
        this.api.getMyScore(data).then(res => {
          this.score = res.data.score
          this.list = JSON.parse(res.data.content)
        })
      },
      submit() {
        this.formList.forEach(item => {
          let data = {
            title: item.label,
            answer: item.answer
          }
          this.formData.push(data)
          this.myScore = this.myScore + Number(item.score)
        })
        if (this.formData.length < this.formList.length) {
          wx.showToast({
            title: '请评价完整',
            icon: 'none',
            duration: 1500
          })
        } else {
          let submitData = {
            pid: this.id,
            content: JSON.stringify(this.formData),
            score: this.myScore
          }
          this.api.submitMyScore(submitData).then(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            })
            setTimeout(function() {
              wx.navigateBack()
            },1500)
          })
        }
      },
      cancel() {
        wx.navigateBack()
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx 0;
    box-sizing: border-box;

    .top-box {
      width: 100%;
      padding: 40rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 12rpx;

      .top-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #303030;
        margin-bottom: 20rpx;
      }

      .top-name {
        font-size: 24rpx;
        font-weight: 500;
        color: #303030;
        margin-bottom: 30rpx;
      }

      .top-time {
        font-size: 24rpx;
        font-weight: 500;
        color: #909090;
      }
    }

    .score-box {
      width: 100%;
      padding: 50rpx 40rpx;
      border-radius: 12rpx;
      background-color: #fff;
      margin: 20rpx 0;
      font-size: 24rpx;
      font-weight: 500;
      color: #606060;

      .score-red {
        font-size: 62rpx;
        font-weight: 500;
        color: #EB020E;
      }
    }

    .select-box {
      width: 100%;
      border-radius: 12rpx;
      background-color: #fff;
      padding: 40rpx;
      box-sizing: border-box;
      margin-top: 20rpx;

      .btn {
        width: 100%;
        margin: 45rpx auto;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        button {
          width: 45%;
          background: @color;
          height: 88rpx;
          line-height: 88rpx;
          text-align: center;
          font-size: 22rpx;
          color: #ffffff;
          border-radius: 14rpx;

          &:first-of-type {
            background: #ffffff;
            box-shadow: 0px 3px 6px #C8C8C8;
            color: #909090;
          }

          &:last-of-type {
            box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.1);
          }
        }
      }

      .select-item {
        display: flex;
        color: #303030;
        margin-bottom: 30rpx;

        .select-title {
          font-size: 28rpx;
          font-weight: bold;
          margin-bottom: 20rpx;
        }

        .select-result {
          font-size: 24rpx;
          font-weight: 500;

          .radio-group {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            /deep/ .wx-radio-input {
              width: 26rpx;
              height: 26rpx;
              border-color: #BABABA;
            }

            /deep/ .wx-radio-input-checked {
              width: 26rpx;
              height: 26rpx;
              border-color: #EB020E;
              background-color: #EB020E;
            }

            /deep/ .wx-radio-input-checked::before {
              content: '';
              width: 26rpx;
              height: 26rpx;
              border-radius: 50%;
            }
          }
        }

        .select-right {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
</style>

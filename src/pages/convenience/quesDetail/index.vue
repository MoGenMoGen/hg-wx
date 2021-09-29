<template>
  <div class="home">
    <div class="info-box">
      <div class="info-item-comment">
        <div class="comment-top">
          <div class="comment-name"><img :src="questionInfo.avatar?questionInfo.avatar:'/static/images/avatar.png'"><span>{{questionInfo.nickName||questionInfo.realName}}</span></div>
          <div class="comment-cont">{{questionInfo.cont}}</div>
          <div class="comment-time">
            <span>{{questionInfo.createTime}}<span><img src="/static/images/msg-logo.png" mode="heightFix">{{questionInfo.commentCount}}</span></span>
          </div>
        </div>
        <div class="comment-bottom" v-for="(item,index) in list" :key="index">
          <div class="comment-name"><img :src="item.avatar?item.avatar:'/static/images/avatar.png'"><span>{{item.nickName||item.realName}}</span></div>
          <div class="comment-cont">{{item.cont}}</div>
          <div class="comment-time">
            <span>{{item.createTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-box">
      <input type="text" placeholder="请输入回复内容" cursor-spacing='20' v-model="cont"/>
      <span @click="submit()">回复</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        questionInfo: {},
        list: [],
        current: 1,
        total: 0,
        id: '',
        cont: ''
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.api.getQuestionDetail({id:this.id}).then(res => {
        res.createTime = res.createTime.substring(0,10)
        this.questionInfo = res
      })
      let data = {
        pid: this.id,
        current: 1,
        size: 10,
        status: 2,
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          pid: this.id,
          current: this.current + 1,
          size: 10,
          status: 2,
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      let data = {
        current: 1,
        size: 10,
        pid: this.id,
        status: 2,
      }
      this.current = 1
      this.list = []
      this.getList(data);
      wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      getList(data) {
        this.api.getQuestionList(data).then(res => {
          res.records.forEach(item => {
            item.createTime = item.createTime.substring(0,10)
          })
          this.list = this.list.concat(res.records)
          this.total = res.total
        })
      },
      submit() {
        if(this.cont==""){
          wx.showToast({
            title: '请输入回复内容',
            icon: 'none',
            duration: 1500
          })
          return
        }
        let data = {
          pid: this.id,
          userId: wx.getStorageSync('loginInfo').id,
          cont: this.cont
        }
        this.api.addQuestion(data).then(res => {
          this.cont = ""
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1000
          })
          this.current = 1
          this.list = []
          let data = {
            pid: this.id,
            current: 1,
            size: 10,
            status: 2,
          }
          this.getList(data)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx;
    padding-bottom: 200rpx;
    box-sizing: border-box;
    .info-box {
      width: 690rpx;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 0 auto;
      .info-item-comment {
        width: 100%;
        padding-left: 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .comment-top {
          width: 100%;
          border-bottom: 1px solid #F4F4F4;
          padding: 20rpx 50rpx 20rpx 0;
          box-sizing: border-box;
        }
        .comment-bottom {
          width: 100%;
          padding: 20rpx 50rpx 20rpx 80rpx;
          box-sizing: border-box;
          border-bottom: 1px solid #F4F4F4;
        }
        .comment-name {
          font-size: 28rpx;
          color: #1A1A1A;
          display: flex;
          align-items: center;
          img {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            margin-right: 20rpx;
          }
        }
        .comment-cont {
          width: 100%;
          font-size: 28rpx;
          color: #1A1A1A;
          padding-left: 84rpx;
          box-sizing: border-box;
        }
        .comment-time {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 84rpx;
          box-sizing: border-box;
          span {
            font-size: 24rpx;
            color: 24px;
            img {
              height: 20rpx;
              margin-left: 32rpx;
              margin-right: 6rpx;
            }
          }
        }
      }
    }
    .comment-box {
      width: 750rpx;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 30rpx 0 60rpx;
      input {
        width: 510rpx;
        height: 80rpx;
        border-radius: 40rpx;
        border: 2rpx solid #DDDDDD;
        padding: 24rpx 40rpx;
        box-sizing: border-box;
        font-size: 24rpx;
      }
      span {
        width: 160rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        color: #fff;
        background-color: #599BFF;
        border-radius: 40rpx;
      }
    }
  }
</style>

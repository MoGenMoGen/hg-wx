<template>
  <div class="home">
    <div class="info-box">
      <div class="info-item">
        <div class="info-item-title"><div></div><span>项目实施方案</span></div>
        <div class="info-item-cont">{{info.eventHandle}}</div>
        <img :src="info.img" class="info-topImg" mode="aspectFill">
      </div>
      <div class="info-item">
        <div class="info-item-title" style="justify-content: space-between;">
          <span style="display: flex;align-items: center;"><div></div><span>征求意见</span></span>
          <span class="info-item-hasVote" v-if="info.isVote==1">已参与</span>
        </div>
        <div class="info-item-per">
          <div class="per-inner">
            <span>赞成</span>
            <div class="per-progress"><div :style="{width: info.agreePre +'%'}"></div></div>
            <span>{{info.agreeNum}}人</span>
            <span>{{info.agreePre}}%</span>
          </div>
          <div class="per-inner">
            <span>不赞成</span>
            <div class="per-progress"><div :style="{width: info.disagreePre +'%'}"></div></div>
            <span>{{info.disagreeNum}}人</span>
            <span>{{info.disagreePre}}%</span>
          </div>
        </div>
      </div>
      <div class="btn-class" @click="vote" v-if="info.isVote!=1&&info.status!=2">我参与</div>
      <div class="info-item">
        <div class="info-item-title" style="justify-content: space-between;">
          <span style="display: flex;align-items: center;"><div></div><span>意见建议</span></span>
          <span class="info-item-message" v-if="info.status!=2" @click="commentSubmit()">建议</span>
        </div>
        <div class="info-item-comment" v-for="(item,index) in list" :key="index">
          <div class="comment-top">
            <div class="comment-name"><img :src="item.avatar?item.avatar:'/static/images/avatar.png'"><span>{{item.nickName||item.realName}}</span></div>
            <div class="comment-cont">{{item.cont}}</div>
            <div class="comment-time">
              <span>{{item.createTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-item" v-if="info.status==2">
        <div class="info-item-title" style="justify-content: space-between;">
          <span style="display: flex;align-items: center;"><div></div><span>满意度调查</span></span>
          <span class="info-item-hasVote" v-if="info.isEvaluate==1">已参与</span>
        </div>
        <div class="info-item-per">
          <div class="per-inner">
            <span>满意</span>
            <div class="per-progress"><div :style="{width: info.satisfiedPre +'%'}"></div></div>
            <span>{{info.satisfiedNum}}人</span>
            <span>{{info.satisfiedPre}}%</span>
          </div>
          <div class="per-inner">
            <span>基本满意</span>
            <div class="per-progress"><div :style="{width: info.commonPre +'%'}"></div></div>
            <span>{{info.commonNum}}人</span>
            <span>{{info.commonPre}}%</span>
          </div>
          <div class="per-inner">
            <span>不满意</span>
            <div class="per-progress"><div :style="{width: info.dissatisfiedPre +'%'}"></div></div>
            <span>{{info.dissatisfiedNum}}人</span>
            <span>{{info.dissatisfiedPre}}%</span>
          </div>
        </div>
      </div>
      <div class="btn-class" @click="evaluate" v-if="info.isEvaluate!=1&&info.status==2" style="margin-bottom: 40rpx;">我参与</div>
      <!-- <div class="info-item">
        <div class="info-item-title" style="justify-content: space-between;">
          <span style="display: flex;align-items: center;"><div></div><span>村民留言（议）</span></span>
          <span class="info-item-message" @click="commentSubmit()">留言</span>
        </div>
        <div class="info-item-comment">
          <div class="comment-top">
            <div class="comment-name"><img src="/static/images/avatar.png"><span>清风</span></div>
            <div class="comment-cont">我看最近农家乐垃圾分类比之前好些了,村里办事的效率挺高的</div>
            <div class="comment-time">
              <span>2021-04-16<span><img src="/static/images/msg-logo.png" mode="heightFix">120</span></span>
              <span style="color: #599BFF;" @click="commentSubmit">回复</span>
            </div>
          </div>
          <div class="comment-bottom">
            <div class="comment-name"><img src="/static/images/avatar.png"><span>村委会</span></div>
            <div class="comment-cont">谢谢乡亲们的理解与支持。</div>
            <div class="comment-time">
              <span>2021-04-16</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <div class="comment-box" v-if="showInput">
      <input type="text" v-model="commentCont" placeholder="请输入回复内容" cursor-spacing='20' focus/>
      <span @click="submit">回复</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        info: {},
        showInput: false,
        commentCont: '',
        articleId: '',
        pid: '',
        list: [],
        total: 0,
        current: 1
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.getDetail({id:this.id})
      let data = {
        current: 1,
        size: 10,
        articleId: this.id,
        status: 2
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          articleId: this.id,
          current: this.current + 1,
          size: 10,
          status: 2
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        articleId: this.id,
        current: 1,
        size: 10,
        status: 2
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
      vote() {
        wx.showActionSheet({
          itemList: ['赞成','不赞成'],
          success:res=> {
            let data = {
              favor: res.tapIndex + 1,
              activityId: this.id
            }
            this.api.vote(data).then(res => {
              console.log(res)
              this.getDetail({id:this.id})
            })
          },
        })
      },
      evaluate() {
        wx.showActionSheet({
          itemList: ['满意','基本满意','不满意'],
          success:res=> {
            let data = {
              evaluate: res.tapIndex + 1,
              activityId: this.id
            }
            this.api.evaluate(data).then(res => {
              console.log(res)
              this.getDetail({id:this.id})
            })
          },
        })
      },
      getDetail(data) {
        this.api.getOpinionDetail(data).then(res => {
          let allVote = res.agreeNum + res.disagreeNum
          if(allVote==0) {
            res.agreePre = 0
            res.disagreePre = 0
          } else {
            res.agreePre = (res.agreeNum / allVote*100).toFixed(2)
            res.disagreePre = (res.disagreeNum / allVote*100).toFixed(2)
          }
          let allNum = res.commonNum + res.dissatisfiedNum + res.satisfiedNum
          if(allNum==0) {
            res.satisfiedPre = 0
            res.commonPre = 0
            res.dissatisfiedPre = 0
          } else {
            res.satisfiedPre = (res.satisfiedNum / allNum*100).toFixed(2)
            res.commonPre = (res.commonNum / allNum*100).toFixed(2)
            res.dissatisfiedPre = (res.dissatisfiedNum / allNum*100).toFixed(2)
          }
          this.info = res
        })
      },
      commentSubmit() {
        this.showInput = true
      },
      submit() {
        if(this.commentCont==""){
          wx.showToast({
            title: '请输入内容',
            icon: 'none',
            duration: 1500
          })
          return
        }
        let data = {
          articleId: this.id,
          cont: this.commentCont
        }
        this.api.comment(data).then(res => {
          if(res.code==200){
            this.commentCont =""
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            })
            this.showInput = false
          }
        })
      },
      getList(data) {
        this.api.getCommentList(data).then(res => {
          res.records.forEach(item => {
            item.createTime = item.createTime.substring(0,10)
          })
          this.list = this.list.concat(res.records)
          this.total = res.total
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
    padding: 30rpx;
    box-sizing: border-box;
    .info-topImg {
      width: 600rpx;
      height: 320rpx;
      border-radius: 10rpx;
      margin: 30rpx auto;
    }
    .info-box {
      width: 690rpx;
      margin: 30rpx auto;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 20rpx;
      .info-item {
        display: flex;
        flex-direction: column;
        .info-item-title {
          display: flex;
          align-items: center;
          margin: 30rpx 0;
          div {
            width: 6rpx;
            height: 32rpx;
            background-color: #EC2C17;
            margin-right: 30rpx;
          }
          span {
            font-size: 28rpx;
            color: #333333;
          }
          .info-item-hasVote {
            width: 99rpx;
            height: 37rpx;
            background-color: #B0B0B0;
            border-radius: 18rpx;
            color: #fff;
            font-size: 24rpx;
            line-height: 37rpx;
            text-align: center;
            margin-right: 30rpx;
          }
          .info-item-message {
            width: 99rpx;
            height: 37rpx;
            background-color: #599BFF;
            border-radius: 18rpx;
            color: #fff;
            font-size: 24rpx;
            line-height: 37rpx;
            text-align: center;
            margin-right: 30rpx;
          }
        }
        .info-item-cont {
          width: 600rpx;
          margin: 0 auto;
          font-size: 24rpx;
          color: #333333;
        }
        .info-item-per {
          width: 600rpx;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          margin-bottom: 40rpx;
          .per-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 24rpx;
              color: #333333;
              width: 96rpx;
            }
            .per-progress {
              width: 234rpx;
              height: 16rpx;
              border-radius: 20rpx;
              border: 1px solid #599BFF;
              div {
                background-color: #599BFF;
                width: 100%;
                height: 16rpx;
              }
            }
          }
        }
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
              color: #999999;
              img {
                height: 20rpx;
                margin-left: 32rpx;
                margin-right: 6rpx;
              }
            }
          }
        }
      }
    }
    .btn-class {
      width: 214rpx;
      height: 64rpx;
      border-radius: 60rpx;
      box-shadow: 0rpx 0rpx 6rpx rgba(0, 0, 0, 0.16);
      color: #fff;
      background-color: #599BFF;
      margin: 0rpx auto;
      line-height: 60rpx;
      text-align: center;
    }
    .common-btn {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-color: #599BFF;
      color: #fff;
      line-height: 100rpx;
      text-align: center;
      font-size: 28rpx;
      margin: 40rpx auto;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.16);
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

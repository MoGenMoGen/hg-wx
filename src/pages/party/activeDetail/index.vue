<template>
  <div class="home">
    <div class="info-box">
      <span class="info-title">{{info.name}}</span>
      <span class="info-num"><span style="color: #EC2C17;">{{info.signTotal}}</span>人参加</span>
      <span class="info-cont" v-html="info.cont"></span>
      <!-- <img src="/static/images/avatar.png" mode="aspectFill"> -->
      <span class="info-item">活动时间：{{info.startTime}}</span>
      <span class="info-item">活动地点：{{info.address}}</span>
      <span class="info-item" style="margin-bottom: 0;">活动状态： {{info.state}}</span>
    </div>
    <div class="signIn" @click="signIn" v-if="info.state=='进行中'&&info.hasSign==0&&canSign">打卡签到</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        canSign: false
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.api.getPerM({id:options.id}).then(res => {
        if(res.success){
          this.canSign = true
        } else {
          this.canSign = false
        }
      })
      this.api.partyActiveDetail({id:options.id}).then(res => {
        res.data.cont = this.until.imgStyle(res.data.cont)
        res.data.startTime = res.data.startTime.substring(0,10)
        this.info = res.data
      })
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
      signIn() {
        let self = this
        wx.getLocation({
          type: 'gcj02',
          success(res) {
            let data = {
              activityId: self.id,
              lat: res.latitude,
              lng: res.longitude
            }
            self.api.partyActiveSign(data).then((res) => {
              if (res.success) {
                wx.showToast({
                  icon: "success",
                  title: res.msg,
                  duration: 2000
                })
                self.info.hasSign = 1
              } else {
                wx.showToast({
                  icon: "none",
                  title: res.msg,
                  duration: 2000
                })
              }
            })
          }
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
    box-sizing: border-box;
    .info-box {
      width: 710rpx;
      padding: 40rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .info-title {
        width: 70%;
        margin: 0 auto;
        font-size: 30rpx;
        color: #303030;
        font-weight: 500;
        text-align: center;
      }
      .info-num {
        width: 70%;
        margin: 20rpx auto;
        font-size: 24rpx;
        color: #909090;
        font-weight: 500;
        text-align: center;
      }
      .info-cont {
        width: 100%;
        font-size: 24rpx;
        color: #303030;
        margin: 30rpx auto;
      }
      img {
        width: 630rpx;
        margin: 20rpx auto;
      }
      .info-item {
        font-size: 24rpx;
        color: #303030;
        margin-bottom: 30rpx;
      }
    }
    .signIn {
      position: fixed;
      bottom: 100rpx;
      left: 193rpx;
      width: 365rpx;
      height: 80rpx;
      background: #EC2C17;
      border-radius: 40rpx;
      text-align: center;
      line-height: 80rpx;
      font-size: 30rpx;
      color: #fff;
      font-weight: 500;
    }
  }
</style>

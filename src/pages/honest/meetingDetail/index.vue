<template>
  <div class="home">
    <div class="info-box">
      <span class="info-title">{{info.name}}</span>
      <div class="info-cont">
        <span>主持人：{{info.anchor}}</span>
        <span>记录人：{{info.recorder}}</span>
        <span>地点：{{info.address}}</span>
        <span>参加对象：{{info.participant}}</span>
        <span style="margin-bottom: 0;">会议时间：{{info.meetTime}}</span>
      </div>
    </div>
    <div class="info-cont-box">
      <div class="info-cont-box-title"><div></div>会议内容</div>
      <div class="info-cont-box-html">
        <div v-html="info.cont"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info:{}
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getMeetingDetail({id:options.id}).then(res => {
        res.meetTime = res.meetTime.substring(0,10)
        this.info = res
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
      background-color: #fff;
      padding: 40rpx;
      box-sizing: border-box;
      border-radius: 20rpx;
      margin: 20rpx auto;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4rpx 24rpx 0 rgba(151, 151, 151, 0.27);
      .info-title {
        width: 100%;
        text-align: center;
        color: #303030;
        font-size: 28rpx;
        margin-bottom: 50rpx;
      }
      .info-cont {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        span {
          width: 50%;
          margin-bottom: 20rpx;
        }
      }
    }
    .info-cont-box {
      width: 710rpx;
      background-color: #fff;
      padding: 40rpx;
      box-sizing: border-box;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4rpx 24rpx 0 rgba(151, 151, 151, 0.27);
      .info-cont-box-title {
        display: flex;
        align-items: center;
        font-size: 26rpx;
        color: #EC2C17;
        font-weight: 500;
        div {
          width: 5rpx;
          height: 27rpx;
          margin-right: 14rpx;
          background-color: #EC2C17;
        }
      }
      .info-cont-box-html {
        width: 100%;
        margin-top: 20rpx;
      }
    }
  }
</style>

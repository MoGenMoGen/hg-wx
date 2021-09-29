<template>
  <div class="home">
    <div class="oneLineBox">
      <div class="line-left">
        <img src="/static/images/vote.png">
        <span>我发现</span>
      </div>
      <div class="line-right" @click="scanCode">
        <img src="/static/images/scan.png">
        <span>扫一扫 <span style="color: #909090;">（上报违规内容）</span></span>
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

    },
    onShow() {
      wx.hideHomeButton()
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
      scanCode() {
        wx.scanCode({
          success :res=> {
            this.toPage('/pages/index/scan/main?id='+res.result)
          }
        })
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
    .oneLineBox {
      width: 710rpx;
      display: flex;
      align-items: center;
      border-radius: 20rpx;
      background-color: #fff;
      padding: 11rpx 0;
      box-sizing: border-box;
      margin: 20rpx auto;
      .line-left {
        padding: 26rpx 30rpx;
        border-right: 1px solid rgba(0,0,0,0.1);
        font-size: 28rpx;
        color: #EC2C17;
        display: flex;
        align-items: center;
        img {
          width: 28rpx;
          height: 28rpx;
          margin-right: 17rpx;
        }
      }
      .line-right {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #303030;
        padding-left: 100rpx;
        box-sizing: border-box;
        img {
          width: 43rpx;
          height: 43rpx;
          margin-right: 26rpx;
        }
      }
    }
  }
</style>

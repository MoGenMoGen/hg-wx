<template>
  <div class="home">
    <img src="/static/images/processLogo.png" mode="widthFix">
    <div style="width: 360rpx;height: 110rpx;position: absolute;top: 170rpx;left: 200rpx;" @click="toPage('/pages/homeStead/list/main?type=1')"></div>
    <div style="width: 360rpx;height: 110rpx;position: absolute;top: 800rpx;left: 200rpx;" @click="toPage('/pages/homeStead/list/main?type=2')"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())

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
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 40rpx 30rpx;
    box-sizing: border-box;
    img {
      width: 690rpx;
    }
  }
</style>

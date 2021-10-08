<template>
  <div class="home">
 1212
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
    padding: 38rpx 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  }
</style>

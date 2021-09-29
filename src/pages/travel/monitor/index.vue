<template>
  <div class="home">
    <video autoplay :src="videoUrl"></video>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        videoUrl: ''
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getUrl({code: options.monitor}).then(res => {
        this.videoUrl = res.url
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
    video {
      width: 100%;
    }
  }
</style>

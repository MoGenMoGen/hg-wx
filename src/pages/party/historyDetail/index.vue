<template>
  <div class="home">
    <div class="cont-box">
      <img src="/static/images/redBg.png" class="cont-bg">
      <img :src="info.img" class="cont-avatar">
      <div class="cont-title">{{info.title}}</div>
      <div class="cont-cont">
        <div v-html="info.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {}
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getRedHistoryDetail({
        id: options.id
      }).then(res => {
        res.content = this.until.imgStyle(res.content)
        this.info = res
      })
    },
    onShow() {},
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
    box-sizing: border-box;

    .cont-box {
      width: 750rpx;
      position: relative;
      display: flex;
      padding: 0 90rpx 60rpx;
      box-sizing: border-box;
      flex-direction: column;
      align-items: center;
      color: #fff !important;
      .cont-bg {
        width: 100%;
        height: 100vh;
        position: absolute;
        z-index: -1;
      }
      .cont-avatar {
        width: 263rpx;
        height: 263rpx;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-top: 388rpx;
      }
      .cont-title {
        margin: 20rpx;
        color: #fff;
        font-size: 36rpx;
      }
      .cont-cont {
        width: 100%;
        max-height: calc(100vh - 792rpx);
        overflow-y: scroll;
      }
    }
  }
</style>

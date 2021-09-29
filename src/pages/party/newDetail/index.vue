<template>
  <div class="home">
    <div class="cont-box">
      <image class="top-bg" src="/static/images/hsbbx-Bg.png" mode="widthFix"></image>
      <div class="cont-item">
        <div v-html="cont" ></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cont: ''
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getRedCaseDetail({id:options.id}).then(res => {
        res.content = this.until.imgStyle(res.content)
        this.cont = res.content
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
    .cont-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      position: relative;
      .top-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 710rpx;
        z-index: 0;
      }
      .cont-item {
        min-height: 386rpx;
        padding: 30rpx;
        box-sizing: border-box;
        // font-size: 28rpx;
        // color: #303030;
        z-index: 1;
      }
    }
  }
</style>

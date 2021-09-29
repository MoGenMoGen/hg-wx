<template>
  <div class="home">
    <div class="info-box">
      <span class="info-cont" v-html="cont"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cont: ""
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getShopDetail({id:options.id}).then(res => {
        this.cont = this.until.imgStyle(res.cont)
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
    .info-box {
      width: 710rpx;
      background-color: #fff;
      padding: 40rpx 20rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-radius: 10rpx;
      min-height: calc(100vh - 40rpx);
      img {
        width: 630rpx;
        margin: 0 auto;
      }
      .info-cont {
        width: 100%;
        margin: 20rpx auto;
        font-size: 24rpx;
        color: #303030;
        font-weight: 500;
      }
    }
  }
</style>

<template>
  <div class="home">
    <div class="info-box">
      <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in info.img" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <span class="info-title">{{info.name}}</span>
      <span class="info-cont">{{info.introduce}}</span>
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
      this.api.getSiteDetail({id:options.id}).then(res => {
        res.img = res.img.split(",")
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
      background-color: #fff;
      padding: 40rpx 20rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-radius: 10rpx;
      min-height: calc(100vh - 40rpx);
      .swiper-container {
        margin: 0 auto;
        width: 630rpx;
        height: 380rpx;
        border-radius: 20rpx;
        overflow: hidden; //超出圆角的隐藏
        transform: translateY(0); //兼容ios

        .swiper-item {
          width: 100%;
          height: 100%;

          .slide-image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .info-title {
        width: 70%;
        margin: 30rpx auto;
        font-size: 30rpx;
        font-weight: 500;
        color: #303030;
        text-align: center;
      }
      .info-cont {
        width: 100%;
        margin: 0 auto;
        font-size: 24rpx;
        color: #303030;
        font-weight: 500;
      }
    }
  }
</style>

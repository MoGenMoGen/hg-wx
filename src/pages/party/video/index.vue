<template>
  <div class="home">
    <div class="video-box">
      <video :src="info.url" autoplay=""></video>
      <span>{{info.title}}</span>
      <span>{{info.createTime}}</span>
    </div>
    <div class="info-box">
      <div class="info-title"><div></div>详情介绍</div>
      <div class="info-cont">
        <div v-html="info.content"></div>
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
      this.api.getRedClassVideoDetail({id:options.id}).then(res => {
        res.content = this.until.imgStyle(res.content)
        res.createTime = res.createTime.substring(0,10)
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
    .video-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 10rpx;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      video {
        width: 650rpx;
        height: 380rpx;
      }
      span {
        font-size: 30rpx;
        color: #303030;
        margin-top: 30rpx;
      }
      span:last-child {
        font-size: 24rpx;
        color: #909090;
        margin-top: 10rpx;
      }
    }
    .info-box {
      width: 710rpx;
      margin: 20rpx auto;
      padding: 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10rpx;
      .info-title {
        display: flex;
        align-items: center;
        font-size: 30rpx;
        color: #303030;
        margin-bottom: 20rpx;
        div {
          width: 6rpx;
          height: 30rpx;
          background-color: #EC2C17;
          margin-right: 16rpx;
        }
      }
      .info-cont {
        width: 100%;
      }
    }
  }
</style>

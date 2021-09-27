<template>
  <div class="home">
    <div class="box">
      <!-- 详情信息 -->
      <div class="title">{{title}}</div>
      <div class="time-count">
        <div>{{time}}</div>
        <div style="display: flex;align-items: center;">
          <img src="/static/images/viewCount.png">
          <span>{{count}}</span>
        </div>
      </div>
      <!-- 富文本内容 -->
      <div v-html="msg"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        time: "",
        count: 0,
        msg: ""
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.verifyToken().then(()=>{
        this.api.communityNoticeDetail({id:options.id}).then(res => {
          this.title = res.data.title
          this.time = res.data.releaseTime.substring(0,16)
          this.msg = this.until.imgStyle(res.data.content)
          this.count = res.data.num
        })
      });
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
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
    padding: 20rpx 0;
    box-sizing: border-box;
    .box {
      width: 100vw;
      min-height: calc(100vh - 40rpx);
      background-color: #fff;
      border-radius: 12rpx;
      padding: 34rpx 53rpx;
      box-sizing: border-box;
    }
    .title {
      margin: 0 auto;
      font-size: 30rpx;
      font-weight: bold;
      color: #303030;
      line-height: 30rpx;
      text-align: center;
    }
    .time-count {
      width: 450rpx;
      margin: 28rpx auto 37rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
      color: #909090;
      line-height: 30rpx;
      img {
        width: 34rpx;
        height: 34rpx;
        margin-right: 15rpx;
      }
    }
  }
</style>

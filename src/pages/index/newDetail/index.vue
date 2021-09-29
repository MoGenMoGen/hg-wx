<template>
  <div class="home">
    <div class="box">
      <!-- 顶部信息 -->
      <div class="new-title">{{title}}</div>
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
        msg: "",
        id: 0,
        typeid: 0 //1是通知详情,2是减负清单
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.typeid = options.typeid
      this.id = options.id
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      let data = {
        id: this.id
      }
      this.api.verifyToken().then(()=>{
        if(this.typeid == 1) {
          this.api.getNoticeDetail(data).then((res) => {
            this.title = res.title
            this.msg = this.until.imgStyle(res.content)
          })
        } else if (this.typeid == 2) {
          wx.setNavigationBarTitle({title: '减负清单'})
          this.api.getAdvertDetail(data).then((res) => {
            this.title = res.name
            this.msg = this.until.imgStyle(res.cont)
          })
        }
      });
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

    .box {
      width: 710rpx;
      min-height: calc(100vh - 40rpx);
      background-color: #fff;
      border-radius: 20rpx;
      margin: 0 auto;
      padding: 40rpx;
      box-sizing: border-box;
    }
    .new-title {
      font-size: 32rpx;
      line-height: 44rpx;
      color: #333333;
      width: 90%;
      margin: 30rpx auto;
      text-align: center;
    }
  }
</style>

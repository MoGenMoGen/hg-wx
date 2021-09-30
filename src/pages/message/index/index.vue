<template>
  <div class="home">
    <!-- 富文本内容 -->
    <div v-html="info.content"></div>
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
      this.id = options.pageId
      this.api.verifyToken().then(()=>{
        this.api.getRichText(this.id).then(res=>{
          this.info = res
          this.info.content = this.until.imgStyle(this.info.content)
          console.log(res)
          wx.setNavigationBarTitle({
            title: res.title
          })
        })
      });

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

<template>
  <div class="home">
    <img :src="item" mode="widthFix" v-for="(item,index) in imgList" :key="index">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgList: []
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getWestDetail({id:options.id}).then(res => {
        this.imgList = res.img.split(",")
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
    img {
      width: 710rpx;
      margin: 10rpx auto;
    }
  }
</style>

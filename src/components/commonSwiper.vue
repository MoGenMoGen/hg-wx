<template>
  <div>
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: {
      banner: {
        type:Array,
        default:()=>{
          return []
        }
      },
    },
    data() {
      return {}
    },
    components: {},
    async onLoad() {

    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },

    methods: {

    }
  }
</script>

<style scoped lang="less">
  @import url("../css/common.less");
  .swiper-container {
    width: 710rpx;
    height: 300rpx;
    margin: 50rpx auto;
    border-radius: 20rpx;
    overflow: hidden; //超出圆角的隐藏
    transform:translateY(0);
    position: absolute;
    top: 50rpx;
    left: 20rpx;
    .swiper-item {
      width: 100%;
      height: 100%;

      .slide-image {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

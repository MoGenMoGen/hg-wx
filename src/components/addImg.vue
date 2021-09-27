<template>
  <div class="img">
    <p @click="toAddImg">
      <image :src="picture" mode="widthFix" />
      添加图片
    </p>
    <p v-for="(item, index) in imgList" :key="index">
      <image :src="close" class="del" mode="widthFix" @click="toDel(index)" />
      <image :src="item" mode="aspectFill" @click="toView(item, imgList)" />
    </p>
  </div>
</template>

<script>
import picture from "../../static/images/picture.png";
import close from "../../static/images/close.png";
export default {
  data() {
    return {
      picture,
      close,
      imgList: [],
    };
  },
  components: {},
  async onLoad() {
    // 清空缓存
    this.imgList = [];
  },
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    // this.api.verifyToken().then(()=>{
    // });
  },
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    initData(data) {
      this.imgList = data;
    },
    toAddImg() {
      this.api.chooseImg().then((res) => {
        console.log(res);
        this.imgList.push(...res.path);
      });
    },
    toDel(index) {
      this.imgList.splice(index, 1);
    },
    toView(url, list) {
      this.until.viewImg(url, list);
    },
  },
  updated() {
    this.$emit("upData", this.imgList);
  },
};
</script>

<style scoped lang="less">
@import url("../css/common.less");
.img {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20rpx;
  p {
    width: 100rpx;
    height: 100rpx;
    border-radius: 12rpx;
    margin-right: 10rpx;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 10rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 12rpx;
    }
    .del {
      position: absolute;
      width: 30rpx;
      top: -15rpx;
      right: -15rpx;
      z-index: 10;
    }
  }
  p:first-of-type {
    border: 1px dashed #999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333333;
    font-size: 15rpx;
    line-height: 30rpx;
    image {
      width: 49rpx;
      border-radius: 0;
    }
  }
}
</style>

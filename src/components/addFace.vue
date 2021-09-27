<template>
  <div class="img">
    <p @click="toAddImg" v-if="!faceImg" class="upload">
      <span>+</span>
      人脸采集
    </p>
    <p @click="toAddImg" v-else>
      <image :src="faceImg" mode="aspectFill" style="width: 216rpx;height: 216rpx;"/>
    </p>
  </div>
</template>

<script>
import picture from "../../static/images/picture.png";
import close from "../../static/images/close.png";
export default {
  props: {
    ifEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      picture,
      close,
      faceImg: "",
    };
  },
  components: {},
  async onLoad() {},
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
      console.log(data);
      this.faceImg = data;
    },
    toAddImg() {
      if (this.ifEdit) {
        this.api.chooseImg(1, ["camera"]).then((res) => {
          console.log(res)
          this.faceImg = res.path[0];
          this.$emit("updata", this.faceImg);
        }).catch(err => {
          this.faceImg = ''
        });
      }
    },

    toView(url) {
      let arr = []
      arr.push(url)
      this.until.viewImg(url, arr);
    },
  },
  updated() {},
};
</script>

<style scoped lang="less">
@import url("../css/common.less");
.img {
  display: flex;
  flex-wrap: wrap;
  p {
    width: 216rpx;
    margin-right: 10rpx;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 10rpx;
    image {
      width: 100%;
    }
  }
  .upload{
    height: 216rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  p:first-of-type {
    border: 1px dashed #d3d3d3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666666;
    line-height: 30rpx;
    font-size: 22rpx;
    span {
      color: #999999;
      font-size: 60rpx;
      margin-bottom: 20rpx;
    }
  }
}
</style>

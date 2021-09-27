<template>
  <div class="home">
    <div class="container">
      <p>{{ info.content }}</p>
      <img
        @click="toView(item)"
        :src="item"
        alt=""
        v-for="(item, index) in info.img"
        :key="index"
        mode="widthFix"
      />
    </div>
    <div class="sign">
      <p>{{ info.user }}</p>

      <p>{{ info.createTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        content: "",
        img: [],
        user: "",
        createTime: "",
      },
    };
  },
  async onLoad() {},
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(() => {
      console.log(this.$root.$mp.query);
      let id = this.$root.$mp.query;
      console.log(id);
      this.api.handgoodDeedDetail(id).then((res) => {
        this.info = res.data;
        this.info.img = this.info.img.split(",");
      });
    });
  },
  methods: {
    // 图片预览
    toView(url) {
      console.log("图片预览");
      this.until.viewImg(url, this.info.img);
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  background: #ffffff;
  width: 670rpx;
  margin: 30rpx 40rpx;
  padding-bottom: 40rpx;
  box-sizing: border-box;
  .container {
    box-sizing: border-box;
    width: 670rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36rpx 42rpx 52rpx 22rpx;
    p {
      width: 576rpx;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 44rpx;
      color: #333333;
      opacity: 1;
      padding-bottom: 40rpx;
    }
    img {
      width: 600rpx;
      margin-bottom: 20rpx;
    }
  }
  .sign {
    width: 100%;
    height: 80rpx;
    padding-right: 40rpx;
    box-sizing: border-box;
    p:nth-child(1) {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40rpx;
      color: #333333;
      opacity: 1;
      text-align: right;
    }
    p:nth-child(2) {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40rpx;
      color: #333333;
      opacity: 1;
      text-align: right;
    }
  }
}
</style>

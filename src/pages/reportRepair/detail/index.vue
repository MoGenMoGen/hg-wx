<template>
  <div class="home">
    <p>报修内容</p>
    <div class="main">
      <div class="cont">
        <p>{{ info.content }}</p>
        <p class="img" v-if="info.img !== undefined && info.img.length > 0">
          <image
            :src="item"
            mode="aspectFit"
            v-for="(item, index) in info.img"
            :key="index"
            @click="toView(item, info.img)"
          ></image>
        </p>
        <div>
          <span>联系人：</span>
          <p>{{ info.contacts }}</p>
        </div>
        <div>
          <span>联系电话：</span>
          <p>{{ info.contactNumber }}</p>
        </div>
        <div>
          <span>报修地点：</span>
          <p>{{ info.addr }}</p>
        </div>
        <div>
          <span>提交时间：</span>
          <p>{{ info.createTime }}</p>
        </div>
      </div>
    </div>
    <p>报修结果</p>
    <div class="cont">
      <div>
        <span>报修结果：</span>
        <p>{{ info.status === 1 ? "待解决" : "已解决" }}</p>
      </div>
      <div>
        <span>完成时间：</span>
        <p>{{ info.overTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        status: 1,
        img: [],
        content: "",
        contacts: "",
        contactNumber: "",
        addr: "",
        createTime: "",
        overTime: "",
      },
    };
  },
  components: {},
  async onLoad() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(() => {
      console.log(this.$root.$mp.query);
      let id = this.$root.$mp.query;
      this.api.Repairdetail(id).then((res) => {
        console.log(res);
        this.info = res.data;
        if (this.info.img === "") {
          this.info.img = [];
        } else this.info.img = this.info.img.split(",");

        console.log(this.info);
      });
    });
  },
  onShow() {},
  //触底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    toView(url, list) {
      this.until.viewImg(url, list);
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  min-height: 100vh;
  width: 100vw;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  > p {
    font-size: 32rpx;
    text-align: center;
    color: #333333;
    padding-top: 60rpx;
    padding-bottom: 40rpx;
  }
  > div {
    width: 670rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx 50rpx;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .cont {
    .img {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 30rpx;
      image {
        width: 140rpx;
        height: 140rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
      }
    }
    > div {
      color: #999999;
      display: flex;
      padding: 8rpx 0;
      span {
        width: 130rpx;
        display: block;
        text-align: justify;
        text-align-last: justify;
      }
      p {
        flex: 1;
        padding-left: 10rpx;
      }
    }
  }
  > button {
    width: 406rpx;
    height: 100rpx;
    background: rgba(235, 2, 14, 0.106);
    border-radius: 100rpx;
    color: @color;
    text-align: center;
    line-height: 100rpx;
  }
}
</style>

<template>
  <div class="home">
    <div class="main">
      <div class="top">
        <image :src="img" mode="widthFix" />
        您的报事报修已提交成功！
      </div>
      <div class="cont">
        <p>{{ info.cont }}</p>
        <p
          v-if="info.imgList !== undefined && info.imgList.length > 0"
          class="img"
        >
          <image
            :src="item"
            mode="aspectFit"
            v-for="(item, index) in info.imgList"
            :key="index"
          ></image>
        </p>
        <div>
          <span>联系人：</span>
          <p>{{ info.linkMan }}</p>
        </div>
        <div>
          <span>联系电话：</span>
          <p>{{ info.linkTel }}</p>
        </div>
        <div>
          <span>报修地点：</span>
          <p>{{ info.addr }}</p>
        </div>
        <div>
          <span>提交时间：</span>
          <p>{{ info.time }}</p>
        </div>
      </div>
    </div>
    <button @click="toPage('/pages/reportRepair/list/main')">
      查看历史报修
    </button>
  </div>
</template>

<script>
import img from "../../../../static/images/submitSuccess.png";
export default {
  data() {
    return {
      img,
      info: {
        imgList: [],
        cont: "",
        linkMan: "",
        linkTel: "",
        addr: "",
        time: "",
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
        this.info.cont = res.data.content;
        this.info.linkTel = res.data.contactNumber;
        this.info.linkMan = res.data.contacts;
        this.info.addr = res.data.addr;
        this.info.time = res.data.createTime;
        if (res.data.img === "") {
          this.info.imgList = [];
        } else this.info.imgList = res.data.img.split(",");
      });
    });
  },
  onShow() {},
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    toPage(url) {
      this.until.aHrefRedirectTo(url);
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  height: 100vh;
  width: 100vw;
  padding: 30rpx 20rpx;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #666666;
  > div {
    width: 670rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx 50rpx;
    margin-bottom: 60rpx;
    box-sizing: border-box;
    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 100rpx;
      border-bottom: 1px solid #f1f3f2;
      image {
        width: 200rpx;
        display: block;
      }
    }
    .cont {
      padding-top: 30rpx;
      .img {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 20rpx;
        image {
          width: 140rpx;
          height: 140rpx;
          margin-right: 10rpx;
        }
      }
      > div {
        color: #999999;
        display: flex;
        padding-bottom: 10rpx;
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

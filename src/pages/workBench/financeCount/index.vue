<template>
  <!-- 财务统计 -->
  <div class="home">
    <ul>
      <div class="top">
        <div
          class="top_content"
          :class="{ active: currentIndex == 1 }"
          @click="currentIndex = 1"
        >
          本期
        </div>
        <div
          class="top_content"
          :class="{ active: currentIndex == 2 }"
          @click="currentIndex = 2"
        >
          本年
        </div>
      </div>
      <li
        v-for="(item, index) in menuList"
        :key="index"
        @click="toPage(item.href)"
      >
        <div class="leftpart">
          <image :src="item.cover" mode="widthFix" />
          <p>{{ item.nm }}</p>
        </div>
        <div class="rightpart">
          <p>{{ item.value }}</p>
          <image src="/static/images/arrowRight.png" mode="widthFix" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 1,
      menuList: [
        {
          cover: "/static/images/total-amount.png",
          nm: "结算金额",
          value: "0.00",
        },
        {
          cover: "/static/images/payment-amount.png",
          nm: "待缴金额",
          value: "0.00",
        },
        {
          cover: "/static/images/refundable-amount.png",
          nm: "应退金额",
          value: "0.00",
        },
        {
          cover: "/static/images/refunded-amount.png",
          nm: "已退金额",
          value: "0.00",
        },
        {
          cover: "/static/images/paid-amount.png",
          nm: "实收金额",
          value: "0.00",
        },
      ],
    };
  },
  components: {},
  async onLoad() {
    console.log(this.info.avatar);
  },
  onShow() {
    Object.assign(this.$data, this.$options.data());
  },
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    async getInfo() {
      this.info = await this.api.userInfo();
    },
    toPage(url) {
      this.until.aHref(url);
    },
    loginOut() {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "确认退出登录吗？",
        success(res) {
          if (res.confirm) {
            that.api.loginOut().then((res) => {});
            wx.clearStorageSync();
            wx.reLaunch({
              url: "/pages/register/login/main",
            });
          }
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");

.home:after {
  content: "";
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2rpx;
  background-color: #e9e9e9;
  z-index: 10001;
}

.home {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: url("../../../../static/images/header-bg.png") center top
    no-repeat;
  background-size: 100%;
  padding-top: 1px;

  ul {
    background: #ffffff;
    box-shadow: 4rpx 7rpx 27rpx 0px rgba(120, 120, 120, 0.12);
    border-radius: 10rpx;
    margin: 30rpx 30rpx 20rpx;
    .top {
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      justify-content: space-around;
      .top_content {
        text-align: center;
        height: 104rpx;
        line-height: 104rpx;
        width: 198rpx;
      }
      .active {
        color: #ff5400;
        font-weight: bold;

        border-bottom: 1px solid #ff5400;
      }
    }
    li {
      display: flex;
      align-items: center;
      padding-right: 54rpx;
      padding-left: 54rpx;
      justify-content: space-between;
      height: 104rpx;

      &:not(:last-of-type) {
        border-bottom: 1px solid #f1f1f1;
      }

      .leftpart {
        display: flex;
        align-items: center;
        image {
          width: 31rpx;
          margin-right: 20rpx;
        }
        p {
          font-size: 26rpx;
          font-weight: 500;
          color: #303030;
        }
      }
      .rightpart {
        display: flex;
        align-items: center;

        image {
          width: 11rpx;
        }
        p {
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #303030;
          margin-right: 20rpx;
        }
      }
    }
  }

  .loginOutBtn {
    width: 260rpx;
    height: 70rpx;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 34rpx;
    line-height: 70rpx;
    font-size: 28rpx;
    text-align: center;
    margin: 60rpx auto;
    font-weight: 500;
    color: #909090;
  }
}
</style>

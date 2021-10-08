<template>
<!-- 动态页面 -->
  <div class="container">
    <div class="title">
      <div
        class="title_text"
        @click="hangleCXactivity"
        :class="{ active: titleIndex == 0 }"
      >
        创新活动
      </div>
      <div
        class="title_text"
        @click="hangleNews"
        :class="{ active: titleIndex == 1 }"
      >
        新闻资讯
      </div>
    </div>
    <div class="list_box">
      <div
        class="CXlist"
        v-show="titleIndex == 0"
        v-for="(item1, index1) in CXlist"
        :key="index1"
      >
        <div class="CXitem">
          <div class="leftpart" style="position: relative">
            <img :src="item1.pic" alt="" />
            <img
              v-if="item1.status == 1"
              src="/static/images/ongoing.png"
              mode="widthFix"
              style="position: absolute; left: 0; top: 20rpx; width: 80rpx"
              alt=""
            />
            <img
              v-else-if="item1.status == 2"
              src="/static/images/nostart.png"
              mode="widthFix"
              style="position: absolute; left: 0; top: 20rpx; width: 80rpx"
              alt=""
            />
            <img
              v-else
              src="/static/images/finished.png"
              mode="widthFix"
              style="position: absolute; left: 0; top: 20rpx; width: 80rpx"
              alt=""
            />
          </div>
          <div class="rightpart">
            <div class="item_title">{{ item1.title }}</div>
            <div class="item_bottom_part">
              <div class="item_wrapper">
                <img
                  class="item_wrapper_pic"
                  src="../../../../static/images/start-time.png"
                  alt=""
                />
                <p class="item_wrapper_text">{{ item1.date1 }}</p>
              </div>
              <div class="item_wrapper">
                <img
                  class="item_wrapper_pic"
                  src="../../../../static/images/end-time.png"
                  alt=""
                />
                <p class="item_wrapper_text">{{ item1.date2 }}</p>
              </div>
              <div class="item_wrapper">
                <img
                  class="item_wrapper_pic"
                  src="../../../../static/images/address-logo.png"
                  alt=""
                />
                <p class="item_wrapper_text">{{ item1.address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="CXlist"
        v-show="titleIndex == 1"
        v-for="(item2, index2) in NewList"
        :key="index2"
      >
        <div class="CXitem">
          <div class="leftpart">
            <img :src="item2.pic" alt="" />
          </div>
          <div class="rightpart">
            <div class="item_title">{{ item2.title }}</div>
            <div class="item_bottom_part">
              <div class="item_wrapper">
                <img
                  class="item_wrapper_pic"
                  src="../../../../static/images/time-logo.png"
                  alt=""
                />
                <p class="item_wrapper_text">{{ item2.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      titleIndex: 0,
      CXlist: [
        {
          pic: "https://tse1-mm.cn.bing.net/th/id/OIP-C.tkQowlIdMywsA2nx3mciigHaE8?w=253&h=180&c=7&r=0&o=5&pid=1.7",
          title: "企业交流活动",
          date1: "2021-09-01 09:00:00",
          date2: "2021-09-01 09:00:00",
          address: "杭州市3墅区半山路345号",
          status: 1,
        },
        {
          pic: "https://tse1-mm.cn.bing.net/th/id/OIP-C.tkQowlIdMywsA2nx3mciigHaE8?w=253&h=180&c=7&r=0&o=5&pid=1.7",
          title: "企业交流活动",
          date1: "2021-09-01 09:00:00",
          date2: "2021-09-01 09:00:00",
          address: "杭州市3墅区半山路345号",
          status: 2,
        },
        {
          pic: "https://tse1-mm.cn.bing.net/th/id/OIP-C.tkQowlIdMywsA2nx3mciigHaE8?w=253&h=180&c=7&r=0&o=5&pid=1.7",
          title: "企业交流活动",
          date1: "2021-09-01 09:00:00",
          date2: "2021-09-01 09:00:00",
          address: "杭州市3墅区半山路345号",
          status: 3,
        },
      ],
      NewList: [
        {
          pic: "https://tse1-mm.cn.bing.net/th/id/OIP-C.ZVv86pKHbffn1k3TmjoHWwHaE8?w=200&h=133&c=7&r=0&o=5&pid=1.7",
          title: "第九届园区党代会顺利召开",
          date: "2021-05-10",
        },
        {
          pic: "https://tse1-mm.cn.bing.net/th/id/OIP-C.ZVv86pKHbffn1k3TmjoHWwHaE8?w=200&h=133&c=7&r=0&o=5&pid=1.7",
          title: "第九届园区党代会顺利召开",
          date: "2021-05-10",
        },
        {
          pic: "https://tse1-mm.cn.bing.net/th/id/OIP-C.ZVv86pKHbffn1k3TmjoHWwHaE8?w=200&h=133&c=7&r=0&o=5&pid=1.7",
          title: "第九届园区党代会顺利召开",
          date: "2021-05-10",
        },
      ],
    };
  },
  computed: {},
  components: {},
  async onLoad(options) {},
  onShow() {},
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    toPage(url) {
      this.until.aHref(url);
    },
    hangleCXactivity() {
      this.titleIndex = 0;
    },
    hangleNews() {
      this.titleIndex = 1;
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");

.container {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: #f7f7f7;
  border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  .title {
    width: 100%;
    height: 84rpx;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .title_text {
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #909090;
      width: 198rpx;
      text-align: center;
    }
    .active {
      color: #ff5400;
      font-weight: bold;
      position: relative;
      width: 198rpx;
      height: 84rpx;
      line-height: 84rpx;
      border-bottom: 4rpx solid #ff5400;
    }
  }
  .list_box {
    .CXlist {
      margin: 30rpx auto;
      width: 710rpx;
      .CXitem {
        width: 100%;
        padding: 30rpx;
        background: #fff;
        margin-bottom: 20rpx;
        display: flex;
        border-radius: 20px;
        box-sizing: border-box;
      }
    }
    .leftpart {
      width: 300rpx;
      height: 200rpx;
      margin-right: 18rpx;
    }
    .rightpart {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .item_title {
        font-size: 26rpx;
        font-weight: bold;
        color: #303030;
      }
      .item_bottom_part {
        .item_wrapper {
          display: flex;
          align-items: center;
          .item_wrapper_pic {
            width: 20rpx;
            height: 23rpx;
            margin-right: 18rpx;
          }
          .item_wrapper_text {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #909090;
          }
        }
      }
    }
  }
}
</style>

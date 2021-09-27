<template>
  <div class="home">
    <div class="main">
      <swiper>
        <block v-for="(item, index) in imgList" :key="index">
          <swiper-item>
            <image :src="item.imgUrl" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <div
        class="list"
        v-for="(item, index) in list"
        :key="index"
        @click="toPage('/pages/goodDeed/detail/main?id=' + item.id)"
      >
        <p>{{ item.content }}</p>
        <p>{{ item.user }}</p>
        <p>{{ item.createTime }}</p>
      </div>
    </div>
    <no-more></no-more>
    <button @click="toPage('/pages/goodDeed/formSubmit/main')">写表扬信</button>
  </div>
</template>

<script>
import noMore from "@/components/noMore";
export default {
  data() {
    return {
      imgList: [],
      list: [],
      page: { current: 1, size: 10 },
      total: 0,
    };
  },
  components: {
    noMore,
  },
  async onLoad() {},
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(() => {
      this.list = [];
      this.page.current = 1;
      this.Refresh(this.page);
      this.api.adrertList("ad08").then(res => {
        this.imgList = res
      })
    });
  },
  // 解底事件
  onReachBottom() {
    console.log("111111");
    if (this.total == this.list.length) {
      console.log(this.total, this.list.length, "fffff");
    } else {
      console.log(this.total, this.list.length);
      this.page.current += 1;
      this.Refresh(this.page);
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.list = [];
    this.page.current = 1;
    this.Refresh(this.page);
    wx.stopPullDownRefresh();
  },
  onShareAppMessage() {
    return {};
  },

  methods: {
    //下拉刷新
    Refresh(data) {
      console.log("refresh111");
      this.api.handlegoodDeedlist(data).then((res) => {
        console.log("2222", this.list);
        this.list.push(...res.data.records);
        console.log("33", this.list);
        this.total = res.data.total;
      });
    },
    toPage(url) {
      this.until.aHref(url);
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  min-height: 100vh;
  width: 100vw;
  padding: 20rpx 0 120rpx;
  box-sizing: border-box;
  .main {
    swiper {
      width:  94vw;
      height: 276rpx;
      box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.16);
      border-radius: 14rpx;
      overflow: hidden;
      margin: 0 auto 20rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .list {
      width: 94vw;
      background: #ffffff;
      box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.1);
      border-radius: 14rpx;
      margin: 0 auto 20rpx;
      color: #333333;
      font-size: 24rpx;
      padding: 15rpx 20rpx;
      box-sizing: border-box;
      > p:not(:first-of-type) {
        text-align: right;
      }
    }
  }
  > button {
    width: 94vw;
    height: 88rpx;
    background: @color;
    border-radius: 14rpx;
    color: #ffffff;
    text-align: center;
    line-height: 88rpx;
    position: fixed;
    bottom: 50rpx;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

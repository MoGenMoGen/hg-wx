<template>
  <div class="home">
    <my-list :list="list"></my-list>
    <no-more></no-more>
  </div>
</template>

<script>
import noMore from "@/components/noMore";
import myList from "@/components/repairList";
export default {
  data() {
    return {
      list: [],
      page: { current: 1, size: 10 },
      total: 0,
    };
  },
  components: {
    myList,
    noMore,
  },
  async onLoad() {},
  onLoad() {},
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(() => {
      this.list = [];
      this.page.current = 1;
      this.Refresh(this.page);
    });
  },
  //触底事件
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
  //下拉刷新
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
      this.api.handleHistoryrepair(data).then((res) => {
        console.log("2222", this.list);
        this.list = this.list.concat(res.data.records);
        console.log("33", this.list);
        // 将多张字符串图片地址放进数组
        this.list.forEach((item) => {
          item.createTime = item.createTime.substring(0,16)
          item.img = item.img.split(",");
        });
        console.log("444");
        this.total = res.data.total;
        // this.page.current = 1;
        console.log("555", this.list);
      });
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  min-height: 100vh;
  width: 100vw;
  padding-top: 40rpx;
}
</style>

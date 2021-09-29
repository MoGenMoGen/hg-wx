<template>
  <div class="home">
    <div class="list-box">
      <img class="top-bg" src="/static/images/hsbbx-Bg.png" mode="widthFix">
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/party/newDetail/main?id='+item.id)">
        <span>· {{item.title}}</span>
        <span>{{item.synopsis}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current:1,
        size: 10
      }
      this.getList(data)
    },
    onShow() {
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10,
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        current: 1,
        size: 10,
      }
      this.current = 1
      this.list = []
      this.getList(data);
      wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      getList(data) {
        this.api.getRedCaseList(data).then(res => {
          this.list = this.list.concat(res.records)
          this.total = ress.total
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx;
    box-sizing: border-box;
    .list-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      position: relative;
      .top-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 710rpx;
        z-index: 0;
      }
      .list-item {
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        font-size: 28rpx;
        color: #303030;
        z-index: 1;
        span:last-child {
          font-size: 24rpx;
          color: #909090;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .list-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>

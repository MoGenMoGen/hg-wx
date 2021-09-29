<template>
  <div class="home">
    <div class="list-box" v-for="(item,index) in list" :key="index" @click="toPage('/pages/party/historyDetail/main?id='+item.id)">
      <img :src="item.img" mode="aspectFill">
      <div class="lsit-right">
        <span class="list-title">【 {{item.title}} 】</span>
        <div class="list-info">
          {{item.synopsis}}
        </div>
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
        this.api.getRedHistoryList(data).then(res => {
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
      box-shadow: 0rpx 4rpx 24rpx 0rpx rgba(151, 151, 151, 0.27);
      display: flex;
      padding: 30rpx;
      box-sizing: border-box;
      margin: 20rpx auto;
      img {
        width: 300rpx;
        height: 200rpx;
        margin-right: 28rpx;
      }
      .lsit-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 26rpx;
        color: #303030;
        .list-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list-info {
          max-width: 280rpx;
          color: #909090;
          font-size: 22rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      }
    }
  }
</style>

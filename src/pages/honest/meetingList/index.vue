<template>
  <div class="home">
    <search @searchEvent="searchKeyWord($event)"></search>
    <div class="list-box">
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/honest/meetingDetail/main?id='+item.id)">
        <span>· {{item.name}}</span>
        <span><img src="/static/images/time-logo.png">{{item.meetTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search'
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0,
        keyword: ''
      }
    },
    components: {
      search
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        name: this.keyword,
        current: 1,
        size: 10,
      }
      this.getList(data)
    },
    onShow() {
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          name: this.keyword,
          current: this.current + 1,
          size: 10
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        name: this.keyword,
        current: 1,
        size: 10
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
      searchKeyWord(e) {
        this.current = 1
        this.list = []
        this.keyword = e.mp.detail.value
        let data = {
          name: this.keyword,
          current: 1,
          size: 10,
        }
        this.getList(data)
      },
      getList(data) {
        this.api.getMeetingList(data).then(res => {
          res.records.forEach(item => {
            item.meetTime = item.meetTime.substring(0,10)
          })
          this.total = res.total
          this.list = this.list.concat(res.records)
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
      border-radius: 20rpx;
      background-color: #fff;
      font-size: 26rpx;
      color: #303030;
      .list-item {
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        span:last-child {
          color: #909090;
          font-size: 24rpx;
          margin-top: 10rpx;
          img {
            width: 21rpx;
            height: 21rpx;
            margin-right: 13rpx;
          }
        }
      }
      .list-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>

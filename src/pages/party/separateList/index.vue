<template>
  <div class="home">
    <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/partyMember/detail/main?type=1&id='+item.id)">
      <div class="list-img">
        <img :src="item.img" mode="aspectFill">
        <img src="/static/images/partyLogo.png" class="party-logo">
      </div>
      <div class="list-right">
        <div>
          <span class="list-name">{{item.name}}</span>
          <div class="list-info">
            <span>{{item.deptNm}}</span>
          </div>
        </div>
        <span class="list-more">查看详情 ></span>
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
        this.api.getSeparateList(data).then(res => {
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
    .module-list-item {
      width: 710rpx;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 20rpx auto;
      img {
        width: 200rpx;
        height: 190rpx;
        border-radius: 5rpx;
        flex-shrink: 1;
        margin-right: 30rpx;
      }
      .list-img {
        position: relative;
        img {
          width: 200rpx;
          height: 190rpx;
          border-radius: 20rpx;
        }
        .party-logo {
          width: 60rpx;
          height: 60rpx;
          position: absolute;
          bottom: 8rpx;
          right: 8rpx;
        }
      }
      .list-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list-name {
          max-width: 420rpx;
          font-size: 28rpx;
          color: #303030;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .list-info {
          max-width: 420rpx;
          display: flex;
          flex-direction: column;
          color: #909090;
          font-size: 24rpx;
          margin-top: 30rpx;
          img {
            width: 21rpx;
            height: 21rpx;
            margin-right: 15rpx;
          }
          .two-more {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .list-more {
          font-size: 24rpx;
          color: #EC2C17;
        }
      }
    }
  }
</style>

<template>
  <div class="home">
    <div class="list-box">
      <img class="top-bg" src="/static/images/wxy-Bg.png" mode="widthFix">
      <div class="list-item" style="align-items: center;justify-content: space-between;" v-for="(item,index) in list"
        :key="index" @click="toPage('/pages/party/wishDetail/main?id='+item.id)">
        <div class="list-wish-left">
          <span>{{item.title}}</span>
          <span><img src="/static/images/wish-name.png">{{item.wishName}}</span>
          <span><img src="/static/images/wish-phone.png">{{item.wishMob}}</span>
        </div>
        <img :src="item.status==1?'/static/images/receive.png':'/static/images/receive-u.png'"
          style="width: 35rpx;height: 38rpx;margin-right: 0;">
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
        current: 1,
        size: 10
      }
      this.getList(data)
    },
    onShow() {},
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
        this.api.getWishList(data).then(res => {
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
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        z-index: 1;
        .list-wish-left {
          display: flex;
          flex-direction: column;

          span {
            display: flex;
            align-items: center;
            font-size: 24rpx;
            color: #909090;
            max-width: 470rpx;

            img {
              width: 21rpx;
              height: 21rpx;
              margin-right: 9rpx;
            }
          }

          span:first-child {
            color: #303030;
            font-size: 28rpx;
          }
        }
      }

      .list-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>

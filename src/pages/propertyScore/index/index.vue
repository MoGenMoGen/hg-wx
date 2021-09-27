<template>
  <div class="home">
    <!-- 顶部轮播 -->
    <div class="topBanner">
      <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item.imgUrl" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <span class="neighbourhoodName">金邑水岸智慧小区</span>
    </div>
    <!-- 列表 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="list-box" @click="toPage('/pages/propertyScore/detail/main?id='+item.id)">
        <span class="list-title">{{item.title}}</span>
        <span class="list-status" :class="item.status==2?'isStart':''">{{item.status==2?'【评分进行中】':'【评分已结束】'}}</span>
        <span class="list-time">{{item.startTime}}~{{item.endTime}}</span>
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        banner: [],
        list: [],
        total: 0,
        current: 1
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
      this.api.verifyToken().then(() => {
        this.getList(data);
        this.api.adrertList("ad18").then(res => {
          this.banner = res
        })
      });
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        this.getList(data);
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      let data = {
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
      getList(data) {
        this.api.getScoreList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.startTime = item.startTime.substring(0, 16)
            item.endTime = item.endTime.substring(0, 16)
          })
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
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

    .topBanner {
      width: 710rpx;
      height: 350rpx;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 20rpx;
      position: relative;
      margin-bottom: 40rpx;

      .swiper-container {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
        overflow: hidden; //超出圆角的隐藏
        transform: translateY(0); //兼容ios

        .swiper-item {
          width: 100%;
          height: 100%;

          .slide-image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .neighbourhoodName {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 9rpx 25rpx;
        color: #FFFFFF;
        font-size: 28rpx;
        border-radius: 42rpx;
        position: absolute;
        top: 20rpx;
        left: 20rpx;
        margin-left: 20rpx;
      }
    }

    .list-box {
      width: 710rpx;
      padding: 40rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      margin: 20rpx 0;
      .list-title {
        font-size: 24rpx;
        font-size: blod;
        margin-bottom: 18rpx;
        color: #303030;
      }
      .list-status {
        font-size: 22rpx;
        font-weight: bold;
        color: #303030;
        margin-bottom: 40rpx;
      }
      .isStart {
        color: #1570FF;
      }
      .list-time {
        font-size: 22rpx;
        font-weight: bold;
        color: #909090;
      }
    }
  }
</style>

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
      <div class="list-box" @click="toPage('/pages/index/newDetail/main?typeid=1&id='+item.id)">
        <img :src="item.img" mode="aspectFill">
        <div class="list-right">
          <div class="list-title">{{item.title}}</div>
          <span class="list-time">{{item.createTime}}</span>
        </div>
      </div>
    </block>
    <no-more></no-more>
  </div>
</template>

<script>
  import noMore from "@/components/noMore";
  export default {
    data() {
      return {
        banner: [],
        list: [],
        current: 1,
        total: 0
      }
    },
    components: {
      noMore
    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      let data = {
        current: 1,
        size: 10
      }
      this.api.verifyToken().then(() => {
        this.refresh(data);
        this.api.adrertList("ad13").then(res => {
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
        this.refresh(data);
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        current: 1,
        size: 10
      }
      this.current = 1
	  this.list = []
      this.refresh(data);
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
      refresh(data) {
        this.api.partyNewsList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.createTime = item.createTime.substring(0,16)
            item.img = item.img.split(",")[0]
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
    padding: 40rpx 30rpx;
    box-sizing: border-box;

    .topBanner {
      width: 690rpx;
      height: 276rpx;
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
      width: 690rpx;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20rpx;

      img {
        width: 184rpx;
        height: 144rpx;
        border-radius: 6rpx;
        margin-right: 24rpx;
      }

      .list-right {
        height: 144rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list-title {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
          // 多行显示省略号
          max-width: 420rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .list-time {
          font-size: 24rpx;
          font-weight: 400;
          color: #999;
        }
      }
    }
  }
</style>

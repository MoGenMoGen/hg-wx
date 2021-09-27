<template>
  <div class="home">
    <!-- 轮播 -->
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item.imgUrl" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 列表 -->
    <block v-for="(item, index) in activeList" :key="index">
      <div class="active-list" @click="toPage('/pages/active/detail/main?typeid=1&id='+item.id)">
        <div class="list-left">
          <div style="display: flex;flex-direction: column;">
            <span class="list-title">{{item.title}}</span>
            <span class="list-time" v-if="item.startTime&&item.endTime">{{item.startTime}}~{{item.endTime}}</span>
          </div>
          <!-- <span :class="[item.status==2 ? 'list-active' : 'list-end']">{{item.status==2?'报名中':'已结束'}}</span> -->
        </div>
        <img :src="item.img" mode="aspectFill">
      </div>
    </block>
    <!-- 发起活动 -->
    <div @click="toPage('/pages/active/initiate/main')" class="initiate-btn">发起活动</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        banner: [],
        activeList: [],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10
      }
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {
        this.refresh(data)
        this.api.adrertList("ad03").then(res => {
          this.banner = res
        })
      });
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if(this.total > this.activeList.length){
        let data = {
          current: this.current + 1,
          size: 10
        }
        this.refresh(data)
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
	  this.activeList = []
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
        this.api.activeList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.startTime = item.startTime.substring(0,16)
            item.endTime = item.endTime.substring(0,16)
            item.img = item.img.split(",")[0]
          })
          this.activeList = this.activeList.concat(res.data.records)
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
    padding: 40rpx 30rpx 150rpx;
    box-sizing: border-box;

    .swiper-container {
      width: 690rpx;
      height: 276rpx;
      margin: 0 auto 40rpx;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 20rpx;
      overflow: hidden;
      transform:translateY(0);

      .swiper-item {
        width: 100%;
        height: 100%;

        .slide-image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .active-list {
      width: 690rpx;
      background: #fff;
      border-radius: 20rpx;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .list-left {
        max-width: 450rpx;
        height: 152rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list-title {
          font-size: 28rpx;
          font-weight: 500;
          line-height: 40rpx;
          color: #333;
          margin-bottom: 10rpx;
          // 多行显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .list-time {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 34rpx;
          color: #999;
        }

        .list-active {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 34rpx;
          color: #2694F8;
        }

        .list-end {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 34rpx;
          color: #999;
        }
      }

      img {
        width: 144rpx;
        height: 152rpx;
        border-radius: 6rpx;
      }
    }

    .initiate-btn {
      width: 660rpx;
      padding: 24rpx 0;
      text-align: center;
      background-color: #EB020E;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #FFF;
      position: fixed;
      bottom: 50rpx;
      left: 45rpx;
    }
  }
</style>

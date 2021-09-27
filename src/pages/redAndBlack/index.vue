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
    <!-- 切换栏 -->
    <div class="swith-bar">
      <div v-for="(item, index) in tabs" :key="index" @click="switchTab(index)" :class="{active:isActive==index&index==0,activeB:isActive==index&index==1}">
        {{item}}
      </div>
    </div>
    <!-- 标题 -->
    <div class="title">
      <span>名次</span>
      <span>姓名</span>
      <span>积分</span>
    </div>
    <!-- 排名 -->
    <div class="rank" v-if="rankList.length>0">
      <block v-for="(item,index) in rankList" :key="index">
        <div class="rank-item">
          <span>{{index+1}}</span>
          <span>{{item.realName}}</span>
          <span>{{item.socialCredit}}</span>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        banner: [],
        tabs: ['红榜', '黑榜'],
        isActive: 0,
        rankList: [],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let redData = {
        current:1,
        size: 10
      }
      this.api.verifyToken().then(() => {
        this.getRedList(redData)
        this.api.adrertList("ad19").then(res => {
          this.banner = res
        })
      });
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.rankList.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        if(this.isActive == 0) {
          this.getRedList(data)
        } else if(this.isActive == 1) {
          this.getBlackList(data)
        }
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
      this.rankList = []
      if(this.isActive == 0) {
        this.getRedList(data)
      } else if(this.isActive == 1) {
        this.getBlackList(data)
      }
      wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      switchTab(index) {
        this.isActive = index
        this.current = 1
        this.rankList = []
        let data = {
          current: 1,
          size: 10
        }
        if(this.isActive == 0) {
          this.getRedList(data)
        } else if(this.isActive == 1) {
          this.getBlackList(data)
        }
      },
      toPage(url) {
        this.until.aHref(url)
      },
      getRedList(data) {
        this.api.redList(data).then(res => {
          this.rankList = this.rankList.concat(res.data.records)
          this.total = res.data.total
        })
      },
      getBlackList(data) {
        this.api.blackList(data).then(res => {
          this.rankList = this.rankList.concat(res.data.records)
          this.total = res.data.total
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 0;
    box-sizing: border-box;

    .topImg {
      width: 710rpx;
      height: 350rpx;
      margin: 20rpx auto;
      border-radius: 20rpx;
      display: block;
    }
    .swiper-container {
      width: 710rpx;
      height: 350rpx;
      margin: 20rpx auto;
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
    .swith-bar {
      width: 100%;
      height: 97rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 30rpx;
      font-weight: 400;
      color: #909090;
      background-color: #fff;
      padding: 0 93rpx;
      box-sizing: border-box;
      border-top-left-radius: 12rpx;
      border-top-right-radius: 12rpx;

      div {
        padding: 27rpx 68rpx;
      }

      .active {
        font-weight: bold;
        color: #EB020E;
        border-bottom: 4rpx solid #EB020E;
      }
      .activeB {
        font-weight: bold;
        color: #000000;
        border-bottom: 4rpx solid #000000;
      }
    }
    .title {
      width: 100%;
      display: flex;
      align-items: center;
      span {
        width: 33%;
        padding: 20rpx 0;
        font-size: 24rpx;
        font-size: 500;
        color: #909090;
        text-align: center;
      }
    }
    .rank {
      width: 100%;
      background-color: #fff;
      .rank-item {
        width: 100%;
        border-bottom: 1rpx solid rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        span {
          width: 33%;
          padding: 30rpx 0;
          font-size: 24rpx;
          color: #303030;
          font-weight: 500;
          text-align: center;
        }
      }
    }
  }
</style>

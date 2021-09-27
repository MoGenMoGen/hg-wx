<template>
  <div class="home">
    <!-- 顶部背景 -->
    <img class="topBg" src="/static/images/header-bg.png" />
    <!-- 顶部轮播 -->
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item.imgUrl" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 列表 -->
    <!--//过滤掉没有通知日期的数据，暂定没有通知的数据不显示，（邻里公约、社区指南没有通知日期）-->
    <block v-for="(item, index) in list" :key="index" v-if="item.releaseTime">
      <div class="list-box" @click="toPage('/pages/communityNotification/detail/main?id=' + item.id)">
        <div class="list-title">{{item.title}}</div>
        <div class="list-time">{{item.releaseTime}}</div>
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
      this.api.verifyToken().then(()=>{
        this.refresh(data)
        this.api.adrertList("ad15").then(res => {
          this.banner = res
        })
      });
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },
    //解底事件
    onReachBottom() {
      if(this.total > this.list.length) {
        let data ={
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
        this.api.communityNoticeList(data).then(res => {
          res.data.records.forEach(item => {
            item.releaseTime = item.releaseTime.substring(0,16)
          })

          this.list = this.list.concat(res.data.records)
          this.total = res.data.records
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");
.home:after{
    content: '';
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rpx;
    background-color: #e9e9e9;
    z-index: 10001;
  }
  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 0 20rpx 30rpx;
    ;
    box-sizing: border-box;

    .topBg {
      width: 750rpx;
      height: 307rpx;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .swiper-container {
      width: 710rpx;
      height: 350rpx;
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
    .list-box {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      padding: 40rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;
      margin-top: 20rpx;
      .list-title {
        font-size: 24rpx;
        font-weight: bold;
        color: #303030;
        text-align: justify;
        margin-bottom: 30rpx;
      }
      .list-time {
        font-size: 22rpx;
        font-weight: bold;
        color: #909090;
      }
    }
  }
</style>

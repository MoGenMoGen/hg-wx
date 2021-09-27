<template>
  <div class="home">
    <search @searchEvent="searchKeyWord($event)"></search>
    <!-- 轮播 -->
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item.imgUrl" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 列表 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="list-box">
        <div class="list-left">
          <img :src="item.avatar" mode="aspectFill">
          <img src="/static/images/partyEmblem.png" class="partyClass" v-if="item.party==1">
        </div>
        <div class="list-right">
          <div class="list-item">
            <img src="/static/images/userName.png">
            <span style="color: #333333;">{{item.name}}<span v-if="item.phone">（{{item.phone}}）</span></span>
          </div>
          <div class="list-item" v-if="item.workAddress">
            <img src="/static/images/address.png">
            <span>{{item.workAddress}}</span>
          </div>
          <div class="list-item" v-if="item.membershipStatus">
            <img src="/static/images/membership.png">
            <span>{{item.membershipStatus}}</span>
          </div>
          <div class="list-item" v-if="item.pastJob">
            <img src="/static/images/position.png">
            <span>{{item.pastJob}}</span>
          </div>
          <div class="list-item" v-if="item.partner">
            <img src="/static/images/partner.png">
            <span>{{item.partner}}</span>
          </div>
          <div class="list-item" v-if="item.motto">
            <img src="/static/images/promise.png">
            <span>{{item.motto}}</span>
          </div>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
  import search from '@/components/search'
  export default {
    data() {
      return {
        banner: [],
        list: [],
        current: 1,
        total: 0,
        name: ""
      }
    },
    components: {
      search
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10,
        name: ""
      }
      this.api.verifyToken().then(()=>{
        this.refresh(data)
        this.api.adrertList("ad17").then(res => {
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
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          name: ""
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
        size: 10,
        name: ""
      }
      this.current = 1
      this.name = "",
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
        this.api.partyMemberList(data).then((res) => {
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
        })
      },
      searchKeyWord(e) {
        this.name = e.mp.detail.value
        let data = {
          current: 1,
          size: 10,
          name: e.mp.detail.value
        }
        this.list = []
        this.refresh(data)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 30rpx 20rpx;
    box-sizing: border-box;

    .swiper-container {
      width: 690rpx;
      height: 276rpx;
      margin: 0 auto 46rpx;
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

    .list-box {
      width: 670rpx;
      margin: 0 auto 20rpx;
      background-color: #fff;
      border-radius: 14rpx;
      padding: 24rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .list-left {
        position: relative;
        img {
          width: 176rpx;
          height: 274rpx;
          border-radius: 20rpx;
          margin-right: 20rpx;
        }

        .partyClass {
          position: absolute;
          content: "";
          width: 60rpx;
          height: 60rpx;
          bottom: -10rpx;
          right: -10rpx;
          z-index: 100;
        }
      }

      .list-right {
        max-width: 420rpx;
        height: 274rpx;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;

        .list-item {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 24rpx;
          color: #666666;
          display: flex;
          align-items: flex-start;
          margin-bottom: 10px;
          img {
            width: 24rpx;
            height: 24rpx;
            margin-right: 8rpx;
            flex-shrink:0;
          }
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
  }
</style>

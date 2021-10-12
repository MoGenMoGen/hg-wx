<template>
<!-- 建党宣传 -->
  <div class="home">
    <div class="tab-box">
      <span :class="{active:activeIndex==index}" v-for="(item,index) in typeList" :key="index" @click="select(index)">{{item}}</span>
    </div>
    <div class="total-filter">
      <span class="total">共3条</span>
      <span class="filter"><img src="/static/images/filter.png">筛选</span>
    </div>
    <div class="list-item" v-for="(item,index) in list" :key="index" v-if="list.length>0">
      <div class="list-item-top">
        <span>学党史、铭初心</span>
        <div>已结束</div>
      </div>
      <div class="list-item-bottom">
        <span><img src="/static/images/outdoor.png">室外</span>
        <span><img src="/static/images/time-logo.png" >2021-04-03</span>
      </div>
    </div>
    <div class="no-data" v-if="list.length==0">
      <img src="/static/images/noData.png">
      <span>暂无数据</span>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[{},{},{}],
        typeList: ['建党活动','待审核'],
        activeIndex: 0
      }
    },
    components: {

    },
    async onLoad(options) {

    },
    onShow() {

    },
    //触底事件
    onReachBottom() {

    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      select(index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    .tab-box {
      width: 100%;
      height: 84rpx;
      background: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #909090;
        width: 198rpx;
        text-align: center;
      }
      .active {
        color: #ff5400;
        font-weight: bold;
        position: relative;
        width: 198rpx;
        height: 84rpx;
        line-height: 84rpx;
        border-bottom: 4rpx solid #ff5400;
      }
    }
    .total-filter {
      width: 690rpx;
      margin: 20rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .total {
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 20rpx;
        background-color: #FF5400;
        color: #fff;
        font-size: 24rpx;
        border-radius: 20rpx;
      }
      .filter {
        display: flex;
        align-items: center;
        height: 40rpx;
        line-height: 40rpx;
        background-color: #fff;
        border-radius: 20rpx;
        font-size: 24rpx;
        padding: 0 20rpx;
        color: #606060;
        img {
          width: 23rpx;
          height: 23rpx;
          margin-right: 10rpx;
        }
      }
    }
    .list-item {
      width: 710rpx;
      margin: 20rpx auto;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      .list-item-top {
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(48,48,48,0.1);
        span {
          font-size: 28rpx;
          color: #303030;
        }
        span:last-child {
          font-size: 24rpx;
          color: #909090;
        }
        div {
          width: 131rpx;
          height: 43rpx;
          line-height: 43rpx;
          text-align: center;
          background: #E5E5E5;
          border-radius: 21px;
          font-size: 24rpx;
          font-weight: bold;
          color:  #909090;
        }
      }
      .list-item-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        span {
          font-size: 24rpx;
          color: #909090;
          display: flex;
          align-items: center;
          img {
            width: 24rpx;
            height: 22rpx;
            margin-right: 16rpx;
          }
        }
        div {
          width: 131rpx;
          height: 43rpx;
          line-height: 43rpx;
          background-color: #FF5400;
          color: #fff;
          font-size: 24rpx;
          text-align: center;
          border-radius: 20rpx;
        }
      }
    }
    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 120rpx auto;
      img {
        width: 222rpx;
        height: 145rpx;
        margin-bottom: 20rpx;
        font-size: 30rpx;
        color: #909090;
      }
    }
    .fixed-btn {
      width: 127rpx;
      height: 127rpx;
      border-radius: 50%;
      background-color: #276EF2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      color: #fff;
      position: fixed;
      bottom: 156rpx;
      right: 40rpx;
      span:first-child {
        margin-bottom: 15rpx;
        font-size: 52rpx;
      }
    }
  }
</style>

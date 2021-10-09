<template>
  <div class="home">
    <div class="tab-box">
      <span :class="{active:activeIndex==index}" v-for="(item,index) in typeList" :key="index" @click="select(index)">{{item}}</span>
    </div>
    <div class="total-filter">
      <span class="total">共2条</span>
      <span class="filter"><img src="/static/images/filter.png">筛选</span>
    </div>
    <div class="list-item" v-for="(item,index) in 2" :key="index">
      <img src="/static/images/avatar.png">
      <div>
        <span>园区楼宇：薄板文创园  A幢</span>
        <span>装修房间： 1002</span>
        <span>联系人：张先生</span>
        <span>联系方式：13610987651</span>
      </div>
    </div>
    <div class="fixed-btn">
      <span>装修</span>
      <span>申请</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeList: ['待审核','已审核'],
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
      align-items: center;
      padding: 30rpx;
      box-sizing: border-box;
      img {
        width: 300rpx;
        height: 250rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
      }
      div {
        display: flex;
        flex-direction: column;
        font-size: 24rpx;
        color: #606060;
        span {
          margin-bottom: 20rpx;
        }
        span:last-child {
          margin-bottom: 0;
        }
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
    }
  }
</style>

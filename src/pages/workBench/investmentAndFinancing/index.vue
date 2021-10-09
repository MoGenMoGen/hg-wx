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
      <div class="list-item-left">
        <img src="/static/images/avatar.png">
        <img src="/static/images/pending.png" class="status-logo">
      </div>
      <div class="list-item-right">
        <span>睿信致成管理顾问有限公司</span>
        <span>机构类别：企业咨询</span>
        <span>投资金额：343430 (万元)</span>
        <span>联系人：张老师</span>
        <span>联系方式：13610987651</span>
      </div>
    </div>
    <div class="fixed-btn">
      <span>+</span>
      <span>新增</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeList: ['待处理','已处理'],
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
      .list-item-left {
        width: 300rpx;
        height: 250rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
        position: relative;
        img {
          width: 300rpx;
          height: 250rpx;
        }
        .status-logo {
          position: absolute;
          top: 20rpx;
          left: 0;
          width: 80rpx;
          height: 40rpx;
        }
      }
      .list-item-right {
        display: flex;
        flex-direction: column;
        font-size: 24rpx;
        color: #606060;
        span {
          max-width: 330rpx;
          margin-bottom: 10rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
      span:first-child {
        margin-bottom: 15rpx;
        font-size: 52rpx;
      }
    }
  }
</style>

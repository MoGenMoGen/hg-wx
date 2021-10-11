<template>
<!-- 合同管理 -->
  <div class="home">
     <div class="tab-box">
      <span
        :class="{ active: activeIndex == index }"
        v-for="(item, index) in typeList"
        :key="index"
        @click="select(index)"
        >{{ item }}</span
      >
    </div>
    <div class="total-filter">
      <span class="total">共3条</span>
      <span class="filter"><img src="/static/images/filter.png">筛选</span>
    </div>
    <div class="list-item" v-for="(item,index) in 3" :key="index">
      <div class="list-item-top">
        <span>聚联科技有限公司</span>
        <!-- <div>未拜访</div> -->
      </div>
      <div class="list-item-bottom">
        <span><img src="/static/images/number.png">JL202108200006</span>
        <span><img src="/static/images/company-logo.png">薄板文创 / A 幢 -A101</span>
        <span><img src="/static/images/time-logo.png">2021.07.21 ~ 2022.07.10</span>
      </div>
     
    </div>
    <!-- <div class="fixed-btn">
      <span>+</span>
      <span>拜访</span>
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
      typeList: ["合同创建审核", "合同作废审核", "合同退租审核"],
      activeIndex: 0,

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
      this.activeIndex = index;
    },
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
          font-weight: bold;
        }
        div {
          height: 40rpx;
          line-height: 40rpx;
          border: 1px solid #FF5400;
          font-size: 24rpx;
          color: #FF5400;
          padding: 0 20rpx;
          border-radius: 20rpx;
        }
      }
      .list-item-bottom {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        box-sizing: border-box;
        span {
          font-size: 24rpx;
          color: #909090;
          margin-bottom: 20rpx;
          display: flex;
          align-items: center;
          img {
            width: 21rpx;
            height: 21rpx;
            margin-right: 16rpx;
          }
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

<template>
  <!-- 合同列表 -->
  <div class="home">

    <div class="total-filter">
      <span class="total">共3条</span>
      <div class="pick">
        <div class="left">
        <picker mode="date" :value="date1" start="2015-09-01" end="2030-09-01" @change="bindDateChangeOne">
          <div class="picker">
             {{date1?date1:'选择开始时间'}}
          </div>
        </picker>
      </div>
      ~
      <div class="right" >
        <picker mode="date" :value="date2" start="2015-09-01" end="2030-09-01" @change="bindDateChangeTwo">
          <div class="picker">
             {{date2?date2:'选择结束时间'}}
          </div>
        </picker>
      </div>
      <img src="/static/images/date.png" >
       </div>
      <span class="filter"><img src="/static/images/filter.png">筛选</span>
    </div>
    <div class="list-item" v-for="(item,index) in list" :key="index" v-if="list.length>0">
      <div class="list-item-top">
        <span>聚联科技有限公司</span>
        <div>执行中</div>
      </div>
      <div class="list-item-bottom">
        <div class="bottomContent" style="margin-top: 0;">
          <img src="/static/images/number.png">
          <span>JL202108200006</span>
        </div>
        <div class="bottomContent">
          <img src="/static/images/company-logo.png">
          <span>薄板文创 / A 幢 -A101</span>
        </div>
        <div class="bottomContent">
          <img src="/static/images/time-logo.png">
          <span>2021.07.21 ~ 2022.07.10</span>
        </div>
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
          date1: '',
          date2:'',
          pickShowOne:false,
          pickShowTwo:false,
        list: [{}],
        typeList: ['全部', '待审核', '审核通过', '审核未通过'],
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
      },
   bindDateChangeOne(value){
     this.date1=value.mp.detail.value
   },
   bindDateChangeTwo(value){
     this.date2=value.mp.detail.value
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
      .pick{
        display: flex;
        padding: 10rpx;
        box-sizing: border-box;
        background: #FFFFFF;
        border: 1rpx solid #E8E8E8;
        border-radius: 20rpx;
        align-items: center;
        .left{
          width:170rpx;
          margin-right: 10rpx;
          text-align: center;
        }
        .right{
           width: 170rpx;
           margin-left: 10rpx;
           text-align: center;
        }
        img{
          width: 26rpx;
          height: 24rpx;
          margin-left: 20rpx;

        }
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
        border-bottom: 1px solid rgba(48, 48, 48, 0.1);

        span {
          font-size: 28rpx;
          color: #303030;
        }

        span:last-child {
          font-size: 24rpx;
          color: #909090;
        }

        div {
          height: 40rpx;
          line-height: 40rpx;
          border: 1px solid #276EF2;
          font-size: 24rpx;
          background: rgba(229, 229, 229, 0);
          color: #276EF2;
          padding: 0 20rpx;
          border-radius: 20rpx;
        }
      }

      .list-item-bottom {
        align-items: center;
        padding: 30rpx;
        box-sizing: border-box;

        .bottomContent {
          margin-top: 32rpx;
          display: flex;

          img {
            width: 22rpx;
            height: 21rpx;
            margin-right: 16rpx;
          }

          span {
            font-size: 24rpx;
            font-weight: 500;
            color: #909090;
          }

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

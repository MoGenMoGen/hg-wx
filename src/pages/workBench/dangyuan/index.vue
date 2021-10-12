<template>
<!-- 党员管理 -->
  <div class="home">

    <div class="total-filter">
      <span class="total">共2条</span>
      <span class="filter"><img src="/static/images/filter.png">筛选</span>
    </div>
    <div class="list-item" v-for="(item,index) in list" :key="index" v-if="list.length>0">
        <div class="leftImg">
           <img src="/static/images/houzi.jpg" mode='aspectFill' @click="preview">
        </div>
        <div class="rightContent">
          <div class="name">
            峨眉山小猴子
          </div>
          <p>入党时间：2019-12-11</p>
          <p>1337882344</p>
          <p>畅停科技有限公司</p>
          <p>党支部/支部书记</p>
        </div>
    </div>
    <div class="no-data" v-if="list.length==0" >
      <img src="/static/images/noData.png">
      <span>暂无数据</span>
    </div>
    <div class="fixed-btn">
      <span>+</span>
      <span>党员</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[{},{},{}],
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
      preview(){
        wx.previewImage({
          current:'/static/images/houzi.jpg',
          urls:['/static/images/houzi.jpg']
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
      padding: 30rpx;
      box-sizing: border-box;
      .leftImg{
        width: 300rpx;
        height: 250rpx;
        img{
          flex-shrink:1;
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
        }
      }
      .rightContent{
        margin-left: 29rpx;
        .name{
          font-size: 24rpx;
          font-weight: 500;
          color: #606060;
        }
        p{
          font-size: 24rpx;
          font-weight: 500;
          color: #606060;
          margin-top: 15rpx;
        }
        p:first-child{
          margin-top: 30rpx;
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

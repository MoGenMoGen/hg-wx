<template>
  <div class="home">
    <!-- 顶部背景 -->
    <img class="topBg" src="/static/images/header-bg.png" />
    <!-- 积分信息 -->
    <div class="integral-info">
      <div class="integral-canUse">
        <span>可用积分</span>
        <span>{{info.credit}}</span>
      </div>
      <div class="integral-rule" @click="toPage('/pages/shopping/integralRule/main')">
        <div>?</div>
        <span>积分规则</span>
      </div>
    </div>
    <!-- 积分明细 -->
    <div class="list-box">
      <!-- 列表头部 -->
      <div class="list-title">
        <div class="title-left">积分明细</div>
        <div class="title-right" @click="toPage('/pages/shopping/exchange/main')"><span>兑换记录</span> <img :src="goLogo"></div>
      </div>
      <!-- 列表内容 -->
      <block v-for="(item, index) in list" :key="index">
        <div class="list-content">
          <span>{{item.name}}</span>
          <span style="color: #EB020E;">{{item.num > 0 ? '+'+item.num : item.num}}</span>
          <span>{{item.createTime}}</span>
        </div>
      </block>
    </div>
    <no-more v-if="total<=list.length"></no-more>
  </div>
</template>

<script>
  import noMore from '@/components/noMore'
  import goLogo from "../../../../static/images/goLogo.png"
  export default {
    data() {
      return {
        goLogo,
        info:{},
        current:1,
        size:10,
        total:0,
        list: []
      }
    },
    components: {
      noMore
    },
    async onLoad() {

    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.api.userInfo().then(res=>{
          this.info = res
        })
        this.current =1
        this.list = []
        this.getList()
      });
    },
    //解底事件
    onReachBottom() {
      if(this.total>this.list.length){
        this.current++
        this.getList()
      }
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {

      getList(){
        this.api.creditdtlList({current:this.current,size:this.size}).then(res=>{
          this.total = res.total
          this.list.push(...res.records)
        })
      },
      toPage(url){
        this.until.aHref(url)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 0 20rpx 30rpx;
    box-sizing: border-box;

    .topBg {
      width: 750rpx;
      height: 307rpx;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .integral-info {
      width: 100%;
      padding: 30rpx 54rpx 36rpx 60rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;

      .integral-canUse {
        display: flex;
        flex-direction: column;
        font-size: 30rpx;
        font-weight: 500;
        color: #fff;

        span:last-child {
          font-size: 48rpx;
          font-size: 800;
          color: #FFEA00;
          margin-top: 30rpx;
        }
      }

      .integral-rule {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 24rpx;
        font-size: 500;
        color: #fff;

        div {
          width: 24rpx;
          height: 24rpx;
          background-color: #fff;
          border-radius: 50%;
          font-size: 17rpx;
          font-size: 500;
          color: #EB020E;
          text-align: center;
          line-height: 24rpx;
          margin-right: 10rpx;
        }
      }
    }

    .list-box {
      width: 720rpx;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 10rpx;
      min-height: calc(100vh - 202rpx);

      .list-title {
        padding: 40rpx 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .title-left {
          font-size: 30rpx;
          color: #303030;
          font-weight: bold;
          line-height: 27rpx;
        }

        .title-left:before {
          content: "";
          display: inline-block;
          width: 6rpx;
          height: 27rpx;
          background: #EB020E;
          margin-right: 20rpx;
        }

        .title-right {
          font-size: 26rpx;
          font-weight: 500;
          color: #606060;
          display: flex;
          align-items: center;
          img {
            width: 12rpx;
            height: 22rpx;
            margin-left: 10rpx;
          }
        }
      }

      .list-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 26rpx;
        font-size: 500;
        color: #303030;
        margin-top: 48rpx;
        padding: 0 56rpx;
        box-sizing: border-box;
        justify-content: space-between;
        span:first-of-type{
          width: 35%;
        }
        span:nth-of-type(2){
          width: 15%;
        }
      }
      .list-content:last-child {
        padding-bottom: 48rpx;
      }
    }
  }
</style>

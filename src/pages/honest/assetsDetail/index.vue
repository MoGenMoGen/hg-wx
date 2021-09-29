<template>
  <div class="home">
    <div class="info-box">
      <div class="info-item">
        <span>· 单位或个人：</span>
        <span>{{info.name}}</span>
      </div>
      <div class="info-item">
        <span>· 项目：</span>
        <span>{{info.tenantry}}</span>
      </div>
      <div class="info-item">
        <span>· 承包起止日期：</span>
        <span>{{info.leaseStart}}-{{info.leaseEnd}}</span>
      </div>
      <div class="info-item">
        <span>· 应交承包金：</span>
        <span>{{info.rent}}</span>
      </div>
      <div class="info-item">
        <span>· 本期已交承包金：</span>
        <span>{{info.rent1}}</span>
      </div>
      <div class="info-item">
        <span>· 累计已交承包金：</span>
        <span>{{info.rent2}}</span>
      </div>
      <div class="info-item">
        <span>· 应交未交金额：</span>
        <span>{{info.rent3}}</span>
      </div>
      <div class="info-item">
        <span>· 备注：</span>
        <span>{{info.remark}}</span>
      </div>
      <div class="info-item">
        <span>· 预警：</span>
        <span>
          <img src="/static/images/greenLight.png" v-if="info.status==0">
          <img src="/static/images/yellowLight.png" v-if="info.status==1">
          <img src="/static/images/redLight.png" v-if="info.status==2">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info:{}
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getAssetsDetail({id:options.id}).then(res=>{
        res.leaseStart = res.leaseStart.substring(0,10)
        res.leaseEnd = res.leaseEnd.substring(0,10)
        this.info = res
      })
    },
    onShow() {
    },
    //解底事件
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
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx;
    box-sizing: border-box;
    .info-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 20rpx auto;
      .info-item {
        width: 100%;
        padding: 30rpx;
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #303030;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        span {
          width: 60%;
          img {
            width: 32rpx;
            height: 32rpx;
          }
        }
        span:first-child {
          width: 40%;
          color: #EC2C17;
        }
      }
      .info-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>

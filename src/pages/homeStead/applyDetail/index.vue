<template>
  <div class="home">
    <div class="info-box">
      <div class="info-title">建房需求意向表</div>
      <div class="info-item">
        <span>申请人姓名：</span>
        <span>{{info.name}}</span>
      </div>
      <div class="info-item">
        <span>性  别：</span>
        <span>{{sexArr[info.sex]}}</span>
      </div>
      <div class="info-item">
        <span>年  龄：</span>
        <span>{{info.age}}</span>
      </div>
      <div class="info-item">
        <span>户口类型：</span>
        <span>{{info.householderType}}</span>
      </div>
      <div class="info-item">
        <span>所属行政村：</span>
        <span>{{villagePicker[info.village-1].dictValue}}</span>
      </div>
    </div>
    <div class="status-box">
      <div class="status-item">
        <span>申请时间：</span>
        <span>{{info.createTime}}</span>
      </div>
      <div class="status-item">
        <span>申请状态：</span>
        <span>{{statusArr[info.status]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sexArr: ['未知','男','女'],
        statusArr: ['审核拒绝','待审核','审核通过'],
        villagePicker: [],
        info:{},
        id: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.api.getDataList('village').then(res => {
        this.villagePicker = res
      })
      this.api.perApplyDetail({id:this.id}).then(res => {
        this.info = res.data
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");
  .home {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    .info-box {
      width: 690rpx;
      padding: 60rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin: 20rpx auto;
      .info-title {
        width: 100%;
        font-size: 30rpx;
        font-weight: bold;
        color: #303030;
        margin-bottom: 60rpx;
        text-align: center;
      }
      .info-item {
        display: flex;
        align-items: flex-start;
        font-size: 24rpx;
        font-weight: bold;
        color: #303030;
        margin-bottom: 20rpx;
        span {
          width: 50%;
        }
      }
      .info-item:last-child {
        margin-bottom: 0;
      }
    }
    .status-box {
      width: 100%;
      margin: 20rpx 0;
      background-color: #fff;
      padding: 40rpx 30rpx;
      box-sizing: border-box;
      .status-item {
        font-size: 24rpx;
        font-weight: bold;
        color: #303030;
        display: flex;
        align-items: flex-start;
        margin-bottom: 20rpx;
        span {
          width: 50%;
        }
      }
      .status-item:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>

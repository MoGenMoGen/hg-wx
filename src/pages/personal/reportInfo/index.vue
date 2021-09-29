<template>
  <div class="home">
    <div class="top-info">
      <img :src="qrInfo.img" mode="aspectFill">
      <span>名称：{{qrInfo.name}}</span>
      <span>编号：{{qrInfo.code}}</span>
      <span>位置：{{qrInfo.address}} 经度：{{qrInfo.lng}} 维度：{{qrInfo.lat}}</span>
      <span>上报类型：{{reportPickList[qrInfo.type - 1].dictValue}}</span>
    </div>
    <div class="top-info">
      <span class="word-img">
        上报内容：{{info.cont}}
        <img :src="item" mode="aspectFill" v-for="(item,index) in info.img" :key="index">
      </span>
      <span>上报时间：{{info.createTime}}</span>
    </div>
  </div>
</template>

<script>
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        qrInfo: {},
        info: {},
        reportPickList: []
      }
    },
    components: {
      addImg
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        id: options.id
      }
      this.api.getMyReportDetail(data).then(res => {
        res.img = res.img.split(",")
        this.info =  res
        this.api.getScanCode({id:res.resId}).then(resp => {
          this.qrInfo = resp.data
        })
      })
      this.api.getDataList('reportType').then(res => {
        this.reportPickList = res
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
      changeReport(e){
        this.reportIndex = e.mp.detail.value
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
    .top-info {
      width: 710rpx;
      background-color: #fff;
      padding: 40rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-size: 24rpx;
      color: #303030;
      margin-bottom: 20rpx;
      img {
        width: 630rpx;
        height: 352rpx;
        border-radius: 10rpx;
        margin-bottom: 30rpx;
      }
      .word-img {
        img {
          width: 431rpx;
          height: 352rpx;
          margin-top: 25rpx;
          margin-left: 119rpx;
        }
      }
    }
  }
</style>

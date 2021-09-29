<template>
  <div class="home">
    <block v-for="(item,index) in reportList" :key="index">
      <div class="list-box" @click="toPage('/pages/personal/reportInfo/main?id='+item.id)">
        <span>{{item.cont}}</span>
        <!-- <span>上报类型：{{reportPickList[item.type - 1].dictValue}}</span> -->
        <span>上报时间：{{item.createTime}}</span>
      </div>
    </block>
    <div class="bottom-btn" @click="scan"><img src="/static/images/scan-w.png">扫一扫</div>
  </div>
</template>

<script>
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        current: 1,
        total: 0,
        reportList: [],
        reportPickList: []
      }
    },
    components: {
      addImg
    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10,
        userId: wx.getStorageSync('loginInfo').id
      }
      this.getList(data)
      this.api.getDataList('reportType').then(res => {
        this.reportPickList = res
      })
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.reportList.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          userId: wx.getStorageSync('loginInfo').id
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        current: 1,
        size: 10,
        userId: wx.getStorageSync('loginInfo').id
      }
      this.current = 1
      this.reportList = []
      this.getList(data);
      wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      scan() {
        wx.scanCode({
          success :res=> {
            this.toPage('/'+res.path)
            // this.toPage('/pages/index/scan/main?id='+res.result)
          }
        })
      },
      getList(data) {
        this.api.getMyReportList(data).then(res => {
          this.reportList = this.reportList.concat(res.records)
          this.total = res.total
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
    padding: 20rpx;
    box-sizing: border-box;
    .list-box {
      width: 100%;
      padding: 40rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      color: #909090;
      font-weight: 500;
      background-color: #fff;
      border-radius: 12rpx;
      display: flex;
      flex-direction: column;
      margin: 20rpx 0;
      span:first-child {
        font-size: 28rpx;
        color: #303030;
        margin-bottom: 20rpx;
      }
    }
    .bottom-btn {
    	width: 570rpx;
    	height: 70rpx;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	color: #FFFFFF;
    	background-color: #EC2C17;
    	border-radius: 35rpx;
    	position: fixed;
    	bottom: 46rpx;
    	left: 90rpx;
      img {
        width: 30rpx;
        height: 30rpx;
        margin-right: 20rpx;
      }
    }
  }
</style>

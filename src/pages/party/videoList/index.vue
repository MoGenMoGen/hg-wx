<template>
  <div class="home">
    <div class="list-box">
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/party/video/main?id='+item.id)">
        <div class="module-list-item-img">
          <img :src="item.img" mode="aspectFill">
          <!-- <span>{{item.duration}}</span> -->
          <img src="/static/images/videoLogo.png" class="video-logo">
        </div>
        <span>{{item.title}}</span>
        <span>{{item.createTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: 1,
        list: [],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.type = options.type
      if(options.type==1){
        wx.setNavigationBarTitle({
          title: '红色宣讲'
        })
      } else if(options.type==2){
        wx.setNavigationBarTitle({
          title: '微视频'
        })
      }
      let data = {
        current: 1,
        size: 10,
        type: this.type
      }
      this.getList(data)
    },
    onShow() {
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          type: this.type
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
        type: this.type
      }
      this.current = 1
      this.list = []
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
      getList(data) {
        this.api.getRedClassVideoList(data).then(res => {
          res.records.forEach(item => {
            item.createTime = item.createTime.substring(0,10)
          })
          this.list = this.list.concat(res.records)
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
      width: 710rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-wrap: wrap;
      padding: 30rpx;
      padding-bottom: 0;
      box-sizing: border-box;
      .list-item {
        width: 310rpx;
        margin-right: 30rpx;
        display: flex;
        flex-direction: column;
        margin-bottom: 30rpx;
        .module-list-item-img {
          width: 100%;
          height: 200rpx;
          border-radius: 10rpx;
          position: relative;
          img {
            width: 100%;
            height: 200rpx;
            border-radius: 10rpx;
            filter: sepia(40%);
          }
          span {
            font-size: 22rpx;
            color: #fff !important;
            position: absolute;
            bottom: 10rpx;
            right: 10rpx;
          }
          .video-logo {
            width: 50rpx;
            height: 50rpx;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
          }
        }
        span {
          font-size: 28rpx;
          color: #303030;
          margin: 10rpx 0;
        }
        span:last-child {
          font-size: 22rpx;
          color: #909090;
          margin: 0;
        }
      }
      .list-item:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
</style>

<template>
  <div class="home">
    <div class="tab-box">
      <span @click="select(index)" v-for="(item,index) in tabList" :key="index" :class="{'active':selectIndex==index}">{{item}}</span>
    </div>
    <div class="list-box" v-for="(item,index) in list" :key="index" @click="toPage('/pages/party/activeDetail/main?id='+item.id)">
      <img :src="item.img" mode="aspectFill">
      <div class="active-right">
        <span class="active-title">【 {{item.name}} 】</span>
        <div class="active-info">
          <span><img src="/static/images/time-logo.png">{{item.startTime}}</span>
          <span><img src="/static/images/people-logo.png"><span style="color: #EC2C17;">{{item.signTotal}}</span>人参与</span>
          <span class="list-status bg-red" v-if="item.state=='未开始'">未开始</span>
          <span class="list-status bg-blue" v-if="item.state=='进行中'">进行中</span>
          <span class="list-status bg-gray" v-if="item.state=='已结束'">已结束</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabList: ['未开始','进行中'],
        selectIndex: 0,
        total: 0,
        current: 1,
        list: []
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current:1,
        size:10,
        startTime_gt:this.until.formatTime(new Date().getTime()).substring(0,10)
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
        }
        if(this.selectIndex==0) {
          data.startTime_gt = this.until.formatTime(new Date().getTime()).substring(0,10)
        } else if (this.selectIndex==1) {
          data.startTime_lt = this.until.formatTime(new Date().getTime()).substring(0,10)
          data.endTime_gt = this.until.formatTime(new Date().getTime()).substring(0,10)
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
      }
      if(this.selectIndex==0) {
        data.startTime_gt = this.until.formatTime(new Date().getTime()).substring(0,10)
      } else if (this.selectIndex==1) {
        data.startTime_lt = this.until.formatTime(new Date().getTime()).substring(0,10)
        data.endTime_gt = this.until.formatTime(new Date().getTime()).substring(0,10)
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
      select(index) {
        this.selectIndex = index
        this.current = 1
        this.list = []
        if(this.selectIndex==0) {
          let data = {
            current:1,
            size:3,
            startTime_gt:this.until.formatTime(new Date().getTime()).substring(0,10)
          }
          this.getList(data)
        } else if (this.selectIndex==1) {
          let data = {
            current:1,
            size:3,
            startTime_lt:this.until.formatTime(new Date().getTime()).substring(0,10),
            endTime_gt: this.until.formatTime(new Date().getTime()).substring(0,10)
          }
          this.getList(data)
        }
      },
      getList(data) {
        this.api.getActiveList(data).then(res => {
          res.records.forEach(item => {
            item.startTime = item.startTime.substring(0,10)
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
    .bg-blue {
      background-color: #1794EC;
    }
    .bg-red {
      background-color: #EC2C17;
    }
    .bg-gray {
      background-color: #ACACAC;
    }
    .tab-box {
      width: 670rpx;
      height: 80rpx;
      margin: 20rpx auto;
      background-color: #fff;
      color: 30rpx;
      color: #909090;
      border-radius: 20rpx;
      line-height: 80rpx;
      display: flex;
      align-items: center;
      span {
        width: 350rpx;
        text-align: center;
      }
      .active {
        border-radius: 20rpx;
        background-color: #EC2C17;
        color: #fff;
      }
    }
    .list-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 0rpx 4rpx 24rpx 0rpx rgba(151, 151, 151, 0.27);
      display: flex;
      padding: 30rpx;
      box-sizing: border-box;
      margin: 20rpx auto;
      img {
        width: 300rpx;
        height: 200rpx;
        border-radius: 5rpx;
        flex-shrink: 1;
        margin-right: 30rpx;
      }
      .active-right {
        max-width: 280rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .active-title {
          font-size: 26rpx;
          color: #303030;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .active-info {
          max-width: 280rpx;
          display: flex;
          flex-direction: column;
          color: #909090;
          font-size: 24rpx;
          img {
            width: 21rpx;
            height: 21rpx;
            margin-right: 15rpx;
          }
          .list-status {
            width: 113rpx;
            height: 38rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24rpx;
            color: #fff;
            border-radius: 19rpx;
          }
        }
      }
    }
  }
</style>

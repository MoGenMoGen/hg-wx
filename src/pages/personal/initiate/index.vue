<template>
  <div class="home">
    <!-- 导航 -->
    <div class="tab-box" v-if="personType==0||personType==3">
      <block v-for="(item,index) in tabList" :key="index">
        <div @click="choose(index)">
          <img :src="item.url" v-if="selectIndex!=index">
          <img :src="item.selectUrl" v-if="selectIndex==index">
          <span>{{item.title}}</span>
          <img class="select-img" src="/static/images/selectImg.png" v-if="selectIndex==index">
        </div>
      </block>
    </div>
    <block v-if="selectIndex==0">
      <div class="list-box" v-for="(item,index) in list" :key="index" @click="toPage('/pages/honest/say/main?id='+item.id)">
        <img :src="item.img[0]" mode="aspectFill">
        <div class="list-right">
          <div class="list-top">
            <span>{{item.name}}</span>
            <span><img src="/static/images/time-logo.png">{{item.createTime}}</span>
          </div>
          <span class="list-status bg-blue" v-if="item.status==1">审核中</span>
          <span class="list-status bg-red" v-if="item.status==2">审核通过</span>
          <span class="list-status bg-gray" v-if="item.status==3">审核未通过</span>
        </div>
      </div>
    </block>
    <block v-if="selectIndex==1">
      <div class="info-box" v-for="(item,index) in list" :key="index" @click="toPage('/pages/honest/opinion/main?id='+item.id)">
        <div class="info-title">
          <span>{{item.name}}</span>
          <!-- <span class="bg-blue" v-if="status==1">审核中</span>
          <span class="bg-red" v-if="status==2">审核通过</span>
          <span class="bg-gray" v-if="status==3">审核未通过</span> -->
        </div>
        <div class="info-bottom">
          <div class="bottom-title"><div></div>项目实施方案</div>
          <div class="bottom-cont">{{item.eventHandle}}</div>
          <div class="bottom-time"><img src="/static/images/time-logo.png">{{item.createTime}}</div>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabList: [{
          title: '村民说事',
          url: '/static/images/saySomething-u.png',
          selectUrl: '/static/images/saySomething.png'
        },{
          title: '民意体检',
          url: '/static/images/publicOpinion-u.png',
          selectUrl: '/static/images/publicOpinion.png'
        }],
        selectIndex:0,
        status: 1,
        personType: '',
        list: [],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        createUser: wx.getStorageSync('loginInfo').id,
        current: 1,
        size: 10
      }
      this.getList(data)
    },
    onShow() {
      this.personType = wx.getStorageSync('loginInfo').personType
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.reportList.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          createUser: wx.getStorageSync('loginInfo').id
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      let data = {
        current: 1,
        size: 10,
        createUser: wx.getStorageSync('loginInfo').id
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
      choose(index) {
        this.selectIndex = index
        this.list = []
        this.current = 1
        let data = {
          current: 1,
          size: 10,
          createUser: wx.getStorageSync('loginInfo').id
        }
        this.getList(data)
      },
      getList(data) {
        if(this.selectIndex==0) {
          this.api.getSayList(data).then(res => {
            res.records.forEach(item => {
              item.img = item.img.split(",")
              item.createTime = item.createTime.substring(0,10)
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
        } else if(this.selectIndex==1) {
          this.api.getOpinionList(data).then(res => {
            res.records.forEach(item => {
              item.img = item.img.split(",")
              item.createTime = item.createTime.substring(0,10)
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 0 20rpx 20rpx;
    box-sizing: border-box;
    .tab-box {
      width: 690rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2rpx solid #DDDDDD;
      div {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 20rpx 0;
        img {
          width: 140rpx;
          height: 140rpx;
        }
        span {
          color: #333333;
          font-size: 28rpx;
        }
        .select-img {
          width: 108rpx;
          height: 10rpx;
          position: absolute;
          bottom: 0;
        }
      }
    }
    .bg-blue {
      background-color: #1794EC;
    }
    .bg-red {
      background-color: #EC2C17;
    }
    .bg-gray {
      background-color: #ACACAC;
    }
    .list-box {
      width: 710rpx;
      padding: 30rpx;
      box-sizing: border-box;
      margin: 20rpx auto;
      background-color: #fff;
      border-radius: 10rpx;
      display: flex;
      img {
        width: 300rpx;
        height: 200rpx;
        margin-right: 30rpx;
        border-radius: 5rpx;
        flex-shrink: 1;
      }
      .list-right {
        max-width: 320rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list-top {
          font-size: 26rpx;
          color: #303030;
          span:last-child {
            display: flex;
            align-items: center;
            color: #909090;
            margin-top: 30rpx;
            img {
              width: 21rpx;
              height: 21rpx;
              margin-right: 15rpx;
            }
          }
        }
        .list-status {
          width: 153rpx;
          height: 38rpx;
          color: #fff;
          border-radius: 19rpx;
          font-size: 24rpx;
          text-align: center;
          line-height: 38rpx;
        }
      }
    }
    .info-box {
      width: 710rpx;
      margin: 20rpx auto;
      background-color: #fff;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;
      .info-title {
        width: 100%;
        padding: 24rpx 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        font-size: 26rpx;
        color: #303030;
        display: flex;
        justify-content: space-between;
        span:first-child {
          max-width: 480rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:last-child {
          width: 153rpx;
          height: 38rpx;
          color: #fff;
          border-radius: 19rpx;
          font-size: 24rpx;
          text-align: center;
          line-height: 38rpx;
        }
      }
      .info-bottom {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        box-sizing: border-box;
        .bottom-title {
          font-size: 26rpx;
          color: #303030;
          display: flex;
          align-items: center;
          div {
            width: 5rpx;
            height: 24rpx;
            background-color: #EC2C17;
            margin-right: 12rpx;
          }
        }
        .bottom-cont {
          width: 100%;
          color: #606060;
          font-size: 24rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .bottom-time {
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #909090;
          img {
            width: 21rpx;
            height: 21rpx;
            margin-right: 13rpx;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="home">
    <!-- 切换栏 -->
    <div class="swith-bar">
      <div v-for="(item, index) in tabs" :key="index" @click="switchTab(index)" :class="{active:isActive==index}">{{item}}</div>
    </div>
    <!-- 具体内容 -->
    <!-- 轮播 -->
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item.imgUrl" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>
    <!-- 团队名称样式 -->
    <block v-for="(item, index) in list" :key="index" v-if="isActive==0">
      <div class="list-box" @click="toPage(item.id)">
        <img :src="item.img" mode="aspectFill">
        <div class="list-right">
          <div class="list-name">{{item.name}}</div>
          <!-- <span class="list-slogan">{{item.profile}}</span> -->
        </div>
      </div>
    </block>
    <!-- 团队活动和风采样式 -->
    <block v-for="(item, index) in list2" :key="index" v-if="isActive!=0">
      <div class="list-box" @click="toPage(item.id)" style="justify-content: space-between;">
        <div class="list-left">
          <div class="list-title">{{item.title}}</div>
          <!-- <span class="list-time" v-if="isActive==1">{{item.startTime}}~{{item.endTime}}</span>
          <span class="list-time" v-if="isActive==2">{{item.createTime}}</span> -->
          <!-- 团队活动状态显示 -->
          <!-- <div :class="[{'list-typeR':item.status!=3},{'list-typeG':item.status==3}]" v-if="isActive==1">{{typeName[item.status-1]}}</div> -->
            <!-- 团队风采占位用 -->
            <!-- <div v-if="isActive==2" style="height: 38rpx;"></div> -->
        </div>
        <img :src="item.img" style="width: 144rpx;height: 152rpx;" mode="aspectFill">
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabs:['团队名称','团队风采'],
        isActive: 0,
        banner: [],
        list: [],
        list2: [],
        typeName: ['未开始', '进行中', '已结束'],
        current: 1,
        total: 0,
        total2: 0
      }
    },
    components: {

    },
    async onLoad() {
      let data = {
        current: 1,
        size: 10
      }
      Object.assign(this.$data, this.$options.data())
      this.api.verifyToken().then(()=>{
        this.teamNameList(data)
        this.api.adrertList("ad14").then(res => {
          this.banner = res
        })
      });
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length || this.total2 > this.list2.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        if(this.isActive == 0 ) {
          this.teamNameList(data)
        }
        // else if(this.isActive == 1) {
        //   this.teamActiveList(data)
        // }
        else if(this.isActive == 1) {
          this.teamNewList(data)
        }
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        current: 1,
        size: 10
      }
      this.current = 1
      this.list = []
      this.list2 = []
      if(this.isActive == 0) {
        this.teamNameList(data)
      }
      // else if(this.isActive == 1) {
      //   this.teamActiveList(data)
      // }
      else if(this.isActive == 1) {
        this.teamNewList(data)
      }
      wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      switchTab(index) {
        this.isActive = index
        this.current = 1
        this.list = []
        this.list2 = []
        let data = {
          current: 1,
          size: 10
        }
        if(this.isActive == 0) {
          this.teamNameList(data)
        }
        // else if(this.isActive == 1) {
        //   this.teamActiveList(data)
        // }
        else if(this.isActive == 1) {
          this.teamNewList(data)
        }
      },
      toPage(id) {
        if(this.isActive==0) {
          // this.until.aHref('/pages/active/detail/main?typeid=2&id='+id)
          this.until.aHref('/pages/index/newDetail/main?typeid=4&id='+id)
        } else if (this.isActive==1) {
          this.until.aHref('/pages/index/newDetail/main?typeid=2&id='+id)
        }
      },
      // 团队名称列表
      teamNameList(data) {
        this.api.teamNameList(data).then((res) => {
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
        })
      },
      // 团队风采列表
      teamNewList(data) {
        this.api.teamNewList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.createTime = item.createTime.substring(0,16)
          })
          this.list2 = this.list2.concat(res.data.records)
          this.total2 = res.data.total
        })
      },
      // 团队活动列表
      teamActiveList(data) {
        this.api.teamActiveList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.startTime = item.startTime.substring(0,16)
            item.endTime = item.endTime.substring(0,16)
          })
          this.list2 = this.list2.concat(res.data.records)
          this.total2 = res.data.total
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 0 30rpx 40rpx;
    box-sizing: border-box;
    .swith-bar {
      width: 690rpx;
      height: 114rpx;
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      justify-content: space-around;
      align-items: center;
      font-size: 32rpx;
      font-weight: 400;
      color: #999;
      line-height: 44rpx;
      padding: 0 26rpx;
      box-sizing: border-box;
      .active {
        color: #333;
        position: relative;
      }
      .active:after {
        content: "";
        width: 60rpx;
        height: 10rpx;
        border-radius: 6rpx;
        background-color: #EB020E;
        position: absolute;
        bottom: -20rpx;
        left: 34rpx;
      }
    }
    .swiper-container {
      width: 690rpx;
      height: 320rpx;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 10rpx;
      overflow: hidden;
      transform:translateY(0);
      margin-bottom: 20rpx;
      .swiper-item {
        width: 100%;
        height: 100%;

        .slide-image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .list-box {
      width: 690rpx;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20rpx;
      img {
        width: 184rpx;
        height: 144rpx;
        border-radius: 6rpx;
        margin-right: 24rpx;
      }
      .list-left {
        height: 144rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 24rpx;
        font-size: 500;
        .list-title {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
          max-width: 470rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .list-time {
          font-size: 24rpx;
          font-weight: 400;
          color: #999;
        }
        .list-typeR {
          color: #FF4141;
        }
        .list-typeG {
          color: #999;
        }
      }
      .list-right {
        display: flex;
        flex-direction: column;
        .list-name {
          font-size: 32rpx;
          font-weight: 500;
          color: #333;
          max-width: 420rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 12rpx;
        }
        .list-slogan {
          font-size: 24rpx;
          font-weight: 400;
          color: #999;
          max-width: 420rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>

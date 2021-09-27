<template>
  <div class="home">
    <!-- 顶部轮播 -->
    <div class="topBanner">
      <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item.imgUrl" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <span class="neighbourhoodName">金邑水岸智慧小区</span>
    </div>
    <!-- 列表 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="list-box" @click="toPage('/pages/party/activeDetail/main?id='+item.id)">
        <div class="list-left">
          <div class="list-title">{{item.title}}</div>
          <span class="list-time" v-if="item.startTime&&item.endTime">{{item.startTime}}~{{item.endTime}}</span>
          <!-- <div :class="[{'list-typeB':item.status==1},{'list-typeR':item.status==2},{'list-typeG':item.status==3}]">
            {{typeName[item.status-1]}}</div> -->
        </div>
        <img :src="item.img" mode="aspectFill">
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        banner: [],
        list: [],
        typeName: ['未开始', '签到', '已结束'],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10
      }
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {
        this.refresh(data)
        this.api.adrertList("ad12").then(res => {
          this.banner = res
        })
      });
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        this.refresh(data)
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
      this.refresh(data);
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
      refresh(data) {
        this.api.partyActiveList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.startTime = item.startTime.substring(0,16)
            item.endTime = item.endTime.substring(0,16)
            item.img = item.img.split(",")[0]
          })
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
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
    padding: 40rpx 30rpx;
    box-sizing: border-box;

    .topBanner {
      width: 690rpx;
      height: 276rpx;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 20rpx;
      position: relative;
      margin-bottom: 40rpx;

      .swiper-container {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
        overflow: hidden; //超出圆角的隐藏
        transform: translateY(0); //兼容ios

        .swiper-item {
          width: 100%;
          height: 100%;

          .slide-image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .neighbourhoodName {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 9rpx 25rpx;
        color: #FFFFFF;
        font-size: 28rpx;
        border-radius: 42rpx;
        position: absolute;
        top: 20rpx;
        left: 20rpx;
        margin-left: 20rpx;
      }
    }

    .list-box {
      width: 690rpx;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: #fff;
      margin-bottom: 20rpx;
      border-radius: 20rpx;

      .list-left {
        max-width: 470rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 24rpx;
        font-size: 500;

        .list-title {
          font-size: 28rpx;
          font-weight: 500;
          color: #333;
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

        .list-typeB {
          color: #2694F8;
        }

        .list-typeG {
          color: #999;
        }
      }

      img {
        width: 144rpx;
        height: 144rpx;
        border-radius: 6rpx;
      }
    }
  }
</style>

<template>
  <div class="home">
    <!-- 切换栏 -->
    <div class="swith-bar">
      <div v-for="(item, index) in tabs" :key="index" @click="switchTab(index)" :class="{active:isActive==index}">{{item}}</div>
    </div>
    <!-- 轮播 -->
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item.imgUrl" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 列表 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="discuss-list" @click="toPage('/pages/discussion/detail/main?id='+item.id+'&isActive='+isActive)">
        <span class="discuss-content">{{item.title}}</span>
        <span class="discuss-name">发布者：{{item.userName}}</span>
        <div class="discuss-bottom">
          <div class="discuss-time">{{item.createTime}}</div>
          <div class="discuss-interactive" v-if="isActive==0">
            <div style="margin-right: 28rpx;">
              <img src="/static/images/comment.png">
              <span>{{item.commentNum}}</span>
            </div>
            <div>
              <img :src="item.likeStatus==0?'/static/images/like.png':'/static/images/like_s.png'">
              <span>{{item.likesNum}}</span>
            </div>
          </div>
          <div class="discuss-interactive" v-if="isActive==1">
            <div style="margin-right: 28rpx;">
              <img src="/static/images/deny.png" style="width: 39rpx; height: 39rpx;">
              <span>{{item.disagreeNum}}</span>
            </div>
            <div>
              <img src="/static/images/agree.png" style="width: 39rpx; height: 39rpx;">
              <span>{{item.agreeNum}}</span>
            </div>
          </div>
        </div>
      </div>
    </block>
    <!-- 发起议事 -->
    <div @click="toPage('/pages/discussion/initiate/main')" class="initiate-btn" v-show="isActive==0">发起议事</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabs:['居民议事','线上决议'],
        isActive: 0,
        banner: [],
        list: [],
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
        this.refresh(data);
        this.api.adrertList("ad04").then(res => {
          this.banner = res
        })
    },
    onShow() {
		//这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
        this.api.verifyToken().then(() => {
        });
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        if(this.isActive == 0 ) {
          this.refresh(data)
        } else if(this.isActive == 1) {
          this.resolutionList(data)
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
      if(this.isActive == 0 ) {
        this.refresh(data)
      } else if(this.isActive == 1) {
        this.resolutionList(data)
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
        let data = {
          current: 1,
          size: 10
        }
        if(this.isActive == 0) {
          this.refresh(data)
        } else if(this.isActive == 1) {
          this.resolutionList(data)
        }
      },
      toPage(url) {
        this.until.aHref(url)
      },
      refresh(data) {
        this.api.discussionList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.createTime = item.createTime.substring(0, 16)
          })
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
        })
      },
      resolutionList(data) {
        this.api.resolutionList(data).then((res) => {
          console.log(res)
          res.data.records.forEach((item) => {
            item.createTime = item.createTime.substring(0, 16)
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
    padding: 0 30rpx 150rpx;
    box-sizing: border-box;

    .swith-bar {
      width: 560rpx;
      height: 114rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 32rpx;
      font-weight: 400;
      color: #999;
      line-height: 44rpx;
      padding: 0 26rpx;
      box-sizing: border-box;
      margin: 0 auto;
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
      height: 276rpx;
      margin: 0 auto 40rpx;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 20rpx;
      overflow: hidden;
      transform: translateY(0);

      .swiper-item {
        width: 100%;
        height: 100%;

        .slide-image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .discuss-list {
      width: 690rpx;
      margin-bottom: 20rpx;
      background-color: #fff;
      border-radius: 20rpx;
      padding: 24rpx 30rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;

      .discuss-content {
        font-size: 28rpx;
        line-height: 40rpx;
        font-weight: 400;
        color: #333;
        margin-bottom: 16rpx;
        // 多行显示省略号
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .discuss-name {
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
        margin-bottom: 20rpx;
      }


      .discuss-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #999;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;

        .discuss-interactive {
          display: flex;
          flex-direction: row;
          align-items: center;

          div {
            display: flex;
            align-items: center;

            img {
              width: 27rpx;
              height: 27rpx;
              margin-right: 8rpx;
            }
          }
        }
      }
    }

    .initiate-btn {
      width: 660rpx;
      padding: 24rpx 0;
      text-align: center;
      background-color: #EB020E;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #FFF;
      position: fixed;
      bottom: 50rpx;
      left: 45rpx;
    }
  }
</style>

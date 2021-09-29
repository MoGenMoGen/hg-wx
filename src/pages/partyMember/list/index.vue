<template>
  <div class="home">
    <!-- 轮播 -->
    <commonSwiper :banner="banner"></commonSwiper>
    <!-- 列表 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="list-box" @click="toPage('/pages/partyMember/detail/main?id='+item.id)">
        <div class="list-left">
          <img :src="item.img" mode="aspectFill">
          <img src="/static/images/dh.png" class="partyClass">
        </div>
        <div class="list-right">
          <div class="list-item">
            <img src="/static/images/name.png">
            <span style="color: #333333;">{{item.name}}</span>
          </div>
          <div class="list-item">
            <img src="/static/images/phone.png">
            <span>{{item.mob}}</span>
          </div>
          <div class="list-item">
            <img src="/static/images/email.png">
            <span>{{item.email}}</span>
          </div>
          <div class="list-item">
            <img src="/static/images/director.png">
            <span>优秀事迹 ></span>
          </div>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
  import commonSwiper from '@/components/commonSwiper'
  export default {
    data() {
      return {
        banner: [],
        list: [],
        current: 1,
        total: 0,
        name: ""
      }
    },
    components: {
      commonSwiper
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10,
        name: ""
      }
      this.api.verifyToken().then(() => {
        this.refresh(data)
        this.api.adrertList("home").then(res => {
          this.banner = res.records[0].img.split(",")
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
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          name: ""
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
        size: 10,
        name: ""
      }
      this.current = 1
      this.name = "",
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
        this.api.partyMemberList(data).then((res) => {
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
    padding: 0;
    box-sizing: border-box;

    .list-box {
      width: 100%;
      margin: 20rpx auto;
      background-color: #fff;
      padding: 45rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .list-left {
        position: relative;

        img {
          width: 140rpx;
          height: 140rpx;
          border-radius: 50%;
          margin-right: 55rpx;
        }

        .partyClass {
          position: absolute;
          content: "";
          width: 37rpx;
          height: 37rpx;
          bottom: 6rpx;
          right: 9rpx;
          z-index: 100;
        }
      }

      .list-right {
        max-width: 420rpx;
        height: 140rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list-item {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 24rpx;
          color: #666666;
          display: flex;
          align-items: flex-start;

          img {
            width: 24rpx;
            height: 24rpx;
            margin-right: 8rpx;
            flex-shrink: 0;
          }

          span {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
  }
</style>

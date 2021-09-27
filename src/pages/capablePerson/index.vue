<template>
  <div class="home">
    <!-- 切换栏 -->
    <div class="swith-bar">
      <div v-for="(item, index) in tabs" :key="index" @click="switchTab(index)" :class="{active:isActive==index}">
        {{item}}</div>
    </div>
    <search @searchEvent="searchKeyWord($event)"></search>
    <!-- 列表 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="list-box">
        <div class="list-left">
          <img :src="item.avatar" mode="aspectFill">
          <img src="/static/images/partyEmblem.png" class="partyClass" v-if="item.party==1">
        </div>
        <div class="list-right">
          <div>
            <div class="list-title">{{item.ability}}</div>
            <span class="list-name">{{item.name}}</span>
          </div>
          <div class="list-bottom">{{item.phone}} <span v-if="item.email&&item.phone">|</span> {{item.email}}</div>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
  import search from '@/components/search'
  export default {
    data() {
      return {
        tabs: ['服务', '公益', '互助'],
        isActive: 0,
        list: [],
        current: 1,
        total: 0,
        ability: ""
      }
    },
    components: {
      search
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10,
        ability: "",
        type: 1
      }
      this.api.verifyToken().then(()=>{
        this.refresh(data)
      });
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用

    },
    //解底事件
    onReachBottom() {
      if(this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          ability: this.ability,
          type: Number(this.isActive) + 1
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
        ability: this.ability,
        type: Number(this.isActive) + 1
      }
      this.current = 1
      this.ability = ""
      this.list = []
      this.refresh(data);
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
          size: 10,
          ability: this.ability,
          type: Number(this.isActive) + 1
        }
        this.refresh(data)
      },
      toPage(url) {
        this.until.aHref(url)
      },
      refresh(data) {
        this.api.capableList(data).then((res) => {
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
        })
      },
      searchKeyWord(e) {
        this.ability = e.mp.detail.value
        let data = {
          current: 1,
          size: 10,
          ability: e.mp.detail.value,
          type: Number(this.isActive) + 1
        }
        this.list = []
        this.refresh(data)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 40rpx;
    .swith-bar {
      width: 100%;
      height: 100rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 30rpx;
      font-weight: 400;
      color: #999;
      line-height: 48rpx;
      background-color: #fff;
      padding: 0 88rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      margin-bottom: 30rpx;
      div {
        padding: 15rpx 0;
      }

      .active {
        font-weight: bold;
        color: #EB020E;
        border-bottom: 6rpx solid #EB020E;
      }
    }

    .list-box {
      width: 670rpx;
      margin: 0 auto 20rpx;
      background-color: #fff;
      border-radius: 14rpx;
      padding: 24rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .list-left {
        position: relative;
        img {
          width: 160rpx;
          height: 160rpx;
          border-radius: 20rpx;
          margin-right: 40rpx;
        }

        .partyClass {
          position: absolute;
          content: "";
          width: 60rpx;
          height: 60rpx;
          bottom: -10rpx;
          right: -10rpx;
          z-index: 100;
        }
      }

      .list-right {
        max-width: 420rpx;
        height: 160rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list-title {
          font-size: 28rpx;
          font-weight: 500;
          line-height: 40rpx;
          color: #000;
          margin-bottom: 10rpx;
          // 多行显示省略号
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .list-name {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 34rpx;
          color: #333;
        }

        .list-bottom {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 34rpx;
          color: #333;
        }
      }
    }
  }
</style>

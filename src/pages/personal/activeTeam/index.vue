<template>
  <div class="home">
    <!-- 活动样式 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="list-box" @click="toPage('/pages/personal/detail/main?id=' + item.id + '&activeId=2')" style="justify-content: space-between;">
        <div class="list-left">
          <div class="list-title">{{item.title}}</div>
          <span class="list-time" v-if="item.startTime&&item.endTime">{{item.startTime}}~{{item.endTime}}</span>
          <!-- 活动状态显示 -->
          <!-- <div :class="[{'list-typeR':item.status==2},{'list-typeG':item.status==4}]">{{typeName[item.status-1]}}</div> -->
        </div>
        <img :src="item.img" style="width: 144rpx;" mode="aspectFill">
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        typeName: ['', '报名中', '', '已结束'],
        current: 1,
        total: 0
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
        this.getList(data)
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
          size: 10
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
        size: 10
      }
      this.current = 1
      this.list = []
      this.getList(data)
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
        this.api.myActiveTeamList(data).then((res) => {
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
    padding: 20rpx 0;
    box-sizing: border-box;

    .list-box {
      width: 100%;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin:20rpx auto;
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

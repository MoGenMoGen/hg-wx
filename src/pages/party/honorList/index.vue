<template>
  <div class="home">
    <div class="list-box">
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="viewImg(item.img)">
        <img :src="item.img" mode="aspectFill">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        current:1,
        size: 10
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
      viewImg(img) {
        let imgList = img.split(",")
        this.until.viewImg(img,imgList)
      },
      getList(data) {
        this.api.getHonorList(data).then(res => {
          this.list = this.list.concat(res.records)
          this.total = ress.total
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
        align-items: center;
        margin-bottom: 30rpx;
        img {
          width: 100%;
          height: 200rpx;
          border-radius: 10rpx;
        }
        span {
          font-size: 28rpx;
          color: #303030;
          margin: 10rpx 0;
        }
      }
      .list-item:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
</style>

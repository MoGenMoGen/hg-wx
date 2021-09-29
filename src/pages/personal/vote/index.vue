<template>
  <div class="home">
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/honest/opinion/main?id='+item.honestOpinion.id)">
        <img :src="item.honestOpinion.img" mode="aspectFill">
        <div class="list-right">
          <span class="list-title">{{item.honestOpinion.name}}</span>
          <div class="list-info">
            <span class="four-line">{{item.honestOpinion.eventHandle}}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        current: 1,
        size: 10,
        userId: wx.getStorageSync('loginInfo').id
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {

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
        this.api.getMyVoteList(data).then(res => {
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
    .list-item {
      width: 710rpx;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      background-color: #fff;
      border-radius: 10rpx;
      margin: 20rpx auto;
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
        .list-title {
          font-size: 26rpx;
          color: #303030;
        }
        .list-info {
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
        }
        .four-line {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      }
    }
  }
</style>

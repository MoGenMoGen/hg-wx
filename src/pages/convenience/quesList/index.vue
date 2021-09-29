<template>
  <div class="home">
    <search @searchEvent="searchMatter($event)"></search>
    <div class="question-box">
      <div class="question-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/convenience/quesDetail/main?id='+item.id)">
        <div class="question-item-top">
          <div class="question-item-first" v-if="index==0">{{index+1}}</div>
          <div class="question-item-second" v-else-if="index==1">{{index+1}}</div>
          <div class="question-item-third" v-else-if="index==2">{{index+1}}</div>
          <div v-else>{{index+1}}</div>
          <span class="question-cont">{{item.cont}}</span>
        </div>
        <div class="question-item-bottom" style="font-size: 24rpx;color: #666666;">
          <span><img src="/static/images/msg-logo.png" mode="heightFix">{{item.commentCount}}</span>
          <span><img src="/static/images/viewCount.png" mode="heightFix">{{item.watch}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search'
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0,
        keyword: ''
      }
    },
    components: {
      search
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        pid: '0',
        size: 10,
        current:1,
        status:2
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          cont: this.keyword,
          current: this.current + 1,
          size: 10,
          pid: '0',
          status:2
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      let data = {
        cont: this.keyword,
        current: 1,
        size: 10,
        pid: '0',
        status:2
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
      searchMatter(e) {
        this.current = 1
        this.list = []
        this.keyword = e.mp.detail.value
        let data = {
          cont: this.keyword,
          current: 1,
          size: 10,
          pid: '0',
          status:2
        }
        this.getList(data)
      },
      getList(data) {
        this.api.getQuestionList(data).then(res => {
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
    padding-bottom: 170rpx;
    box-sizing: border-box;
    .question-box {
      width: 710rpx;
      margin: 0 auto;
      border-radius: 10rpx;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .question-item {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F4F4F4;
        .question-item-top {
          display: flex;
          color: #303030;
          font-size: 26rpx;
          margin-bottom: 20rpx;
          div {
            background: url(../../../../static/images/other.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 29rpx;
            height: 32rpx;
            margin-right: 13rpx;
            color: #fff;
            font-size: 18rpx;
          }
          .question-item-first {
            background: url(../../../../static/images/first.png) no-repeat;
            background-size: 100% 100%;
          }
          .question-item-second {
            background: url(../../../../static/images/second.png) no-repeat;
            background-size: 100% 100%;
          }
          .question-item-third {
            background: url(../../../../static/images/third.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .question-item-bottom {
          padding-left: 35rpx;
          box-sizing: border-box;
          span {
            margin-right: 60rpx;
          }
          img {
            height: 20rpx;
            margin-right: 10rpx;
          }
        }
      }
      .question-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40rpx 0;
        div {
          width: 506rpx;
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          border-radius: 40rpx;
          background-color: #EC2C17;
          color: #fff;
          font-size: 30rpx;
        }
      }
    }
  }
</style>

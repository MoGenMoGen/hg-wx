<template>
  <div class="home">
    <div class="list-box">
      <div class="sunShine-inspect-item3" style="color: #929292;">
        <span>主题</span>
        <span>内容</span>
        <span>时间</span>
      </div>
      <div class="sunShine-inspect-item3" v-for="(item,index) in list" :key="index" @click="toPage('/pages/honest/openDetail/main?id='+item.id)">
        <span>{{item.name}}</span>
        <span>{{item.content}}</span>
        <span>{{item.time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          name: '建党一百周年',
          content: '热烈庆祝建党一百周年',
          time: '2021.10.22'
        }],
        current: 1,
        total: 0,
        keyword: ''
      }
    },
    components: {
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        name: this.keyword,
        current: 1,
        size: 10,
      }
      this.getList(data)
    },
    onShow() {
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          name: this.keyword,
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
        name: this.keyword,
        current: 1,
        size: 10
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
      searchKeyWord(e) {
        this.current = 1
        this.list = []
        this.keyword = e.mp.detail.value
        let data = {
          name: this.keyword,
          current: 1,
          size: 10,
        }
        this.getList(data)
      },
      getList(data) {
        // this.api.getMeetingList(data).then(res => {
        //   res.records.forEach(item => {
        //     item.meetTime = item.meetTime.substring(0,10)
        //   })
        //   this.total = res.total
        //   this.list = this.list.concat(res.records)
        // })
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
      border-radius: 20rpx;
      background-color: #fff;
      font-size: 26rpx;
      color: #303030;
      .sunShine-inspect-item3 {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        color: #303030;
        font-size: 24rpx;
        border-bottom: 1px solid #E9E9E9;
        span{
          width: 25%;
          text-align: center;
        }
        span:nth-child(2) {
          width: 50%;
        }
      }
      .sunShine-inspect-item3:last-child {
        border-bottom: none;
      }
    }
  }
</style>

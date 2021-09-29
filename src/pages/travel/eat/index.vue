<template>
  <div class="home">
    <img :src="item.img" mode="widthFix" v-for="(item,index) in list" :key="index">
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
      if(options.type==1) {
        wx.setNavigationBarTitle({
          title: '农家乐'
        })
      } else if (options.type==2) {
        wx.setNavigationBarTitle({
          title: '住宿'
        })
      }
      this.id = options.id
      let data = {
        travelId: this.id,
        current: 1,
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
          travelId: this.id,
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
        travelId: this.id,
      }
      this.current = 1
      this.reportList = []
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
      getList(data) {
        this.api.getAdvertList(data).then(res => {
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
    img {
      width: 710rpx;
      margin: 10rpx auto;
    }
  }
</style>

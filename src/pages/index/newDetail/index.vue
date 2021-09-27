<template>
  <div class="home">
    <!-- 顶部信息 -->
    <div class="new-title">{{title}}</div>
    <div class="new-info">
      <span class="new-time" v-if="typeid!=2&&typeid!=4">{{time}}</span>
      <div class="new-count" v-if="typeid!=4">
        <img src="/static/images/viewCount.png" style="width: 34rpx;height: 34rpx;margin-right: 10rpx;">
        <span>{{count}}</span>
      </div>
    </div>
    <!-- 富文本内容 -->
    <div v-html="msg"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        time: "",
        count: 0,
        msg: "",
        id: 0,
        typeid: 0 //1是党建资讯,2是团队风采,3是垃圾分类详情,4团队详情
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.typeid = options.typeid
      this.id = options.id
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      let data = {
        id: this.id
      }
      this.api.verifyToken().then(()=>{
        if(this.typeid == 1) {
          this.api.partyNewsDetail(data).then((res) => {
            this.title = res.data.title
            this.time = res.data.createTime.substring(0,16)
            this.count = res.data.num
            // this.msg = res.data.content
            this.msg = this.until.imgStyle(res.data.content)
          })
          wx.setNavigationBarTitle({
            title: '党建资讯'
          })
        } else if (this.typeid == 2) {
          this.api.teamNewDetail(data).then((res) => {
            this.title = res.data.title
            this.time = res.data.createTime.substring(0,16)
            this.count = res.data.num
            this.msg = this.until.imgStyle(res.data.content)
          })
          wx.setNavigationBarTitle({
            title: '团队风采'
          })
        } else if (this.typeid == 3) {
          this.api.garbageNewsDetail(data).then((res) => {
            this.title = res.data.title
            this.time = res.data.createTime.substring(0,16)
            this.count = res.data.num
            this.msg = this.until.imgStyle(res.data.content)
          })
          wx.setNavigationBarTitle({
            title: '垃圾分类'
          })
        } else if (this.typeid == 4) {
          this.api.teamNameDetail(data).then(res => {
            console.log(res)
            this.title = res.data.name
            this.msg = this.until.imgStyle(res.data.content)
          })
          wx.setNavigationBarTitle({
            title: '团队名称'
          })
        }
      });
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
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 38rpx 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

    .new-title {
      font-size: 44rpx;
      line-height: 44rpx;
      color: #000;
      margin-bottom: 4rpx;
    }

    .new-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 32rpx;

      .new-time {
        font-size: 24rpx;
        line-height: 24rpx;
        color: #000;
        margin-right: 26rpx;
      }

      .new-count {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #999;
        display: flex;
        align-items: center;
      }
    }

  }
</style>

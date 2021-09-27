<template>
  <div class="home">
    <!-- 顶部信息 -->
    <div class="active-title">{{title}}</div>
    <div class="active-info">
      <span class="active-time">{{time}}</span>
      <div class="active-count">
        <img src="/static/images/viewCount.png" style="width: 34rpx;height: 34rpx;margin-right: 10rpx;">
        <span>{{count}}</span>
      </div>
    </div>
    <!-- 头图 -->
	<block v-for="(item, index) in img" :key="index">
		<img :src="item" class="headImg" mode="widthFix">
	</block>
    <!-- 时间 -->
    <div class="timeLine" v-if="startTime&&endTime">活动时间：{{startTime}} 至 {{endTime}}</div>
    <!-- 富文本内容 -->
    <div v-html="msg"></div>
    <!-- 签到按钮 -->
    <!-- <div class="signIn" @click="signIn()" v-if="signInStatus==0&&status==2">签到</div> -->
    <!-- 未开始与已结束按钮 -->
    <!-- <div class="signIn" style="background: #999;" v-if="status!=2">{{status==1?'未开始':status==3?'已结束':''}}</div> -->
    <!-- 已签到 -->
    <!-- <div class="signIn" style="background: #999;" v-if="signInStatus==1&&status==2">已签到</div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        time: "",
        count: 0,
        msg : "",
        status: 1,
        signInStatus: 0,
        id: 0,
        startTime: "",
        endTime: "",
        img: ""
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
    },
    onShow() {
      let data = {
        id: this.id
      }
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.api.partyActiveDetail(data).then((res) => {
          this.title = res.data.title
          this.time = res.data.createTime.substring(0,16)
          // this.msg = res.data.content
          this.msg = this.until.imgStyle(res.data.content)
          this.signInStatus = res.data.signInStatus
          this.status = res.data.status
          this.startTime = res.data.startTime.substring(0,16)
          this.endTime = res.data.endTime.substring(0,16)
          this.img = res.data.img.split(",")
        })
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
      },
      signIn() {
        let self = this
        wx.getLocation({
          type: 'gcj02',
          success (res) {
            let data = {
              pid: self.id,
              lat: res.latitude,
              lng: res.longitude
            }
            self.api.partyActiveSignIn(data).then((res) => {
              if(res.success) {
                wx.showToast({
                  icon: "success",
                  title: res.msg,
                  duration: 2000
                })
                self.signInStatus = 1
              } else {
                wx.showToast({
                  icon: "none",
                  title: res.msg,
                  duration: 2000
                })
              }
            })
          }
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
    padding: 34rpx 30rpx 170rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

    .active-title {
      font-size: 44rpx;
      line-height: 44rpx;
      color: #000;
      margin-bottom: 4rpx;
    }

    .active-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 32rpx;
      .active-time {
        font-size: 24rpx;
        line-height: 24rpx;
        color: #000;
        margin-right: 26rpx;
      }

      .active-count {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #999;
        display: flex;
        align-items: center;
      }
    }

    .headImg {
      width: 690rpx;
      height: 320rpx;
      border-radius: 10rpx;
      margin: 20rpx auto;
    }

    .timeLine {
      font-size: 24rpx;
      font-weight: 500;
      line-height: 34rpx;
      color: #333;
      margin-bottom: 20rpx;
    }

    .signIn {
      position: fixed;
      bottom: 62rpx;
      left: 46rpx;
      width: 660rpx;
      height: 88rpx;
      background: #EB020E;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
      border-radius: 10rpx;
      text-align: center;
      line-height: 88rpx;
      font-size: 28rpx;
      color: #fff;
      font-weight: 500;
    }
  }
</style>

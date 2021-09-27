<template>
  <div class="home">
    <!-- 门列表 -->
    <div class="door-box">
      <block v-for="(item, index) in doorList" :key="index">
        <div class="door-btn" @click="openDoor(item.code)">
          <span>【{{item.name}}】</span>
          <span style="font-size: 36rpx;font-weight: 500;">立即开门</span>
          <span>{{time}}</span>
        </div>
      </block>
    </div>
    <!-- 开门记录 -->
    <div class="list-box">
      <!-- 列表头部 -->
      <div class="list-title">
        <div class="title-left">远程开门记录</div>
      </div>
      <!-- 列表内容 -->
      <block v-for="(item, index) in list" :key="index">
        <div class="list-content">
          <span>{{item.day}}</span>
          <span>{{item.time}}</span>
          <span>{{item.type}}</span>
        </div>
      </block>
    </div>
    <!-- 开门成功 -->
    <div class="mask" v-if="isOpen" @click="cancleMask()" catchtouchmove='ture'></div>
    <div class="success" v-if="isOpen" @click="cancleMask()">
      <img src="/static/images/successLogo.png">
      <span>开门成功</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        doorList: [],
        time: "",
        list: [],
        isOpen: false,
        setInter: "",
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad() {

    },
    onShow() {
      Object.assign(this.$data, this.$options.data())
      let doorData = {
        current: 1,
        size: 10
      }
      let data = {
        current: 1,
        size: 10
      }
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {
        this.api.getDoorList(doorData).then(res => {
          this.doorList = res.data.records
        })
        this.getList(data)
        let self = this
        this.time = this.until.formatTime(new Date()).substring(0, 16)
        this.setInter = setInterval(function() {
          self.time = self.until.formatTime(new Date()).substring(0, 16)
        }, 60000)
      });
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
      this.getList(data);
      wx.stopPullDownRefresh();
    },

    // 页面隐藏
    onHide() {
      clearInterval(this.setInter)
    },

    // 页面卸载
    onUnload() {
      //清除计时器  即清除setInter
      clearInterval(this.setInter)
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {

      toPage(url) {
        this.until.aHref(url)
      },
      openDoor(code) {
        let self = this
        wx.showLoading({
          title: "开门中"
        });
        this.api.openDoor({
          code: code
        }).then(res => {
          wx.hideLoading();
          let data = {
            current: 1,
            size: 10
          }
          this.list = []
          this.current = 1
          this.getList(data)
          this.isOpen = true
          setTimeout(function() {
            self.isOpen = false
          }, 2000)
        })
      },
      cancleMask() {
        this.isOpen = false
      },
      getList(data) {
        this.api.openDoorList(data).then(res => {
          console.log(res)
          res.data.records.forEach((item) => {
            item.day = item.createTime.substring(0, 10)
            item.time = item.createTime.substring(11, 16)
          })
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../css/common.less");

  .home:after {
    content: '';
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rpx;
    background-color: #e9e9e9;
    z-index: 10001;
  }

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 50rpx 0;

    .door-box {
      padding: 50rpx 60rpx 0;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;

      .door-btn {
        background: url(../../../static/images/openDoor-bg.png) no-repeat;
        background-size: 259rpx 259rpx;
        width: 259rpx;
        height: 259rpx;
        margin-right: 112rpx;
        margin-bottom: 60rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: 24rpx;
        color: #fff;
        font-weight: 400;
      }

      .door-btn:nth-child(2n+0) {
        margin-right: 0;
      }
    }

    .list-box {
      width: 100%;
      background-color: #fff;
      border-radius: 12rpx;

      .list-title {
        padding: 40rpx 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .title-left {
          font-size: 30rpx;
          color: #303030;
          font-weight: bold;
          line-height: 27rpx;
        }

        .title-left:before {
          content: "";
          display: inline-block;
          width: 6rpx;
          height: 27rpx;
          background: #EB020E;
          margin-right: 20rpx;
        }
      }

      .list-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 24rpx;
        font-size: 400;
        color: #606060;
        margin-top: 48rpx;
        padding: 0 56rpx;
        box-sizing: border-box;
      }

      .list-content:last-child {
        padding-bottom: 48rpx;
      }
    }

    .mask {
      position: fixed;
      left: 0px;
      top: 0px;
      background: rgba(0, 0, 0, 0.25);
      width: 100%;
      height: 100%;
      opacity: 1;
      z-Index: 999;
    }

    .success {
      width: 320rpx;
      height: 205rpx;
      background: #fff;
      border-radius: 12rpx;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      font-size: 500;
      color: #303030;

      img {
        width: 45rpx;
        height: 45rpx;
        margin-bottom: 20rpx;
      }
    }
  }
</style>

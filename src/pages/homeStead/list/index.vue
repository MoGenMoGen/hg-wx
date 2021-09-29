<template>
  <div class="home">
    <div class="title">资料列表</div>
    <div class="list-box" v-if="list.length>0">
      <div class="list-item" v-for="(item,index) in list" :key="index">
        <div>
          <img src="/static/images/dataLogo.png" style="margin-right: 20rpx;width: 50rpx;height: 62rpx;">
          <span style="max-width: 340rpx;">{{item.name}}</span>
        </div>
        <div>
          <div class="list-btn"  @click="checkImg(item.img)">
            <img src="/static/images/check.png">
          </div>
          <div class="list-line"></div>
          <div class="list-btn" @click="downLoad(item.attach)">
            <img src="/static/images/downLoad.png" >
          </div>
        </div>
      </div>
    </div>
    <div v-else class="noMOre">
      <img src="/static/images/noStudy.png">
      暂无资料
    </div>
    <div class="bottom-line">
      <span @click="callPhone('15924320810')">国土所:15924320810（赵）</span>
      <span @click="callPhone('15867463440')">九龙湖村:15867463440（沈）</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0,
        type: 1
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.type = options.type
      let data = {
        type: this.type,
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
          type: this.type,
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
        type: this.type,
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
      checkImg(img) {
        let imgList = img.split(",")
        this.until.viewImg(img, imgList)
      },
      downLoad(img) {
        let imgSrc = img
        wx.downloadFile({
          url: imgSrc,
          success: function(res) {
            //图片保存到本地
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function(data) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 1500
                })
              },
              fail: function(err) {
                console.log(err);
                if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                  console.log("当初用户拒绝，再次发起授权")
                  wx.openSetting({
                    success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      } else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })
                }
              },
            })
          }
        })
      },
      callPhone(phone) {
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },
      getList(data) {
        this.api.getResList(data).then(res => {
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
    width: 100vw;
    height: 100vh;
    padding: 30rpx;
    box-sizing: border-box;

    .title {
      width: 100%;
      font-size: 32rpx;
      color: #333333;
      margin: 20rpx auto;
      text-align: center;
    }

    .list-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      padding: 0 40rpx;
      box-sizing: border-box;

      .list-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        color: #333333;
        padding: 40rpx 0;
        border-bottom: 2rpx solid #F4F4F4;

        div {
          display: flex;
          align-items: center;

          img {
            width: 36rpx;
            height: 36rpx;
          }
          .list-btn {
            width: 80rpx;
            height: 80rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .list-line {
            width: 4rpx;
            height: 36rpx;
            background-color: #333333;
            margin: 0 10rpx;
          }
        }
      }
    }

    .noMOre {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #909090;
      font-size: 24rpx;
      margin-top: 40rpx;
      img {
        width: 208rpx;
        height: 129rpx;
        margin-bottom: 40rpx;
      }
    }

    .bottom-line {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 180rpx;
      font-size: 28rpx;
      color: #333333;
    }
  }
</style>

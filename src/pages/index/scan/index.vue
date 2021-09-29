<template>
  <div class="home">
    <div class="top-info">
      <img :src="info.img" mode="aspectFill">
      <span>名称：{{info.name}}</span>
      <span>编号：{{info.code}}</span>
      <span>位置：{{info.address}} 经度：{{info.lng}} 维度：{{info.lat}}</span>
      <span>上报类型：{{reportList[info.type-1].dictValue}}</span>
    </div>
    <div class="submit-box">
      <!-- <div>
        上报类型：
        <div class="picker-box">
          <picker @change="changeReport" :value="reportIndex" :range="reportList" range-key="dictValue" class='pickerClass'>
            <view>
              {{reportList[reportIndex].dictValue}}
            </view>
          </picker>
          <img src="/static/images/arrowDownG.png">
        </div>
      </div> -->
      <div>
        上报内容：
        <textarea placeholder="请输入提问内容" v-model="reportContent"></textarea>
      </div>
      <div>现场拍照：<add-img @upData="updateImg" ref="addImg"></add-img></div>
      <div class="submit-btn" @click="submit">确认</div>
    </div>
    <div class="moreReport" @click="toPage('/pages/personal/report/main')">查看上报记录 <img src="/static/images/arrowR.png"></div>
  </div>
</template>

<script>
  // 引入SDK核心类
  import QQMapWX from '@/utils/libs/qqmap-wx-jssdk.js'

  // 实例化API核心类
  var qqmapsdk = new QQMapWX({
      key: 'WJ6BZ-PBFC6-A6LSY-EQIRT-VUC57-4BBA4' // 必填
  });
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        info: {},
        reportList:[],
        imgList: [],
        reportContent: '',
        id: ''
      }
    },
    components: {
      addImg
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.verifyToken().then(() => {

      })
      // this.id = options.id
      this.id = decodeURIComponent(options.scene).split("=")[1]
      this.api.getScanCode({id:this.id}).then(res => {
        this.info = res.data
      })
      this.api.getDataList('reportType').then(res => {
        this.reportList = res
      })
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
      updateImg(img){
        this.imgList = img
      },
      submit() {
        if(this.reportContent=="") {
          wx.showToast({
            title: '请输入提问内容',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.imgList.length==0) {
          wx.showToast({
            title: '请选择图片',
            icon: 'none',
            duration: 1500
          })
          return
        }
        qqmapsdk.reverseGeocoder({
          success:res => {
            console.log(res.result.formatted_addresses.recommend)
            let data = {
              resId: this.id,
              img: this.imgList.join(","),
              cont: this.reportContent,
            }
            this.api.reportAdd(data).then(res => {
              if(res.code==200){
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 1500
                })
                this.toPage('/pages/personal/reportInfo/main?id='+res.data.id)
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
    padding: 20rpx;
    box-sizing: border-box;
    .top-info {
      width: 710rpx;
      background-color: #fff;
      padding: 40rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-size: 24rpx;
      color: #303030;
      margin-bottom: 20rpx;
      img {
        width: 630rpx;
        height: 352rpx;
        border-radius: 10rpx;
        margin-bottom: 30rpx;
      }
    }
    .submit-box {
      width: 710rpx;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      font-size: 28rpx;
      color: #303030;
      div {
        display: flex;
        margin-bottom: 40rpx;
        .picker-box {
          width: 506rpx;
          height: 80rpx;
          border: 2rpx solid #CFCFCF;
          border-radius: 10rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24rpx 30rpx;
          box-sizing: border-box;
          color: #303030;
          font-size: 24rpx;
          .pickerClass {
            flex: 1;
          }
          img {
            width: 18rpx;
            height: 11rpx;
            flex-shrink: 1;
          }
        }
        textarea {
          width: 506rpx;
          height: 233rpx;
          border-radius: 10rpx;
          border: 1px solid #CFCFCF;
          color: #303030;
          font-size: 24rpx;
          padding: 30rpx 28rpx;
          box-sizing: border-box;
        }
      }
      .submit-btn {
        width: 506rpx;
        height: 80rpx;
        font-size: 30rpx;
        color: #fff;
        background-color: #EC2C17;
        border-radius: 40rpx;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .moreReport {
      width: 710rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      color: #909090;
      margin: 60rpx auto;
      img {
        width: 12rpx;
        height: 22rpx;
        margin-left: 10rpx;
      }
    }
  }
</style>

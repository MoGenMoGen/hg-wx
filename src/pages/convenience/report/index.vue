<template>
  <div class="home">
    <div class="info-box">
      <span>项目名称：{{info.name}}</span>
      <span>工程规模及造价：{{info.fund}}</span>
      <span>造价进度：{{statusType[info.status]}}</span>
    </div>
    <div class="title">上报内容</div>
    <div class="submit-box">
      <textarea placeholder="请填写上报内容" placeholder-class="gray" v-model="content"></textarea>
      <add-img @upData="updateImg" ref="addImg"></add-img>
    </div>
    <div class="btn-class">
      <div @click="toBack()">取消</div>
      <div @click="submit">上报</div>
    </div>
  </div>
</template>

<script>
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        info: {},
        statusType: ['未开始','进行中','已结束'],
        content: '',
        imgList: [],
        id: ''
      }
    },
    components: {
      addImg
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.api.getProjectDetail({id:options.id}).then(res => {
        this.info = res
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
      toBack(url) {
        this.until.back()
      },
      updateImg(img){
        this.imgList = img
      },
      submit() {
        if(this.content=="") {
          wx.showToast({
            title: '请输入上报内容',
            icon: 'none',
            duration: 1500
          })
        }
        let data = {
          userId: wx.getStorageSync('loginInfo').id,
          projectId: this.id,
          img: this.imgList.join(","),
          cont: this.content
        }
        this.api.reportProject(data).then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 1500
          })
          setTimeout(()=>{
            this.toBack()
          },1500)
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
    box-sizing: border-box;
    .info-box {
      width: 690rpx;
      display: flex;
      flex-direction: column;
      font-size: 28rpx;
      color: #333333;
      padding: 0 30rpx;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 20rpx;
      margin: 30rpx auto;
      span {
        padding: 20rpx 0;
        border-bottom: 1px solid #D0CED8;
      }
      span:last-child {
        border-bottom: none;
      }
    }
    .title {
      width: 100%;
      padding-left: 50rpx;
      box-sizing: border-box;
      font-size: 32rpx;
      color: #333333;
      margin-top: 40rpx;
      font-weight: 600;
    }
    .submit-box {
      background-color: #fff;
      padding: 40rpx;
      width: 690rpx;
      box-sizing: border-box;
      margin: 30rpx auto;
      border-radius: 20rpx;
      textarea {
        height: 200rpx;
      }
    }
    .btn-class {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      margin: 40rpx auto;
      div {
        width: 214rpx;
        height: 64rpx;
        color: #599BFF;
        font-size: 24rpx;
        border-radius: 60rpx;
        border: 1px solid #599BFF;
        line-height: 64rpx;
        text-align: center;
      }
      div:last-child {
        margin-left: 80rpx;
        background-color: #599BFF;
        color: #fff;
      }
    }
  }
</style>

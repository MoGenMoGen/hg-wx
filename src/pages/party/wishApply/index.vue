<template>
  <div class="home">
    <div class="submit-box">
      <span>心愿标题：</span>
      <input type="text" placeholder="请输入心愿标题" v-model="info.title"/>
      <span>基本情况：</span>
      <input type="text" placeholder="请输入申请人基本情况" v-model="info.cont"/>
      <span>图片上传：</span>
      <add-img @upData="updateImg" ref="addImg"></add-img>
      <span>许愿人：</span>
      <input type="text" placeholder="请输入许愿人姓名" v-model="info.wishName"/>
      <span>联系电话：</span>
      <input type="number" maxlength="11" placeholder="请输入联系方式" v-model="info.wishMob"/>
      <div class="submit-btn">
        <span @click="toBack">取消</span>
        <span @click="submit">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        status: 1,
        imgList: [],
        info: {
          title: '',
          cont: '',
          wishName: '',
          wishMob: ''
        }
      }
    },
    components: {
      addImg
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())

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
      toBack(){
        this.until.back()
      },
      submit() {
        if(this.info.title==""){
          wx.showToast({
            title: '请输入心愿标题',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.info.cont==""){
          wx.showToast({
            title: '请输入基本情况',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.info.wishName==""){
          wx.showToast({
            title: '请输入许愿人',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if (this.reg.checkPhone(this.info.wishMob) != 'ok') {
          return wx.showToast({
            title: this.reg.checkPhone(this.info.wishMob),
            icon: 'none',
            duration: 1500
          })
        }
        this.info.img = this.imgList.join(",")
        this.api.wishApply(this.info).then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
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
    padding: 20rpx;
    box-sizing: border-box;
    .submit-box {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 30rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      input {
        width: 100%;
        height: 65rpx;
        font-size: 24rpx;
        padding: 0 21rpx;
        box-sizing: border-box;
        margin-top: 20rpx;
        margin-bottom: 40rpx;
        border: 1px solid #CFCFCF;
        border-radius: 10rpx;
      }
      .submit-btn {
        width: 580rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        span {
          width: 214rpx;
          height: 65rpx;
          line-height: 65rpx;
          text-align: center;
          font-size: 30rpx;
          color: #EC2C17;
          border: 1px solid #EC2C17;
          border-radius: 40rpx;
        }
        span:last-child {
          color: #fff;
          background-color: #EC2C17;
        }
      }
    }
  }
</style>

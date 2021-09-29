<template>
  <div class="home">
    <div class="info-box">
      <img class="top-bg" src="/static/images/wxy-Bg.png" mode="widthFix">
      <span>心愿标题：{{info.title}}</span>
      <span>基本情况：{{info.cont}}</span>
      <span>许愿人：{{info.wishName}}</span>
      <span>联系电话：{{info.wishMob}}</span>
      <span>申请日期：{{info.createTime}}</span>
      <span>状态：{{info.status==1?'已点亮':'未点亮'}}</span>
      <img :src="item" mode="aspectFill" v-for="(item,index) in info.img" :key="index">
    </div>
    <block v-if="personType==0||personType==3">
      <div class="info-box" v-if="info.status==1">
        <span>认领人：{{info.name}}</span>
        <span>联系方式：{{info.mob}}</span>
      </div>
    </block>
    <div class="mask" catchtouchmove='ture' v-if="isSubmit"></div>
    <div class="submit-box" v-if="isSubmit">
      <span>认领人：</span>
      <input type="text" placeholder="请输入认领人姓名" v-model="name"/>
      <span>联系电话：</span>
      <input type="number" maxlength="11" placeholder="请输入联系方式" v-model="phone"/>
      <div class="submit-btn">
        <span @click="isSubmit=false">取消</span>
        <span @click="submit">提交</span>
      </div>
    </div>
    <div class="common-btn" @click="isSubmit=true" v-if="info.status==0">点亮</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        isSubmit: false,
        personType: '',
        id: '',
        name: '',
        phone: ''
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.personType = wx.getStorageSync('loginInfo').personType
      this.id = options.id
      this.api.getWishDetail({id:options.id}).then(res => {
        res.createTime = res.createTime.substring(0,10)
        res.img = res.img.split(",")
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
      submit() {
        if(this.name==""){
          wx.showToast({
            title: '请输入认领人',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if (this.reg.checkPhone(this.phone) != 'ok') {
          return wx.showToast({
            title: this.reg.checkPhone(this.phone),
            icon: 'none',
            duration: 1500
          })
        }
        let data = {
          id: this.id,
          name: this.name,
          mob: this.phone
        }
        this.api.wishLight(data).then(res=>{
          this.api.getWishDetail({id:this.id}).then(res => {
            this.isSubmit = false
            res.createTime = res.createTime.substring(0,10)
            res.img = res.img.split(",")
            this.info = res
          })
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
    .info-box {
      width: 710rpx;
      padding: 40rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      color: #303030;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      margin: 20rpx auto;
      border-radius: 10rpx;
      position: relative;
      span {
        margin-bottom: 30rpx;
        z-index: 1;
      }
      img {
        width: 156rpx;
        height: 156rpx;
      }
      .top-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 710rpx;
        z-index: 0;
      }
    }
    .mask {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      background-color: rgba(0,0,0,0.5);
    }
    .submit-box {
      width: 570rpx;
      height: 500rpx;
      padding: 50rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: fixed;
      border-radius: 5rpx;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      font-size: 28rpx;
      color: #303030;
      background-color: #fff;
      z-index: 101;
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
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
    .common-btn {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      background-color: #EC2C17;
      color: #fff;
      line-height: 150rpx;
      text-align: center;
      font-size: 28rpx;
      margin: 40rpx auto;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.16);
    }
  }
</style>

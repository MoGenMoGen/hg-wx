<template>
  <div class="home">
    <div class="box">
      <img src="/static/images/logo.png" class="logo">
      <div class="item">
        <img src="/static/images/userName.png">
        <input type="number" placeholder="请输入手机号码" maxlength="11" placeholder-style="color:#C8C9CB;" v-model="phone">
      </div>
      <div class="item">
        <img src="/static/images/password.png">
        <input type="password" placeholder="请输入密码" placeholder-style="color:#C8C9CB;" v-model="password">
      </div>
      <button class="btn" @click="login">登录</button>
      <div style="margin-top: 30rpx;color: #EC2C17;display: flex;justify-content: space-between;width: 100%;">
        <span>忘记密码</span>
        <span @click="toPage('/pages/register/index/main')">新用户注册</span>
      </div>
      <div @click="gotoPage()" style="margin-top: 60rpx;">游客方式登录 ></div>
    </div>
  </div>
</template>

<script>
  import {md5} from '../../../utils/md5.js'
  export default {
    data() {
      return {
        phone: '',
        password: ''
      }
    },
    components: {

    },
    async onLoad() {
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
      gotoPage(url) {
        wx.showModal({
          title: '提示',
          content: '是否确认以游客身份登录',
          success:res=> {
            if(res.confirm){
              wx.login({
                success:resp=>{
                  // console.log(resp)
                  this.api.visitLogin({code:resp.code}).then(respon=>{
                    wx.switchTab({
                      url: '/pages/index/index/main'
                    })
                  })
                }
              })
            }
          }
        })
      },
      toPage(url) {
        this.until.aHref(url)
      },
      login() {
        if (this.reg.checkPhone(this.phone) != 'ok') {
          return wx.showToast({
            title: this.reg.checkPhone(this.phone),
            icon: 'none',
            duration: 1500
          })
        }
        if (this.password == "") {
          wx.showToast({
            title: '请输入密码',
            icon: 'none',
            duration: 1500
          })
          return
        }
        wx.getUserProfile({
          desc: '用于完善个人资料',
          success:(res)=> {
            wx.login({
              success:(loginRes) =>{
                let data = {
                  "tenantId": "000000",
                  "username": this.phone,
                  "password":  md5(this.password),
                  "grant_type": "password"
                }
                this.api.loginInput(data).then(res => {
                  wx.switchTab({
                    url: '/pages/index/index/main'
                  })
                })
              }
            })
          },
          fail:(err)=> {
            wx.login({
              success:(loginRes) =>{
                let data = {
                  "tenantId": "000000",
                  "username": this.phone,
                  "password":  md5(this.password),
                  "grant_type": "password"
                }
                this.api.loginInput(data).then(res => {
                  wx.switchTab({
                    url: '/pages/index/index/main'
                  })
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
    width: 100vw;
    height: 100vh;
    padding: 20rpx 30rpx;
    box-sizing: border-box;

    .box {
      width: 100%;
      height: 100%;
      padding: 50rpx 60rpx;
      background-color: #fff;
      border-radius: 10rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;

      .logo {
        width: 189rpx;
        height: 189rpx;
        margin-bottom: 35rpx;
      }

      .item {
        width: 570rpx;
        padding: 50rpx 25rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;

        img {
          width: 25rpx;
          height: 25rpx;
          margin-right: 30rpx;
          flex-shrink: 1;
        }

        input {
          flex: 1;
          font-size: 24rpx;
          font-weight: 500;
          color: #000;
        }
      }

      .btn {
        width: 570rpx;
        height: 70rpx;
        background-color: #EC2C17;
        border-radius: 35rpx;
        line-height: 70rpx;
        text-align: center;
        font-size: 30rpx;
        color: #fff;
        font-weight: 500;
        margin-top: 130rpx;
      }
    }
  }
</style>

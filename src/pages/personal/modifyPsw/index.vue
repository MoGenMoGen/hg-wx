<template>
  <div class="home">
    <div class="box">
      <div class="item">
        <img src="/static/images/password.png">
        <input type="password" placeholder="请输入原始密码" placeholder-style="color:#C8C9CB;" v-model="originalPassword">
      </div>
      <div class="item">
        <img src="/static/images/password.png">
        <input type="password" placeholder="请输入最新密码" placeholder-style="color:#C8C9CB;" v-model="password">
      </div>
      <div class="item">
        <img src="/static/images/password.png">
        <input type="password" placeholder="请再次输入最新密码" placeholder-style="color:#C8C9CB;" v-model="confirmPassword">
      </div>
      <div class="btn" @click="update">确认</div>
    </div>
  </div>
</template>

<script>
  import {md5} from '../../../utils/md5.js'
  export default {
    data() {
      return {
        originalPassword: '',
        password: '',
        confirmPassword: ''
      }
    },
    components: {

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
      update() {
        if(this.originalPassword=="") {
          wx.showToast({
            title: '请输入原始密码',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.password=="") {
          wx.showToast({
            title: '请输入最新密码',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.password!==this.confirmPassword) {
          wx.showToast({
            title: '确认密码不一致',
            icon: 'none',
            duration: 1500
          })
          return
        }
        let data = {
          oldPassword: md5(this.originalPassword),
          newPassword: md5(this.password),
          newPassword1: md5(this.confirmPassword)
        }
        this.api.updatePas(data).then(res => {
          this.until.back()
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
      padding: 0 60rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 10rpx;

      .item {
        width: 570rpx;
        padding: 50rpx 25rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;

        img {
          width: 21rpx;
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

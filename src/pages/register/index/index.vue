<template>
  <div class="home">
    <div class="box">
      <img src="/static/images/logo.png" class="logo">
      <div class="item">
        <img src="/static/images/realName.png">
        <input type="text" placeholder="请输入姓名" placeholder-style="color:#C8C9CB;" v-model="name">
      </div>
      <!-- <div class="item">
        <img src="/static/images/idcard.png">
        <input type="idcard" placeholder="请输入身份证号码" maxlength="18" placeholder-style="color:#C8C9CB;" v-model="idCard">
      </div> -->
      <div class="item">
        <img src="/static/images/mob.png">
        <input type="number" placeholder="请输入手机号码" maxlength="11" placeholder-style="color:#C8C9CB;" v-model="phone">
      </div>
      <div class="item" style="padding: 30rpx 25rpx;">
        <img src="/static/images/checkCode.png">
        <input type="text" placeholder="请输入验证码" placeholder-style="color:#C8C9CB;" v-model="checkCode">
        <div class="check-code" @click="getCode" v-if="!isGet">获取验证码</div>
        <div class="check-code unClick" v-if="isGet">{{countdown}}s</div>
      </div>
      <div class="item">
        <img src="/static/images/password2.png">
        <input type="password" placeholder="请输入密码" placeholder-style="color:#C8C9CB;" v-model="password">
      </div>
      <div class="item">
        <img src="/static/images/password2.png">
        <input type="password" placeholder="请再次输入密码" placeholder-style="color:#C8C9CB;" v-model="confirmPassword">
      </div>
      <!-- <div class="item" style="padding: 44rpx 25rpx;">
        <img src="/static/images/party.png">
        <span style="color: #303030;margin-right: 86rpx;">是否党员</span>
        <div class="select-box">
          <div v-for="(item,index) in isParty" :key="index" class="select-item" @click="select(index)">
            <img :src="item.isChecked?'/static/images/selected.png':'/static/images/unSelected.png'">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div> -->
      <button class="btn" @click="register">确认</button>
    </div>
  </div>
</template>

<script>
  import {md5} from '../../../utils/md5.js'
  export default {
    data() {
      return {
        name: "",
        idCard: '',
        phone: '',
        checkCode: '',
        password: '',
        confirmPassword: '',
        isParty: [{
          isChecked: false,
          name: '是',
          value: 1
        }, {
          isChecked: false,
          name: '否',
          value: 2
        }],
        partMember: 0,
        isGet: false,
        countdown: 60,
        interval: "",
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

    onHide() {
      clearInterval(this.interval)
    },
    onUnload() {
      clearInterval(this.interval)
    },

    methods: {
      getCode() {
        let that = this
        if (this.reg.checkPhone(this.phone) != 'ok') {
          return wx.showToast({
            title: this.reg.checkPhone(this.phone),
            icon: 'none',
            duration: 1500,
          })
        } else if (!this.isGet) {
          let data = {
            mob: this.phone
          }
          this.api.getPhoneCode(data).then(res => {
          })
          this.isGet = true
          this.interval = setInterval(function() {
            if (that.countdown == 0) {
              that.isGet = false
              that.countdown = 60
              return
            } else {
              that.countdown--
            }
          }, 1000)
        }
      },
      toPage(url) {
        this.until.aHref(url)
      },
      select(index) {
        this.isParty.forEach(item => {
          item.isChecked = false
        })
        this.isParty[index].isChecked = true
        this.partMember = this.isParty[index].value
      },
      register(e){
        if(this.name==""){
          wx.showToast({
            title: '请输入姓名',
            icon: 'none',
            duration: 1500
          })
          return
        }
        // if (this.reg.isIdCard(this.idCard) != 'ok') {
        //   return wx.showToast({
        //     title: this.reg.isIdCard(this.idCard),
        //     icon: 'none',
        //     duration: 1500
        //   })
        // }
        if (this.reg.checkPhone(this.phone) != 'ok') {
          return wx.showToast({
            title: this.reg.checkPhone(this.phone),
            icon: 'none',
            duration: 1500
          })
        }
        if(this.checkCode==""){
          wx.showToast({
            title: '请输入验证码',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.password==""){
          wx.showToast({
            title: '请输入密码',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.password.length<6) {
          wx.showToast({
            title: '密码须大于6位',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.password!==this.confirmPassword) {
          wx.showToast({
            title: '密码不一致',
            icon: 'none',
            duration: 1500
          })
          return
        }
        // if(this.partMember==0){
        //   wx.showToast({
        //     title: '请选择是否党员',
        //     icon: 'none',
        //     duration: 1500
        //   })
        //   return
        // }
        wx.getUserProfile({
          desc: '用于完善个人资料',
          success:(res)=> {
            wx.login({
              success:(loginRes) =>{
                let data = {
                  code: loginRes.code,
                  realName: this.name,
                  // idCard: this.idCard,
                  username: this.phone,
                  avatar: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
                  password: md5(this.password),
                  partMember: this.partMember,
                  msgCode: this.checkCode
                }
                this.api.register(data).then(res=> {
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
                  code: loginRes.code,
                  realName: this.name,
                  // idCard: this.idCard,
                  username: this.phone,
                  password: md5(this.password),
                  partMember: this.partMember,
                  msgCode: this.checkCode
                }
                this.api.register(data).then(res=> {
                  wx.switchTab({
                    url: '/pages/index/index/main'
                  })
                })
              }
            })
          }
        })

      }
    },
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
        padding: 40rpx 25rpx;
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

        .check-code {
          width: 180rpx;
          height: 60rpx;
          background-color: #EC2C17;
          line-height: 60rpx;
          color: #fff;
          text-align: center;
          font-size: 24rpx;
          font-weight: 500;
          border-radius: 30rpx;
        }

        .unClick {
          background-color: #C8C9CB;
        }

        .select-box {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex: 1;
          font-size: 24rpx;
          font-weight: 500;
          color: #303030;

          .select-item {
            display: flex;
            align-items: center;

            img {
              width: 36rpx;
              height: 36rpx;
              margin-right: 15rpx;
            }
          }
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
        margin-top: 85rpx;
      }
    }
  }
</style>

<template>
  <div class="home">
    <!-- 头像 -->
    <div class="avatar">
      <img :src="info.avatar" alt="">
      <img src="/static/images/partyEmblem.png" class="partyClass" v-if="info.politic == 3">
    </div>
    <!-- 输入内容 -->
    <div class="form-box">
      <div>
        <span>联系邮箱：</span>
        <input type="text" placeholder="请输入" placeholder-class="placeClass" :value="info.email" @input="getEmail($event)">
      </div>
      <div>
        <span>能人类型：</span>
        <picker class="pickerClass" @change="bindPickerChange($event)" :value="index" :range="capableType">{{capableType[index]}}</picker>
        <img src="/static/images/arrowDown.png" mode="widthFix">
      </div>
      <div>
        <span>特长技能：</span>
        <input type="text" placeholder="请输入" placeholder-class="placeClass" :value="ability" @input="getAbility($event)">
      </div>
    </div>
    <!-- 提交 -->
    <div class="confirm-box" @click="apply()">确认申请</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        capableType: ['服务', '公益', '互助'],
        index: 0,
        ability: ""
      }
    },
    components: {

    },
    async onLoad() {
      this.api.verifyToken().then(() => {
        this.getInfo()
      });
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },
    //解底事件
    onReachBottom() {

    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      async getInfo() {
        this.info = await this.api.userInfo()
      },
      toPage(url) {
        this.until.aHref(url)
      },
      bindPickerChange(e) {
        this.index = e.mp.detail.value
      },
      getEmail(e) {
        this.info.email = e.mp.detail.value
      },
      getAbility(e) {
        this.ability = e.mp.detail.value
      },
      apply() {
        if(this.reg.checkMail(this.info.email)!='ok') {
          return wx.showToast({
            title: this.reg.checkMail(this.info.email),
            icon: 'none',
            duration: 2000
          })
        }
        if(!this.ability) {
          wx.showToast({
            title: '请输入能力',
            icon: "none",
            duration: 2000
          })
          return
        }
        let data = {
          ability: this.ability,
          email: this.info.email,
          type: Number(this.index) + 1
        }
        this.api.capableApply(data).then(res => {
          this.until.back()
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
    padding: 20rpx 0;
    box-sizing: border-box;

    .avatar {
      width: 100%;
      background-color: #fff;
      padding: 50rpx 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 12rpx;

      img {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }

      .partyClass {
        position: absolute;
        content: "";
        width: 37rpx;
        height: 37rpx;
        bottom: 44rpx;
        right: 318rpx;
      }
    }

    .form-box {
      width: 100%;
      margin-top: 20rpx;
      border-radius: 12rpx;
      background-color: #fff;

      div {
        padding: 30rpx 36rpx;
        display: flex;
        align-items: center;
        font-size: 24rpx;
        font-weight: bold;
        color: #303030;
        line-height: 24rpx;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        input {
          margin-left: 60rpx;
          flex: auto;
        }

        .placeClass {
          color: #909090;
          font-weight: 500;
          font-weight: 22rpx;
        }

        .pickerClass {
          margin-left: 60rpx;
          font-weight: normal;
          height: 42rpx;
          line-height: 42rpx;
          flex: auto;
        }

        img {
          width: 40rpx;
        }
      }

      div:last-child {
        border-bottom: none;
      }
    }

    .confirm-box {
      width: 570rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      background-color: #EB020E;
      position: fixed;
      left: 90rpx;
      bottom: 30rpx;
      border-radius: 35rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: #fff;
    }
  }
</style>

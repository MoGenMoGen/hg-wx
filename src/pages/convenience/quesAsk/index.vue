<template>
  <div class="home">
    <div class="submit-box">
      <textarea placeholder="请输入提问内容" placeholder-class="gray" v-model="content"></textarea>
      <!-- <add-img @upData="updateImg" ref="addImg"></add-img> -->
    </div>
    <div class="btn-class" @click="submit()">提交</div>
  </div>
</template>

<script>
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        content: ''
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
    onReachBottom() {},

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      submit() {
        if (this.content == "") {
          wx.showToast({
            title: '请输入提问内容',
            icon: 'none',
            duration: 1500
          })
          return
        }
        let data = {
          pid: 0,
          userId: wx.getStorageSync('loginInfo').id,
          cont: this.content
        }
        this.api.addQuestion(data).then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500
          })
          setTimeout(() => {
            this.until.back()
          }, 1500)
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

    .submit-box {
      background-color: #fff;
      padding: 40rpx;
      width: 100%;
      box-sizing: border-box;
    }

    .btn-class {
      width: 330rpx;
      height: 100rpx;
      border-radius: 60rpx;
      background-color: #599BFF;
      color: #fff;
      line-height: 100rpx;
      text-align: center;
      font-size: 28rpx;
      margin: 40rpx auto;
      box-shadow: 0 6rpx 12rpx rgba(38, 148, 248, 0.22);
    }
  }
</style>

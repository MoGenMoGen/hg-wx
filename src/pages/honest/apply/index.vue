<template>
  <div class="home">
    <div class="submit-box">
      <div class="submit-input">
        <span>标题</span>
        <input type="text" placeholder="请输入发起标题内容" v-model="title"/>
      </div>
      <textarea placeholder="请填写发起内容" placeholder-class="gray" v-model="content"></textarea>
      <add-img @upData="updateImg" ref="addImg"></add-img>
    </div>
    <div class="btn-class">
      <div @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        title: '',
        content: '',
        imgList: [],
        type: 0, //1村民说事发起，2民意体检，3公共说事
      }
    },
    components: {
      addImg
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.type = options.type
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
        if(this.title=="") {
          wx.showToast({
            title: '请输入标题',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.content=="") {
          wx.showToast({
            title: '请输入发起内容',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.imgList.length==0) {
          wx.showToast({
            title: '请上传图片',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(this.type == 1) {
          let data = {
            type: 0,
            name: this.title,
            theme: this.content,
            img: this.imgList.join(",")
          }
          this.api.addSay(data).then(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            })
            setTimeout(()=>{
              this.until.back()
            },1500)
          })
        } else if (this.type==2) {
          let data = {
            name: this.title,
            eventHandle: this.content,
            img: this.imgList.join(",")
          }
          this.api.addOpinion(data).then(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            })
            setTimeout(()=>{
              this.until.back()
            },1500)
          })
        } else if(this.type==3){
          let data = {
            type: 1,
            name: this.title,
            theme: this.content,
            img: this.imgList.join(",")
          }
          this.api.addSay(data).then(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            })
            setTimeout(()=>{
              this.until.back()
            },1500)
          })
        }
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
      width: 690rpx;
      box-sizing: border-box;
      margin: 30rpx auto;
      border-radius: 20rpx;
      .submit-input {
        border-bottom: 2rpx solid #F1F3F2;
        font-size: 28rpx;
        display: flex;
        align-items: center;
        padding: 30rpx 0;
        span {
          padding-right: 30rpx;
          border-right: 2rpx solid #F1F3F2;
          color: #2694F8;
        }
        input {
          flex: 1;
          padding-left: 30rpx;
          box-sizing: border-box;
        }
      }
      textarea {
        margin: 10rpx 0;
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
        background-color: #599BFF;
        color: #fff;
        font-size: 24rpx;
        border-radius: 60rpx;
        line-height: 64rpx;
        text-align: center;
      }
    }
  }
</style>

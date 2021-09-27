<template>
  <div class="home">
    <div class="areatext">
      <div class="title">
        <span>标题</span>
        <input type="text" placeholder="请输入活动标题标题" placeholder-class="gray" @input="getTitle">
      </div>
      <my-editor @updata="updataEditor"></my-editor>
      <div class="place"></div>
      <add-img @upData="updateImg" ref="addImg"></add-img>
    </div>
    <div class="timePick">
      <div class="time-line">
        <span>活动开始时间</span>
        <picker class="time-pick" mode="date" :start="start" :value="startDate" @change="startDateChange">{{startDate?startDate:'请选择开始日期'}}</picker>
        <picker class="time-pick" mode="time" :value="startTime" @change="startTimeChange">{{startTime?startTime:'请选择开始时间'}}</picker>
        <img src="/static/images/timeLogo.png">
      </div>
      <div class="time-line">
        <span>活动结束时间</span>
        <picker class="time-pick" mode="date" :start="start" :value="endDate" @change="endDateChange">{{endDate?endDate:'请选择结束日期'}}</picker>
        <picker class="time-pick" mode="time" :value="endTime" @change="endTimeChange">{{endTime?endTime:'请选择结束时间'}}</picker>
        <img src="/static/images/timeLogo.png">
      </div>
    </div>
    <div class="btn">
      <button @click="toCancel">取消</button>
      <button @click="toSubmit">确认</button>
    </div>
  </div>
</template>

<script>
  import addr from '../../../../static/images/addr.png'
  import tel from '../../../../static/images/tel.png'
  import user from '../../../../static/images/user.png'

  import addImg from '@/components/addImg'
  import myEditor from '@/components/myEditor'
  export default {
    data() {
      return {
        start:'',
        addr,
        tel,
        user,
        imgList: [],
        form: {},
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        title: "",
        content: ""
      }
    },
    components: {
      addImg,
      myEditor
    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      // let curDate = new Date()
      // this.startDate = this.until.formatTime(new Date(curDate.getTime() + 24 * 60 * 60 * 1000)).substring(0, 10)
      // this.startTime = this.until.formatTime(new Date(curDate.getTime() + 24 * 60 * 60 * 1000)).substring(11, 16)
      // this.endDate = this.until.formatTime(new Date(curDate.getTime() + 48 * 60 * 60 * 1000)).substring(0, 10)
      // this.endTime = this.until.formatTime(new Date(curDate.getTime() + 48 * 60 * 60 * 1000)).substring(11, 16)
      // let time = this.formatDate()
      // this.start = this.startDate

      // this.start = this.formatDate().year + '-' + this.formatDate().month + '-' + this.formatDate().day
      // console.log(this.start)
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {

      });
    },
    onShow() {

    },

    methods: {
      getTitle(e) {
        this.title = e.mp.detail.value
      },
      updataEditor(content) {
        this.content = content
      },
      toSubmit() {
        let activeStartTime = ''
        let activeEndTime = ''
        if(this.startDate&&this.startTime) {
          activeStartTime = this.startDate + ' ' + this.startTime + ':00'
        }
        if(this.endDate&&this.endTime) {
          activeEndTime = this.endDate + ' ' + this.endTime + ':00'
        }
        console.log('1',activeStartTime,'2', activeEndTime)
        if (!this.title) {
          wx.showToast({
            title: "请输入标题",
            icon: "none",
            duration: 2000
          })
          return
        }
        if (!this.content) {
          wx.showToast({
            title: "请输入内容",
            icon: "none",
            duration: 2000
          })
          return
        }
        if (this.imgList.length == 0) {
          wx.showToast({
            title: "请选择图片",
            icon: "none",
            duration: 2000
          })
          return
        }
        if(activeStartTime&&activeEndTime) {
          if ((new Date(activeStartTime)).getTime() < (new Date()).getTime()) {
            wx.showToast({
              title: "开始时间错误",
              icon: "none",
              duration: 2000
            })
            return
          }
          if ((new Date(activeEndTime)).getTime() < (new Date(activeStartTime)).getTime()) {
            wx.showToast({
              title: "结束时间错误",
              icon: "none",
              duration: 2000
            })
            return
          }
        }
        let data = {
          title: this.title,
          startTime: activeStartTime,
          endTime: activeEndTime,
          content: this.content,
          img: this.imgList.toString(),
        }
        this.api.activeLaunch(data).then((res) => {
          this.until.aHrefRedirectTo('/pages/personal/detail/main?activeId=1&id=' + res.data.id)
        })
      },
      toCancel() {
        this.until.back()
      },
      toPage(url) {
        this.until.aHrefRedirectTo(url)
      },
      updateImg(img) {
        this.imgList = img
      },
      startDateChange(e) {
        this.startDate = e.mp.detail.value
      },
      startTimeChange(e) {
        this.startTime = e.mp.detail.value
      },
      endDateChange(e) {
        this.endDate = e.mp.detail.value
      },
      endTimeChange(e) {
        this.endTime = e.mp.detail.value
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
    border-top: 1px solid #F1F3F2;

    /deep/.gray {
      color: #CBCBCB;
    }

    .areatext {
      background: #ffffff;
      border-radius: 0 0 14rpx 14rpx;
      padding-left: 40rpx;
      padding-bottom: 40rpx;
      padding-right: 40rpx;
      box-sizing: border-box;

      .title {
        padding: 30rpx 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #F1F3F2;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;

        span {
          color: #EB020E;
          margin-right: 60rpx;
          position: relative;
        }

        span:after {
          content: "";
          width: 1px;
          height: 40rpx;
          background-color: #CBCBCB;
          position: absolute;
          right: -30rpx;
        }

        input {
          width: 500rpx;
        }
      }

      .place {
        width: 100%;
        height: 20rpx;
      }
    }

    .timePick {
      margin-top: 40rpx;
      padding-left: 32rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;

      .time-line {
        display: flex;
        align-items: center;
        padding: 30rpx 36rpx 30rpx 0;
        box-sizing: border-box;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #333333;
        border-bottom: 1px solid #F1F3F2;

        span {
          margin-right: 40rpx;
          position: relative;
        }

        span:after {
          content: "";
          width: 1px;
          height: 40rpx;
          background-color: #CBCBCB;
          position: absolute;
          right: -20rpx;
        }

        .time-pick {
          // width: 200rpx;
          margin-right: 15rpx;
        }

        img {
          width: 44rpx;
          height: 44rpx;
          margin-left: auto;
        }
      }
    }

    .btn {
      background: none;
      width: 100vw;
      margin: 90rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 0;

      button {
        width: 45vw;
        background: @color;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 28rpx;
        color: #ffffff;
        border-radius: 14rpx;

        &:first-of-type {
          background: #FFFFFF;
          box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.05);
          color: #303030;
        }

        &:last-of-type {
          box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.1);
        }
      }
    }
  }
</style>

<template>
  <div class="home">
    <div class="list-box">
      <div class="list-img">
        <img :src="info.img" mode="aspectFill">
        <img src="/static/images/dh.png" class="partyClass">
      </div>
      <div class="list-info">
        <span class="list-item">姓名：{{info.name}}</span>
        <span class="list-item">性别：{{info.sex}}</span>
        <span class="list-item">年龄：{{info.age}}</span>
        <span class="list-item">文化程度：{{info.education}}</span>
        <span class="list-item">工作单位：{{info.unit}}</span>
        <span class="list-item">联系方式：{{info.mob}}</span>
        <span class="list-item">入党时间：{{info.joinTime}}</span>
        <span class="list-item">党内职务：{{info.post}}</span>
        <span class="list-item">所属党支部：{{info.deptNm}}</span>
        <span class="list-item">党员评级：{{info.grade}}</span>
      </div>
    </div>
    <div class="profile">
      <div class="profile-title">学习内容</div>
      <div v-html="studyInfo" v-if="studyOver"></div>
      <textarea v-if="!studyOver" v-model="cont" placeholder="请填写学习内容"></textarea>
    </div>
    <div class="btn" v-if="!studyOver">
      <span @click="toBack" style="margin-right: 30rpx;">取消</span>
      <span @click="submit">提交</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        studyOver: false,
        cont: '',
        id: '' ,//用户id
        pageId: '', //学习详情id
        studyInfo: '', //学习内容
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = wx.getStorageSync('loginInfo').partId
      this.pageId = options.id
      if(options.type==1) {
        this.studyOver = false
      } else {
        this.studyOver = true
      }
      this.api.verifyToken().then(() => {
        this.api.getPartyMemberDetail({
          id: this.id
        }).then(res => {
          this.info = res
        })
        this.api.getSeparateStudyDetail({id:this.pageId}).then(res => {
          this.studyInfo = res.content
        })
      });
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
      toBack(){
        this.until.back()
      },
      toPage(url) {
        this.until.aHref(url)
      },
      submit() {
        if(this.cont=="") {
          wx.showToast({
            title: '请输入学习内容',
            icon: 'none',
            duration: 1500
          })
          return
        }
        this.api.separateSubmit({content:this.cont,mbrId:this.id}).then(res => {
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

    .list-box {
      width: 100%;
      margin: 0 auto 20rpx;
      background-color: #fff;
      padding: 45rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;

      .list-img {
        position: relative;
        width: 140rpx;
        height: 140rpx;
        margin: 40rpx auto;
        img {
          width: 140rpx;
          height: 140rpx;
          border-radius: 50%;
        }

        .partyClass {
          position: absolute;
          width: 37rpx;
          height: 37rpx;
          bottom: 6rpx;
          right: 9rpx;
          z-index: 100;
        }
      }

      .list-info {
        max-width: 420rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .list-item {
          font-size: 24rpx;
          font-weight: 500;
          line-height: 24rpx;
          color: #303030;
          margin-bottom: 30rpx;
        }
        .list-item:last-child {
          margin-bottom: 0;
        }
      }
    }

    .profile {
      width: 100%;
      margin: 0 auto 20rpx;
      background-color: #fff;
      padding: 45rpx;
      box-sizing: border-box;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;

      .profile-title {
        font-size: 30rpx;
        color: #EC2C17;
        margin-bottom: 40rpx;
      }

      .profile-title:before {
        content: "";
        display: inline-block;
        width: 6rpx;
        height: 27rpx;
        background: #EB020E;
        margin-right: 20rpx;
        vertical-align: middle;
      }
      textarea {
        width: 100%;

      }
    }
    .btn {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50rpx;
      span {
        width: 286rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
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
</style>

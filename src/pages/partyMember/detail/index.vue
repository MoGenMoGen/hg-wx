<template>
  <div class="home">
    <div class="list-box">
      <div class="list-img">
        <img :src="info.img" mode="aspectFill">
        <img src="/static/images/dh.png" class="partyClass">
      </div>
      <div class="list-info" v-if="type==1">
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
      <div class="list-info" v-if="type==2">
        <span class="list-item">姓名：{{info.name}}</span>
        <div v-html="info.content"></div>
      </div>
    </div>
    <div class="profile" v-if="type==1">
      <div class="profile-title">个人简介</div>
      <div v-html="info.introduce"></div>
    </div>
    <!-- <div class="profile" v-if="type==2">
      <div class="profile-title">先锋事迹</div>

    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        // sexList: ['未知', '男', '女'],
        type: 1, //1户居分离 2先锋榜
        id: ''
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.type = options.type
      this.id = options.id
      this.api.verifyToken().then(() => {
        if(this.type==1) {
          this.api.getPartyMemberDetail({
          id: this.id
        }).then(res => {
          this.info = res
        })
        } else if (this.type==2) {
          this.api.getTopDetail({id:this.id}).then(res=> {
            this.info = res 
          })
        }

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
      toPage(url) {
        this.until.aHref(url)
      },
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
    }
  }
</style>

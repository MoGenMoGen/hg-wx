<template>
  <div class="home">
    <!-- 活动信息 -->
    <div class="active-box">
      <!-- 顶部信息 -->
      <div class="active-title">{{title}}</div>
      <div class="active-info">
        <span class="active-time">{{time}}</span>
        <div class="active-count">
          <img src="/static/images/viewCount.png" style="width: 34rpx;height: 34rpx;margin-right: 10rpx;">
          <span>{{count}}</span>
        </div>
      </div>
      <!-- 头图 -->
      <block v-for="(item, index) in img" :key="index">
        <img :src="item" class="headImg" mode="widthFix">
      </block>
      <!-- 时间 -->
      <div class="timeLine" v-if="startTime&&endTime">活动时间：{{startTime}} 至 {{endTime}}</div>
      <!-- 富文本内容 -->
      <div v-html="msg" class="editorContent"></div>
    </div>
    <!-- 申请时间与通过实践 -->
    <div class="time-box" v-if="activeId==1">
      <span>活动申请时间：{{time}}</span>
      <span>审核通过时间：{{verifyTime}}</span>
    </div>
    <!-- 报名名单 -->
    <div class="list-box" v-if="activeId==1">
      <!-- 列表头部 -->
      <div class="list-title">
        <div class="title-left">报名名单</div>
      </div>
      <!-- 列表内容 -->
      <block v-for="(item, index) in list" :key="index">
        <div class="list-content">
          <span>{{item.name}}({{item.phone}})</span>
          <span>{{item.createTime}}</span>
        </div>
      </block>
    </div>
    <!-- 报名按钮 -->
    <!-- <div class="signUp" @click="signUp()" v-if="!isOver">报名</div> -->
    <!-- 已结束按钮 -->
    <!-- <div class="signUp" style="background: #999;" v-if="isOver">{{isSignUp?'已报名':'已结束'}}</div> -->
    <!-- 遮罩层 -->
    <!-- <div class="mask" v-if="signUpFlag" @click="cancel()" catchtouchmove='ture'></div> -->
    <!-- 报名列表 -->
    <!-- <div class="signUp-form" v-if="signUpFlag">
      <div class="signUp-title">社区活动报名</div>
      <input class="signUp-info" type="text" placeholder="请输入姓名">
      <input class="signUp-info" type="number" placeholder="请输入联系电话">
      <div class="confirm-box">
        <span @click="cancel()">取消</span>
        <span @click="confirm()">确认</span>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        time: "",
        count: 0,
        startTime: "",
        endTime: "",
        verifyTime: "",
        img: "",
        // signUpFlag: false,
        msg: "",
        // isOver: false,
        // isSignUp: false,
        list: [],
        id: 0,
        activeId: 0 //0:我参与的活动,1:我发起的活动,3:团队活动
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.activeId = options.activeId
      this.api.verifyToken().then(()=>{
        if(this.activeId == 2) {
          this.api.teamActiveDetail({id:this.id}).then(res => {
            this.msg = this.until.imgStyle(res.data.content)
            this.title = res.data.title
            this.time = res.data.createTime.substring(0,16)
            this.count = res.data.num
            this.startTime = res.data.startTime.substring(0,16)
            this.endTime = res.data.endTime.substring(0,16)
            this.img = res.data.img.split(",")
          })
        } else {
          this.api.activeDetail({id:this.id}).then(res => {
            // this.msg = res.data.content
            this.msg = this.until.imgStyle(res.data.content)
            this.title = res.data.title
            this.time = res.data.createTime.substring(0,16)
            this.count = res.data.num
            this.startTime = res.data.startTime.substring(0,16)
            this.endTime = res.data.endTime.substring(0,16)
            this.verifyTime = res.data.verifyTime.substring(0,16)
            this.img = res.data.img.split(",")
          })
          if(this.activeId == 1) {
            this.api.activeSignList({pid:this.id}).then(res => {
              res.data.forEach(item => {
                item.createTime = item.createTime.substring(0,10)
              })
              this.list = res.data
            })
          }
        }
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

      toPage(url) {
        this.until.aHref(url)
      },
      // signUp() {
      //   this.signUpFlag = true
      // },
      // cancel() {
      //   this.signUpFlag = false
      // },
      // confirm() {
      //   this.signUpFlag = false
      //   this.isSignUp = true
      //   this.isOver = true
      // }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 0 0 40rpx;
    box-sizing: border-box;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

    .active-box {
      width: 100%;
      padding: 34rpx 30rpx;
      background-color: #fff;
      margin-bottom: 20rpx;
      box-sizing: border-box;
      .active-title {
        font-size: 44rpx;
        line-height: 44rpx;
        color: #000;
        margin-bottom: 4rpx;
      }

      .active-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 32rpx;

        .active-time {
          font-size: 24rpx;
          line-height: 24rpx;
          color: #000;
          margin-right: 26rpx;
        }

        .active-count {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 34rpx;
          color: #999;
          display: flex;
          align-items: center;
        }
      }

      .headImg {
        width: 690rpx;
        height: 320rpx;
        border-radius: 10rpx;
        margin: 20rpx auto;
      }

      .timeLine {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 34rpx;
        color: #333;
        margin-bottom: 20rpx;
      }
    }

    .time-box {
      width: 100%;
      background-color: #fff;
      padding: 40rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-size: 26rpx;
      font-size: 500;
      line-height: 40rpx;
      color: #606060;
    }

    // .signUp {
    //   position: fixed;
    //   bottom: 102rpx;
    //   left: 46rpx;
    //   width: 660rpx;
    //   height: 88rpx;
    //   background: #EB020E;
    //   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
    //   border-radius: 10rpx;
    //   text-align: center;
    //   line-height: 88rpx;
    //   font-size: 28rpx;
    //   color: #fff;
    //   font-weight: 500;
    // }

    // .mask {
    //   position: fixed;
    //   left: 0px;
    //   top: 0px;
    //   background: rgba(0, 0, 0, 0.25);
    //   width: 100%;
    //   height: 100%;
    //   opacity: 1;
    //   z-Index: 999;
    // }

    // .signUp-form {
    //   width: 750rpx;
    //   height: 598rpx;
    //   position: fixed;
    //   bottom: 0;
    //   left: 0;
    //   background-color: #fff;
    //   border-top-left-radius: 40rpx;
    //   border-top-right-radius: 40rpx;
    //   z-index: 1000;
    //   padding: 32rpx 44rpx 0;
    //   box-sizing: border-box;

    //   .signUp-title {
    //     font-size: 32rpx;
    //     font-weight: 500;
    //     line-height: 44rpx;
    //     color: #000;
    //     margin-bottom: 40rpx;
    //   }

    //   .signUp-info {
    //     width: 663rpx;
    //     padding: 30rpx 0;
    //     font-size: 28rpx;
    //     font-weight: 400;
    //     line-height: 40rpx;
    //     color: #CBCBCB;
    //     border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    //   }

    //   .confirm-box {
    //     margin-top: 68rpx;
    //     display: flex;
    //     flex-direction: row;
    //     justify-content: center;

    //     span {
    //       width: 218rpx;
    //       height: 72rpx;
    //       font-size: 28rpx;
    //       font-weight: 600;
    //       line-height: 72rpx;
    //       color: #FFF;
    //       background: #EB020E;
    //       text-align: center;
    //       border-radius: 10rpx;
    //     }

    //     span:first-child {
    //       background: rgba(0, 0, 0, 0.05);
    //       color: #EB020E;
    //       margin-right: 28rpx;
    //     }
    //   }
    // }
    .list-box {
      width: 100%;
      background-color: #fff;
      margin-top: 20rpx;

      .list-title {
        padding: 40rpx 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .title-left {
          font-size: 30rpx;
          color: #303030;
          font-weight: bold;
          line-height: 27rpx;
        }

        .title-left:before {
          content: "";
          display: inline-block;
          width: 6rpx;
          height: 27rpx;
          background: #EB020E;
          margin-right: 20rpx;
        }
      }

      .list-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 24rpx;
        font-size: 400;
        color: #606060;
        margin-top: 48rpx;
        padding: 0 40rpx;
        box-sizing: border-box;
      }

      .list-content:last-child {
        padding-bottom: 48rpx;
      }
    }
  }
</style>

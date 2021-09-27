<template>
  <div class="home">
    <!-- 顶部信息 -->
    <div class="discuss-list">
      <span class="discuss-title">{{title}}</span>
      <span class="discuss-people">发布者:{{userName}}</span>
      <div class="discuss-bottom">
        <div class="discuss-time">{{time}}</div>
        <div class="discuss-interactive" v-if="isActive==0">
          <div style="margin-right: 28rpx;">
            <img src="/static/images/comment.png">
            <span>{{reply}}</span>
          </div>
          <div>
            <img :src="likeStatus==0?'/static/images/like.png':'/static/images/like_s.png'">
            <span>{{like}}</span>
          </div>
        </div>
        <div class="discuss-interactive" v-if="isActive==1">
          <div style="margin-right: 28rpx;">
            <img src="/static/images/deny.png">
            <span>{{disagree}}</span>
          </div>
          <div>
            <img src="/static/images/agree.png">
            <span>{{agree}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 富文本内容 -->
    <div v-html="msg"></div>
    <!-- 评论区 -->
    <div class="comment-area" v-if="isActive==0">
      <div class="comment-title">
        <span>评论</span>
        <span>{{reply}}</span>
      </div>
      <block v-for="(item, index) in commentList" :key="index">
        <div class="comment-info-box">
          <img :src="item.avatar" class="comment-info-avatar" mode="aspectFill">
          <div class="comment-info-left">
            <span class="comment-info-name">{{item.name}}</span>
            <span class="comment-info-content">{{item.content}}</span>
            <span class="comment-info-time">{{item.createTime}}</span>
          </div>
        </div>
      </block>
      <div class="comment-more" v-if="isShow" @click="showMore()">查看更多</div>
    </div>
    <!-- 输入框 -->
    <div class="reply-box" v-if="isActive==0">
      <div class="reply-inner-box">
        <div class="reply-input">
          <img src="/static/images/pen.png" style="width: 36rpx;height: 36rpx;margin-right: 6rpx;">
          <input type="text" placeholder="说两句" adjust-position cursor-spacing="43" confirm-type="send" @confirm="sendReply($event)">
        </div>
        <img :src="likeStatus==0?'/static/images/like_b.png':'/static/images/like_s.png'" style="width: 48rpx;height: 48rpx;" @click="likes()">
      </div>
    </div>
    <!-- 线上决议输入文本 -->
    <div class="resolution-box" v-if="isActive==1">
      <!-- <span>发表您的决议:</span> -->
      <!-- <textarea v-if="status==0" placeholder="多行输入" v-model="resolutionContent"></textarea> -->
      <span v-if="status!=0" class="resolution-tips">{{status==1?'您已同意':'您已反对'}}</span>
    </div>
    <!-- 线上决议按钮 -->
    <div class="btn" v-if="isActive==1&&status==0">
      <button @click="voteDeny()">不同意</button>
      <button @click="voteAgree()">同意</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        time: "",
        reply: 0,
        like: 0,
        disagree: 0,
        agree: 0,
        userName: "",
        msg: "",
        commentList: [],
        pid: 0,
        isActive:0,
        current: 1,
        total: 0,
        isShow: false,
        likeStatus: 0,
        resolutionContent: '',
        status: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.pid = options.id
      this.isActive = options.isActive
    },
    onShow() {
      let data = {
        id: this.pid
      }
      let listData = {
        pid: this.pid,
        current: 1,
        size: 10
      }
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        if(this.isActive==0) {
          this.api.discussionDetail(data).then((res) => {
            this.title = res.data.title
            this.time = res.data.createTime.substring(0, 16)
            this.reply = res.data.commentNum
            this.like = res.data.likesNum
            this.msg = this.until.imgStyle(res.data.content)
            this.likeStatus = res.data.likeStatus
            this.userName = res.data.userName
          })
          this.getList(listData)
        } else if (this.isActive==1) {
          this.api.resolutionDetail(data).then(res => {
            this.title = res.data.title
            this.time = res.data.createTime.substring(0, 16)
            this.disagree = res.data.disagreeNum
            this.agree = res.data.agreeNum
            this.msg = this.until.imgStyle(res.data.content)
            this.status = res.data.voteStatus
            this.userName = res.data.userName
          })
        }
      });
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
      showMore() {
        let listData = {
          current: this.current + 1,
          size: 10,
          pid: this.pid
        }
        this.getList(listData)
        this.current +=1
      },
      getList(listData) {
        this.api.discussionReplyList(listData).then((res) => {
          res.data.records.forEach((item) => {
            item.createTime = item.createTime.substring(0, 16)
          })
          this.commentList = this.commentList.concat(res.data.records)
          this.total = res.data.total
          if(this.total > this.commentList.length) {
            this.isShow = true
          }
        })
      },
      likes() {
        let data = {
          pid: this.pid
        }
        this.api.discussionLikes(data).then((res) => {
          if(this.likeStatus == 0) {
            wx.showToast({
              title: '点赞成功',
              icon: 'success',
              duration: 1000
            })
            this.likeStatus = 1
            this.like+=1
          } else {
            wx.showToast({
              title: '取消点赞',
              icon: 'none',
              duration: 1000
            })
            this.likeStatus = 0
            this.like-=1
          }
        })
      },
      sendReply(e) {
        if(e.mp.detail.value) {
          let data = {
            pid: this.pid,
            content: e.mp.detail.value
          }
          this.api.discussionReply(data).then((res) => {
            let listData = {
              pid: this.pid,
              current: 1,
              size: 10
            }
            this.api.discussionReplyList(listData).then((res) => {
              res.data.records.forEach((item) => {
                item.createTime = item.createTime.substring(0, 16)
              })
              this.commentList = res.data.records
              this.total = this.commentList.length
              if(this.total < this.current*10) {
                this.isShow = false
              }
            })
          })
        } else {
          wx.showToast({
            title: '请输入内容',
            icon: 'none',
            duration: 1000
          })
        }
      },
      voteDeny() {
        console.log('不同意')
        let that = this
        let data = {
          pid: this.pid,
          content: this.resolutionContent
        }
        this.api.resolutionVoteDisagree(data).then(res => {
          console.log(res)
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500
          })
          setTimeout(function(){
            that.until.back()
          },1500)
        })
      },
      voteAgree() {
        console.log('同意')
         let that = this
        let data = {
          pid: this.pid,
          content: this.resolutionContent
        }
        this.api.resolutionVoteAgree(data).then(res => {
          console.log(res)
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 1500
          })
          setTimeout(function(){
            that.until.back()
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
    padding: 34rpx 30rpx 220rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

    // 顶部
    .discuss-list {
      width: 690rpx;
      margin-bottom: 20rpx;
      display: flex;
      flex-direction: column;

      .discuss-title {
        font-size: 44rpx;
        line-height: 44rpx;
        font-weight: 400;
        color: #000;
        // margin-bottom: 4rpx;
        // 多行显示省略号
        // overflow:hidden;
        // text-overflow:ellipsis;
        // display:-webkit-box;
        // -webkit-box-orient:vertical;
        // -webkit-line-clamp:2;
      }

      .discuss-people {
        font-size: 24rpx;
        line-height: 44rpx;
        color: #666;
        margin: 10rpx 0;
      }

      .discuss-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #999;
        font-size: 24rpx;
        line-height: 24rpx;

        .discuss-interactive {
          display: flex;
          flex-direction: row;
          align-items: center;
          color: #333;
          font-weight: 400;
          line-height: 34rpx;

          div {
            display: flex;
            align-items: center;

            img {
              width: 30rpx;
              height: 30rpx;
              margin-right: 10rpx;
            }
          }
        }
      }
    }

    // 评论区
    .comment-area {
      margin-top: 40rpx;

      .comment-title {
        position: relative;

        span {
          font-size: 32rpx;
          font-weight: 500;
          line-height: 24rpx;
          color: #333;
        }

        span:last-child {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 24rpx;
          margin-left: 20rpx;
        }
      }

      .comment-title:after {
        content: "";
        position: absolute;
        width: 40rpx;
        height: 6rpx;
        background: #EB020E;
        border-radius: 10rpx;
        top: 42rpx;
        left: 52rpx;
      }

      .comment-info-box {
        display: flex;
        border-bottom: 2rpx solid #F4F4F4;
        padding-top: 40rpx;
        img {
          width: 64rpx;
          height: 64rpx;
          border-radius: 50%;
        }
        .comment-info-left {
          display: flex;
          flex-direction: column;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #1A1A1A;
          max-width: 600rpx;
          margin-left: 20rpx;
          .comment-info-name {
            margin-top: 16rpx;
            margin-bottom: 22rpx;
          }
          .comment-info-content {
            margin-bottom: 22rpx;
          }
          .comment-info-time {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 34rpx;
            color: #999;
            margin-bottom: 32rpx;
          }
        }
      }

      .comment-more {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #EB020E;
        margin: 28rpx auto;
        text-align: center;
      }
    }

    // 回复框
    .reply-box {
      width: 750rpx;
      height: 190rpx;
      border-top: 2rpx solid #EFEFEF;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 32rpx 30rpx 0;
      box-sizing: border-box;
      background-color: #fff;

      .reply-inner-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .reply-input {
          width: 620rpx;
          height: 72rpx;
          border: 2rpx solid #DEDEDE;
          border-radius: 100rpx;
          display: flex;
          font-size: 32rpx;
          font-weight: 400;
          line-height: 44rpx;
          color: #999;
          padding: 14rpx 22rpx;
          box-sizing: border-box;
          align-items: center;

          input {
            width: 500rpx;
          }
        }
      }
    }

    // 多行输入
    .resolution-box {
      display: flex;
      flex-direction: column;
      margin-top: 80rpx;
      span {
        font-size: 28rpx;
        color: #000;
        font-weight: 400;
        line-height: 28rpx;
      }
      textarea {
        width: 100%;
        height: 278rpx;
        margin-top: 20rpx;
        background-color: #F1F3F2;
        border-radius: 14rpx;
        padding: 26rpx 40rpx;
        box-sizing: border-box;
      }
      .resolution-tips {
        text-align: center;
        font-size: 32rpx;
      }
    }

    // 按钮组
    .btn{
      width: 690rpx;
      margin: 60rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 0;
      button{
        width: 330rpx;
        background: @color;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 28rpx;
        color: #ffffff;
        border-radius: 14rpx;
        &:first-of-type{
          background: #F1F3F2;
          box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.05);
          color: #303030;
        }
        &:last-of-type{
          box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.1);
        }
      }
    }
  }
</style>

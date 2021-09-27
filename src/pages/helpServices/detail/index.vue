<template>
  <div class="home">
    <!-- 顶部信息 -->
    <div class="cont">
      <p>{{info.content}}</p>
      <p><span>联 系 人：</span>{{info.user}}</p>
      <p><span>联系电话：</span>{{info.phone}}</p>
      <p><span>提交时间：</span>{{info.createTime}}</p>
      <p v-if="info.createUser==userInfo.id" :class="{red:!info.state}" @click="toSoluate"><span>当前状态：</span>{{info.state ? '已解决' : '待解决'}} <image :src="edit" mode="widthFix" v-if="!info.state"/></p>
    </div>
    <!-- 评论区 -->
    <div class="comment-area">
      <div class="comment-title">
        <span>评论</span>
        <span>{{total}}</span>
      </div>
      <block v-for="(item, index) in commentList" :key="index">
        <div class="comment-info-box">
          <img :src="item.avatar" class="comment-info-avatar">
          <div class="comment-info-left">
            <span class="comment-info-name">{{item.name}}</span>
            <span class="comment-info-content">{{item.content}}</span>
            <span class="comment-info-time">{{item.createTime}}</span>
          </div>
        </div>
      </block>
      <div class="comment-more" @click="moreComment" v-if="total>commentList.length">查看更多</div>
    </div>
    <!-- 输入框 -->
    <div class="reply-box">
      <div class="reply-inner-box">
        <div class="reply-input">
          <img src="/static/images/pen.png" style="width: 36rpx;height: 36rpx;margin-right: 6rpx;">
          <input type="text" placeholder="说两句" adjust-position cursor-spacing="43" v-model="commentContent" @confirm="toComment">
        </div>
        <img src="/static/images/personImg4.png" style="width: 48rpx;height: 48rpx;"  @click="toComment">
      </div>
    </div>
  </div>
</template>

<script>
  import edit from '../../../../static/images/jiejue.png'
  export default {
    data() {
      return {
        edit,
        id:'',
        current:1,
        size:5,
        total:0,
        info:{},
        userInfo:{},
        commentContent:'',
        commentList: []
      }
    },
    components: {

    },
    async onLoad(e) {
      this.id = e.id
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.userInfo = wx.getStorageSync('loginInfo')
        this.getInfo()
        this.current = 1
        this.commentList = []
        this.getCommentList()
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
      toSoluate(){
        if(this.info.status){
          wx.showModal({
            title: '提示',
            content: '您的求助确定解决了？',
            success :res=> {
              if (res.confirm) {
                this.api.helpSolve({id:this.id}).then(()=>{
                  wx.showToast({
                    title: '操作成功',
                    icon: 'success',
                    duration: 2000
                  })
                  this.getInfo()
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }


      },
      getInfo(){
        this.api.helpDetail({id:this.id}).then(res=>{
          this.info = res
          console.log(this.info)
        })
      },
      toPage(url) {
        this.until.aHref(url)
      },
      getCommentList(){
        let param = {
          current:this.current,
          size:this.size,
          pid:this.id
        }
        this.api.helpCommentList(param).then(res=>{
           this.total = res.total
           this.commentList.push(...res.records)
        })
      },
      toComment(){
        this.commentContent = this.commentContent.trim()
        if(!this.commentContent){
          return wx.showToast({
            icon: "none",
            title: '评论内容不能为空',
            duration: 2000
          });
        }
        this.api.helpToComment({
          pid: this.id,
          content: this.commentContent
        }).then(res=>{
          console.log(res)
          this.commentList.unshift({
            name:res.name,
            content:res.content,
            createTime:res.createTime,
            avatar:res.avatar
          })
        })
      },
      moreComment(){
        this.current++
        this.getCommentList()
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 34rpx 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);

    .cont{
      margin: 0 auto 60rpx ;
      width: 94vw;
      background: #ffffff;
      border-radius: 14rpx;
      padding: 30rpx;
      box-sizing: border-box;
      box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.1);
      font-size: 28rpx;
      p{
        line-height: 35rpx;
        color: #999999;
        margin-bottom: 20rpx;
        &:first-of-type{
          color: #666666;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          max-height: 70rpx;
        }
        span{
          width: 140rpx;
          text-align: justify;
          text-align-last: justify;
          white-space: nowrap;
          display: inline-block;
        }
      }
      .red{
        color: @redColor;
        display: flex;
        align-items: center;
        span{
          color: #999999;
        }
        image{
          width: 30rpx;
          margin-left: 8rpx;
        }
      }

    }

    // 评论区
    .comment-area {
      margin-top: 40rpx;

      .comment-title {
        position: relative;
        margin-bottom: 40rpx;

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
  }
</style>

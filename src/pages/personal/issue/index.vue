<template>
  <div class="home">
    <block v-for="(item,index) in list" :key="index">
      <div class="issue-box">
        <div class="info-item-comment">
          <div class="comment-top">
            <div class="comment-name"><img :src="item.avatar?item.avatar:'/static/images/avatar.png'"><span>{{item.nickName||item.realName}}</span></div>
            <div class="comment-cont">{{item.cont}}</div>
            <div class="comment-time">
              <span>{{item.createTime}}<span><img src="/static/images/msg-logo.png"
                    mode="heightFix">{{item.commentCount}}</span></span>
            </div>
          </div>
          <!-- <div class="comment-bottom">
            <div class="comment-name"><img src="/static/images/avatar.png"><span>村委会</span></div>
            <div class="comment-cont">谢谢乡亲们的理解与支持。</div>
            <div class="comment-time">
              <span>2021-04-16</span>
            </div>
          </div> -->
        </div>
        <div class="issue-more" @click="toPage('/pages/convenience/quesDetail/main?id='+item.id)">查看更多 ></div>
      </div>
    </block>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        pid: '0',
        current: 1,
        size: 10,
        userId: wx.getStorageSync('loginInfo').id
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.reportList.length) {
        let data = {
          pid: '0',
          current: this.current + 1,
          size: 10,
          userId: wx.getStorageSync('loginInfo').id
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        pid: '0',
        current: 1,
        size: 10,
        userId: wx.getStorageSync('loginInfo').id
      }
      this.current = 1
      this.reportList = []
      this.getList(data);
      wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      getList(data) {
        this.api.getQuestionList(data).then(res => {
          res.records.forEach(item => {
            item.createTime = item.createTime.substring(0, 10)
          })
          this.list = this.list.concat(res.records)
          this.total = res.total
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

    .issue-box {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 10rpx;
      margin: 20rpx auto;
      padding: 40rpx 0 40rpx 40rpx;
      box-sizing: border-box;

      .info-item-comment {
        width: 100%;
        padding-left: 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        .comment-top {
          width: 100%;
          border-bottom: 1px solid #F4F4F4;
          padding: 20rpx 50rpx 20rpx 0;
          box-sizing: border-box;
        }

        .comment-bottom {
          width: 100%;
          padding: 20rpx 50rpx 20rpx 80rpx;
          box-sizing: border-box;
          border-bottom: 1px solid #F4F4F4;
        }

        .comment-name {
          font-size: 28rpx;
          color: #1A1A1A;
          display: flex;
          align-items: center;

          img {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            margin-right: 20rpx;
          }
        }

        .comment-cont {
          width: 100%;
          font-size: 28rpx;
          color: #1A1A1A;
          padding-left: 84rpx;
          box-sizing: border-box;
        }

        .comment-time {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 84rpx;
          box-sizing: border-box;

          span {
            font-size: 24rpx;
            color: 24px;

            img {
              height: 20rpx;
              margin-left: 32rpx;
              margin-right: 6rpx;
            }
          }
        }
      }

      .issue-more {
        width: 100%;
        margin-top: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: #599BFF;
      }
    }
  }
</style>

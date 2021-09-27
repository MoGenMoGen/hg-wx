<template>
  <div class="home">
    <!-- 顶部背景 -->
    <img class="topBg" src="/static/images/community-bg.png" />
    <!-- 社区成员 -->
    <div class="community-logo">
      <div class="logo-area" @click="toPage('/pages/community/member/main')">
        <img src="/static/images/community-members.png">
        <span>社区成员</span>
      </div>
    </div>
    <div class="replyCount">共{{total}}条提问</div>
    <!-- 评论区 -->
    <block v-for="(item, index) in list" :key="index">
      <div class="comment-box">
        <!-- 提问者 -->
        <div class="comment-questioner">
          <img :src="item.avatar" mode="aspectFill">
          <div class="comment-info-box">
            <div class="info-top">
              <span class="info-name">{{item.name}}</span>
              <!-- <div>
                <span>{{item.like}}</span>
                <img src="/static/images/like_b.png" style="width: 24rpx;height: 24rpx;">
              </div> -->
            </div>
            <p class="info-middle">{{item.content}}</p>
            <div class="info-bottom">
              <span>{{item.createTime}}</span>
              <!-- <span>回复</span> -->
            </div>
          </div>
        </div>
        <!-- 回复 -->
        <div class="replyer">
          <block v-for="(newItem, newIndex) in item.problems" :key="newIndex">
            <div class="reply-info-box">
              <div class="reply-top">
                <img :src="newItem.avatar" mode="aspectFill">
                <span>{{newItem.name}}</span>
              </div>
              <span class="reply-middle">{{newItem.content}}</span>
              <span class="reply-bottom">{{newItem.createTime}}</span>
            </div>
          </block>
          <!-- <div class="reply-all" @click="toPage('/pages/community/detail/main?id='+item.id)">查看全部{{item.replyCount}}条回复
            ></div> -->
        </div>
      </div>
    </block>
    <!-- 回复框 -->
    <div class="reply-box">
      <div class="input-box">
        <input type="text" placeholder="说两句" placeholder-style="color:#999;" adjust-position cursor-spacing="76" :value="content" @input="getContent($event)">
      </div>
      <div class="ask" @click="put()">提问</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0,
        content: ""
      }
    },
    components: {

    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10
      }
      this.api.verifyToken().then(()=>{
        this.refresh(data)
      });
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },
    //解底事件
    onReachBottom() {
      if(this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        this.refresh(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        current: 1,
        size: 10
      }
      this.current = 1
      this.list = []
      this.refresh(data);
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
      refresh(data) {
        this.api.communityProblemList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.createTime = item.createTime.substring(0,10)
            item.problems.forEach(newItem => {
              newItem.createTime = newItem.createTime.substring(0,10)
            })
          })
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
        })
      },
      getContent(e) {
        this.content = e.mp.detail.value
      },
      put() {
        if(this.content) {
          this.api.communityProblemPut({content: this.content}).then(res => {
            this.content = ''
            this.list = []
            this.current = 1
            let data = {
              current: 1,
              size: 10
            }
            this.refresh(data)
          })
        } else {
          wx.showToast({
            title: "请输入内容",
            icon: "none",
            duration: 2000
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
    padding-bottom: 200rpx;
    background-color: #fff;

    .topBg {
      width: 750rpx;
      height: 330rpx;
      z-index: -1;
    }

    .community-logo {
      width: 650rpx;
      border-radius: 14rpx;
      background-color: #fff;
      box-shadow: 0px 4px 14px rgba(248, 38, 38, 0.05);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin: -50rpx auto 36rpx;
      padding: 24rpx 0;

      .logo-area {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 74rpx;
          height: 74rpx;
        }

        span {
          font-size: 32rpx;
          font-weight: 400;
          line-height: 44rpx;
          color: #333;
        }
      }
    }

    .replyCount {
      width: 100%;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 44rpx;
      color: #333;
      text-align: center;
    }

    .comment-box {
      width: 100%;
      // padding: 40rpx 0 0;
      // box-sizing: border-box;
      border-bottom: 2rpx solid #F4F4F4;

      .comment-questioner {
        display: flex;
        align-items: flex-start;
        padding: 40rpx 0 0 30rpx;
        box-sizing: border-box;

        img {
          width: 64rpx;
          height: 64rpx;
          border-radius: 50%;
          margin-right: 10rpx;
        }

        // 提问
        .comment-info-box {
          width: 645rpx;
          padding: 12rpx 8rpx 40rpx;
          box-sizing: border-box;
          border-bottom: 2rpx solid #F4F4F4;
          display: flex;
          flex-direction: column;

          .info-top {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 22rpx;

            .info-name {
              font-size: 28rpx;
              font-weight: 400;
              line-height: 40rpx;
              color: #1A1A1A;
            }

            div {
              display: flex;
              align-items: center;

              span {
                font-size: 24rpx;
                font-weight: 400;
                color: #666;
                margin-right: 10rpx;
              }
            }
          }

          .info-middle {
            max-width: 600rpx;
            text-align: justify;
            font-size: 32rpx;
            font-weight: 400;
            line-height: 44rpx;
            color: #1A1A1A;
            margin-bottom: 16rpx;
          }

          .info-bottom {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 34rpx;
            color: #999;

            // span:last-child {
            //   color: #EB020E;
            //   margin-left: 26rpx;
            // }
          }
        }

      }

      // 回复
      .replyer {
        background-color: #FAFAFA;
        // padding: 22rpx 0 38rpx 106rpx;
        padding-left: 106rpx;
        box-sizing: border-box;

        .reply-info-box {
          display: flex;
          flex-direction: column;
          padding: 20rpx 0;
          border-bottom: 2rpx solid #F4F4F4;
          .reply-top {
            display: flex;
            align-items: center;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: #1A1A1A;
            margin-bottom: 16rpx;

            img {
              width: 50rpx;
              height: 50rpx;
              margin-right: 20rpx;
            }
          }

          .reply-middle {
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: #1A1A1A;
            margin-bottom: 20rpx;
          }

          .reply-bottom {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 34rpx;
            color: #999;
            // margin-bottom: 20rpx;
          }
        }

        // 更多回复
        .reply-all {
          font-size: 24rpx;
          font-weight: 400;
          line-height: 34rpx;
          color: #EB020E;
        }
      }
    }

    // 回复输入框
    .reply-box {
      width: 100%;
      height: 180rpx;
      padding: 32rpx 30rpx 76rpx;
      box-sizing: border-box;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
      background-color: #fff;
      border-top: 2rpx solid #EFEFEF;
      display: flex;
      align-items: center;

      .input-box {
        width: 520rpx;
        height: 70rpx;
        border: 2rpx solid #DEDEDE;
        border-radius: 14rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        font-weight: 400;
        margin-right: 10rpx;

        input {
          height: 70rpx;
        }
      }

      .ask {
        width: 160rpx;
        height: 72rpx;
        background: #EB020E;
        border-radius: 14rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 72rpx;
        color: #FFFFFF;
        text-align: center;
      }
    }
  }
</style>

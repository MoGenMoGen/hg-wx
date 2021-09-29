<template>
  <div>
    <!-- 红色宣讲 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/hsxj.png">
            <span>红色宣讲</span>
          </div>
          <div class="module-right" style="font-size: 20rpx;color: #FFF;" @click="toPage('/pages/party/videoList/main?type=1')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="padding: 30rpx;flex-wrap: wrap;box-sizing: border-box;">
          <div class="module-list-item-two" v-for="(item,index) in videoList1" :key="index" @click="toPage('/pages/party/video/main?id='+item.id)">
            <div class="module-list-item-img">
              <img :src="item.img" mode="aspectFill">
              <!-- <span>{{item.duration}}</span> -->
              <img src="/static/images/videoLogo.png" class="video-logo">
            </div>
            <span>{{item.title}}</span>
            <span>{{item.createTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 红色历史 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/hsls.png">
            <span>红色历史</span>
          </div>
          <div class="module-right" style="font-size: 20rpx;color: #FFF;" @click="toPage('/pages/party/historyList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-swiper">
          <swiper class="history-swiper" autoplay="true" interval="3000" circular="true" duration="500" @change="historyIndexChange">
            <block v-for="(item, index) in historyList" :key="index">
              <swiper-item class="history-item" @click="toPage('/pages/party/historyDetail/main?id='+item.id)">
                <img :src="item.img" mode="aspectFill">
                <div class="history-right">
                  <span class="history-title">【 {{item.title}} 】</span>
                  <div class="history-info">
                    {{item.synopsis}}
                  </div>
                </div>
              </swiper-item>
            </block>
          </swiper>
          <div class="dots">
            <block v-for="(item, index) in historyList" :key="index">
              <div :class="{'dots-active':activeIndex==index}"></div>
            </block>
          </div>
        </div>
      </div>
    </div>
    <!-- 红色百宝箱 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/hsbbx.png">
            <span>红色百宝箱</span>
          </div>
          <div class="module-right" style="font-size: 20rpx;color: #FFF;" @click="toPage('/pages/party/treasureBox/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="flex-direction: column;">
          <div class="module-list-item-one" v-for="(item,index) in caseList" :key="index" @click="toPage('/pages/party/newDetail/main?id='+item.id)">
            <span>· {{item.title}}</span>
            <span>{{item.synopsis}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 精品课程 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/jpkc.png">
            <span>精品课程</span>
          </div>
        </div>
        <div class="module-list">
          <img class="module-img" :src="courseImg" mode="aspectFill" @click="viewImg(courseImg)">
        </div>
      </div>
    </div>
    <!-- 微视频 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/wsp.png">
            <span>微视频</span>
          </div>
          <div class="module-right" style="font-size: 20rpx;color: #FFF;" @click="toPage('/pages/party/videoList/main?type=2')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="padding: 30rpx;flex-wrap: wrap;box-sizing: border-box;">
          <div class="module-list-item-two" v-for="(item,index) in videoList2" :key="index" @click="toPage('/pages/party/video/main?id='+item.id)">
            <div class="module-list-item-img">
              <img :src="item.img" mode="aspectFill">
              <!-- <span>{{item.duration}}</span> -->
              <img src="/static/images/videoLogo.png" class="video-logo">
            </div>
            <span>{{item.title}}</span>
            <span>{{item.createTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        activeIndex: 0,
        videoList1: [],
        videoList2: [],
        historyList: [],
        caseList: [],
        courseImg: ''
      }
    },
    components: {},
    async onLoad() {
      this.getList()
    },
    onShow() {

    },

    methods: {
      historyIndexChange(e) {
        this.activeIndex = e.mp.detail.current
      },
      toPage(url) {
        this.until.aHref(url)
      },
      viewImg(img) {
        let imgList = img.split(",")
        this.until.viewImg(img,imgList)
      },
      getList() {
        this.api.getRedClassVideo({type:1}).then(res => {
          res.forEach(item => {
            item.createTime = item.createTime.substring(0,10)
          })
          this.videoList1 = res
        })
        this.api.getRedClassVideo({type:2}).then(res => {
          res.forEach(item => {
            item.createTime = item.createTime.substring(0,10)
          })
          this.videoList2 = res
        })
        this.api.getRedHistory().then(res => {
          this.historyList = res
        })
        this.api.getRedCase().then(res => {
          this.caseList = res
        })
        this.api.getRedCourse().then(res => {
          this.courseImg = res.img
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../css/common.less");
  .list-box {
    width: 710rpx;
    background-color: #fff;
    margin: 20rpx auto;
    border-radius: 14rpx;
    display: flex;
    flex-direction: column;
    .module {
      width: 100%;
      border-radius: 10rpx;
      overflow: hidden;
      .module-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        background-color: #EC2C17;
        .module-left {
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 28rpx;
          img {
            width: 28rpx;
            height: 28rpx;
            margin-right: 17rpx;
          }
        }
        .module-right {
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 20rpx;
          img {
            width: 10rpx;
            height: 18rpx;
            margin-left: 17rpx;
          }
        }
      }
      .module-swiper {
        width: 670rpx;
        margin: 20rpx auto;
        display: flex;
        flex-direction: column;
        .history-swiper {
          width: 670rpx;
          height: 260rpx;
          border-radius: 20rpx;
          background-color: #fff;
          box-shadow: 0px 4px 24px 0px rgba(151, 151, 151, 0.27);
          overflow: hidden; //超出圆角的隐藏
          transform: translateY(0); //兼容ios
          .history-item {
            width: 670rpx;
            height: 260rpx;
            padding: 30rpx;
            box-sizing: border-box;
            display: flex;
            img {
              width: 300rpx;
              height: 200rpx;
              border-radius: 5rpx;
              flex-shrink: 1;
              margin-right: 30rpx;
            }
            .history-right {
              max-width: 280rpx;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .history-title {
                font-size: 26rpx;
                color: #303030;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .history-info {
                max-width: 280rpx;
                color: #909090;
                font-size: 22rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
              }
            }
          }
        }
        .dots {
          width: 670rpx;
          height: 7rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20rpx auto;
          div {
            width: 7rpx;
            height: 7rpx;
            border-radius: 50%;
            background-color: rgba(0,0,0,0.2);
            margin: 0 15rpx;
          }
          .dots-active {
            background-color: #EC2C17;
            border-radius: 7rpx;
            width: 24rpx;
          }
        }
      }
      .module-list {
        width: 710rpx;
        display: flex;
        .module-list-item-one {
          width: 100%;
          padding: 30rpx;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          font-size: 24rpx;
          color: #909090;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          span:first-child {
            font-size: 28rpx;
            color: #303030;
            margin-bottom: 10rpx;
          }
          span:last-child {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        .module-list-item-one:last-child {
          border-bottom: 0;
        }
        .module-list-item-two {
          width: 310rpx;
          margin-right: 30rpx;
          display: flex;
          flex-direction: column;
          .module-list-item-img {
            width: 100%;
            height: 200rpx;
            border-radius: 10rpx;
            position: relative;
            img {
              width: 100%;
              height: 200rpx;
              border-radius: 10rpx;
              filter: sepia(40%);
            }
            span {
              font-size: 22rpx;
              color: #fff !important;
              position: absolute;
              bottom: 10rpx;
              right: 10rpx;
            }
            .video-logo {
              width: 50rpx;
              height: 50rpx;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
            }
          }
          span {
            font-size: 28rpx;
            color: #303030;
            margin: 10rpx 0;
          }
          span:last-child {
            font-size: 22rpx;
            color: #909090;
            margin: 0;
          }
        }
        .module-list-item-two:nth-child(2n) {
          margin-right: 0;
        }
        .module-img {
          width: 690rpx;
          height: 372rpx;
          margin: 10rpx auto;
        }
      }
    }
  }
</style>

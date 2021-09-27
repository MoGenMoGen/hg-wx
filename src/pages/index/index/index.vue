<template>
  <div class="home">
    <!-- 顶部背景 -->
    <img class="topBg" src="/static/images/header-bg.png" />
    <!-- 顶部轮播及社区信息 -->
    <div class="topBanner" @click="openWeb">
      <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item.imgUrl" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
      <span class="neighbourhoodName">金邑水岸智慧小区</span>
      <div class="peopleNum">
        <div class="peopleNum-box" v-for="(item, index) in numList" :key="index">
          <span class="peopleNum-title">{{item.title}}</span>
          <span class="peopleNum-num">{{item.num}}</span>
        </div>
      </div>
    </div>
    <!-- 消息通知 -->
    <div class="notice">
      <img src="/static/images/notice.png" style="width: 27rpx; height: 27rpx;" />
      <!-- <span>{{noticeContent}}</span> -->
      <swiper class="notice-swiper" autoplay="true" interval="3000" circular="true" duration="500" vertical="true">
        <block v-for="(item, index) in noticeContent" :key="index">
          <swiper-item class="swiper-item"  @click="moreNotice(item.id)">
            <div>{{item.title}}</div>
          </swiper-item>
        </block>
      </swiper>
      <img src="/static/images/arrowR.png" style="width: 12rpx; height: 22rpx;" />
    </div>
    <!-- 服务列表 -->
    <div class="service-module" v-for="(item, index) in serviceType" :key="index">
      <div class="module-title">{{item.serviceTitle}}</div>
      <div class="module-content">
        <div class="service-content" v-for="(newItem, newIndex) in item.serviceList" :key="newIndex"
          @click="toPage(newItem.flag,newItem.pageUrl)">
          <img :src="newItem.url" style="width: 45rpx;height: 45rpx;" />
          <span>{{newItem.title}}</span>
        </div>
      </div>
    </div>
    <!-- 正在开发中 -->
    <div class="mask" v-if="isDevelop" @click="cancleMask()" catchtouchmove='ture'></div>
    <div class="development" v-if="isDevelop" @click="cancleMask()">
      <img src="/static/images/development.png">
      <span>正在开发中</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        banner: [],
        numList: [{
          title: "居民数",
          num: 0
        }, {
          title: "党员数",
          num: 0
        }, {
          title: "访客数",
          num: 0
        }],
        noticeContent: [],
        serviceType: [{
          serviceTitle: "网格党建",
          serviceList: [{
            url: "/static/images/pioneerBastion.png",
            title: "先锋堡垒",
            width: "41rpx",
            height: "44rpx",
            flag: false,
            pageUrl: "/pages/index/richText/main?pageId=1418034008601710594"
          },{
            url: "/static/images/partyMember.png",
            title: "先锋党员",
            width: "45rpx",
            height: "43rpx",
            flag: false,
            pageUrl: "/pages/community/partyMember/main"
          }, {
            url: "/static/images/partyBuildingActivities.png",
            title: "党建活动",
            width: "43rpx",
            height: "44rpx",
            flag: false,
            pageUrl: "/pages/party/activeList/main"
          },{
            url: "/static/images/partyBuildingInformation.png",
            title: "党建资讯",
            width: "41rpx",
            height: "44rpx",
            flag: false,
            pageUrl: "/pages/party/newsList/main"
          }]
        },{
          serviceTitle: "管家服务",
          serviceList: [{
            url: "/static/images/reportForRepair.png",
            title: "报事报修",
            width: "44rpx",
            height: "44rpx",
            flag: true,
            pageUrl: "/pages/reportRepair/formSubmit/main"
          },{
            url: "/static/images/suggestions.png",
            title: "投诉建议",
            width: "43rpx",
            height: "43rpx",
            flag: false,
            pageUrl: "/pages/suggest/formSubmit/main"
          }, {
            url: "/static/images/faceCollection.png",
            title: "人脸采集",
            width: "44rpx",
            height: "44rpx",
            flag: false,
            pageUrl: "/pages/informationCollect/face/main"
          },{
            url: "/static/images/faceAccessControl.png",
            title: "远程开门",
            width: "39rpx",
            height: "44rpx",
            flag: true,
            pageUrl: "/pages/openDoor/main"
          }, {
            url: "/static/images/propertyScore.png",
            title: "物业评分",
            width: "45rpx",
            height: "45rpx",
            flag: false,
            pageUrl: "/pages/propertyScore/index/main"
            // pageUrl: ""
          }
          // {
          //   url: "/static/images/licensePlateCollection.png",
          //   title: "车牌采集",
          //   width: "53rpx",
          //   height: "44rpx",
          //   flag: false,
          //   pageUrl: ""
          //   // pageUrl: "/pages/informationCollect/car/main"
          // }, {
          //   url: "/static/images/guestAppointment.png",
          //   title: "访客预约",
          //   width: "43rpx",
          //   height: "44rpx",
          //   flag: false,
          //   pageUrl: ""
          // },
          ]
        },{
          serviceTitle: "邻里互助",
          serviceList: [
          //   {
          //   url: "/static/images/garbageClassification.png",
          //   title: "垃圾分类",
          //   width: "46rpx",
          //   height: "44rpx",
          //   flag: false,
          //   pageUrl: "/pages/refuseClassification/main"
          // },
          {
            url: "/static/images/capablePersonShow.png",
            title: "能人展示",
            width: "48rpx",
            height: "38rpx",
            flag: false,
            pageUrl: "/pages/capablePerson/main"
          },{
            url: "/static/images/helpService.png",
            title: "求助服务",
            width: "43rpx",
            height: "42rpx",
            flag: false,
            pageUrl: "/pages/helpServices/formSubmit/main"
          }, {
            url: "/static/images/goodThingsPraise.png",
            title: "邻里互赞",
            width: "42rpx",
            height: "42rpx",
            flag: false,
            pageUrl: "/pages/goodDeed/list/main"
          },
          // {
          //   url: "/static/images/pointsMall.png",
          //   title: "积分商城",
          //   width: "48rpx",
          //   height: "43rpx",
          //   flag: false,
          //   pageUrl: "/pages/shopping/index/main"
          // },
          // {
          //   url: "/static/images/RBList.png",
          //   title: "红黑榜",
          //   width: "45rpx",
          //   height: "45rpx",
          //   flag: false,
          //   pageUrl: "/pages/redAndBlack/main"
          //   // pageUrl: ""
          // },
          {
            url: "/static/images/socialOrganization.png",
            title: "社会组织",
            width: "45rpx",
            height: "43rpx",
            flag: false,
            pageUrl: "/pages/socialOrganization/main"
          }]
        },{
          serviceTitle: "社区服务",
          serviceList: [{
            url: "/static/images/communityThroughTrain.png",
            title: "社区直通车",
            width: "45rpx",
            height: "43rpx",
            flag: false,
            pageUrl: "/pages/community/index/main"
          }, {
            url: "/static/images/communityActivity.png",
            title: "社区活动",
            width: "47rpx",
            height: "46rpx",
            flag: false,
            pageUrl: "/pages/active/list/main"
          }, {
            url: "/static/images/communityGuide.png",
            title: "社区指南",
            width: "47rpx",
            height: "44rpx",
            flag: false,
            pageUrl: "/pages/index/richText/main?pageId=1390613207549169666"
          }, {
            url: "/static/images/residentDiscussion.png",
            title: "居民议事",
            width: "42rpx",
            height: "44rpx",
            flag: false,
            pageUrl: "/pages/discussion/list/main"
          },{
            url: "/static/images/neighbourhoodConvention.png",
            title: "邻里公约",
            width: "41rpx",
            height: "46rpx",
            flag: false,
            pageUrl: "/pages/index/richText/main?pageId=1390613129744830465"
          }]
        }],
        isDevelop: false
      }
    },
    components: {

    },
    async onLoad() {

    },
    onShow() {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 3
      }
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {
        this.api.communityNoticeList(data).then(res => {
          this.noticeContent = res.data.records
        })
        this.api.adrertList("ad01").then(res => {
          this.banner = res
        })
        this.api.homeNum().then(res=>{
           this.numList[0].num = res.all
          this.numList[1].num = res.party
          this.numList[2].num = res.visit
        })
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
      toPage(flag, url) {
        if (url) {
          if (!flag) {
            this.until.aHref(url)
          } else {
            wx.switchTab({
              url
            })
          }
        } else {
          this.isDevelop = true
          let self = this
          setTimeout(function() {
            self.isDevelop = false
          }, 2000)
        }
        // this.until.aHref(url)
      },
      cancleMask() {
        this.isDevelop = false
      },
      moreNotice(id) {
        this.until.aHref('/pages/communityNotification/detail/main?id=' + id)
      },
      openWeb() {
        let url = 'http://pano.gps1.cn//tour/b9e238049aba9f63'
        this.until.aHref('/pages/index/webView/main?url=' + url)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");
  .home:after{
    content: '';
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rpx;
    background-color: #e9e9e9;
    z-index: 10001;
  }

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 0 20rpx 30rpx;
    box-sizing: border-box;

    .topBg {
      width: 750rpx;
      height: 307rpx;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .topBanner {
      width: 710rpx;
      height: 350rpx;
      border-radius: 20rpx;
      position: relative;

      .swiper-container {
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
        overflow: hidden; //超出圆角的隐藏
        transform: translateY(0); //兼容ios

        .swiper-item {
          width: 100%;
          height: 100%;

          .slide-image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .neighbourhoodName {
        background-color: rgba(0, 0, 0, 0.3);
        padding: 9rpx 25rpx;
        color: #FFFFFF;
        font-size: 28rpx;
        border-radius: 42rpx;
        position: absolute;
        top: 20rpx;
        left: 20rpx;
        margin-left: 20rpx;
      }

      .peopleNum {
        width: 670rpx;
        height: 100rpx;
        position: absolute;
        bottom: 20rpx;
        left: 20rpx;
        background-color: #FFFFFF;
        border-radius: 20rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .peopleNum-box {
          width: 222rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgba(0, 0, 0, 0.1);

          .peopleNum-title {
            font-size: 24rpx;
            color: #303030;
          }

          .peopleNum-num {
            font-size: 28rpx;
            color: #FF3000;
          }
        }

        .peopleNum-box:last-child {
          border-right: none;
        }
      }
    }

    .notice {
      width: 710rpx;
      background-color: #fff;
      border-radius: 20rpx;
      padding: 27rpx 30rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin: 20rpx 0;
      .notice-swiper {
        flex: auto;
        height: 40rpx;
        swiper-item {
          width: 100%;
          height: 100%;
          div {
            width: 100%;
            color: #303030;
            font-size: 24rpx;
            margin-left: 20rpx;
            margin-right: 22rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .service-module {
      width: 710rpx;
      margin: 20rpx 0;
      display: flex;
      flex-direction: column;
      padding: 40rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;

      .module-title {
        font-size: 30rpx;
        color: #303030;
      }

      .module-title:before {
        content: "";
        display: inline-block;
        width: 6rpx;
        height: 27rpx;
        background: #EB020E;
        margin-right: 20rpx;
        vertical-align: middle;
      }

      .module-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .service-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 25%;
          margin-top: 40rpx;

          img {
            margin-bottom: 20rpx;
          }

          span {
            font-size: 24rpx;
            color: #303030;
            font-weight: blod;
          }
        }
      }
    }

    .mask {
      position: fixed;
      left: 0px;
      top: 0px;
      background: rgba(0, 0, 0, 0.25);
      width: 100%;
      height: 100%;
      opacity: 1;
      z-Index: 999;
    }

    .development {
      width: 320rpx;
      height: 205rpx;
      background: #fff;
      border-radius: 12rpx;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      font-size: 500;
      color: #303030;

      img {
        width: 37rpx;
        height: 37rpx;
        margin-bottom: 24rpx;
      }
    }
  }
</style>

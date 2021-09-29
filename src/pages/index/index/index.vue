<template>
  <div class="home">
    <!-- 顶部背景 -->
    <img class="topBg" src="/static/images/header-bg.png" />
    <!-- 顶部轮播及空气质量 -->
    <div class="topBanner">
      <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item" mode="aspectFill" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="weatherInfo">
      <div class="weatherInfo-box" v-for="(item, index) in numList" :key="index">
        <img :src="item.img" style="height: 26rpx;" mode="heightFix">
        <span class="weatherInfo-title">{{item.title}}</span>
        <span class="weatherInfo-num">{{item.num}}</span>
      </div>
    </div>
    <!-- 消息通知 -->
    <div class="notice">
      <img src="/static/images/notice.png" style="width: 31rpx; height: 31rpx;" />
      <div class="notice-line"></div>
      <swiper class="notice-swiper" autoplay="true" interval="3000" circular="true" duration="500" vertical="true">
        <block v-for="(item, index) in noticeList" :key="index">
          <swiper-item class="swiper-item" >
            <!-- <div>{{item.title}}</div> -->
            <div @click="moreNotice(newItem.id)" v-for="(newItem,newIndex) in item" :key="newIndex">{{newItem.title}}</div>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 服务列表 -->
    <div class="service-tab">
      <block v-for="(item,index) in serviceType" :key="index">
      <div class="service-item" @click="toPage(item.url)">
        <img :src="item.serviceImg">
        <span>{{item.serviceTitle}}</span>
      </div>
      </block>
    </div>
    <!-- 投票和上报 -->
    <div class="twoLineBox" v-if="personType==0||personType==3">
      <div class="line-top">
        <img src="/static/images/vote.png">
        <span>我参与</span>
      </div>
      <div class="line-bottom">
        <div @click="toPage('/pages/honest/apply/main?type=2')">
          <img src="/static/images/vote-apply.png">
          <span>发起投票</span>
        </div>
        <div @click="toPage('/pages/honest/list/main?selectIndex=2')">
          <img src="/static/images/vote-join.png">
          <span>参与投票</span>
        </div>
      </div>
    </div>
    <div class="oneLineBox" v-if="personType!=0&&personType!=3">
      <div class="line-left">
        <img src="/static/images/vote.png">
        <span>我参与</span>
      </div>
      <div class="line-right" @click="toPage('/pages/honest/list/main?selectIndex=2')">
        <img src="/static/images/vote-join.png">
        <span>参与投票</span>
      </div>
    </div>
    <div class="oneLineBox">
      <div class="line-left">
        <img src="/static/images/report.png">
        <span>我发现</span>
      </div>
      <div class="line-right" @click="scanCode">
        <img src="/static/images/scan.png">
        <span>扫一扫 <span style="color: #909090;">（上报违规内容）</span></span>
      </div>
    </div>
    <div class="oneLineBox">
      <div class="line-left">
        <img src="/static/images/cmss.png">
        <span>我说事</span>
      </div>
      <div class="line-right" @click="toPage('/pages/honest/apply/main?type=3')">
        <img src="/static/images/sayThing.png">
        <span>请你来说事</span>
      </div>
    </div>
    <!-- 展示内容 -->
    <!-- 党员活动 -->
    <div class="module">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/dyhd.png">
          <span>党员活动</span>
        </div>
        <div class="module-right" @click="toPage('/pages/party/list/main?selectIndex=1')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-swiper">
        <swiper class="active-swiper" autoplay="true" interval="3000" circular="true" duration="500" @change="activeIndexChange">
          <block v-for="(item, index) in activeList" :key="index">
            <swiper-item class="active-item" @click.stop="toPage('/pages/party/activeDetail/main?id='+item.id)">
              <img :src="item.img" mode="aspectFill">
              <div class="active-right">
                <span class="active-title">【 {{item.name}} 】</span>
                <div class="active-info">
                  <span><img src="/static/images/time-logo.png">{{item.startTime}}</span>
                  <span><img src="/static/images/people-logo.png"><span style="color: #EC2C17;">{{item.signTotal}}</span>人参与</span>
                </div>
              </div>
            </swiper-item>
          </block>
        </swiper>
        <div class="dots">
          <block v-for="(item, index) in activeList" :key="index">
            <div :class="{'dots-active':activeIndex==index}"></div>
          </block>
        </div>
      </div>
    </div>
    <!-- 村民说事 -->
    <div class="module">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/cmss.png">
          <span>公共说事栏</span>
        </div>
        <div class="module-right" @click="toPage('/pages/honest/list/main?selectIndex=1')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-list">
        <div class="module-list-item" v-for="(item,index) in sayList" :key="index" @click="toPage('/pages/honest/say/main?id='+item.id)">
          <img :src="item.img" mode="aspectFill">
          <div class="list-right">
            <span class="list-title">{{item.name}}</span>
            <div class="list-info">
              <span><img src="/static/images/time-logo.png">{{item.createTime}}</span>
              <span><img src="/static/images/msg-logo.png">{{item.commentNum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 清风廉韵 -->
    <div class="module">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/qfly.png">
          <span>清风廉韵</span>
        </div>
        <div class="module-right" @click="toPage('/pages/honest/list/main?selectIndex=3')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-swiper">
        <swiper class="honest-swiper" autoplay="true" interval="3000" circular="true" duration="500" @change="honestIndexChange">
          <block v-for="(item, index) in qflyList" :key="index">
            <swiper-item class="honest-item" @click="toPage('/pages/honest/list/main?selectIndex=3')">
              <img :src="item.img" mode="aspectFill">
              <span class="honest-title">【 {{item.name}} 】</span>
            </swiper-item>
          </block>
        </swiper>
        <div class="dots">
          <block v-for="(item, index) in qflyList" :key="index">
            <div :class="{'dots-active':honestIndex==index}"></div>
          </block>
        </div>
      </div>
    </div>
    <!-- 通知公告 -->
    <div class="module">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/tzgg.png">
          <span>通知公告</span>
        </div>
        <div class="module-right" @click="toPage('/pages/convenience/list/main?selectIndex=4')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-list">
        <div class="module-list-item" style="flex-direction: column;" v-for="(item,index) in noticeContent" :key="index" @click="moreNotice(item.id)">
          <span class="list-item-title"> · {{item.title}}</span>
          <span class="list-item-time"><img src="/static/images/time-logo.png">{{item.createTime}}</span>
        </div>
      </div>
    </div>
    <bottomBase></bottomBase>
  </div>
</template>

<script>
  import bottomBase from '@/components/bottomBase'
  export default {
    data() {
      return {
        banner: [],
        numList: [{
          img: '/static/images/qing.png',
          title: "晴",
          num: 0
        }, {
          img: '/static/images/pm.png',
          title: "PM2.5：",
          num: 0
        }, {
          img: '/static/images/o2.png',
          title: "负氧离子含量：",
          num: 12000
        }],
        serviceType: [{
          serviceTitle: "智慧党建",
          serviceImg: "/static/images/zhdj.png",
          url: '/pages/party/list/main'
        }, {
          serviceTitle: "智慧旅游",
          serviceImg: "/static/images/zhly.png",
          url: '/pages/travel/list/main'
        }, {
          serviceTitle: "清廉九龙",
          serviceImg: "/static/images/qljl.png",
          url: '/pages/honest/list/main'
        }, {
          serviceTitle: "便民服务",
          serviceImg: "/static/images/bmfw.png",
          url: '/pages/convenience/list/main'
        }],
        noticeContent: [{name:1},{name:2},{name:3},{name:4},{name:5}],
        loginType: 1,
        activeIndex: 0,
        honestIndex: 0,
        activeList: [],
        noticeList: [],
        sayList: [], //公共说事栏列表
        personType: '', //角色
        qflyList: [{
          img: 'http://llzx.jinkworld.com:9000/llzx/upload/20210731/80382d179d303869f74728c8be050ebf.jpg',
          name: '清廉阵地'
        },{
          img: 'http://llzx.jinkworld.com:9000/llzx/upload/20210731/80382d179d303869f74728c8be050ebf.jpg',
          name: '家风民俗'
        },{
          img: 'http://llzx.jinkworld.com:9000/llzx/upload/20210731/80382d179d303869f74728c8be050ebf.jpg',
          name: '忽微积患'
        }]
      }
    },
    components: {
      bottomBase
    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      this.api.verifyToken().then(() => {
        this.api.adrertList('home').then(res => {
          this.banner = res.records[0].img.split(",")
        })
        this.getList()
      });
      this.api.getWeather().then(res=>{
        this.numList[0].num = res.tem2 + '~' + res.tem1 + '℃' //温度
        this.numList[0].title = res.wea + ' ' //天气名字
        this.numList[0].img = '/static/images/' + res.wea_img + '.png' //天气图片
        this.numList[1].num = res.air_pm25 //pm2.5
      })
    },
    onShow() {
      this.personType = wx.getStorageSync('loginInfo').personType
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
      activeIndexChange(e) {
        this.activeIndex = e.mp.detail.current
      },
      honestIndexChange(e) {
        this.honestIndex = e.mp.detail.current
      },
      scanCode() {
        wx.scanCode({
          success :res=> {
            this.toPage('/'+res.path)
            // this.toPage('/pages/index/scan/main?id='+res.result)
          }
        })
      },
      getList(){
        let data = {
          current:1,
          size:4,
        }
        this.api.getActiveList(data).then(res => {
          res.records.forEach(item => {
            item.startTime = item.startTime.substring(0,10)
          })
          this.activeList = res.records
        })
        this.api.getNoticeList(data).then(res => {
          res.records.forEach(item => {
            item.createTime = item.createTime.substring(0,10)
          })
          this.noticeContent = res.records
          for(let i=0,len=res.records.length;i<len;i+=2){
            this.noticeList.push(res.records.slice(i,i+2));
          }
        })
        let data2 = {
          size: 4,
          current: 1,
          type: 1
        }
        this.api.getSayList(data2).then(res => {
          res.records.forEach(item=>{
            item.handleTime = item.handleTime.substring(0,10)
          })
          this.sayList = res.records
        })
      },
      moreNotice(id) {
        this.toPage('/pages/index/newDetail/main?id='+id+'&typeid=1')
      },
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
      height: 292rpx;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    .topBanner {
      width: 710rpx;
      height: 300rpx;
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
    }

    .weatherInfo {
      width: 710rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 30rpx auto;
      .weatherInfo-box {
        display: flex;
        align-items: center;
        padding-right: 30rpx;
        box-sizing: border-box;
        border-right: 1px solid rgba(0, 0, 0, 0.2);
        img {
          margin-right: 10rpx;
        }
        .weatherInfo-title,.weatherInfo-num {
          font-size: 24rpx;
          color: #303030;
        }
      }

      .weatherInfo-box:last-child {
        border-right: none;
        padding-right: 0;
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
      .notice-line {
        width: 2rpx;
        height: 44rpx;
        background-color: rgba(0,0,0,0.1);
        margin: 0 30rpx;
      }
      .notice-swiper {
        flex: auto;
        height: 80rpx;
        swiper-item {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          div {
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

    .service-tab {
      width: 710rpx;
      margin: 40rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .service-item {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 20rpx;
        }
        span {
          font-size: 24rpx;
          color: #303030;
        }
      }
    }

    .twoLineBox {
      display: flex;
      flex-direction: column;
      width: 710rpx;
      border-radius: 20rpx;
      background-color: #fff;
      .line-top {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;
        color: #EC2C17;
        font-size: 28rpx;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        img {
          width: 28rpx;
          height: 28rpx;
          margin-right: 17rpx;
        }
      }
      .line-bottom {
        display: flex;
        align-items: center;
        padding: 40rpx 0;
        div {
          width: 50%;
          border-right: 1px solid rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #303030;
          font-size: 24rpx;
          img {
            width: 38rpx;
            height: 38rpx;
            margin-bottom: 10rpx;
          }
        }
        div:last-child {
          border-right: none;
        }
      }
    }

    .oneLineBox {
      width: 710rpx;
      display: flex;
      align-items: center;
      border-radius: 20rpx;
      background-color: #fff;
      padding: 11rpx 0;
      box-sizing: border-box;
      margin: 20rpx auto;
      .line-left {
        padding: 26rpx 30rpx;
        border-right: 1px solid rgba(0,0,0,0.1);
        font-size: 28rpx;
        color: #EC2C17;
        display: flex;
        align-items: center;
        img {
          width: 28rpx;
          height: 28rpx;
          margin-right: 17rpx;
        }
      }
      .line-right {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #303030;
        padding-left: 100rpx;
        box-sizing: border-box;
        img {
          width: 43rpx;
          height: 43rpx;
          margin-right: 26rpx;
        }
      }
    }

    .module {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 20rpx auto;
      .module-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        .module-left {
          display: flex;
          align-items: center;
          color: #EC2C17;
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
          color: #606060;
          font-size: 20rpx;
          img {
            width: 8rpx;
            height: 15rpx;
            margin-left: 17rpx;
          }
        }
      }
      .module-swiper {
        width: 670rpx;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        .active-swiper {
          width: 670rpx;
          height: 260rpx;
          border-radius: 20rpx;
          background-color: #fff;
          box-shadow: 0px 4px 24px 0px rgba(151, 151, 151, 0.27);
          overflow: hidden; //超出圆角的隐藏
          transform: translateY(0); //兼容ios
          .active-item {
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
            .active-right {
              max-width: 280rpx;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .active-title {
                font-size: 26rpx;
                color: #303030;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .active-info {
                max-width: 280rpx;
                display: flex;
                flex-direction: column;
                color: #909090;
                font-size: 24rpx;
                img {
                  width: 21rpx;
                  height: 21rpx;
                  margin-right: 15rpx;
                }
              }
            }
          }
        }
        .honest-swiper {
          width: 670rpx;
          height: 413rpx;
          border-radius: 20rpx;
          background-color: #fff;
          box-shadow: 0px 4px 24px 0px rgba(151, 151, 151, 0.27);
          overflow: hidden; //超出圆角的隐藏
          transform: translateY(0); //兼容ios
          .honest-item {
            width: 670rpx;
            height: 413rpx;
            padding: 30rpx;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            img {
              width: 610rpx;
              height: 310rpx;
              border-radius: 5rpx;
              flex-shrink: 1;
            }
            .honest-title {
              width: 100%;
              text-align: center;
              font-size: 26rpx;
              color: #303030;
              margin: 18rpx auto;
              margin-bottom: 30rpx;
            }
          }
        }
        .dots {
          width: 670rpx;
          height: 7rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30rpx auto;
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
        .module-list-item {
          padding: 30rpx;
          box-sizing: border-box;
          border-top: 1px solid rgba(0,0,0,0.1);
          display: flex;
          img {
            width: 300rpx;
            height: 200rpx;
            border-radius: 5rpx;
            flex-shrink: 1;
            margin-right: 30rpx;
          }
          .list-right {
            max-width: 280rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .list-title {
              font-size: 26rpx;
              color: #303030;
            }
            .list-info {
              max-width: 280rpx;
              display: flex;
              flex-direction: column;
              color: #909090;
              font-size: 24rpx;
              img {
                width: 21rpx;
                height: 21rpx;
                margin-right: 15rpx;
              }
            }
          }
          .list-item-title {
            color: #303030;
            font-size: 26rpx;
          }
          .list-item-time {
            color: #909090;
            font-size: 24rpx;
            img {
              width: 21rpx;
              height: 21rpx;
              margin-right: 16rpx;
            }
          }
        }
      }
    }
    .btn-class {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40rpx 0;
      div {
        width: 214rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        border-radius: 60rpx;
        color: #fff;
        background-color: #599BFF;
        font-size: 24rpx;
      }
    }
  }
</style>

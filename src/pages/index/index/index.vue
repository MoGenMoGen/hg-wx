<template>
  <div class="home">
    <!-- 顶部轮播 -->
    <div class="topBanner">
      <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <img class="slide-image" :src="item" mode="aspectFill" />
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
    <!-- 消息通知 -->
    <div class="notice">
      <div class="notice-left">
        <span>园区</span>
        <span>公告</span>
      </div>
      <div class="notice-line"></div>
      <swiper class="notice-swiper" autoplay="true" interval="3000" circular="true" duration="500" vertical="true">
        <block v-for="(item, index) in noticeList" :key="index">
          <swiper-item class="swiper-item" >
            <div @click="moreNotice(newItem.id)" v-for="(newItem,newIndex) in item" :key="newIndex">· {{newItem.title}}</div>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 展示内容 -->
    <!-- 园区空间 -->
    <div class="module">
      <img class="module-bg" src="/static/images/item-bg.png" mode="widthFix">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/yqkj.png">
          <span>园区空间</span>
        </div>
        <div class="module-right" @click="toPage('/pages/party/list/main?selectIndex=1')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-swiper">
        <swiper class="active-swiper" autoplay="true" interval="3000" circular="true" duration="500" @change="areaIndexChange">
          <block v-for="(item, index) in areaList" :key="index">
            <swiper-item class="active-item">
              <img :src="item.img" mode="aspectFill">
              <div class="active-right">
                <span class="active-title">{{item.name}}</span>
                <div class="active-info">
                  <span><img src="/static/images/phone.png">{{item.phone}}</span>
                  <span><img src="/static/images/address-logo.png">{{item.area}}</span>
                  <span><img src="/static/images/address-logo.png">{{item.address}}</span>
                </div>
              </div>
            </swiper-item>
          </block>
        </swiper>
        <div class="dots">
          <block v-for="(item, index) in areaList" :key="index">
            <div :class="{'dots-active':areaIndex==index}"></div>
          </block>
        </div>
      </div>
    </div>
    <!-- 新闻资讯 -->
    <div class="module">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/xwzx.png">
          <span>新闻资讯</span>
        </div>
        <div class="module-right" @click="toTabPage('/pages/dynamic/index/main','2')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-list">
        <div class="module-list-item" v-for="(item,index) in newsList" :key="index" @click="toPage('/pages/honest/say/main?id='+item.id)">
          <img :src="item.img" mode="aspectFill">
          <div class="list-right">
            <span class="list-title">{{item.name}}</span>
            <div class="list-info">
              <span><img src="/static/images/time-logo.png">{{item.createTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 创新活动 -->
    <div class="module">
      <img class="module-bg" src="/static/images/item-bg.png" mode="widthFix">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/cxhd.png">
          <span>创新活动</span>
        </div>
        <div class="module-right" @click="toTabPage('/pages/dynamic/index/main','1')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-swiper">
        <swiper class="honest-swiper" autoplay="true" interval="3000" circular="true" duration="500" @change="honestIndexChange">
          <block v-for="(item, index) in cxhdList" :key="index">
            <swiper-item class="honest-item" @click="toPage('/pages/honest/list/main?selectIndex=3')">
              <img :src="item.img" mode="aspectFill">
              <span class="honest-title">{{item.name}}</span>
              <div class="honest-info">
                <span><img src="/static/images/start-time.png">{{item.startTime}}</span>
                <span><img src="/static/images/end-time.png">{{item.endTime}}</span>
                <span style="width: 100%;"><img src="/static/images/address-logo.png">{{item.address}}</span>
              </div>
            </swiper-item>
          </block>
        </swiper>
        <div class="dots">
          <block v-for="(item, index) in cxhdList" :key="index">
            <div :class="{'dots-active':honestIndex==index}"></div>
          </block>
        </div>
      </div>
    </div>
    <!-- 优质项目 -->
    <div class="module">
      <div class="module-title">
        <div class="module-left">
          <img src="/static/images/yzxm.png">
          <span>优质项目</span>
        </div>
        <div class="module-right" @click="toPage('/pages/convenience/list/main?selectIndex=4')">
          <span>查看更多</span>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="module-list2">
        <div class="module-list-item2" style="flex-direction: column;" v-for="(item,index) in projList" :key="index" @click="moreNotice(item.id)">
          <img :src="item.img">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        banner: ['https://admin.zlhuiyun.com/storage/202006/18/79TZzanmeCccNrVEj5UVwTMiXCLjKxu1.jpg'],
        serviceType: [{
          serviceTitle: "供需资源",
          serviceImg: "/static/images/gxzy.png",
          url: '/pages/index/resources/main'
        }, {
          serviceTitle: "园区党建",
          serviceImg: "/static/images/yqdj.png",
          url: ''
        }, {
          serviceTitle: "投融资",
          serviceImg: "/static/images/trz.png",
          url: '/pages/workBench/investmentAndFinancing/main'
        }, {
          serviceTitle: "预约参观",
          serviceImg: "/static/images/yycg.png",
          url: '/pages/workBench/subscribeVisit/main'
        },{
          serviceTitle: "装修管理",
          serviceImg: "/static/images/zxgl.png",
          url: '/pages/workBench/decorationManagement/main'
        }, {
          serviceTitle: "报修管理",
          serviceImg: "/static/images/bxgl.png",
          url: '/pages/workBench/repairManagement/main'
        }, {
          serviceTitle: "政策申报",
          serviceImg: "/static/images/zcsb.png",
          url: '/pages/index/policyDeclaration/main'
        }, {
          serviceTitle: "科技资源",
          serviceImg: "/static/images/kjzy.png",
          url: ''
        }],
        noticeContent: [{
          title:'周末值班通知',
        },{
          title:'2021年杭钢半山数字经济小镇第一季…',
        }],
        loginType: 1,
        areaIndex: 0,
        honestIndex: 0,
        areaList: [{
          name: '杭钢半山数字经济小镇',
          img: 'https://admin.zlhuiyun.com/storage/202109/07/banner4.jpeg',
          phone: '0571-85032537',
          area: '1162000m²',
          address: '杭州市3墅区半山路345号'
        },{
          name: '杭钢半山数字经济小镇',
          img: 'https://admin.zlhuiyun.com/storage/202109/07/banner4.jpeg',
          phone: '0571-85032537',
          area: '1162000m²',
          address: '杭州市3墅区半山路345号'
        }],
        noticeList: [],
        newsList: [{
          img:'https://admin.zlhuiyun.com/storage/202006/18/JbHGDRgwPqdlWLCSucURYlqOAnpAIt0z.jpg',
          name:'中国建党100年庆祝晚会',
          createTime: '2021-05-10'
        },{
          img:'https://admin.zlhuiyun.com/storage/202006/18/JbHGDRgwPqdlWLCSucURYlqOAnpAIt0z.jpg',
          name:'中国建党100年庆祝晚会',
          createTime: '2021-05-10'
        },{
          img:'https://admin.zlhuiyun.com/storage/202006/18/JbHGDRgwPqdlWLCSucURYlqOAnpAIt0z.jpg',
          name:'中国建党100年庆祝晚会',
          createTime: '2021-05-10'
        }],
        cxhdList: [{
          img: 'http://llzx.jinkworld.com:9000/llzx/upload/20210731/80382d179d303869f74728c8be050ebf.jpg',
          name: '杭钢半山数字经济小镇',
          startTime: '2021-09-01  08:00:00',
          endTime: '2021-10-01  12:00:00',
          address: '杭州市3墅区半山路345号'
        },{
          img: 'http://llzx.jinkworld.com:9000/llzx/upload/20210731/80382d179d303869f74728c8be050ebf.jpg',
          name: '杭钢半山数字经济小镇',
          startTime: '2021-09-01  08:00:00',
          endTime: '2021-10-01  12:00:00',
          address: '杭州市3墅区半山路345号'
        },{
          img: 'http://llzx.jinkworld.com:9000/llzx/upload/20210731/80382d179d303869f74728c8be050ebf.jpg',
          name: '杭钢半山数字经济小镇',
          startTime: '2021-09-01  08:00:00',
          endTime: '2021-10-01  12:00:00',
          address: '杭州市3墅区半山路345号'
        }],
        projList: [{
          img: 'https://admin.zlhuiyun.com/storage/202105/31/1.jpg',
          name: '载体政策宣讲'
        },{
          img: 'https://admin.zlhuiyun.com/storage/202105/31/1.jpg',
          name: '载体政策宣讲'
        },{
          img: 'https://admin.zlhuiyun.com/storage/202105/31/1.jpg',
          name: '载体政策宣讲'
        },{
          img: 'https://admin.zlhuiyun.com/storage/202105/31/1.jpg',
          name: '载体政策宣讲'
        }]
      }
    },
    components: {
    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      // this.api.verifyToken().then(() => {
      // });
      for(let i=0,len=this.noticeContent.length;i<len;i+=2){
        this.noticeList.push(this.noticeContent.slice(i,i+2));
      }
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
      toTabPage(url,index) {
        if(index) {
          this.until.seSave('titleIndex',index)
        }
        wx.switchTab({
          url
        })
      },
      areaIndexChange(e) {
        this.areaIndex = e.mp.detail.current
      },
      honestIndexChange(e) {
        this.honestIndex = e.mp.detail.current
      },
      moreNotice(id) {
        // this.toPage('/pages/index/newDetail/main?id='+id+'&typeid=1')
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
    box-sizing: border-box;

    .topBanner {
      width: 750rpx;
      height: 400rpx;
      .swiper-container {
        width: 100%;
        height: 100%;
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

    .service-tab {
      background-color: #fff;
      width: 710rpx;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      padding: 45rpx;
      padding-bottom: 0;
      box-sizing: border-box;
      border-radius: 20rpx;
      position: relative;
      top: -30rpx;
      .service-item {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 45rpx;
        img {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 10rpx;
        }
        span {
          font-size: 24rpx;
          color: #303030;
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
      margin: 0 auto 20rpx;
      .notice-left {
        font-size: 28rpx;
        color: #FF5400;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
      }
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

    .module {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 20rpx auto;
      position: relative;
      z-index: 1;
      .module-bg {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }
      .module-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        z-index: 3;
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
        z-index: 3;
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
                span {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
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
              font-size: 26rpx;
              color: #303030;
              margin: 18rpx auto;
              margin-bottom: 30rpx;
            }
            .honest-info {
              display: flex;
              flex-wrap: wrap;
              font-size: 24rpx;
              color: #909090;
              span {
                width: 50%;
                display: flex;
                align-items: center;
                img {
                  width: 23rpx;
                  height: 23rpx;
                  margin-right: 5rpx;
                }
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
      .module-list2 {
        width: 100%;
        padding: 30rpx;
        padding-bottom: 0;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid rgba(0,0,0,0.1);
        .module-list-item2 {
          width: 310rpx;
          margin-bottom: 40rpx;
          margin-right: 30rpx;
          display: flex;
          flex-direction: column;
          font-size: 28rpx;
          color: #303030;
          img {
            width: 310rpx;
            height: 200rpx;
            border-radius: 10rpx;
            margin-bottom: 10rpx;
          }
        }
        .module-list-item2:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
</style>

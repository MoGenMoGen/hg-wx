<template>
  <div>
    <!-- 党建活动 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/drhdyg.png">
            <span>活动预告</span>
          </div>
          <div class="module-right" @click="toPage('/pages/party/activeList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
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
                    <span class="list-status bg-red" v-if="item.state=='未开始'">未开始</span>
                    <span class="list-status bg-blue" v-if="item.state=='进行中'">进行中</span>
                    <span class="list-status bg-gray" v-if="item.state=='已结束'">已结束</span>
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
    </div>
    <!-- 三会一课 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/shyk.png">
            <span>三会一课+主题党员活动</span>
          </div>
          <div class="module-right" style="font-size: 20rpx;color: #FFF;" @click="toPage('/pages/party/meetsClass/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="flex-direction: column;">
          <div class="module-list-item-one" v-for="(item,index) in partClassList" :key="index" @click="toPage('/pages/party/activeDetail/main?id='+item.id)">
            <span>· {{item.name}}</span>
            <span>{{item.synopsis}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 点亮微心愿 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/dlwxy.png">
            <span>点亮微心愿</span>
          </div>
          <div class="module-right" @click="toPage('/pages/party/wishList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="display: flex;flex-direction: column;">
          <div class="module-list-title">
            总数：<span style="color: #EC2C17;">{{all}}</span>个
            <div style="width: 30rpx;"></div>
            已点亮：<span style="color: #EC2C17;">{{ok}}</span>个
          </div>
          <div class="module-list-item" style="align-items: center;justify-content: space-between;" v-for="(item,index) in wishList" :key="index" @click="toPage('/pages/party/wishDetail/main?id='+item.id)">
            <div class="module-list-wish-left">
              <span>{{item.title}}</span>
              <span><img src="/static/images/wish-name.png">{{item.wishName}}</span>
              <span><img src="/static/images/wish-phone.png">{{item.wishMob}}</span>
            </div>
            <img :src="item.status==1?'/static/images/receive.png':'/static/images/receive-u.png'" style="width: 35rpx;height: 38rpx;margin-right: 0;">
          </div>
          <div class="module-list-btn" @click="toPage('/pages/party/wishApply/main')"><span>申请</span></div>
        </div>
      </div>
    </div>
    <!-- 户居分离党员 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/hjfldy.png">
            <span>户居分离党员</span>
          </div>
          <div class="module-right" @click="toPage('/pages/party/separateList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="display: flex;flex-direction: column;">
          <div class="module-list-item" v-for="(item,index) in separateList" :key="index" @click="toPage('/pages/partyMember/detail/main?type=1&id='+item.id)">
            <div class="list-img">
              <img :src="item.img" mode="aspectFill">
              <img src="/static/images/partyLogo.png" class="party-logo">
            </div>
            <div class="list-right">
              <div>
                <span class="list-name">{{item.name}}</span>
                <div class="list-info">
                  <span>{{item.deptNm}}</span>
                </div>
              </div>
              <span class="list-more">查看详情 ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 党费缴纳 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/dfjn.png">
            <span>党费缴纳</span>
          </div>
          <div class="module-right">
            <div class="picker-box">
              <picker @change="changeParty" :value="partyIndex" :range="partyList" range-key="dictValue" class='pickerClass'>
                <view>
                  {{partyList[partyIndex].dictValue}}
                </view>
              </picker>
            </div>
            <img src="/static/images/arrowDownW.png" style="width: 18rpx;height: 10rpx;">
          </div>
        </div>
        <div class="module-list">
          <div class="module-party-money">
            <div class="module-party-money-left module-party-money-common">
              <span>{{num}}</span>
              <span>人</span>
            </div>
            <span>上月缴费人数</span>
          </div>
          <div class="module-party-money">
            <div class="module-party-money-right module-party-money-common">
              <span>{{cost}}</span>
              <span>元</span>
            </div>
            <span>上月缴费金额</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 先锋榜 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/xfb.png">
            <span>先锋榜</span>
          </div>
          <div class="module-right" @click="toPage('/pages/party/pioneerList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="display: flex;flex-direction: column;">
          <div class="module-list-item" v-for="(item,index) in topList" :key="index" @click="toPage('/pages/partyMember/detail/main?type=2&id='+item.id)">
            <img :src="item.img" mode="aspectFill" style="width: 200rpx;height: 250rpx;">
            <div class="list-right" style="max-width: 420rpx;">
              <div>
                <span class="list-name" style="max-width: 420rpx;">{{item.name}}</span>
                <!-- <div class="list-info" style="max-width: 420rpx;">
                  <span class="two-more">先锋事迹：{{item.deed}}</span>
                </div> -->
              </div>
              <span class="list-more">查看详情 ></span>
            </div>
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
        state: 1,
        partyList: [],
        partyIndex: 0,
        wishList: [],
        all: 0,
        ok: 0,
        partClassList: [],
        topList: [],
        separateList: [],
        cost: 0,
        num: 0,
        activeList: []
      }
    },
    components: {},
    async onLoad() {
      this.api.getDataList('party').then(res=>{
        this.partyList = res
      })
      this.getList()
    },
    onShow() {

    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      activeIndexChange(e) {
        this.activeIndex = e.mp.detail.current
      },
      changeParty(e) {
        this.partyIndex = e.mp.detail.value
        let data = {
          dept: this.partyList[this.partyIndex].dictKey
        }
        this.api.getPartCost(data).then(res => {
          this.cost = res.cost
          this.num = res.num
        })
      },
      getList() {
        this.api.getWishData().then(res => {
          this.all = res.all
          this.ok = res.ok
        })
        this.api.getWishList({current:1,size:5}).then(res => {
          this.wishList = res.records
        })
        this.api.getTopList({current:1,size:5}).then(res => {
          this.topList = res.records
        })
        this.api.getSeparateList({current:1,size:5}).then(res => {
          this.separateList = res.records
        })
        this.api.getPartCost().then(res => {
          this.cost = res.cost
          this.num = res.num
        })
        // 活动预告
        let data = {
          current:1,
          size:3,
          startTime_gt:this.until.formatTime(new Date().getTime()).substring(0,10)
        }
        this.api.getActiveList(data).then(res => {
          res.records.forEach(item => {
            item.startTime = item.startTime.substring(0,10)
          })
          this.activeList = res.records
        })
        // 结束活动，三会一课
        let data2 = {
          current:1,
          size:3,
          endTime_lt:this.until.formatTime(new Date().getTime()).substring(0,10)
        }
        this.api.getActiveList(data2).then(res => {
          res.records.forEach(item => {
            item.startTime = item.startTime.substring(0,10)
          })
          this.partClassList = res.records
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../css/common.less");
  .bg-blue {
    background-color: #1794EC;
  }
  .bg-red {
    background-color: #EC2C17;
  }
  .bg-gray {
    background-color: #ACACAC;
  }
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
          .picker-box {
            font-size: 24rpx;
            .pickerClass {
              text-align: right;
            }
          }
        }
      }
      .module-swiper {
        width: 670rpx;
        margin: 20rpx auto;
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
                .list-status {
                  width: 113rpx;
                  height: 38rpx;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 24rpx;
                  color: #fff;
                  border-radius: 19rpx;
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
        .module-list-title {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 30rpx;
          box-sizing: border-box;
        }
        .module-list-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30rpx;
          box-sizing: border-box;
          border-top: 1px solid rgba(0,0,0,0.1);
          span {
            width: 270rpx;
            height: 70rpx;
            text-align: center;
            line-height: 70rpx;
            background-color: #EC2C17;
            border-radius: 35rpx;
            font-size: 30rpx;
            color: #fff;
          }
        }
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
          .list-img {
            position: relative;
            // margin-right: 30rpx;
            img {
              width: 200rpx;
              height: 250rpx;
              border-radius: 20rpx;
            }
            .party-logo {
              width: 60rpx;
              height: 60rpx;
              position: absolute;
              bottom: 8rpx;
              right: 8rpx;
            }
          }
          .list-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .list-name {
              max-width: 320rpx;
              font-size: 28rpx;
              color: #303030;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .list-info {
              max-width: 420rpx;
              display: flex;
              flex-direction: column;
              color: #909090;
              font-size: 24rpx;
              margin-top: 30rpx;
              img {
                width: 21rpx;
                height: 21rpx;
                margin-right: 15rpx;
              }
              .two-more {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
            }
            .list-more {
              font-size: 24rpx;
              color: #EC2C17;
            }
            .list-status {
              width: 113rpx;
              height: 38rpx;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 24rpx;
              color: #fff;
              border-radius: 19rpx;
            }
          }
          .module-list-wish-left {
            display: flex;
            flex-direction: column;
            span {
              display: flex;
              align-items: center;
              font-size: 24rpx;
              color: #909090;
              max-width: 470rpx;
              img {
                width: 21rpx;
                height: 21rpx;
                margin-right: 9rpx;
              }
            }
            span:first-child {
              color: #303030;
              font-size: 28rpx;
            }
          }
        }
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
          img {
            width: 100%;
            height: 200rpx;
            border-radius: 10rpx;
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
        .module-party-money {
          display: flex;
          flex-direction: column;
          width: 50%;
          align-items: center;
          justify-content: center;
          font-size: 24rpx;
          color: #303030;
          padding: 40rpx 0;
          .module-party-money-common {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 24rpx;
            color: #606060;
            width: 167rpx;
            height: 167rpx;
            box-sizing: border-box;
            margin-bottom: 10rpx;
            span:first-child {
              font-size: 36rpx;
            }
          }
          .module-party-money-left {
            border: 20rpx solid #F39423;
            span:first-child {
              color: #F39423;
            }
          }
          .module-party-money-right {
            border: 20rpx solid #5087EC;
            span:first-child {
              color: #5087EC;
            }
          }
        }
      }
    }
  }
</style>

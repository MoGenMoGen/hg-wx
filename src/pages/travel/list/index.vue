<template>
  <div class="home">
    <!-- 轮播 -->
    <commonSwiper :banner="banner"></commonSwiper>
    <!-- 顶部背景 -->
    <img src="/static/images/topBg.png" class="topBg">
    <!-- 导航 -->
    <div class="tab-box">
      <div class="spotInfo">
        <div class="spotInfo-box" v-for="(item, index) in numList" :key="index">
          <img :src="item.img" style="width: 26rpx;height: 26rpx;">
          <span class="spotInfo-title">{{item.title}}</span>
          <span class="spotInfo-num">{{item.num}}</span>
        </div>
      </div>
      <div class="tab-inner">
        <block v-for="(item,index) in tabList" :key="index">
          <div @click="choose(index)">
            <img :src="item.url" v-if="selectIndex!=index">
            <img :src="item.selectUrl" v-if="selectIndex==index">
            <span>{{item.title}}</span>
            <img class="select-img" src="/static/images/selectImg.png" v-if="selectIndex==index">
          </div>
        </block>
      </div>
    </div>
    <!-- 数据 -->
    <div class="num-info" v-if="selectIndex==0">
      <span style="color: #EC2C17;">
        <picker @change="changePick" :value="pickIndex" :range="pickList" range-key="name" class='pickerClass'>
          <view>
            {{pickList[pickIndex].name}}
          </view>
        </picker>
        <img src="/static/images/arrowDown.png">
      </span>
      <div></div>
      <span v-if="pickIndex==0">共计<span style="color: #EC2C17;">{{total}}</span>家</span>
      <span v-if="pickIndex==1">共计<span style="color: #EC2C17;">{{total}}</span>碗</span>
      <span v-if="pickIndex==2">共计<span style="color: #EC2C17;">{{total}}</span>家</span>
      <span v-if="pickIndex==3">共计<span style="color: #EC2C17;">{{total}}</span>人</span>
    </div>
    <div class="num-info" v-if="selectIndex==1">
      <span style="color: #EC2C17;">民宿、酒店</span>
      <div></div>
      <span>共计<span style="color: #EC2C17;">{{total}}</span>家</span>
    </div>
    <div class="num-info" v-if="selectIndex==2">
      <span style="color: #EC2C17;">
        <picker @change="changePick2" :value="pickIndex2" :range="pickList2" range-key="name" class='pickerClass'>
          <view>
            {{pickList2[pickIndex2].name}}
          </view>
        </picker>
        <img src="/static/images/arrowDown.png">
      </span>
      <div></div>
      <span>共计<span style="color: #EC2C17;">{{total}}</span>个</span>
    </div>
    <div class="num-info" v-if="selectIndex==3">
      <span style="color: #EC2C17;">特色购物</span>
      <div></div>
      <span>共计<span style="color: #EC2C17;">{{total}}</span>家</span>
    </div>
    <!-- 列表 -->
    <!-- 美食 -->
    <block v-if="selectIndex==0">
      <!-- 农家乐 -->
      <block v-if="pickIndex==0">
        <div class="list-box">
          <div class="module">
            <div class="module-title">
              <div class="module-left">
                <img src="/static/images/eat-logo.png">
                <span>农家乐</span>
              </div>
            </div>
            <div class="module-list">
              <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/travel/eat/main?id='+item.id)">
                <img :src="item.img" mode="aspectFill">
                <div class="list-right" style="justify-content: flex-start;">
                  <span class="list-name list-monitor" style="margin-bottom: 20rpx;">
                    <span>{{item.name}}</span>
                    <img src="/static/images/monitor.png" v-if="item.monitor" @click.stop="toPage('/pages/travel/monitor/main?monitor='+item.monitor)">
                  </span>
                  <div class="list-info">
                    <!-- <span style="display: flex;align-items: center;margin-bottom: 5rpx;">
                      <img src="/static/images/star.png" v-for="(item,index2) in item.star" :key="index2">
                      <img src="/static/images/star-u.png" v-for="(item,index3) in item.ustar" :key="index3">
                    </span> -->
                    <span>负责人：{{item.owner}}</span>
                    <span>联系电话：{{item.mob}}</span>
                    <span style="display: flex;align-items: center;">
                      <span style="margin-right: 40rpx;">餐饮：{{item.type=='service_eat'||item.type=='service_all'?'有':'无'}}</span>
                      <span>住宿：{{item.type=='service_hotel'||item.type=='service_all'?'有':'无'}}</span>
                    </span>
                    <span>地址：{{item.address}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </block>
      <!-- 九大碗 -->
      <block v-if="pickIndex==1">
        <div class="list-box">
          <div class="module">
            <div class="module-title">
              <div class="module-left">
                <img src="/static/images/ten-logo.png">
                <span>九大碗</span>
              </div>
            </div>
            <div class="module-img">
              <div class="module-img-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/travel/ten/main?id='+item.id)">
                <img :src="item.img" mode="aspectFill">
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </block>
      <!-- 乡村西餐 -->
      <block v-if="pickIndex==2">
        <div class="list-box">
          <div class="module">
            <div class="module-title">
              <div class="module-left">
                <img src="/static/images/west-logo.png">
                <span>乡村西餐</span>
              </div>
            </div>
            <div class="module-list">
              <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/travel/west/main?type=1&id='+item.id)">
                <img :src="item.img[0]" mode="aspectFill">
                <div class="list-right" style="justify-content: flex-start;">
                  <span class="list-name" style="margin: 20rpx 0;">{{item.name}}</span>
                  <span class="list-name" style="margin: 10rpx 0;">联系人：{{item.owner}}</span>
                  <span class="list-name" style="margin: 10rpx 0;" @click.stop="callPhone(item.mob)">联系电话：{{item.mob}}</span>
                  <span class="list-name" style="margin: 10rpx 0;">地址：{{item.address}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </block>
      <!-- 代驾联盟 -->
      <block v-if="pickIndex==3">
        <div class="list-box">
          <div class="module">
            <div class="module-title">
              <div class="module-left">
                <img src="/static/images/drive-logo.png">
                <span>代驾联盟</span>
              </div>
            </div>
            <div class="module-list">
              <div class="module-list-item" v-for="(item,index) in list" :key="index" style="align-items: center;">
                <div class="list-left">{{index + 1}}</div>
                <div class="list-right">
                  <span class="list-name">{{item.name}}</span>
                  <div class="list-info">
                    <span>性别：{{sexList[item.sex]}}</span>
                    <span>驾龄：{{item.driveAge}}年</span>
                    <span @click="callPhone(item.mob)" style="font-weight: bold;color: #333333;">手机号码：{{item.mob}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </block>
    </block>
    <!-- 住宿 -->
    <block v-if="selectIndex==1">
      <div class="list-box">
        <div class="module">
          <div class="module-title">
            <div class="module-left">
              <img src="/static/images/hotel-logo.png">
              <span>民宿</span>
            </div>
          </div>
          <div class="module-list">
            <div class="module-list-item" v-for="(item,index) in list2" :key="index" @click="toPage('/pages/travel/eat/main?type=2&id='+item.id)">
              <img :src="item.img" mode="aspectFill">
              <div class="list-right" style="justify-content: flex-start;">
                <span class="list-name" style="margin-bottom: 20rpx;">{{item.name}}</span>
                <div class="list-info">
                  <span>负责人：{{item.owner}}</span>
                  <span>联系电话：{{item.mob}}</span>
                  <span>餐饮：有</span>
                  <span>地址：{{item.address}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-box">
        <div class="module">
          <div class="module-title">
            <div class="module-left">
              <img src="/static/images/hotel-logo.png">
              <span>酒店</span>
            </div>
          </div>
          <div class="module-list">
            <div class="module-list-item" v-for="(item,index) in list1" :key="index" @click="toPage('/pages/travel/eat/main?type=2&id='+item.id)">
              <img :src="item.img" mode="aspectFill">
              <div class="list-right">
                <span class="list-name">{{item.name}}</span>
                <div class="list-info">
                  <span>负责人：{{item.owner}}</span>
                  <span>联系电话：{{item.mob}}</span>
                  <span>餐饮：有</span>
                  <span>地址：{{item.address}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </block>
    <!-- 游玩 -->
    <block v-if="selectIndex==2">
      <div class="list-box">
        <div class="module">
          <div class="module-title">
            <div class="module-left">
              <img src="/static/images/site-logo.png">
              <span>游玩景点</span>
            </div>
            <div class="module-right" @click="toPage('/pages/travel/video/main')">
              <span style="color: #EC2C17;font-size: 28rpx;">宣传视频</span>
            </div>
          </div>
          <div class="module-list">
            <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/travel/site/main?id='+item.id)">
              <img :src="item.img[0]" mode="aspectFill">
              <div class="list-right" style="justify-content: flex-start;">
                <span class="list-name">{{item.name}}</span>
                <div class="list-info">
                  <span class="four-line">{{item.introduce}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </block>
    <!-- 购物 -->
    <block v-if="selectIndex==3">
      <div class="list-box">
        <div class="module">
          <div class="module-title">
            <div class="module-left">
              <img src="/static/images/shop-logo.png">
              <span>特色购物</span>
            </div>
          </div>
          <div class="module-list">
            <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/travel/shop/main?id='+item.id)">
              <img :src="item.img" mode="aspectFill">
              <div class="list-right" style="justify-content: flex-start;">
                <span class="list-name" style="margin: 10rpx 0;">{{item.name}}</span>
                <div class="list-info" style="height: 90%;">
                  <span class="two-more">介绍内容：{{item.summary}}</span>
                  <!-- <span>地址：{{item.address}}</span>
                  <span>联系人：{{item.owner}}</span>
                  <span @click.stop="callPhone(item.mob)">电话：{{item.mob}}</span> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
  import commonSwiper from '@/components/commonSwiper'
  export default {
    data() {
      return {
        banner: [],
        list: [],
        numList: [{
          img: '/static/images/parking.png',
          title: "剩余停车位：",
          num: 0
        }, {
          img: '/static/images/peopleVolume.png',
          title: "人流量：",
          num: 0
        }, {
          img: '/static/images/carVolume.png',
          title: "车流量：",
          num: 0
        }],
        sexList: ['未知','男','女'],
        tabList: [{
          title: '美食',
          url: '/static/images/eatLogo-u.png',
          selectUrl: '/static/images/eatLogo.png'
        },{
          title: '住宿',
          url: '/static/images/hotelLogo-u.png',
          selectUrl: '/static/images/hotelLogo.png'
        },{
          title: '游玩',
          url: '/static/images/siteLogo-u.png',
          selectUrl: '/static/images/siteLogo.png'
        },{
          title: '购物',
          url: '/static/images/shopLogo-u.png',
          selectUrl: '/static/images/shopLogo.png'
        },{
          title: '掌上九龙',
          url: '/static/images/mini.png',
          selectUrl: '/static/images/mini.png'
        }],
        pickList: [{
          name: '农家乐'
        },{
          name: '九大碗'
        },{
          name: '乡村西餐'
        },{
          name: '代驾联盟'
        }],
        pickIndex: 0,
        pickList2: [{
          name: '游玩景点'
        },{
          name: '红色旅游'
        }],
        pickIndex2: 0,
        current: 1,
        total: 0,
        selectIndex: 0,
        list2: [],
        list1: []
      }
    },
    components: {
      commonSwiper
    },
    onLoad(e) {
      Object.assign(this.$data, this.$options.data())
      this.api.verifyToken().then(() => {
        this.api.adrertList('home').then(res => {
          this.banner = res.records[0].img.split(",")
        })
      });
      let data = {
        current: 1,
        size: 10
      }
      this.getList(data)
      this.getParam()
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        this.getList(data)
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
      choose(index) {
        if(index==4) {
          wx.navigateToMiniProgram({
            appId: 'wx888759ad0f311dfb',
            path: 'myPackage/pages/tickets/all',
            envVersion: 'release',
            success(res) {
              console.log(res);
            }
          })
        } else {
          this.selectIndex = index
          this.current = 1
          this.list = []
          let data = {
            current: 1,
            size: 10
          }
          this.getList(data)
        }
      },
      changePick(e) {
        this.pickIndex = e.mp.detail.value
        this.current = 1
          this.list = []
          let data = {
            current: 1,
            size: 10
          }
        this.getList(data)
      },
      changePick2(e){
        if(e.mp.detail.value==1) {
          this.toPage('/pages/party/list/main?selectIndex=3')
        }
      },
      getList(data) {
        if(this.selectIndex==0) {
          if(this.pickIndex==0) {
            this.api.getEatList(data).then(res=>{
              res.records.forEach(item=>{
                item.ustar = 5-item.star
              })
              this.list = this.list.concat(res.records)
              this.total = res.total
            })
          } else if(this.pickIndex==1) {
            this.api.getTenList(data).then(res=> {
              this.list = this.list.concat(res.records)
              this.total = res.total
            })
          } else if (this.pickIndex==2) {
            this.api.getWestList(data).then(res => {
              res.records.forEach(item => {
                item.img = item.img.split(",")
              })
              this.list = this.list.concat(res.records)
              this.total = res.total
            })
          } else if (this.pickIndex==3) {
            this.api.getDriveList(data).then(res => {
              this.list = this.list.concat(res.records)
              this.total = res.total
            })
          }
        } else if (this.selectIndex==1){
          this.api.getHotelList(data).then(res => {
            this.list1 = []
            this.list2 = []
            this.list = this.list.concat(res.records)
            this.list.forEach(item => {
              if(item.type == 1) {
                this.list1.push(item)
              } else {
                this.list2.push(item)
              }
            })
            this.total = res.total
          })
        } else if (this.selectIndex==2) {
          this.api.getSiteList(data).then(res => {
            res.records.forEach(item => {
              item.img = item.img.split(",")
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
        } else if (this.selectIndex==3){
          this.api.getShopList(data).then(res => {
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
        }
      },
      callPhone(phone){
        wx.makePhoneCall({
          phoneNumber: phone
        })
      },
      getParam() {
        this.api.getParam('parking').then(res => {
          this.numList[0].num = res.records[0].paramValue
        })
        this.api.getPassengerFlow().then(res => {
          this.numList[1].num = res.list[0].flowInNum
        })
        this.api.getCarNum().then(res => {
          this.numList[2].num = res.total
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
    // padding: 0 20rpx 30rpx;
    box-sizing: border-box;
    .topBg {
      width: 100%;
      height: 198rpx;
      display: block;
    }
    .tab-box {
      width: 750rpx;
      height: 470rpx;
      // margin: 30rpx auto;
      padding: 202rpx 30rpx 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // align-items: center;
      // justify-content: space-between;
      background-color: #fff;
      border-bottom: 2rpx solid #DDDDDD;
      .spotInfo {
        width: 710rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;
        .spotInfo-box {
          display: flex;
          align-items: center;
          padding-right: 20rpx;
          box-sizing: border-box;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          img {
            margin-right: 10rpx;
          }
          .spotInfo-title,.spotInfo-num {
            font-size: 24rpx;
            color: #303030;
          }
        }

        .spotInfo-box:last-child {
          border-right: none;
          padding-right: 0;
        }
      }
      .tab-inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          width: 20%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding: 20rpx 0;
          padding-top: 0;
          margin-top: 40rpx;
          img {
            width: 100rpx;
            height: 100rpx;
          }
          span {
            color: #333333;
            font-size: 28rpx;
          }
          .select-img {
            width: 108rpx;
            height: 10rpx;
            position: absolute;
            bottom: 0;
          }
        }
      }
    }
    .num-info {
      width: 640rpx;
      display: flex;
      align-items: center;
      margin: 40rpx auto;
      span {
        font-size: 28rpx;
        color: #333333;
        display: flex;
        align-items: center;
      }
      div {
        width: 2rpx;
        height: 32rpx;
        background-color: #EC2C17;
        margin: 0 30rpx;
      }
      .pickerClass {
        flex: 1;
      }
      img {
        width: 18rpx;
        height: 11rpx;
        flex-shrink: 1;
        margin-left: 10rpx;
      }
    }
    .list-box {
      width: 710rpx;
      background-color: #fff;
      margin: 20rpx auto;
      border-radius: 14rpx;
      display: flex;
      flex-direction: column;
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
      .module-list {
        width: 710rpx;
        .module-list-item {
          padding: 30rpx;
          box-sizing: border-box;
          border-top: 1px solid rgba(0,0,0,0.1);
          display: flex;
          img {
            width: 300rpx;
            height: 250rpx;
            border-radius: 5rpx;
            flex-shrink: 1;
            margin-right: 30rpx;
          }
          .list-img {
            position: relative;
            margin-right: 40rpx;
            img {
              width: 160rpx;
              height: 160rpx;
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
          .list-left {
            width: 67rpx;
            height: 67rpx;
            margin-right: 40rpx;
            background-color: #EC2C17;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30rpx;
            color: #fff;
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
            .list-monitor {
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                width: 270rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
              img {
                width: 27rpx;
                height: 31rpx;
                margin-right: 0;
              }
            }
            .list-info {
              max-width: 320rpx;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              color: #909090;
              font-size: 24rpx;
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
      }
      .module-img {
        width: 710rpx;
        padding: 30rpx 30rpx 0 30rpx;
        box-sizing: border-box;
        border-top: 1px solid rgba(0,0,0,0.1);
        display: flex;
        flex-wrap: wrap;
        .module-img-item {
          width: 310rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 40rpx;
          margin-right: 30rpx;
          font-size: 28rpx;
          color: #303030;
          img {
            width: 310rpx;
            height: 200rpx;
            border-radius: 10rpx;
            margin-bottom: 20rpx;
          }
        }
        .module-img-item:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
    .four-line {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
    }
  }
</style>

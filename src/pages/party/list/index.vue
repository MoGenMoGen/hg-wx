<template>
  <div class="home">
    <!-- 轮播 -->
    <commonSwiper :banner="banner"></commonSwiper>
    <!-- 顶部背景 -->
    <img src="/static/images/topBg.png" class="topBg">
    <!-- 导航 -->
    <div class="tab-box">
      <block v-for="(item,index) in tabList" :key="index">
        <div @click="choose(index)">
          <img :src="item.url" v-if="selectIndex!=index">
          <img :src="item.selectUrl" v-if="selectIndex==index">
          <span>{{item.title}}</span>
          <img class="select-img" src="/static/images/selectImg.png" v-if="selectIndex==index">
        </div>
      </block>
    </div>
    <!-- 列表 -->
    <!-- 红色课堂 -->
    <block v-if="selectIndex==0">
      <redClass></redClass>
    </block>
    <!-- 牢记使命 -->
    <block v-if="selectIndex==1">
      <mission></mission>
    </block>
    <!-- 支部力量 -->
    <block v-if="selectIndex==2">
      <branchStrength></branchStrength>
    </block>
    <!-- 红色足迹 -->
    <block v-if="selectIndex==3">
      <div class="red-map">
        <img src="/static/images/redMap.png">
        <div style="width: 90rpx;height: 70rpx;position: absolute;left: 120rpx;top: 480rpx;" @click="toView('scene_PANO01')"></div> <!--九龙湖红色历史陈列馆-->
        <div style="width: 100rpx;height: 60rpx;position: absolute;left: 190rpx;top: 292rpx;" @click="toView('scene_002')"></div> <!--兵哥哥-->
        <div style="width: 120rpx;height: 60rpx;position: absolute;left: 190rpx;top: 224rpx;" @click="toView('scene_003')"></div> <!--红色记忆-->
        <div style="width: 50rpx;height: 60rpx;position: absolute;left: 160rpx;top: 140rpx;" @click="toView('scene_004')"></div> <!--连心桥-->
        <div style="width: 80rpx;height: 80rpx;position: absolute;left: 220rpx;top: 140rpx;" @click="toView('scene_005')"></div> <!--红色九龙湖牌坊-->
        <div style="width: 140rpx;height: 46rpx;position: absolute;left: 260rpx;top: 60rpx;" @click="toView('scene_012')"></div> <!--红色主题庭院-->
        <div style="width: 92rpx;height: 40rpx;position: absolute;left: 344rpx;top: 112rpx;" @click="toView('scene_011')"></div> <!--红色长廊-->
        <div style="width: 82rpx;height: 40rpx;position: absolute;left: 346rpx;top: 162rpx;" @click="toView('scene_011')"></div> <!--荷花池-->
        <div style="width: 100rpx;height: 40rpx;position: absolute;left: 334rpx;top: 206rpx;" @click="toView('scene_009')"></div> <!--创意草原-->
        <div style="width: 60rpx;height: 54rpx;position: absolute;left: 432rpx;top: 60rpx;" @click="toView('scene_014')"></div> <!--岗哨-->
        <div style="width: 50rpx;height: 50rpx;position: absolute;left: 440rpx;top: 150rpx;" @click="toView('scene_018')"></div> <!--知青馆-->
        <div style="width: 86rpx;height: 50rpx;position: absolute;left: 516rpx;top: 24rpx;" @click="toView('scene_022')"></div> <!--碉堡-->
        <div style="width: 86rpx;height: 50rpx;position: absolute;left: 494rpx;top: 98rpx;" @click="toView('scene_020')"></div> <!--集合广场-->
        <div style="width: 72rpx;height: 50rpx;position: absolute;left: 504rpx;top: 150rpx;" @click="toView('scene_019')"></div> <!--时光邮局-->
        <div style="width: 110rpx;height: 50rpx;position: absolute;left: 584rpx;top: 200rpx;" @click="toView('scene_023')"></div> <!--我与国旗同框-->
        <div style="width: 70rpx;height: 40rpx;position: absolute;left: 508rpx;top: 240rpx;" @click="toView('scene_024')"></div> <!--施工记忆墙-->
        <div style="width: 114rpx;height: 54rpx;position: absolute;left: 538rpx;top: 280rpx;" @click="toView('scene_024')"></div> <!--红色教育基地-->
        <div class="red-bottom">点击标点位置进入全景游览</div>
      </div>
    </block>
  </div>
</template>

<script>
  import commonSwiper from '@/components/commonSwiper'
  import redClass from '@/components/redClass'
  import mission from '@/components/mission'
  import branchStrength from '@/components/branchStrength'
  export default {
    data() {
      return {
        banner: [],
        tabList: [{
          title: '红色课堂',
          url: '/static/images/redClass-u.png',
          selectUrl: '/static/images/redClass.png'
        },{
          title: '牢记使命',
          url: '/static/images/mission-u.png',
          selectUrl: '/static/images/mission.png'
        },{
          title: '支部力量',
          url: '/static/images/branchStrength-u.png',
          selectUrl: '/static/images/branchStrength.png'
        },{
          title: '红色足迹',
          url: '/static/images/redFeet-u.png',
          selectUrl: '/static/images/redFeet.png'
        }],
        selectIndex: 0,
      }
    },
    components: {
      commonSwiper,redClass,mission,branchStrength
    },
    onLoad(e) {
      Object.assign(this.$data, this.$options.data())
      this.api.verifyToken().then(() => {
        this.api.adrertList('home').then(res => {
          this.banner = res.records[0].img.split(",")
        })
      });
      if(e.selectIndex){
        this.selectIndex = e.selectIndex
      }
    },
    onShow() {

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
        this.selectIndex = index
      },
      toView(data) {
        let url = 'https://szxcwx.jinkworld.com/pan002/'+data+'/tour.html'
        this.until.aHref('/pages/party/webView/main?url=' + url)
      },
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");
  .home {
    min-height: 100vh;
    width: 100vw;
    padding-bottom: 20rpx;
    box-sizing: border-box;
    .topBg {
      width: 100%;
      height: 198rpx;
      display: block;
    }
    .tab-box {
      width: 750rpx;
      height: 402rpx;
      // margin: 30rpx auto;
      padding: 182rpx 30rpx 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 2rpx solid #DDDDDD;
      div {
        width: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 20rpx 0;
        img {
          width: 140rpx;
          height: 140rpx;
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
    .red-map {
      width: 710rpx;
      height: 658rpx;
      margin: 20rpx auto;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .red-bottom {
        width: 100%;
        margin: 20rpx auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28rpx;
        color: #333;
      }
    }
  }
</style>

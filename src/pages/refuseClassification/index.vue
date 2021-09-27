<template>
  <div class="home">
    <search @searchEvent="searchKeyWord($event)"></search>
    <!-- 轮播 -->
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item.imgUrl" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 垃圾分类 -->
    <span class="title">垃圾分类</span>
    <div class="trash-btn">
      <block v-for="(item, index) in records" :key="index">
        <div class="trash-inner" @click="showTips(index)">
          <img :src="item.img"  mode="aspectFit">
          <span>{{item.title}}</span>
        </div>
      </block>
    </div>
    <!-- 列表 -->
    <span class="title" style="display: inline-block;margin-bottom: 30rpx;">垃圾分一分 生活美十分</span>
    <block v-for="(item, index) in list" :key="index">
      <div class="list-box" @click="toPage('/pages/index/newDetail/main?typeid=3&id='+item.id)">
        <div class="list-left">
          <div>{{item.title}}</div>
          <span>{{item.createTime}}</span>
        </div>
        <img :src="item.img" mode="aspectFill">
      </div>
    </block>
    <!-- 弹窗 -->
    <div class="mask" v-if="isShow" catchtouchmove='ture' @click="closeTips('show')"></div>
    <div class="mask" v-if="isSearch" catchtouchmove='ture' @click="closeTips('search')"></div>
    <!-- 分类弹窗 -->
    <div class="tips-box" v-if="isShow">
      <img :src="logo" class="tips-headImg" mode="aspectFit">
      <div class="close" @click="closeTips('show')"></div>
      <span class="tips-title" >{{garbageTitle}}</span>
      <div class="tips-cont">
        <div v-html="garbageContent"></div>
      </div>
    </div>
    <!-- 搜索弹窗 -->
    <div class="tips-box" v-if="isSearch">
      <img :src="garbage_img" class="tips-headImg" mode="aspectFit">
      <div class="close" @click="closeTips('search')"></div>
      <span class="tips-title">{{cate_name}}</span>
      <div class="tips-cont">{{garbage_name}}</div>
      <div class="tips-detail">
        <div>PS:</div>
        <div>{{ps}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search'
  export default {
    data() {
      return {
        isShow: false,
        isSearch: false,
        banner: [],
        trashList: [{
          url: "/static/images/recyclableTrash.png",
          title: "可回收物"
        }, {
          url: "/static/images/hazardousWaste.png",
          title: "有害垃圾"
        }, {
          url: "/static/images/kitchenWaste.png",
          title: "厨余垃圾"
        }, {
          url: "/static/images/otherGarbage.png",
          title: "其他垃圾"
        }],
        list: [],
        current: 1,
        total: 0,
        records: [],
        garbageTitle: "",
        garbageImg: "",
        garbageContent: "",
        garbage_img: "",
        cate_name: "",
        garbage_name: "",
        logo: "",
        ps: ""
      }
    },
    components: {
      search
    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10
      }
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.api.adrertList("ad06").then(res => {
          this.banner = res
        })
        this.refresh(data);
        this.api.garbageType(data).then((res) => {
          this.records = res.data.records
        })
      });
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
        this.refresh(data);
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
        this.api.garbageNewsList(data).then((res) => {
          res.data.records.forEach((item) => {
            item.createTime = item.createTime.substring(0,16)
            item.img = item.img.split(",")[0]
          })
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
        })
      },
      showTips(index) {
        this.isShow = true
        this.garbageTitle = this.records[index].title
        this.garbageImg = this.records[index].img
        this.logo = this.records[index].logo
        // this.garbageContent = this.records[index].content
        this.garbageContent = this.until.imgStyle(this.records[index].content)

      },
      closeTips(str) {
        if(str == "show") {
          this.isShow = false
        } else {
          this.isSearch = false
        }
      },
      searchKeyWord(e) {
        let data = {
          text: e.mp.detail.value
        }
        this.api.garbageTextSearch(data).then((res) => {
          if(res.result.result.garbage_info) {
            let resData = res.result.result.garbage_info[0]
            if(resData.cate_name == "可回收物") {
              this.garbage_img = "/static/images/recyclableTrash.png"
            } else if(resData.cate_name == "厨余垃圾") {
              this.garbage_img = "/static/images/kitchenWaste.png"
            } else if(resData.cate_name == "有害垃圾") {
              this.garbage_img = "/static/images/hazardousWaste.png"
            } else if(resData.cate_name == "其他垃圾") {
              this.garbage_img = "/static/images/otherGarbage.png"
            }
            this.isSearch = true
            this.cate_name = resData.cate_name
            this.garbage_name = resData.garbage_name
            this.ps = resData.ps
          } else {
            wx.showToast({
              title: '未搜索到该垃圾',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 30rpx;
    box-sizing: border-box;

    .swiper-container {
      width: 690rpx;
      height: 276rpx;
      margin: 0 auto 60rpx;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 20rpx;
      overflow: hidden;
      transform: translateY(0);

      .swiper-item {
        width: 100%;
        height: 100%;

        .slide-image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .title {
      font-size: 32rpx;
      font-weight: 500;
      line-height: 44rpx;
      color: #333;
    }
    .trash-btn {
      width: 690rpx;
      margin: 30rpx auto 76rpx;
      padding: 6rpx 22rpx 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .trash-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24rpx;
        font-size: 400;
        line-height: 34rpx;
        color: #333;
        img {
          width: 96rpx;
          height: 176rpx;
          margin-bottom: 20rpx;
        }
      }
    }
    .list-box {
      width: 690rpx;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 14rpx;
      margin-bottom: 20rpx;
      .list-left {
        display: flex;
        flex-direction: column;
        div {
          max-width: 470rpx;
          text-align: justify;
          font-size: 28rpx;
          font-size: 500;
          line-height: 40rpx;
          color: #333;
          margin-bottom: 10rpx;
        }
        span {
          font-size: 24rpx;
          font-size: 400;
          line-height: 34rpx;
          color: #999;
        }
      }
      img {
        width: 144rpx;
        height: 144rpx;
        border-radius: 6rpx;
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
    .tips-box {
      width: 520rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      border-radius: 14rpx;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
      .tips-headImg {
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        border: 8rpx solid #fff;
        margin-top: -56rpx;
        background-color: #EAE3DE;
      }
      .close {
        width: 40rpx;
        height: 40rpx;
        position: relative;
        top: -80rpx;
        right: -220rpx;
      }
      .close:before, .close:after {
      content: '';
      position: absolute;
      height: 2rpx;
      width: 40rpx;
      background: #000;
      }

      .close:before {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      }

      .close:after {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      }
      .tips-title {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #666;
        display: inline-block;
        margin-bottom: 42rpx;
      }
      .tips-cont {
        width: 440rpx;
        margin: 0 auto;
        // padding: 40rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
        color: #2F7FFF;
        text-align: center;
        // .cont-inner {
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   font-size: 20rpx;
        //   font-size: 400;
        //   line-height: 28rpx;
        //   color: #666;
        //   margin-bottom: 12rpx;
        //   margin-right: 26rpx;
        //   img {
        //     width: 104rpx;
        //     height: 104rpx;
        //     margin-bottom: 2rpx;
        //   }
        // }
        // .cont-inner:nth-child(3n+0) {
        //   margin-right: 0;
        // }
      }
      .tips-detail {
        width: 440rpx;
        height: 160rpx;
        background: rgba(203, 226, 255, 0.35);
        border-radius: 14rpx;
        padding: 20rpx 28rpx 38rpx;
        box-sizing: border-box;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #A0A0A0;
        margin: 42rpx auto;
        display: flex;
        justify-content: flex-start;
        div:last-child {
          max-width: 330rpx;
          margin-left: 6rpx;
          text-align: justify;
        }
      }
    }
  }
</style>

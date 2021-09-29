<template>
  <div class="home">
    <div class="info-box">
      <span>项目名称：{{info.name}}</span>
      <span>工程规模及造价：{{info.fund}}</span>
      <span>造价进度：{{statusType[info.status]}}</span>
    </div>
    <div class="submit-box" :class="{'isShow':selectIndex==index}" v-for="(item,index) in list" :key="index"
      @click="clickThis(index)">
      <div class="title">上报内容<img src="/static/images/arrowDownG.png" :class="{'isRotate':selectIndex==index}"></div>
      <div class="content">{{item.cont}}</div>
      <div class="content-img">
        <img v-if="newItem" :src="newItem" mode="aspectFill" v-for="(newItem,newIndex) in item.img" :key="newIndex">
      </div>
    </div>
    <div class="btn-class" v-if="canUpload">
      <div @click="toPage('/pages/convenience/report/main?id='+id)">上报</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        statusType: ['未开始', '进行中', '已结束'],
        content: '',
        imgList: [],
        id: '',
        showBtn: false,
        selectIndex: 0,
        current: 1,
        total: 0,
        list: [],
        canUpload: false
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      if (wx.getStorageSync('loginInfo').personType == 0 || wx.getStorageSync('loginInfo').personType == 3) {
        this.canUpload = true
      } else {
        this.canUpload = false
      }
      this.id = options.id
      this.api.getProjectDetail({
        id: options.id
      }).then(res => {
        this.info = res
      })
      if (wx.getStorageSync('loginInfo').personType == 0 || wx.getStorageSync('loginInfo').personType == 3) {
        this.showBtn = true
      }
      let data = {
        current: 1,
        size: 10,
        projectId: this.id
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          projectId: this.id
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
        size: 10,
        projectId: this.id
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
      clickThis(index) {
        this.selectIndex = index
      },
      getList(data) {
        this.api.getUploadList(data).then(res => {
          res.records.forEach(item => {
            item.img = item.img.split(",")
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
    padding-bottom: 100rpx;
    box-sizing: border-box;

    .info-box {
      width: 690rpx;
      display: flex;
      flex-direction: column;
      font-size: 28rpx;
      color: #333333;
      padding: 0 30rpx;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 20rpx;
      margin: 30rpx auto;

      span {
        padding: 20rpx 0;
        border-bottom: 1px solid #D0CED8;
      }

      span:last-child {
        border-bottom: none;
      }
    }

    .submit-box {
      background-color: #fff;
      padding: 30rpx;
      width: 690rpx;
      box-sizing: border-box;
      margin: 30rpx auto;
      border-radius: 20rpx;
      height: 130rpx;
      overflow: hidden;

      .title {
        width: 100%;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: space-between;

        img {
          width: 18rpx;
          height: 10rpx;
        }

        .isRotate {
          transform: rotate(180deg);
          transition: .5s;
        }
      }

      .content {
        width: 100%;
        margin-bottom: 40rpx;
      }

      .content-img {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        img {
          width: 200rpx;
          height: 175rpx;
          margin-right: 10rpx;
          margin-bottom: 10rpx;
        }

        img:nth-child(3n) {
          margin-right: 0;
        }
      }
    }

    .isShow {
      height: auto;
    }

    .btn-class {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;
      position: fixed;
      bottom: 40rpx;
      left: 50%;
      transform: translateX(-50%);

      div {
        width: 214rpx;
        height: 64rpx;
        color: #fff;
        background-color: #599BFF;
        font-size: 24rpx;
        border-radius: 60rpx;
        line-height: 64rpx;
        text-align: center;
      }
    }
  }
</style>

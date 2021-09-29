<template>
  <div class="home">
    <div class="info-title">工作职能</div>
    <div class="info-cont">
      <div v-html="info.cont"></div>
    </div>
    <div class="info-title">人员组成</div>
    <div class="build-item">
      <div class="build-inner-box" style="flex-direction: column;">
        <div class="build-line-title">
          <div style="width: 80rpx;">序号</div>
          <div style="width: 130rpx;">姓名</div>
          <div style="width: 130rpx;">出生年月</div>
          <div style="width: 200rpx;">工作单位</div>
          <div style="width: 170rpx;">联系电话</div>
        </div>
        <div :class="{odd:index%2==1,even:index%2==0}" class="build-line-item" v-for="(item,index) in list" :key="index">
          <div style="width: 80rpx;">{{index+1}}</div>
          <div style="width: 130rpx;">{{item.name}}</div>
          <div style="width: 130rpx;">{{item.birthday}}</div>
          <div style="width: 200rpx;">{{item.address}}</div>
          <div style="width: 170rpx;">{{item.mob}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        info: {},
        list: []
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      this.api.getSuperviseDetail({id:options.id}).then(res => {
        this.info = res
      })
      let data = {
        pid: options.id,
        current: 1,
        size: 20
      }
      this.api.getSupervisorList(data).then(res => {
        res.records.forEach(item => {
          item.birthday = item.birthday.substring(0,7)
        })
        this.list = res.records
      })
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
    .info-title {
      width: 710rpx;
      margin: 20rpx auto;
      font-size: 32rpx;
      color: #333333;
    }
    .info-cont {
      width: 690rpx;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 20rpx;
      padding: 30rpx;
      box-sizing: border-box;
    }
    .build-item {
      width: 100%;
      background-color: #fff;
      border-radius: 20rpx;
      padding: 20rpx;
      box-sizing: border-box;
      .build-inner-box {
        // display: inline-block;
        .build-line-title {
          background-color: #265EFF;
          font-size: 24rpx;
          color: #fff;
          border-top-left-radius: 8rpx;
          border-top-right-radius: 8rpx;
          display: flex;
          align-items: center;
          height: 90rpx;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #fff;
            box-sizing: border-box;
            height: 100%;
            text-align: center;
            flex-shrink: 1;
          }
          div:last-child {
            border-right: none;
          }
        }
        .build-line-item {
          font-size: 24rpx;
          color: #fff;
          display: flex;
          align-items: center;
          height: 90rpx;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #fff;
            box-sizing: border-box;
            text-align: center;
            padding: 5rpx;
            height: 100%;
            line-height: 45rpx;
            flex-shrink: 1;
          }
          div:last-child {
            word-break: break-all;
            border-right: none;
          }
        }
        .odd {
          background-color: #599BFF;
        }
        .even {
          background-color: #A6C9FF;
        }
      }
    }
  }
</style>

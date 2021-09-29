<template>
  <div class="home">
    <div class="sunShine-item">
      <div class="sunShine-inner-box" style="padding: 20rpx 10rpx;flex-direction: column;">
        <div class="sunShine-line-title" style="height: 70rpx;line-height: 70rpx;">
          <div style="width: 80rpx;">序号</div>
          <div style="width: 240rpx;">项目名称</div>
          <div style="width: 240rpx;">工程规模及造价</div>
          <div style="width: 130rpx;">进展情况</div>
        </div>
        <div :class="{odd:index%2==1,even:index%2==0}" class="sunShine-line-item" v-for="(item,index) in list"
          :key="index" @click="toPage('/pages/convenience/reportList/main?id='+item.id)">
          <div style="width: 80rpx;">{{index+1}}</div>
          <div style="width: 240rpx;">{{item.name}}</div>
          <div style="width: 240rpx;">{{item.fund}}</div>
          <div style="width: 130rpx;">{{statusType[item.status]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [], //资产管理列表,
        current: 1,
        total: 0,
        statusType: ['未开始','进行中','已结束'],
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 20
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
          size: 20
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
        size: 20
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
      getList(data) {
        data.project = '0'
        this.api.getProjectList(data).then(res => {
          this.list = res.records
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
    padding: 20rpx;
    box-sizing: border-box;
      .sunShine-item {
        width: 710rpx;
        margin: 20rpx auto;
        display: flex;
        flex-direction: column;
        border-radius: 10rpx;
        background-color: #fff;
        .sunShine-inner-box {
          width: 100%;
          border-radius: 20rpx;
          background-color: #fff;
          display: flex;
          align-items: center;
          padding: 40rpx;
          box-sizing: border-box;
          font-size: 28rpx;
          color: #000000;

          .sunShine-line-title {
            width: 690rpx;
            background-color: #265EFF;
            font-size: 24rpx;
            color: #fff;
            border-top-left-radius: 8rpx;
            border-top-right-radius: 8rpx;
            display: flex;
            align-items: center;

            div {
              display: flex;
              justify-content: center;
              align-items: center;
              border-right: 1px solid #fff;
              box-sizing: border-box;
            }

            div:last-child {
              border-right: none;
            }
          }

          .sunShine-line-item {
            width: 690rpx;
            font-size: 22rpx;
            color: #606060;
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
              img {
                width: 32rpx;
                height: 32rpx;
              }
            }

            div:nth-child(2) {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }

            div:last-child {
              border-right: none;
            }
          }

          .odd {
            background-color: #fff;
          }

          .even {
            background-color: #EDF4FF;
          }
        }
      }
  }
</style>

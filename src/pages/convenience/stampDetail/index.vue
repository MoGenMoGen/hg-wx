<template>
  <div class="home">
    <div class="info-box">
      <div class="info-item">
        <span>{{type==1?'事项内容':'证明名称'}}</span>
        <div>{{info.name}}</div>
      </div>
      <div class="info-item" style="border-bottom: none;">
        <span>{{type==1?'依据':'办事途径'}}</span>
        <div>{{info.cont}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        type: 1
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.type = options.type
      this.api.getAdvertDetail({id:options.id}).then(res => {
        this.info = res
        console.log(res)
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
    padding: 20rpx;
    box-sizing: border-box;
    .info-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 10rpx;
      display: flex;
      flex-direction: column;
      .info-item {
        padding: 30rpx 0;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        span {
          padding: 12rpx 30rpx;
          background-color: #EC2C17;
          border-top-right-radius: 10rpx;
          border-bottom-right-radius: 10rpx;
          color: #fff;
          font-size: 24rpx;
        }
        div {
          width: 100%;
          padding: 30rpx 30rpx 0;
          box-sizing: border-box;
          color: #303030;
          font-size: 24rpx;
        }
      }
    }
  }
</style>

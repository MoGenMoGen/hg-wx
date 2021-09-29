<template>
  <div>
    <div class="search-box">
      <input type="text" placeholder="请输入关键词" placeholder-style="color:#CBCBCB;" confirm-type="search" @confirm="confirm($event)">
      <img src="/static/images/search.png">
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {}
    },
    components: {},
    async onLoad() {

    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },

    methods: {
      confirm(e) {
        this.$emit('searchEvent', e)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../css/common.less");

  .search-box {
    width: 690rpx;
    height: 72rpx;
    margin: 30rpx auto;
    border: 2rpx solid #E6E6E6;
    background-color: #fff;
    border-radius: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14rpx 20rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    img {
      width: 40rpx;
      height: 40rpx;
      margin-right: 14rpx;
      flex-shrink: 1;
    }
    input {
      flex: 1;
    }
  }
</style>

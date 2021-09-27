<template>
  <div class="home">
    <div class="integralNum-box">
      <block v-for="(item, index) in list" :key="index">
        <div class="integralNum-inner">
          <span>{{item.name}}</span>
          <span>+{{item.num}}</span>
        </div>
      </block>
    </div>
  </div>
</template>

<script>
  import noMore from '@/components/noMore'
  export default {
    data() {
      return {
        current:1,
        size:100,
        total:0,
        list: []
      }
    },
    components: {
      noMore
    },
    async onLoad() {

    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.current =1
        this.list = []
        this.getList()
      });
    },
    //解底事件
    onReachBottom() {
      if(this.total>this.list.length){
        this.current++
        this.getList()
      }
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      getList(){
        this.api.creditrule({current:this.current,size:this.size}).then(res=>{
          this.total = res.total
          this.list.push(...res.records)
        })
      },
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx 20rpx;
    box-sizing: border-box;

    .integralNum-box {
      width: 710rpx;
      background-color: #fff;
      border-radius: 12rpx;
      min-height: calc(100vh - 40rpx);

      .integralNum-inner {
        width: 100%;
        font-size: 30rpx;
        font-weight: 500;
        color: #606060;
        line-height: 30rpx;
        padding: 40rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        span:last-child {
          font-size: 28rpx;
          color: #EB020E;
        }
      }
    }
  }
</style>

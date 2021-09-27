<template>
  <div class="home">
    <my-list  :list="list"></my-list>
    <no-more v-show="total>=list.length"></no-more>
  </div>
</template>

<script>
  import noMore from '@/components/noMore'
  import myList from '@/components/suggestList'
  export default {
    data(){
      return{
          list:[],
          current:1,
        size:10,
        total:0,
      }
    },
    components:{
      myList,noMore
    },
    async onLoad(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.list = []
        this.current = 1
        this.getList()
      });
    },
    onShow(){

    },
    //解底事件
    onReachBottom(){
      if(this.list.length<this.total){
        this.current++
        this.getList()
      }
    },
    //下拉刷新
    onPullDownRefresh () {
      this.list = []
      this.current = 1
      this.getList(1)

    },
    onShareAppMessage(){
      return {

      }
    },

    methods:{

      getList(type){

        this.api.suggestList({
          current:this.current,
          size:this.size
        }).then(res=>{
          if(type){
            wx.stopPullDownRefresh()
          }
          res.records.forEach(item=>{
            item.img = item.img.split(',')[0]
          })
          this.total = res.total,
          this.list.push(...res.records)
        })

      },
    }
  }


</script>

<style scoped lang="less">
@import url("../../../css/common.less");
  .home{
    min-height: 100vh;
    width: 100vw;
    padding-top: 40rpx;
    .item{
      margin: 0 auto 40rpx ;
      width: 670rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 30rpx 50rpx;
      box-sizing: border-box;
      box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.1);
      position: relative;

      .img{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 20rpx;
        image{
          width: 140rpx;
          height: 140rpx;
          margin-right: 10rpx;
        }
      }
      >div{
        color: #999999;
        display: flex;
        padding-bottom: 10rpx;
        span{
          width: 130rpx;
          display: block;
          text-align: justify;
          text-align-last: justify;
        }
        p{
          flex: 1;
          padding-left: 10rpx;
        }
      }
    }
  }
</style>

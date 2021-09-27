<template>
  <div>
    <div class="item" @click="toDetail(item.id)" v-for="(item,index) in list" :key="index">
      <p class="img"><image :src="item.img" mode="aspectFill"></image></p>
      <div class="cont">
        <p>{{item.content}}</p>
        <span>提交时间：{{item.createTime}}</span>
      </div>
      <!--<span :class="{red:item.id,green:!item.id}">{{index===0?'待解决':'已解决'}}</span>-->
    </div>
  </div>

</template>

<script>
  export default {
    props:{
      list:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    data(){
      return{
      }
    },
    components:{
    },
    async onLoad(){

    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },

    methods:{

      toDetail(id){
        console.log('11111111111111')
        let url = '/pages/suggest/detail/main?id='+id
        this.until.aHref(url)
      },

    }
  }


</script>

<style scoped lang="less">
  @import url("../css/common.less");
  .item{
    margin: 0 auto 40rpx ;
    width: 670rpx;
    background: #ffffff;
    border-radius: 14rpx;
    padding: 40rpx 0 30rpx 30rpx;
    box-sizing: border-box;
    box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.1);
    display: flex;
    font-size: 28rpx;
    .img{
      margin-right: 20rpx;
      width: 120rpx;
      height: 120rpx;
      flex-shrink: 0;
      image{
        width: 100%;
        height: 100%;
      }
    }
    >span{
      flex-shrink: 0;
      width: 104rpx;
      height: 52rpx;
      border-radius: 20rpx 0px 0px 20rpx;
      color: #ffffff;
      font-size: 24rpx;
      text-align: center;
      line-height: 52rpx;
    }
    .red{
      background: #EB020E;
    }
    .green{
      background: #18A338;
    }
    .cont{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-right: 5rpx;
      p{
        height: 60rpx;
        line-height: 30rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        color: #666666;
      }
      span{
        color: #999999;
      }
    }
  }
</style>

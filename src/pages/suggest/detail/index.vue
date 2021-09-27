<template>
  <div class="home">
    <p>投诉建议</p>
    <div class="main">
      <div class="cont">
        <p>{{info.content}}</p>
        <p class="img">
          <image :src="item" mode="aspectFill" v-for="(item,index) in imgList" :key="index" @click="toView(item,imgList)"></image>
        </p>
        <div>
          <span>联系人：</span>
          <p>{{info.contacts}}</p>
        </div>
        <div>
          <span>联系电话：</span>
          <p>{{info.contactNumber}}</p>
        </div>
        <div>
          <span>提交时间：</span>
          <p>{{info.createTime}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import img from '../../../../static/images/submitSuccess.png'
  export default {
    data(){
      return{
        img,
        imgList:[],
        info:{
          cont:'抽油烟机坏了，燃气管道漏气！',
          img:'',
          linkMan:'联系人',
          linkTel:'18666666666',
          addr:'金邑水岸智慧小区39幢2单元1202室',
          time:'2020-03-15 12:00:00'
        }
      }
    },
    components:{

    },
    async onLoad(e){
      console.log(e.id)
      this.api.suggestDetail(e.id).then(res=>{
        this.info = res
        this.imgList = this.info.img.split(',')
      })
    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },
    //解底事件
    onReachBottom(){

    },

    onShareAppMessage(){
      return {

      }
    },

    methods:{

      toView(url,list){
        this.until.viewImg(url,list)
      }
    }
  }


</script>

<style scoped lang="less">
  @import url("../../../css/common.less");
  .home{
    min-height: 100vh;
    width: 100vw;
    padding:30rpx 20rpx;
    box-sizing: border-box;
    >p{
      font-size: 32rpx;
      text-align: center;
      color: #333333;
      padding-top: 60rpx;
      padding-bottom: 40rpx;
    }
    >div{
      width: 670rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 30rpx 50rpx;
      box-sizing: border-box;
      margin: 0 auto;
    }
    .cont{
      .img{
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 30rpx;
        padding-top: 30rpx;
        image{
          width: 140rpx;
          height: 140rpx;
          margin-right: 10rpx;
          margin-bottom: 10rpx;
        }
      }
      >div{
        color: #999999;
        display: flex;
        padding: 8rpx 0;
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
    >button{
      width: 406rpx;
      height: 100rpx;
      background: rgba(235, 2, 14, 0.106);
      border-radius: 100rpx;
      color: @color;
      text-align: center;
      line-height: 100rpx;
    }
  }
</style>

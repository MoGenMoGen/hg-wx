<template>
  <div class="home">
    <div class="main">
       <div class="top">
          <image :src="img" mode="widthFix"/>
         您的求助申请已提交成功！
       </div>
      <div class="cont">
          <p>{{info.content}}</p>
          <div>
            <span>联系人：</span>
            <p>{{info.user}}</p>
          </div>
          <div>
            <span>联系电话：</span>
            <p>{{info.phone}}</p>
          </div>
          <div>
            <span>提交时间：</span>
            <p>{{info.createTime}}</p>
          </div>
      </div>
    </div>
    <button  @click="toPage('/pages/helpServices/historyList/main')">查看历史求助</button>
  </div>
</template>

<script>
  import img from '../../../../static/images/submitSuccess.png'
  export default {
    data(){
      return{
        img,
        info:{
          cont:'我家浴室下水道堵住了，能帮忙吗？',
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
      this.api.helpDetail({id:e.id}).then(res=>{
        this.info = res
        console.log(this.info)
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

      toPage(url){
        this.until.aHrefRedirectTo(url)
      }
    }
  }


</script>

<style scoped lang="less">
@import url("../../../css/common.less");
  .home{
    height: 100vh;
    width: 100vw;
    padding:30rpx 20rpx;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #666666;
    >div{
      width: 670rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 30rpx 50rpx;
      margin-bottom: 60rpx;
      box-sizing: border-box;
      .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 100rpx;
        border-bottom: 1px solid #F1F3F2;
        image{
          width: 200rpx;
          display: block;
        }
      }
      .cont{
        padding-top: 30rpx;
        color: #999999;
        >p{
          margin-bottom: 10rpx;
        }
        >div{
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

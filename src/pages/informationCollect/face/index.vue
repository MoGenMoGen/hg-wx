<template>
  <div class="home">
    <div class="info">
      <div class="userInfo">
        <b>{{info.realName}}</b>
        <p><image :src="unit" mode="widthFix"/>{{info.house}}</p>
        <p><image :src="userType" mode="widthFix"/>{{info.type==1 ? '户主' : '同住人'}}</p>
      </div>
      <p>邻里中心</p>
    </div>
    <div class="main">
      <div class="title"><b>个人中心</b><span v-if="info.status==2">（身份信息审核通过！）</span><span v-if="info.status==1">（身份信息审核中！）</span></div>
      <!-- <p class="cont"  v-if="info.status==1">
        身份信息审核中，<br/>
        审核通过后才可人脸信息采集。
      </p>v-if="info.status==2" -->
      <div class="cont"  >
        <div class="addFace" v-if="!info.faceImg">
          <add-face @updata="upDateFace"></add-face>
        </div>
        <div class="faceImgList" v-if="info.faceImg">
          <image :src="faceImg" @click="toView(faceImg)" :key="index" mode="aspectFill"/>
        </div>
        <div class="example" v-show="!faceImg">
          <b>采集样例</b>
          <image :src="faceImgExample" mode="widthFix"/>
        </div>
        <button @click="saveFace"  v-show="!info.faceImg">保存</button>
        <button @click="toPage('/pages/informationCollect/cohabitAdd/main')"  v-if="info.faceImg" class="addPerson">添加同住人</button>
      </div>
    </div>
  </div>
</template>

<script>
  import faceImgExample from '../../../../static/images/faceImg.png'
  import userType from '../../../../static/images/owner.png'
  import unit from '../../../../static/images/address2.png'
  import addFace from '@/components/addFace.vue'
  export default {
    data(){
      return{
        unit,
        userType,
        faceImgExample,
        faceImg:'',
         info:{
           faceImg:'',
           nm:'',
           unit:'',
           type:'',
           status:1,//0审核中，1审核通过
           faceStatus:1,//0未采集 1已采集
         }
      }
    },
    components:{
      addFace
    },
    async onLoad(){

    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.info = wx.getStorageSync('loginInfo')
        this.faceImg = this.info.faceImg
      });
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
        this.until.aHref(url)
      },
      toView(url){
        console.log(url)
        let arr = []
        arr.push(this.faceImg)
        this.until.viewImg(url,arr)
      },
      upDateFace(img){
        this.faceImg = img
      },
      saveFace(){
        if(this.faceImg=="") {
          wx.showToast({
            title: '请上传人脸照片',
            icon: 'none',
            duration: 1500
          })
          return
        }
         let param = {
           id: this.info.id,
           faceImg:this.faceImg
         }
         wx.showLoading({
           title: "加载中"
         });
         this.api.getFace(param).then(res => {
           wx.hideLoading();
           if(res.code == 400) {
             wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
             })
           } else {
             wx.switchTab({
               url: '/pages/index/index/main'
             })
           }
         })
      }
    }
  }


</script>

<style scoped lang="less">
@import url("../../../css/common.less");
  .home{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    .info{
      width: 691rpx;
      height: 192rpx;
      background: #EB020E;
      box-shadow: 0px 4rpx 29rpx 0px rgba(157, 157, 157, 0.41);
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      margin: 30rpx auto;
      .userInfo{
        padding-left: 43rpx;
        color: #ffffff;
        flex: 1;
        b{
          font-size: 30rpx;
        }
        p{
          padding-top: 15rpx;
          display: flex;
          align-items: center;
          font-size: 24rpx;
          image{
            width: 22rpx;
            margin-right: 10rpx;
          }
        }
      }
      >p{
        width: 117rpx;
        height: 117rpx;
        background: #FFFFFF;
        border: 4prx solid rgba(255, 255, 255, 0.2);
        box-shadow: 0px 6rpx 43px 0rpx rgba(235, 2, 14, 0.42);
        border-radius: 50%;
        margin-right: 64rpx;
        color: @color;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0 32rpx;
      }
    }
    .main{
       flex: 1;
       overflow-y: scroll;
       -webkit-overflow-scrolling: touch;
      background: #ffffff;
      width: 100vw;
      height: 100%;
      border-radius: 12rpx 12rpx 0 0;
      .title{
        height: 84rpx;
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(48,48,48,0.1);
        color: #303030;
        font-size: 26rpx;
        padding-left: 40rpx;
        box-sizing: border-box;
        span{
          color: @color;
          font-size: 24rpx;
        }
      }
      p.cont{
        color: @color;
        text-align: center;
        padding-top: 111rpx;
        font-size: 24rpx;
        line-height: 36rpx;
      }
      div.cont{

        .addFace{
          padding-left: 40rpx;
          padding-top: 30rpx;
          padding-bottom: 20rpx;
          border-bottom: 1px solid rgba(48,48,48,0.1);
        }
        .example{
          padding-left: 40rpx;
          >b{
            color: #303030;
            font-size: 26rpx;
            padding-top: 25rpx;
            padding-bottom: 18rpx;
          }
          >image{
            width: 216rpx;
          }
        }
        .faceImgList{
          padding-top: 30rpx;
          padding-left: 40rpx;
          image{
            width: 216rpx;
            height: 216rpx;
            margin-right: 10rpx;
            margin-bottom: 10rpx;
          }
        }
        >button{
          width: 570rpx;
          height: 70rpx;
          line-height: 70rpx;
          text-align: center;
          margin: 50rpx auto;
          background: #EB020E;
          border-radius: 35rpx;
          color: #ffffff;
          font-size: 30rpx;
        }
        .addPerson{
          position: absolute;
          bottom: 20rpx;
          left: 50%;
          margin: 0;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>

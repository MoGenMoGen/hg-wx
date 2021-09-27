<template>
  <div class="home">
    <div class="swiper">
      <swiper>
        <block v-for="(item,index) in imgList" :key="index">
          <swiper-item>
            <image :src="item.imgUrl" mode="aspectFill"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="areatext">
      <p><span></span>投诉建议</p>
      <textarea placeholder="请简短描述投诉建议内容，限50字" placeholder-class="gray" maxlength="50" v-model="form.content"></textarea>
      <div class="imgList">
        <add-img @upData="updateImg" ref="addImg"></add-img>
      </div>

    </div>
    <div class="btn">
      <button @click="toSubmit">提交</button>
      <p @click="toPage('/pages/suggest/list/main')">历史投诉建议</p>
    </div>
  </div>
</template>

<script>
  import addr from '../../../../static/images/addr.png'
  import tel from '../../../../static/images/tel.png'
  import user from '../../../../static/images/user.png'

  import addImg from '@/components/addImg'
  export default {
    data(){
      return{
        addr,
        tel,
        user,
        imgList:[],
        form:{
          content:'',
          img:'',
        }
      }
    },
    components:{
      addImg
    },
    async onLoad(){

    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.api.adrertList("ad11").then(res => {
          this.imgList = res
        })
      });
    },

    methods:{
      toSubmit(){
        if(!this.form.content){
           return wx.showToast({
             title: '请输入内容',
             icon: 'none',
             duration: 2000
           })
        }
        this.api.suggestSubmit(this.form).then(res=>{
           setTimeout(()=>{
             this.until.aHrefRedirectTo('/pages/suggest/submitSuccess/main?id='+res.data.id)
           },1500)
        })
      },
      toPage(url){
        this.until.aHref(url)
      },
      updateImg(img){
        this.form.img = img.join(',')
      }
    }
  }


</script>

<style scoped lang="less">
@import url("../../../css/common.less");
  .home{
    min-height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    .swiper{
      width: 710rpx;
      height: 350rpx;
      margin: 20rpx auto;
      border-radius: 20rpx;
      overflow: hidden;
      image{
        width: 100%;
        height: 100%;
      }
    }
    /deep/.gray{
      color: #909090;
    }
    .areatext{
      background: #ffffff;
      border-radius: 20rpx;
      padding-bottom: 20rpx;
      >p{
        display: flex;
        align-items: center;
        line-height: 27rpx;
        color: #303030;
        font-size: 28rpx;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        height: 97rpx;
        span{
          background: @color;
          width: 6rpx;
          height: 27rpx;
          margin-left: 40rpx;
          margin-right: 20rpx;
        }
      }
      textarea{
        padding: 30rpx;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
      .imgList{
        padding: 30rpx 30rpx 0;
      }
    }
    .btn{
      background: none;
      width: 80vw;
      margin: 45rpx auto;
      button{
        margin-bottom: 30rpx;
        background: @color;
        height: 66rpx;
        line-height: 66rpx;
        text-align: center;
        font-size: 22rpx;
        color: #ffffff;
        border-radius: 15rpx;
        box-shadow: 0px 4rpx 9rpx rgba(248, 38, 38, 0.05);
      }
      p{
        color: @color;
        font-size: 22rpx;
        text-decoration: underline;
        text-align: center;
      }
    }
  }
</style>

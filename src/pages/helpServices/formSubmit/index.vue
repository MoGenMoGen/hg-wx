<template>
  <div class="home">

    <div class="areatext">
      <textarea placeholder="请输入求助详情" placeholder-class="gray" v-model="form.content"></textarea>
      <add-img @upData="updateImg" ref="addImg"></add-img>
    </div>
    <div class="input">
      <p>
        <image :src="user" mode="aspectFit"/>
        <input  placeholder="请输入姓名" placeholder-class="gray" v-model="form.user"/>
      </p>
      <p>
        <image :src="tel" mode="aspectFit"/>
        <input  placeholder="请输入联系方式" placeholder-class="gray" type="number" v-model="form.phone"/>
      </p>
    </div>
    <div class="btn">
      <button @click="toCancel">取消</button>
      <button @click="toSubmit">提交</button>
    </div>
    <p @click="toPage('/pages/helpServices/list/main')">其他求助</p>
  </div>
</template>

<script>
  import addr from '../../../../static/images/addr.png'
  import tel from '../../../../static/images/tel.png'
  import user from '../../../../static/images/user.png'

  export default {
    data(){
      return{
        addr,
        tel,
        user,
        form:{
          user:'',
          phone:'',
          title:'',
          content:'',
        }
      }
    },
    components:{
    },
    async onLoad(){

    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        let info = wx.getStorageSync('loginInfo')
        this.form.user = info.realName
        this.form.phone = info.phone
      });
    },

    methods:{
      toSubmit(){

         this.api.helpSubmit(this.form).then(res=>{
           setTimeout(()=>{
             console.log(res.data)
             this.until.aHrefRedirectTo('/pages/helpServices/submitSuccess/main?id='+res.data.id)
           },1500)
         })
      },
      toCancel(){
        this.until.back()
      },
      toPage(url){
        this.until.aHrefRedirectTo(url)
      },

    }
  }


</script>

<style scoped lang="less">
@import url("../../../css/common.less");
  .home{
    min-height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    /deep/.gray{
      color: #CBCBCB;
    }
    >p{
      text-align: center;
      color: @color;
      text-decoration: underline;
    }
    >div{
      background: #ffffff;
      border-radius: 20rpx;
      padding: 0 20rpx;
      margin: 20rpx 0;
    }
    .input{
      p{
        display: flex;
        align-items: center;
        height: 50rpx;
        padding: 20rpx 0;
        line-height: 50rpx;
        &:not(:last-of-type){
          border-bottom: 1px solid #F1F3F2;
        }
        image{
          width: 30rpx;
          height: 30rpx;
        }
        input{
          margin-left: 20rpx;
          padding-left: 20rpx;
          flex: 1;
          border-left: 1px solid #CBCBCB;
        }
      }
    }
    .areatext{
      padding-top: 20rpx;
      padding-bottom: 20rpx;

    }
    .btn{
      background: none;
      width: 100vw;
      margin: 45rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 0;
      button{
        width: 45vw;
        background: @color;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
        font-size: 22rpx;
        color: #ffffff;
        border-radius: 14rpx;
        &:first-of-type{
          background: #FFFFFF;
          box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.05);
          color: #303030;
        }
        &:last-of-type{
          box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.1);
        }
      }
    }
  }
</style>

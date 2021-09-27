<template>
  <div class="home">
    <div class="areatext">
      <div class="title">
        <span>标题</span>
        <input type="text" placeholder="请输入议事标题" placeholder-class="gray" @input="getTitle">
      </div>
      <my-editor @updata="updataEditor"></my-editor>
      <!-- <add-img @upData="updateImg" ref="addImg"></add-img> -->
    </div>
    <div class="btn">
      <button @click="toCancel">取消</button>
      <button @click="toSubmit">确认</button>
    </div>
  </div>
</template>

<script>
  import addr from '../../../../static/images/addr.png'
  import tel from '../../../../static/images/tel.png'
  import user from '../../../../static/images/user.png'

  // import addImg from '@/components/addImg'
  import myEditor from '@/components/myEditor'
  export default {
    data(){
      return{
        addr,
        tel,
        user,
        imgList:[addr,addr],
        form:{

        },
        title: "",
        content: ""
      }
    },
    components:{
      myEditor
      // addImg
    },
    async onLoad(){
      Object.assign(this.$data, this.$options.data())
    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{

      });
    },

    methods:{
      getTitle(e) {
        this.title = e.mp.detail.value
      },
      updataEditor(content) {
        this.content = content
      },
      toSubmit(){
        if(!this.title) {
          wx.showToast({
            title: "请输入标题",
            icon: "none",
            duration: 2000
          })
          return
        }
        if(!this.content) {
          wx.showToast({
            title: "请输入内容",
            icon: "none",
            duration: 2000
          })
          return
        }
        let data = {
          title: this.title,
          content: this.content
        }
        this.api.discussionLaunch(data).then((res) => {
          // this.until.aHrefRedirectTo('/pages/discussion/detail/main')
          this.until.back()
        })
      },
      toCancel(){
        this.until.back()
      },
      toPage(url){
        this.until.aHrefRedirectTo(url)
      },
      updateImg(img){
        this.imgList = img
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
    border-top: 1px solid #F1F3F2;
    /deep/.gray{
      color: #CBCBCB;
    }

    .areatext{
      background: #ffffff;
      border-radius: 0 0 14rpx 14rpx;
      padding-left: 40rpx;
      padding-bottom: 40rpx;
      box-sizing: border-box;
      .title {
        padding: 30rpx 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #F1F3F2;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        span {
          color: #EB020E;
          margin-right: 60rpx;
          position: relative;
        }
        span:after {
          content: "";
          width: 1px;
          height: 40rpx;
          background-color: #CBCBCB;
          position: absolute;
          right: -30rpx;
        }
        input {
          width: 500rpx;
        }
      }
      textarea {
        margin: 20rpx 0;
      }
    }
    .btn{
      background: none;
      width: 100vw;
      margin: 90rpx auto;
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
        font-size: 28rpx;
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

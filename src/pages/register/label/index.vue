<template>
  <div class="home">
    <hobby @upData="changeHobby"></hobby>
    <!--<p>请选择您的兴趣爱好、能力标签</p>-->
    <!--<ul>-->
      <!--<li-->
        <!--:class="{ active: item.selected }"-->
        <!--@tap="handleSelected(item,index)"-->
        <!--v-for="(item, index) in hobbies"-->
        <!--:key="index"-->
      <!--&gt;-->
        <!--{{ item.dictValue }}-->
      <!--</li>-->
    <!--</ul>-->
    <button class="confirm" @tap="register">确认</button>
  </div>
</template>

<script>
  import hobby from '@/components/hobby'
export default {
  data() {
    return {
      //  假数据
      hobbies: [],
      parms: {},
      selectedbox: [],
    };
  },
  components:{hobby},
  // onShareAppMessage(res) {
  //   return {
  //     title: "注册",
  //     desc: "注册",
  //     path: "/pages/register/index/main",
  //   };
  // },
  onShow(){
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用

  },
  methods: {
    changeHobby(info){
      this.parms.ability = info.map(item=> item.id).join(',')
    },

    handleSelected(item,index) {
      item.selected = !item.selected;
      this.$set(this.hobbies,index,item)
    },
    register() {
      wx.login({
        success:(loginRes) =>{
          this.parms.code=loginRes.code
          this.api.login(this.parms).then(()=>{
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1500
            })
            if(wx.getStorageSync("loginInfo").faceImg == "") {
              setTimeout(() => {
                // wx.switchTab({
                //   url: '/pages/index/index/main'
                // })
                wx.reLaunch({
                  url: '/pages/informationCollect/face/main'
                })
              }, 1500)
            } else {
              setTimeout(() => {
                // wx.switchTab({
                //   url: '/pages/index/index/main'
                // })
                wx.reLaunch({
                  url: '/pages/index/index/main'
                })
              }, 1500)
            }
          })
        }
      });
    },
  },
  onLoad() {
    console.log(wx.getStorageSync('registerData'));
    this.parms = wx.getStorageSync('registerData')
    this.parms.ability=''
  },
  onHide() {
    wx.removeStorageSync('registerData')
  },
  onUnload(){
    wx.removeStorageSync('registerData')
  }
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*p {*/
    /*width: 504rpx;*/
    /*height: 50rpx;*/
    /*font-size: 36rpx;*/
    /*font-family: PingFang SC;*/
    /*font-weight: 500;*/
    /*line-height: 50rpx;*/
    /*color: #333333;*/
    /*opacity: 1;*/
    /*text-align: center;*/
    /*margin-top: 40rpx;*/
    /*margin-bottom: 62rpx;*/
  /*}*/
  /*ul {*/
    /*width: 570rpx;*/
    /*max-height: 1200rpx;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-content: center;*/
    /*flex-wrap: wrap;*/
    /*li {*/
      /*width: 250rpx;*/
      /*height: 88rpx;*/
      /*margin-bottom: 20rpx;*/
      /*background: #ffffff;*/
      /*border: 1px solid #cbcbcb;*/
      /*opacity: 1;*/
      /*border-radius: 60rpx;*/
      /*line-height: 88rpx;*/
      /*font-size: 32rpx;*/
      /*font-family: PingFang SC;*/
      /*font-weight: 400;*/
      /*color: #cbcbcb;*/
      /*text-align: center;*/
    /*}*/
    /*.active {*/
      /*border: 1px solid #666666;*/
      /*color: #666666;*/
    /*}*/
  /*}*/
  .confirm {
    width: 660rpx;
    height: 88rpx;
    background: #eb020e;
    box-shadow: 0px 6rpx 12rpx rgba(248, 38, 38, 0.05);
    opacity: 1;
    border-radius: 14rpx;
    line-height: 88rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    position: absolute;
    bottom: 126rpx;
  }
}
</style>

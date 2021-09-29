<template>
  <p class="bottom">
    <span @click="callPhone">管理员联系方式：{{managerPhone}}</span>
    <span>接听时间：{{managerTime}}</span>
  </p>
</template>

<script>

  export default {

    data(){
      return{
        managerPhone: '',
        managerTime: ''
      }
    },
    components:{

    },
    async onLoad(){
      this.api.getParam('managerPhone').then(res => {
        this.managerPhone = res.records[0].paramValue
      })
      this.api.getParam('managerTime').then(res => {
        this.managerTime = res.records[0].paramValue
      })
    },
    onShow(){

    },
    //解底事件
    onReachBottom(){

    },

    onShareAppMessage(){
      return {

      }
    },

    methods:{
      callPhone() {
        wx.makePhoneCall({
          phoneNumber: this.managerPhone
        })
      }
    },

  }


</script>

<style scoped lang="less">
@import url("../css/common.less");
.bottom{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 710rpx;
  margin: 40rpx auto;
}
</style>

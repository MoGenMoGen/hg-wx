<template>
  <p class="noMOre">- 已经到底了 -</p>
</template>

<script>

  export default {

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
    //解底事件
    onReachBottom(){

    },

    onShareAppMessage(){
      return {

      }
    },

    methods:{

    },

  }


</script>

<style scoped lang="less">
@import url("../css/common.less");
.noMOre{
  text-align: center;
  padding: 20rpx;
}
</style>

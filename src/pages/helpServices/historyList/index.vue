<template>
  <div class="home">
    <div class="item" @click="toDetail(item.id)" v-for="(item,index) in list" :key="index">
      <div class="cont">
        <p>{{item.content}}</p>
        <p><span>联系人：</span>{{item.user}}</p>
        <p><span>联系电话：</span>{{item.phone}}</p>
        <p><span>提交时间：</span>{{item.createTime}}</p>
      </div>
      <span :class="{red:item.state===0,green:item.state===1}">{{item.state===0?'待解决':'已解决'}}</span>
    </div>
    <no-more v-if="total<=list.length"></no-more>
  </div>
</template>

<script>
  import comment from '../../../../static/images/comment.png'
  import pen from '../../../../static/images/pen.png'

  import noMore from '@/components/noMore'
  import myList from '@/components/repairList'
  export default {
    data(){
      return{
        commentContent:'',
        commentId:'',
        focus:false,
        comment,
        pen,
        total:0,
        current:1,
        size:10,
        list:[{},{},{}]
      }
    },
    components:{
      myList,noMore
    },
    async onLoad(){

    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.list = []
        this.current =  1
        this.getList()
      });
    },
    //解底事件
    onReachBottom(){
      if(this.total>this.list.length){
        this.current++
        this.getList()
      }
    },
    //下拉刷新
    onPullDownRefresh () {
      this.list = []
      this.current = 1
        this.getList()
    },
    onShareAppMessage(){
      return {

      }
    },

    methods:{
      toDetail(id){
        this.toPage('/pages/helpServices/detail/main?id='+id)
      },
      getList(){
         this.api.helpHirstoryList({current:this.current,size:this.size}).then(res=>{
           wx.stopPullDownRefresh()
           this.total = res.total
           this.list.push(...res.records)
         })
      },
      toComment(id){
        this.focus = true
      },
      commentSubmit(){
        this.focus = false
      },
      toPage(url){
        this.until.aHref(url)
      }
    }
  }


</script>

<style scoped lang="less">
  @import url("../../../css/common.less");
  .home{
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx 0 120rpx;
    box-sizing: border-box;
    .item{
      margin: 0 auto 40rpx ;
      width: 100vw;
      background: #ffffff;
      border-radius: 14rpx;
      padding: 30rpx 30rpx 20rpx 30rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      position: relative;
      >span{
        position: absolute;
        right: 50rpx;
        top:30rpx;
      }
      .red{
        color: #EB020E;
      }
      .green{
        color: #18A338;
      }
      .cont{
        width: 100%;
        padding-right: 110rpx;
        box-sizing: border-box;
        p{
          line-height: 35rpx;
          color: #999999;
          margin-bottom: 10rpx;
          &:first-of-type{
            color: #666666;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            max-height: 70rpx;
            margin-bottom: 20rpx;
          }
          span{
            width: 140rpx;
            text-align: justify;
            text-align-last: justify;
            white-space: nowrap;
            display: inline-block;
          }
        }
        span{
          color: #999999;
        }
      }
    }
  }
</style>

<template>
  <div class="home">
    <div class="item" @click="toDetail(item.id)" v-for="(item,index) in list" :key="index">
      <div class="cont">
        <p>{{item.content}}</p>
        <p><span>联系人：</span>{{item.user}}</p>
        <p><span>联系电话：</span>{{item.phone}}</p>
        <p><span>提交时间：</span>{{item.createTime}}</p>
      </div>
      <div class="btn">
        <p><image :src="comment" mode="widthFix"></image>{{item.commentNum}}</p>
        <p @click.stop="toComment(item.id)"><image :src="pen" mode="widthFix"></image>写评论</p>
      </div>
      <span :class="{red:item.state==0,green:item.state==1}">{{item.state===0?'待解决':'已解决'}}</span>
    </div>
    <no-more v-if="total<=list.length"></no-more>
    <div class="comment" v-show="focus" @click="focus=false">
      <div @click.stop="">
        <textarea v-model="commentContent" :focus="focus" placeholder="回复" placeholder-class="gray" @confirm="commentSubmit" adjust-position cursor-spacing="140"/>
        <button @click="commentSubmit">发送</button>
      </div>
    </div>
    <button @click="toPage('/pages/helpServices/formSubmit/main')">发起求助</button>
  </div>
</template>

<script>
  import comment from '../../../../static/images/comment.png'
  import pen from '../../../../static/images/pen.png'

  import noMore from '@/components/noMore'
  export default {
    data(){
      return{
        commentContent:'',
        commentId:'',
        focus:false,
        comment,
        pen,
        list:[{},{},{}],
        current:1,
        size:10,
        total:0,
      }
    },
    components:{
      noMore
    },
    async onLoad(){

    },
    onShow(){
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
          this.list = []
        this.current = 1
        this.getList()
      });
    },
    //解底事件
    onReachBottom(){
      if(this.list.length<this.total){
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
        this.api.helpList({
          current:this.current,
          size:this.size,
        }).then(res=>{
          wx.stopPullDownRefresh()
          this.total = res.total
          console.log(res)
          this.list.push(...res.records)
        })
      },
      toComment(id){
        this.commentId = id
        this.focus = true
      },
      commentSubmit(){
        this.api.helpToComment({
          pid: this.commentId,
          content: this.commentContent
        }).then(res=>{
          let index = this.list.findIndex(item=>{ return item.id==this.commentId})
          this.list[index].commentNum+=1
          this.focus = false
        })
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
    padding: 20rpx 0 140rpx;
    box-sizing: border-box;
    >button{
      width: 94vw;
      height: 88rpx;
      background: @color;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
      border-radius: 14rpx;
      color: #ffffff;
      text-align: center;
      line-height: 88rpx;
      position: fixed;
      bottom: 40rpx;
      left: 50%;
      transform: translateX(-50%);
    }
    .comment{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.1);
      z-index: 10;
      >div{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 20rpx;
        box-sizing: border-box;
        background: #ffffff;
        display: flex;
        textarea{
          flex: 1;
          border: 1px solid #DEDEDE;
          border-radius: 14rpx;
          margin-right: 10rpx;
          box-sizing: border-box;
          padding: 10rpx;
          height: 60rpx;
          line-height: 40rpx;
        }
        /deep/.gray{
          line-height: 40rpx;
          color: #999999;
        }
        button{
          width: 160rpx;
          flex-shrink: 0;
          background: @color;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14rpx;
        }
      }
    }
    .item{
      margin: 0 auto 40rpx ;
      width: 94vw;
      background: #ffffff;
      border-radius: 14rpx;
      padding: 30rpx 30rpx 0rpx 30rpx;
      box-sizing: border-box;
      box-shadow: 0px 6rpx 12rpx rgba(0, 0, 0, 0.1);
      font-size: 28rpx;
      position: relative;
      >span{
        position: absolute;
        right: 0;
        top:40rpx;
        width: 104rpx;
        height: 52rpx;
        border-radius: 20rpx 0px 0px 20rpx;
        color: #ffffff;
        font-size: 24rpx;
        text-align: center;
        line-height: 52rpx;
      }
      .red{
        background: #EB020E;
      }
      .green{
        background: #18A338;
      }
      .cont{
        border-bottom: 1px solid #F1F3F2;
        width: 100%;
        padding-right: 80rpx;
        box-sizing: border-box;
        p{
          line-height: 35rpx;
          color: #999999;
          margin-bottom: 20rpx;
          &:first-of-type{
            color: #666666;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            max-height: 70rpx;
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
      .btn{
        width: 670rpx;
        display: flex;
        align-items: center;
        color: #999999;
        padding: 32rpx 0;
        p{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40rpx;
          &:first-of-type{
            border-right: 1px solid #CBCBCB;
          }
          image{
            width: 34rpx;
            margin-right: 10rpx;
          }
        }
      }
    }
  }
</style>

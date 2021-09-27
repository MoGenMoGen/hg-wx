<template>
  <div class="home">
    <block v-for="(item, index) in list" :key="index">
      <div class="exchange-box">
        <img :src="item.goodsImg" mode="aspectFill">
        <div class="exchange-right">
          <div>
            <span class="exchange-title">{{item.goodsName}}</span>
            <span class="exchange-integral">{{item.goodsCredit}}积分</span>
          </div>
          <span class="exchange-time">兑换日期： {{item.createTime}}</span>
          <span class="exchange-isChange" :class="{gray:item.status==2}">{{item.status==1 ? '待领取' : '已领取'}}</span>
        </div>
      </div>
    </block>
    <no-more v-if="total<=list.length"></no-more>
  </div>
</template>

<script>
  import noMore from '@/components/noMore'
  export default {
    data() {
      return {
        current:1,
        size:10,
        total:0,
        list: [{
          url: "/static/images/faceCollection.png",
          title: "蓝月亮洗衣液（1KG）",
          integral: 1000,
          time: "2021.4.20",
          isChange: true
        }, {
          url: "/static/images/faceCollection.png",
          title: "蓝月亮洗衣液（1KG）",
          integral: 1000,
          time: "2021.4.20",
          isChange: false
        }]
      }
    },
    components: {
      noMore
    },
    async onLoad() {

    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
        this.current =1
        this.list = []
        this.getList()
      });
    },
    //解底事件
    onReachBottom() {
        if(this.total>this.list.length){
          this.current++
          this.getList()
        }
    },

    methods: {
      getList(){
        this.api.proExchangeRecords({current:this.current,size:this.size}).then(res=>{
          this.total = res.total
          res.records.forEach(item=>{
            item.createTime = item.createTime.split(' ')[0]
          })
          this.list.push(...res.records)
        })
      },
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx 0;
    box-sizing: border-box;
    .exchange-box {
      width: 750rpx;
      padding: 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 12rpx;
      display: flex;
      margin-bottom: 20rpx;
      img {
        width: 330rpx;
        height: 308rpx;
        margin-right: 30rpx;
        border-radius: 10rpx;
      }
      .exchange-right {
        display: flex;
        flex-direction: column;
        line-height: 24rpx;
        max-width: 330rpx;
        div {
          display: flex;
          flex-direction: column;
          font-weight: 500;
          .exchange-title {
            font-size: 28rpx;
            color: #303030;
            margin-top: 15rpx;
            line-height: 28rpx;
            // 多行显示省略号
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .exchange-integral {
            margin-top: 25rpx;
            font-size: 30rpx;
            color: #EB020E;
          }
        }
        .exchange-time {
          font-size: 24rpx;
          font-weight: 400;
          color: #909090;
          flex: 1;
          display: flex;
          align-items: center;
        }
        .exchange-isChange {
          font-size: 30rpx;
          font-weight: 500;
          color: #EB020E;
          margin-bottom: 10rpx;
        }
        .gray{
          color: #909090;
        }
      }
    }
  }
</style>

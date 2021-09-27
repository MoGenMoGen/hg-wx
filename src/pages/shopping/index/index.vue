<template>
  <div class="home">
    <!-- 信息卡片 -->
    <div class="info-card">
      <div class="owner-info">
        <div class="owner-left">
          <span class="name">{{info.realName}}</span>
          <div>
            <img src="/static/images/address2.png" style="width: 23rpx;height: 22rpx;">
            <span>{{info.house}}</span>
          </div>
          <div>
            <img src="/static/images/owner.png" style="width: 19rpx;height: 22rpx;">
            <span>{{info.type==1?'户主':'同住人员'}}</span>
          </div>
        </div>
        <div class="owner-right">
          <div>邻里中心</div>
        </div>
      </div>
      <div class="integral-info">
        <div class="integral-available">
          <span>可用积分</span>
          <span>{{info.credit}}</span>
        </div>
        <div class="signIn" @click="toSign" :class="{gray:info.signStatus==1}">{{info.signStatus==1?'已签到':'签到'}}</div>
      </div>
    </div>
    <!-- 跳转菜单 -->
    <div class="jump-menu">
      <div @click="toPage('/pages/shopping/integral/main')"><span>积分明细</span> <img :src="goLogo"></div>
      <div @click="toPage('/pages/shopping/integralRule/main')"><span>积分规则</span> <img :src="goLogo"></div>
      <div @click="toPage('/pages/shopping/exchange/main')"><span>兑换记录</span> <img :src="goLogo"></div>
    </div>
    <!-- 商品列表 -->
    <div class="list-box">
      <div class="list-title">积分兑换</div>
      <div class="shop-box">
        <block v-for="(item, index) in list" :key="index">
          <div class="shop-info" @click="toPage('/pages/shopping/proDetail/main?id='+item.id)">
            <img :src="item.firstImg">
            <div class="shop-title">{{item.name}}</div>
            <div class="shop-integral">
              <span>{{item.credit}}积分</span>
              <span>数量：{{item.stock}}</span>
            </div>
          </div>
        </block>
      </div>
    </div>
  </div>
</template>

<script>
  import goLogo from "../../../../static/images/goLogo.png"
  export default {
    data() {
      return {
        goLogo,
        current:1,
        size:10,
        total:0,
        info:{},
        list: [{
          id: 1,
          url: "/static/images/faceCollection.png",
          title: "蓝月亮洗衣液（1KG）",
          integral: 1000
        },{
          id: 2,
          url: "/static/images/faceCollection.png",
          title: "蓝月亮洗衣液（1KG）",
          integral: 1000
        },{
          id: 3,
          url: "/static/images/faceCollection.png",
          title: "蓝月亮洗衣液（1KG）",
          integral: 1000
        },{
          id: 4,
          url: "/static/images/faceCollection.png",
          title: "蓝月亮洗衣液（1KG）",
          integral: 1000
        }]
      }
    },
    components: {

    },
    async onLoad() {

    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(()=>{
          this.getData()
      });
    },
    //解底事件
    onReachBottom() {
      if(this.total>this.list.length){
        this.current++
        this.getProList()
      }
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      async getData(){
        this.info = await this.api.userInfo()

        this.list = []
        this.current = 1
        this.getProList()
      },
      getProList(){
        this.api.proList({
          current:this.current,
          size:this.size
        }).then(res=>{
          this.total = res.total
          this.list.push(...res.records)
        })
      },
      //签到
      async toSign(){
        if(this.info.signStatus==0){
          console.log('签到')
          await this.api.sign()
          this.info = await this.api.userInfo()
        }

      },
      toPage(url) {
        this.until.aHref(url)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 30rpx 0;
    box-sizing: border-box;

    // 信息卡片
    .info-card {
      width: 690rpx;
      background: #EB020E;
      box-shadow: 0px 4rpx 29rpx 0rpx rgba(157, 157, 157, 0.41);
      border-radius: 20rpx;
      overflow: hidden;
      margin: 0 auto;

      .owner-info {
        width: 100%;
        border-bottom: 1rpx solid rgba(255, 255, 255, 0.15);
        padding-top: 39rpx;
        padding-bottom: 40rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .owner-left {
          margin-left: 44rpx;

          .name {
            font-size: 30rpx;
            font-weight: bold;
            color: #fff;
          }

          div {
            font-size: 24rpx;
            font-weight: 500;
            color: #FFFFFF;
            margin-top: 30rpx;
            display: flex;
            flex-direction: row;
            align-items: center;

            span {
              margin-left: 16rpx;
              display: inline-block;
              max-width: 400rpx;
            }
          }
        }

        .owner-right {
          width: 117rpx;
          height: 117rpx;
          background: #fff;
          border: 4rpx solid rgba(255, 255, 255, 0.2);
          box-shadow: 0rpx 6rpx 43rpx 0rpx rgba(235, 2, 14, 0.42);
          border-radius: 50%;
          margin-right: 64rpx;
          display: flex;
          justify-content: center;
          align-items: center;

          div {
            width: 58rpx;
            height: 58rpx;
            font-size: 28rpx;
            font-weight: 500;
            color: #EB020E;
            line-height: 32rpx;
          }
        }
      }

      .integral-info {
        width: 100%;
        height: 170rpx;
        padding: 40rpx 55rpx 40rpx 44rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

        .integral-available {
          display: flex;
          flex-direction: column;

          span {
            font-size: 48rpx;
            font-weight: 800;
            color: #FFEA00;
          }

          span:first-child {
            margin-bottom: 26rpx;
            font-size: 30rpx;
            font-weight: 500;
            color: #fff;
          }
        }

        .signIn {
          width: 122rpx;
          height: 49rpx;
          background: #fff;
          border-radius: 10rpx;
          text-align: center;
          font-size: 30rpx;
          font-weight: 500;
          color: #EB020E;
          line-height: 49rpx;
        }
        .gray{
          color: #999;
        }
      }
    }

    // 跳转菜单
    .jump-menu {
      padding: 0 77rpx;
      margin: 26rpx auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 26rpx;
      line-height: 48rpx;
      font-weight: 500;
      color: #606060;
      img {
        width: 12rpx;
        height: 22rpx;
        margin-left: 10rpx;
      }
    }

    // 商品列表
    .list-box {
      width: 750rpx;
      background-color: #fff;
      border-radius: 12rpx;
      padding: 33rpx 30rpx 40rpx;
      box-sizing: border-box;

      .list-title {
        font-size: 28rpx;
        color: #303030;
        font-weight: bold;
        line-height: 27rpx;
      }

      .list-title:before {
        content: "";
        display: inline-block;
        width: 6rpx;
        height: 27rpx;
        background: #EB020E;
        margin-right: 20rpx;
      }
      .shop-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 34rpx;
        .shop-info {
          width: 330rpx;
          margin-right: 30rpx;
          margin-bottom: 40rpx;
          img {
            width: 330rpx;
            height: 330rpx;
            border-radius: 10rpx;
          }
          .shop-title {
            font-size: 28rpx;
            font-weight: 500;
            color: #303030;
            margin-top: 20rpx;
            margin-bottom: 25rpx;
            max-width: 330rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .shop-integral {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 30rpx;
            font-weight: 500;
            color: #EB020E;
            span:last-child {
              font-size: 24rpx;
              color: #606060;
            }
          }
        }
        .shop-info:nth-child(2n+0) {
          margin-right: 0;
        }
      }
    }
  }
</style>

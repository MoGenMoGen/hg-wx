<template>
  <!-- 房源管理 -->
  <div class="home">
    <div class="total-filter">
      <input class="searchInput" placeholder="薄板文创A幢"
        placeholder-style="font-size:22rpx; color: #909090;line-height: 40rpx;" />
      <span class="filter"><img src="/static/images/filter.png">筛选</span>
    </div>
    <div class="titleSign">
      <div class="signList">
        <div class="listItem">
          <div class="top" style="background-color: #ffffff;">
          </div>
          <div class="bottom">
            空闲
          </div>
        </div>
        <div class="listItem">
          <div class="top" style="background-color:  #E7E7E7;">
          </div>
          <div class="bottom">
            已占用
          </div>
        </div>
        <div class="listItem">
          <div class="top" style="background-color:  #9AD38A;">
          </div>
          <div class="bottom">
            已入驻
          </div>
        </div>
        <div class="listItem">
          <div class="top" style="background-color:  #7BA7EB;">
          </div>
          <div class="bottom">
            自用
          </div>
        </div>
        <div class="listItem">
          <div class="top" style="background-color: #E687E9;">
          </div>
          <div class="bottom">
            公用
          </div>
        </div>
        <div class="listItem">
          <div class="top" style="border: 0;">
            <img src="/static/images/bangongshi.png" >
          </div>
          <div class="bottom">
            办公室
          </div>
        </div>
        <div class="listItem" >
          <div class="top" style="border: 0;">
            <img src="/static/images/gongwei.png" >
          </div>
          <div class="bottom">
           工位
          </div>
        </div>
      </div>
      <div class="signState">
        <div class="stateList">
          <div class="stateItem">
            <div class="left">
              <img src="/static/images/jjyq.png" >
            </div>
            <div class="right">
              即将逾期
            </div>
          </div>
          <div class="stateItem">
            <div class="left">
                <img src="/static/images/yyq.png" >
            </div>
            <div class="right">
              已逾期
            </div>
          </div>
          <div class="stateItem">
            <div class="left">
              <img src="/static/images/tzz.png" >
            </div>
            <div class="right">
              退租中
            </div>
          </div>
          <div class="stateItem">
            <div class="left">
              <img src="/static/images/cght.png" >
            </div>
            <div class="right">
              草稿合同
            </div>
          </div>
          <div class="stateItem">
            <div class="left">
              <img src="/static/images/htshz.png" >
            </div>
            <div class="right">
              合同审核中
            </div>
          </div>
          <div class="stateItem" style="width: 50%;">
            <div class="left">
              <img src="/static/images/htzfsh.png" >
            </div>
            <div class="right" >
             合同作废审核中
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-item" v-for="(item,index) in list" :key="index" v-if="list.length>0">
      <div class="list-item-top" @click="showDetail(index)">
        <span>{{index+1}}F</span>
        <div class="arrowDown">
          <img src="/static/images/arrowDownG.png" :class="item.flag==true?'active':''">
        </div>
      </div>
      <div class="list-item-bottom" v-if="item.flag==true">
          <div class="bottomList" style="background-color:#9AD38A ;">
             <div class="listTop">
                <span>A101/100m²</span>
              <p>
                资产原值：260万元
              </p>
             </div>
             <div class="listBottom">
                  <p>
                   光辉网络科技有限公司
                  </p>
                  <p>
                   入驻：2021-07-12
                  </p>
                  <p>
                    退出：2021-08-30
                  </p>
             </div>
          </div>
          <div class="bottomList" style="background-color:#E7E7E7;">
            <div class="listTop">
               <span>A101/100m²</span>
             <p>
               资产原值：260万元
             </p>
            </div>
            <div class="listBottom">
                 <p>
                  光辉网络科技有限公司
                 </p>
                 <p>
                  入驻：2021-07-12
                 </p>
                 <p>
                   退出：2021-08-30
                 </p>
            </div>
          </div>
          <div class="bottomList" style="background-color:#FFFFFF; border: 1rpx solid #DFDFDF;">
            <div class="listTop">
               <span>A101/100m²</span>
             <p>
               资产原值：260万元
             </p>
            </div>
            <div class="listBottom">
                 <p>
                  光辉网络科技有限公司
                 </p>
                 <p>
                  入驻：2021-07-12
                 </p>
                 <p>
                   退出：2021-08-30
                 </p>
            </div>
          </div>
      </div>
    </div>
    <div class="no-data" v-if="list.length==0">
      <img src="/static/images/noData.png">
      <span>暂无数据</span>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{}, {}, {}],
        activeIndex: 0
      }
    },
    components: {

    },
    async onLoad(options) {

    },
    onShow() {
      this.list.forEach(item=>{
        this.$set(item,'flag',false)
      })
      console.log(this.list);

    },
    //触底事件
    onReachBottom() {

    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      select(index) {
        this.activeIndex = index
      },
      showDetail(index){
        this.list[index].flag=!this.list[index].flag
        console.log( this.list[index].flag);
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;

    .tab-box {
      width: 100%;
      height: 84rpx;
      background: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;

      span {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #909090;
        width: 198rpx;
        text-align: center;
      }

      .active {
        color: #ff5400;
        font-weight: bold;
        position: relative;
        width: 198rpx;
        height: 84rpx;
        line-height: 84rpx;
        border-bottom: 4rpx solid #ff5400;
      }
    }

    .total-filter {
      width: 690rpx;
      margin: 20rpx auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .searchInput {
        width: 566rpx;
        height: 40rpx;
        background: #FFFFFF;
        border: 1rpx solid #E8E8E8;
        border-radius: 20rpx;
        padding: 10rpx 22rpx;
        box-sizing: border-box;
        font-size: 22rpx;
        line-height: 40rpx;
      }

      .total {
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 20rpx;
        background-color: #FF5400;
        color: #fff;
        font-size: 24rpx;
        border-radius: 20rpx;
      }

      .filter {
        display: flex;
        align-items: center;
        height: 40rpx;
        line-height: 40rpx;
        background-color: #fff;
        border-radius: 20rpx;
        font-size: 24rpx;
        padding: 0 20rpx;
        color: #606060;

        img {
          width: 23rpx;
          height: 23rpx;
          margin-right: 10rpx;
        }
      }
    }

    .titleSign {
      padding: 29rpx 37rpx;
      background: #FFFFFF;
      border-radius: 20rpx;
      width: 710rpx;
      box-sizing: border-box;
      margin: 0 auto;

      .signList {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .listItem {
          text-align: center;

          .top {
            width: 35rpx;
            height: 35rpx;
            border: 1rpx solid #DFDFDF;
            margin: 0 auto;
            img{
              width: 100%;
              height: 100%;
            }
          }

          .bottom {
            margin-top: 12rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #606060;
          }
        }
      }

      .signState {
        margin-top: 43rpx;

        .stateList {
          display: flex;
          flex-wrap: wrap;

          .stateItem {
            width: 25%;
            display: flex;
            .left{
              width: 21rpx;
              height: 20rpx;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .right{
              font-size: 20rpx;
              font-weight: 500;
              color: #606060;
              margin-left: 9rpx;
            }
          }
        }
      }
    }

    .list-item {
      width: 710rpx;
      margin: 20rpx auto;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;

      .list-item-top {
        width: 100%;
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(48, 48, 48, 0.1);

        span {
         font-size: 28rpx;
         font-weight: bold;
         color: #303030;
        }
        .arrowDown{
          width: 18rpx;
          height: 10rpx;
          img{
            width: 100%;
            height: 100%;
            rotate: 180deg;
            transition: all 0.3s;
          }
          .active{
            rotate:0deg;
            transition: all 0.3s;
          }
        }
      }

      .list-item-bottom {
        align-items: center;
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .bottomList{
          width: 48%;
          border-radius: 20rpx;
         padding:30rpx;
         box-sizing: border-box;
         margin-bottom: 30rpx;
         .listTop{
           span{
             font-size: 24rpx;
             font-weight: bold;
             color: #303030;
           }
           p{
             font-size: 22rpx;
             color: #606060;
             font-weight: 500;
             margin-top: 12rpx;
           }
         }
         .listBottom{
           margin-top:28rpx;
           p{
             font-size: 22rpx;
             color: #606060;
             margin-top: 12rpx;
           }
         }
        }

      }
    }

    .no-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 120rpx auto;

      img {
        width: 222rpx;
        height: 145rpx;
        margin-bottom: 20rpx;
        font-size: 30rpx;
        color: #909090;
      }
    }

    .fixed-btn {
      width: 127rpx;
      height: 127rpx;
      border-radius: 50%;
      background-color: #276EF2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      color: #fff;
      position: fixed;
      bottom: 156rpx;
      right: 40rpx;

      span:first-child {
        margin-bottom: 15rpx;
        font-size: 52rpx;
      }
    }
  }
</style>

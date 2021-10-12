<template>
  <div class="container">
    <div class="header" v-if="id==0">
      <div class="title">
        <img src="/static/images/entryinfo.png">
        <span>入驻信息</span>
      </div>
      <div class="content">
        <div class="contentHead">
          薄板文创-A幢-A101
        </div>
        <div class="contentBody">
          <div class="bodyList">
            <div class="top">
              100m²
            </div>
            <div class="bottom">
              面积
            </div>

          </div>
          <div class="bodyList">
            <div class="top">
              260万元
            </div>
            <div class="bottom">
              资产原值
            </div>

          </div>
          <div class="bodyList">
            <div class="top">
              26天
            </div>
            <div class="bottom">
              已入驻
            </div>
          </div>
          <div class="bodyList">
            <div class="top">
              0天
            </div>
            <div class="bottom">
              距到期还有
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="headerTwo" v-if="id==1" @click="toPage('/pages/workBench/projectManagement/main')">
      <div class="title">
        <img src="/static/images/total.png">
        <span>项目总数</span>
        <div class="number">
          7
        </div>
      </div>
      <div class="content">
        <div class="contentBody">
          <div class="bodyList">
            <div class="top">
              4
            </div>
            <div class="bottom">
              待入驻
            </div>
          </div>
          <div class="bodyList">
            <div class="top">
              3
            </div>
            <div class="bottom">
              入驻项目
            </div>
          </div>
          <div class="bodyList">
            <div class="top">
              0
            </div>
            <div class="bottom">
              退租项目
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="headerThree" v-if="id==1">
      <div class="left" @click="toPage('/pages/workBench/contractEarlyWarning/main')">
        <img src="/static/images/warning1.png">
        <div class="information">
          <div class="top">
            合同预警
          </div>
          <div class="bottom">
            <span>4</span>个
          </div>
        </div>
      </div>
      <div class="right" @click="toPage('/pages/workBench/costWarning/main')">
          <img src="/static/images/warning2.png">
        <div class="information">
          <div class="top">
            费用预警
          </div>
          <div class="bottom">
            <span>9</span>个
          </div>
        </div>
      </div>
    </div>
    <div class="headerTwo" v-if="id==1" @click="toPage('/pages/workBench/contractList/main')">
      <div class="title">
        <img src="/static/images/hetong.png">
        <span>合同状态</span>
      </div>
      <div class="content">
        <div class="contentBody">
          <div class="bodyListTwo">
            <div class="top" style="color: #FF5B12;">
              0
            </div>
            <div class="bottom">
              待执行
            </div>
          </div>
          <div class="bodyListTwo">
            <div class="top" style="color: #276EF2;">
              1
            </div>
            <div class="bottom">
              执行中
            </div>
          </div>
          <div class="bodyListTwo">
            <div class="top" style="color: #FFAE12;">
              1
            </div>
            <div class="bottom">
              即将到期
            </div>
          </div>
          <div class="bodyListTwo">
            <div class="top" style="color: #FF1C0B;">
             0
            </div>
            <div class="bottom">
              已逾期
            </div>
          </div>
          <div class="bodyListTwo">
            <div class="top" style="color: #303030;">
              1
            </div>
            <div class="bottom">
              已归档
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="headerFour" >
      <div class="title">
        <img src="/static/images/kongjian.png">
        <span>空间资产</span>
      </div>
      <div class="content" @click="toPage('/pages/workBench/houseManagement/main')">
          <div class="bodyList">
              <div class="list">
                <div class="top">
                  0间/0m²
                </div>
                <div class="bottom">
                   办公室总数
                </div>
              </div>
              <div class="list" style="margin-top: 50rpx;">
                <div class="top">
                  0间/0m²
                </div>
                <div class="bottom">
                   空闲房源
                </div>
              </div>
          </div>
          <div class="bodyList">
              <div class="list">
                <div class="top">
                  0%环比：0%
                </div>
                <div class="bottom">
                  办公室空置率
                </div>
              </div>
              <div class="list" style="margin-top: 50rpx;">
                <div class="top">
                 0个
                </div>
                <div class="bottom">
                   工位总数
                </div>
              </div>
          </div>
          <div class="bodyList">
              <div class="list">
                <div class="top">
                  0个
                </div>
                <div class="bottom">
                 空闲工位
                </div>
              </div>
              <div class="list" style="margin-top: 50rpx;">
                <div class="top">
                  0%环比：0%
                </div>
                <div class="bottom">
                   工位置空率
                </div>
              </div>
          </div>
      </div>
    </div>
    <div class="showAll" @click="showAll" style="margin-bottom: 20rpx;" :class="show==false?'active':''">
      <span>全部应用</span>
      <img src="/static/images/arrowTop.png">
    </div>
    <div class="body" v-if="show==true&&id==0" :class="show==false?'bodyShow':''">
      <div class="bodyList" v-for="(item,index) in serviceType " :key="index">
        <div class="title">
          <img :src="item.img">
          <span>{{item.serviceTitle}}</span>
        </div>
        <div class="content">
          <div class="contentList" v-for="(item1,index1) in item.serviceList" :key="index1">
            <div class="listTop">
              <img :src="item1.url">
            </div>
            <div class="listBot">
              {{item1.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body" v-if="show==true&&id==1" :class="show==false?'bodyShow':''">
      <div class="bodyList" v-for="(item,index) in serviceTypeTwo" :key="index">
        <div class="title">
          <img :src="item.img">
          <span>{{item.serviceTitle}}</span>
        </div>
        <div class="content">
          <div class="contentList" v-for="(item1,index1) in item.serviceList" :key="index1" @click="toPage(item1.pageUrl)">
            <div class="listTop">
              <img :src="item1.url">
            </div>
            <div class="listBot">
              {{item1.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: 1,
        info: {},
        show: true,
        serviceTypeTwo: [{
            serviceTitle: "空间资产",
            img: '/static/images/spacing.png',
            serviceList: [{
              url: "/static/images/预约参观.png",
              title: "预约参观",
              pageUrl: ""
            }, {
              url: "/static/images/入驻申请.png",
              title: "入驻申请",
              pageUrl: ""
            },
            {
              url: "/static/images/招商审核.png",
              title: "招商审核",
              pageUrl: ""
            },
            {
              url: "/static/images/招商管理.png",
              title: "招商管理",
              pageUrl: ""
            },
            {
              url: "/static/images/合同审核.png",
              title: "合同审核",
              pageUrl: ""
            },
            {
              url: "/static/images/img2.png",
              title: "财务统计",
              pageUrl: ""
            },
            {
              url: "/static/images/对账审核.png",
              title: "对账审核",
              pageUrl: ""
            },
            {
              url: "/static/images/合同管理.png",
              title: "合同管理",
              pageUrl: ""
            }]
          },
          {
            serviceTitle: "企业服务",
            img: '/static/images/qiye.png',
            serviceList: [{
                url: "/static/images/园企互动.png",
                title: "园企互动",
                pageUrl: ""
              }, {
                url: "/static/images/活动管理.png",
                title: "活动管理",
                pageUrl: ""
              },
              {
                url: "/static/images/运营拜访.png",
                title: "运营拜访",
                pageUrl: "/pages/workBench/operationVisit/main"
              },
              {
                url: "/static/images/政策评审.png",
                title: "政策评审",
                pageUrl: "/pages/workBench/policyReview/main"
              },
              {
                url: "/static/images/装修管理.png",
                title: "装修管理",
                pageUrl: "/pages/workBench/decorationManagement/main"
              },
              {
                url: "/static/images/报修管理.png",
                title: "报修管理",
                pageUrl: "/pages/workBench/repairManagement/main"
              },
              {
                url: "/static/images/科技成果.png",
                title: "科技成果",
                pageUrl: "/pages/workBench/technologicalAchievements/main"
              },
              {
                url: "/static/images/科技需求.png",
                title: "科技需求",
                pageUrl: "/pages/workBench/technologicalNeeds/main"
              },
              {
                url: "/static/images/资源信息.png",
                title: "资源信息",
                pageUrl: "/pages/workBench/resourceInformation/main"
              },
              {
                url: "/static/images/需求信息.png",
                title: "需求信息",
                pageUrl: "/pages/workBench/demandInformation/main"
              },
              {
                url: "/static/images/服务商.png",
                title: "服务商",
                pageUrl: "/pages/workBench/service/main"
              },
              {
                url: "/static/images/投融资服务.png",
                title: "投融资服务",
                pageUrl: "/pages/workBench/investmentAndFinancing/main"
              },

            ]
          },
          {
            serviceTitle: "智慧党建",
            img: '/static/images/dangjian.png',
            serviceList: [{
              url: "/static/images/img11.png",
              title: "建党宣传",
              pageUrl: "/pages/workBench/jiandang/main"
            }, {
              url: "/static/images/党员管理.png",
              title: "党员管理",
              pageUrl: "/pages/workBench/dangyuan/main"
            },
            {
              url: "/static/images/党员学习.png",
              title: "党员学习",
              pageUrl: "/pages/workBench/dangyuanxuexi/main"
            }]
          }
        ],
        serviceType: [{
            serviceTitle: "空间资产",
            img: '/static/images/spacing.png',
            serviceList: [{
              url: "/static/images/img1.png",
              title: "合同列表",
              pageUrl: ""
            }, {
              url: "/static/images/img2.png",
              title: "财务统计",
              pageUrl: ""
            }]
          },
          {
            serviceTitle: "企业服务",
            img: '/static/images/qiye.png',
            serviceList: [{
                url: "/static/images/img3.png",
                title: "政策申报",
                pageUrl: ""
              }, {
                url: "/static/images/img4.png",
                title: "活动报名",
                pageUrl: ""
              },
              {
                url: "/static/images/img5.png",
                title: "预约记录",
                pageUrl: ""
              },
              {
                url: "/static/images/img6.png",
                title: "科技需求",
                pageUrl: ""
              },
              {
                url: "/static/images/img7.png",
                title: "我的需求",
                pageUrl: ""
              },
              {
                url: "/static/images/img8.png",
                title: "我的订单",
                pageUrl: ""
              },
              {
                url: "/static/images/img9.png",
                title: "装修管理",
                pageUrl: ""
              },
              {
                url: "/static/images/img10.png",
                title: "保修管理",
                pageUrl: ""
              }
            ]
          },
          {
            serviceTitle: "智慧党建",
            img: '/static/images/dangjian.png',
            serviceList: [{
              url: "/static/images/img11.png",
              title: "建档宣传",
              pageUrl: ""
            }, {
              url: "/static/images/img12.png",
              title: "党员学习",
              pageUrl: ""
            }]
          }
        ],
      }
    },
    components: {

    },
    async onLoad(options) {


    },
    onShow() {

    },
    //解底事件
    onReachBottom() {

    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      showAll() {
        this.show = !this.show
      },
       toPage(url){
         this.until.aHref(url)
       }

    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .container {
    margin-top: -2rpx;
    min-height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1rpx solid rgba(0, 0, 0, 0.1);
    background: url('../../../../static/images/workHeader.png') no-repeat;
    background-size: 100% 75px;

    .header {
      width: 710rpx;
      background: #FFFFFF;
      border-radius: 30rpx;
      margin: 0px auto;
      margin-top: 10rpx;

      .title {
        padding: 29rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

        img {
          width: 32rpx;
          height: 32rpx;
        }

        span {
          font-size: 28rpx;
          font-weight: 500;
          color: #303030;
          margin-left: 13rpx;
        }

        .number {
          font-size: 28rpx;
          font-weight: 500;
          color: #FF5400;
          margin-left: 23rpx;
        }
      }

      .content {
        .contentHead {
          display: flex;
          justify-content: center;
          margin-top: 40rpx;
          font-size: 30rpx;
          font-weight: 500;
          color: #303030;

        }

        .contentBody {
          box-sizing: border-box;
          padding: 38rpx 44rpx;
          display: flex;

          // justify-content: space-around;
          .bodyList {
            width: 25%;
            text-align: center;
            border-right: 1rpx solid rgba(0, 0, 0, 0.1);

            .top {
              font-size: 30rpx;
              font-weight: 500;
              color: #FF5B12;
            }

            .bottom {
              font-size: 20rpx;
              font-weight: 500;
              color: #909090;
            }
          }

          .bodyList:last-child {
            border-right: none;
          }
        }
      }
    }

    .headerTwo {
      width: 710rpx;
      background: #FFFFFF;
      border-radius: 30rpx;
      margin: 0px auto;
      margin-top: 10rpx;

      .title {
        padding: 29rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);

        img {
          width: 32rpx;
          height: 32rpx;
        }

        span {
          font-size: 28rpx;
          font-weight: 500;
          color: #303030;
          margin-left: 13rpx;
        }

        .number {
          font-size: 28rpx;
          font-weight: 500;
          color: #FF5400;
          margin-left: 23rpx;
        }
      }

      .content {
        width: 100%;
        .contentHead {
          display: flex;
          justify-content: center;
          margin-top: 40rpx;
          font-size: 30rpx;
          font-weight: 500;
          color: #303030;

        }

        .contentBody {
          box-sizing: border-box;
          padding: 38rpx 0rpx;
          display: flex;

          // justify-content: space-around;
          .bodyList {
            width: 33%;
            text-align: center;
            border-right: 1rpx solid rgba(0, 0, 0, 0.1);
            .top {
              font-size: 36rpx;
              font-weight: 500;
              color: #FF5B12;
            }

            .bottom {
              font-size: 20rpx;
              font-weight: 500;
              color: #909090;
            }
          }
          .bodyListTwo{
            width: 20%;
            text-align: center;
            border-right: 1rpx solid rgba(0, 0, 0, 0.1);
            .top {
              font-size: 36rpx;
              font-weight: 500;
              color: #FF5B12;
            }

            .bottom {
              font-size: 20rpx;
              font-weight: 500;
              color: #909090;
            }
          }

          .bodyList:last-child {
            border-right: none;
          }
        }
      }
    }
    .headerThree {
      display: flex;
      width: 710rpx;
      background: #FFFFFF;
      border-radius: 30rpx;
      margin: 0px auto;
      margin-top: 20rpx;
      .left {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30rpx 0;
        position: relative;
        img {
          width: 82rpx;
          height: 82rpx;
        }
        .information {
          margin-left: 17rpx;
          .top {
            font-size: 20rpx;
            font-weight: 500;
            color: #909090;
          }
          .bottom {
            font-size: 20rpx;
            font-weight: 500;
            color: #909090;
            span {
              font-size: 36rpx;
              font-weight: 500;
              color: #FF5B12;
            }
          }
        }
      }
      .left::after{
        content: '';
        position: absolute;
        right: 0%;
        // top: 50%;
        width: 1rpx;
        height: 50rpx;
        background: #000000;
        opacity: 0.1;
      }
      .right{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30rpx 0;
        position: relative;
        img {
          width: 82rpx;
          height: 82rpx;
        }
        .information {
          margin-left: 17rpx;
          .top {
            font-size: 20rpx;
            font-weight: 500;
            color: #909090;
          }
          .bottom {
            font-size: 20rpx;
            font-weight: 500;
            color: #909090;
            span {
              font-size: 36rpx;
              font-weight: 500;
              color: #276EF2;
            }
          }
        }
      }
    }
    .headerFour{
      width: 710rpx;
      background: #FFFFFF;
      border-radius: 30rpx;
      margin: 0px auto;
      margin-top: 20rpx;
      .title {
        padding: 29rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
        img {
          width: 32rpx;
          height: 32rpx;
        }
        span {
          font-size: 28rpx;
          font-weight: 500;
          color: #303030;
          margin-left: 13rpx;
        }
      }
      .content{
        display: flex;
        .bodyList{
          width: 33%;
          justify-content: center;
          align-items: center;
          padding: 39rpx  0rpx;
          box-sizing: border-box;
          text-align: center;
           position: relative;
          .list{
            .top{
              font-size: 30rpx;
              font-weight: 500;
              color: #303030;
            }
            .bottom{
              font-size: 20rpx;
              font-weight: 500;
              color: #909090;
              margin-top: 18rpx;
            }
          }
        }
        .bodyList:first-child::after{
          content: '';
          width: 1rpx;
          height: 90rpx;
          background: #000000;
          opacity: 0.1;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .bodyList:nth-child(2)::after{
          content: '';
          width: 1rpx;
          height: 90rpx;
          background: #000000;
          opacity: 0.1;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .showAll {
      margin: 0 auto;
      margin-top: 20rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 710rpx;
      height: 80rpx;
      background: #FFFFFF;
      border-radius: 20rpx;

      span {
        font-size: 30rpx;
        font-weight: 500;
        color: #303030;
      }

      img {
        margin-left: 20rpx;
        width: 18rpx;
        height: 10rpx;
        transition: all 0.3s;
      }
    }

    .active {

      img {
        transition: all 0.3s;
        rotate: 180deg;
      }

    }

    .body {
      transition: all 0.3s;
      padding-bottom: 100rpx;

      .bodyList {
        width: 710rpx;
        background: #FFFFFF;
        border-radius: 20rpx;
        margin: 0px auto;
        margin-top: 10rpx;

        .title {
          padding: 29rpx;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);

          img {
            width: 32rpx;
            height: 32rpx;
          }

          span {
            font-size: 28rpx;
            font-weight: 500;
            color: #303030;
            margin-left: 13rpx;
          }
        }

        .content {
          display: flex;
          flex-wrap: wrap;
          padding: 0rpx 0 40rpx 0;
          box-sizing: border-box;

          .contentList {
            text-align: center;
            width: 25%;
            margin-top: 40rpx;

            .listTop {
              img {
                width: 60rpx;
                height: 46rpx;

              }
            }
          }
        }
      }
    }

    .bodyShow {
      transition: all 0.3s;
      height: 0;
    }
  }
</style>

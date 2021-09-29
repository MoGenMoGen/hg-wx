<template>
  <div class="home">
    <!-- 轮播 -->
    <commonSwiper :banner="banner"></commonSwiper>
    <!-- 顶部背景 -->
    <img src="/static/images/topBg.png" class="topBg">
    <!-- 导航 -->
    <div class="tab-box">
      <block v-for="(item,index) in tabList" :key="index">
        <div @click="choose(index)">
          <img :src="item.url" v-if="selectIndex!=index">
          <img :src="item.selectUrl" v-if="selectIndex==index">
          <span>{{item.title}}</span>
          <img class="select-img" src="/static/images/selectImg.png" v-if="selectIndex==index">
        </div>
      </block>
    </div>
    <!-- 列表 -->
    <!-- 民生事项 -->
    <block v-if='selectIndex==0'>
      <div class="common-title-red">
        <div>
          <img src="/static/images/hot.png">热搜
        </div>
        <div @click="toPage('/pages/convenience/quesList/main')">
          全部提问
          <img src="/static/images/arrowRightW.png">
        </div>
      </div>
      <div class="question-box">
        <div class="question-item" v-for="(item,index) in questionList" :key="index" @click="toPage('/pages/convenience/quesDetail/main?id='+item.id)">
          <div class="question-item-top">
            <div class="question-item-first" v-if="index==0">{{index+1}}</div>
            <div class="question-item-second" v-else-if="index==1">{{index+1}}</div>
            <div class="question-item-third" v-else-if="index==2">{{index+1}}</div>
            <div v-else>{{index+1}}</div>
            <span class="question-cont">{{item.cont}}</span>
          </div>
          <div class="question-item-bottom" style="font-size: 24rpx;color: #666666;">
            <span><img src="/static/images/msg-logo.png" mode="heightFix">{{item.commentCount}}</span>
            <span><img src="/static/images/viewCount.png" mode="heightFix">{{item.watch}}</span>
          </div>
        </div>
        <div class="question-btn">
          <div @click="toPage('/pages/convenience/quesAsk/main')">我要提问</div>
        </div>
      </div>
      <div class="common-title-red">
        <div>
          <img src="/static/images/mssx.png">民生事项列表
        </div>
        <div @click="toPage('/pages/convenience/matter/main')">
          查看更多
          <img src="/static/images/arrowRightW.png">
        </div>
      </div>
      <div class="matter-box">
        <div class="matter-item" v-for="(item,index) in matterList" :key="index" @click="checkMatter(item.id)">
          <span>{{index+1}}.{{item.name}}</span>
        </div>
      </div>
      <div class="matter-bottom">
        <span style="margin-bottom: 10rpx;">九龙湖村咨询电话：0574-86534080</span>
        <span>九龙湖镇咨询电话：0574-86534205</span>
      </div>
      <div class="mask" catchtouchmove='ture' v-if="showMatter" @click="showMatter=false"></div>
      <div class="mask-box" v-if="showMatter">
        <span>{{matterInfo.name}}</span>
        <span>事项性质：{{matterInfo.quality}}</span>
        <span>受理层级：{{matterInfo.level}}</span>
      </div>
    </block>
    <!-- 建房申请 -->
    <block v-if='selectIndex==1'>
      <div class="common-title">私人建房申请统计</div>
      <div class="build-item">
        <div class="build-inner-box" style="flex-direction: column;">
          <div class="build-line-title">
            <div style="width: 80rpx;">序号</div>
            <div style="width: 130rpx;">户主姓名</div>
            <div style="width: 130rpx;">户内人口</div>
            <div style="width: 240rpx;">原有宅基地房屋处置方式</div>
            <div style="width: 130rpx;">申请状态</div>
            <div style="width: 130rpx;">新申请用地面积</div>
            <div style="width: 130rpx;">预选建房地址</div>
            <div style="width: 130rpx;">办理进展情况</div>
            <div style="width: 130rpx;">优先排序</div>
          </div>
          <div :class="{odd:index%2==1,even:index%2==0}" class="build-line-item" v-for="(item,index) in list" :key="index">
            <div style="width: 80rpx;">{{index+1}}</div>
            <div style="width: 130rpx;">{{item.name}}</div>
            <div style="width: 130rpx;">{{item.population}}</div>
            <div style="width: 240rpx;">{{item.manager}}</div>
            <div style="width: 130rpx;">{{statusType2[item.status]}}</div>
            <div style="width: 130rpx;">{{item.area}}</div>
            <div style="width: 130rpx;">{{item.address}}</div>
            <div style="width: 130rpx;">{{item.progress}}</div>
            <div style="width: 130rpx;">{{item.sort}}</div>
          </div>
        </div>
      </div>
      <div class="common-btn">
        <div @click="toPage('/pages/homeStead/detail/main')">私人建房申请流程</div>
        <div @click="toPage('/pages/homeStead/apply/main')">建房需求意向表</div>
      </div>
    </block>
    <!-- 盖章事项 -->
    <block v-if='selectIndex==2'>
      <div class="module">
        <div class="module-title">
          <div @click="showLightenText(1)">
            <img src="/static/images/issued.png">
            村(社区)可出具的证明事项
            <img src="/static/images/remind.png" style="width: 24rpx;height: 24rpx;margin-right: 0;margin-left: 10rpx;">
          </div>
          <div @click="toPage('/pages/convenience/stampList/main?type=1')">
            查看更多
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/convenience/stampDetail/main?type=1&id='+item.id)">
          <div style="display:flex;flex-direction: column;">
            <span class="list-item-title">{{index+1}}.{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="module-title">
          <div @click="showLightenText(2)">
            <img src="/static/images/notIssued.png">
            不应由村(社区)出具的证明事项
            <img src="/static/images/remind.png" style="width: 24rpx;height: 24rpx;margin-right: 0;margin-left: 10rpx;">
          </div>
          <div @click="toPage('/pages/convenience/stampList/main?type=2')">
            查看更多
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list-item" v-for="(item,index) in list2" :key="index" @click="toPage('/pages/convenience/stampDetail/main?type=2&id='+item.id)">
          <div style="display:flex;flex-direction: column;">
            <span class="list-item-title">{{index+1}}.{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="mask" catchtouchmove="true" v-if="showLighten" @click="showLighten=false"></div>
      <div class="lighten-cont" v-if="showLighten">
        <span>{{lightenInfo.name}}</span>
        <div v-html="lightenInfo.cont"></div>
      </div>
    </block>
    <!-- 项目进度 -->
    <block v-if='selectIndex==3'>
      <div class="common-title">项目进度</div>
      <div class="build-item" style="padding: 30rpx;">
        <div class="build-inner-box" style="flex-direction: column;">
          <div class="build-line-title">
            <div style="width: 80rpx;">序号</div>
            <div style="width: 240rpx;">项目名称</div>
            <div style="width: 240rpx;">工程规模及造价</div>
            <div style="width: 130rpx;">进展情况</div>
          </div>
          <div :class="{odd:index%2==1,even:index%2==0}" class="build-line-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/convenience/reportList/main?id='+item.id)">
            <div style="width: 80rpx;">{{index+1}}</div>
            <div style="width: 240rpx;">{{item.name}}</div>
            <div style="width: 240rpx;">{{item.fund}}</div>
            <div style="width: 130rpx;">{{statusType[item.status]}}</div>
          </div>
        </div>
      </div>
    </block>
    <!-- 通知公告 -->
    <block v-if='selectIndex==4'>
      <div class="module">
        <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="moreNotice(item.id)">
          <div style="display:flex;flex-direction: column;">
            <span class="list-item-title"> · {{item.title}}</span>
            <span class="list-item-time">{{item.createTime}}</span>
          </div>
          <img src="/static/images/arrowR.png" mode="heightFix">
        </div>
      </div>
    </block>
  </div>
</template>

<script>
  import commonSwiper from '@/components/commonSwiper'
  export default {
    data() {
      return {
        banner: [],
        list: [],
        list2: [],
        tabList: [{
          title: '民生事项',
          url: '/static/images/guideLogo-u.png',
          selectUrl: '/static/images/guideLogo.png'
        },{
          title: '建房申请',
          url: '/static/images/buildLogo-u.png',
          selectUrl: '/static/images/buildLogo.png'
        },{
          title: '盖章事项',
          url: '/static/images/lightenLogo-u.png',
          selectUrl: '/static/images/lightenLogo.png'
        },{
          title: '项目进度',
          url: '/static/images/projectLogo-u.png',
          selectUrl: '/static/images/projectLogo.png'
        },{
          title: '通知公告',
          url: '/static/images/noticeLogo-u.png',
          selectUrl: '/static/images/noticeLogo.png'
        }],
        current: 1,
        total: 0,
        selectIndex: 0,
        noticeContent: [],
        lightenInfo: {},
        matterList: [],
        matterInfo: {},
        statusType: ['未开始','进行中','已结束'],
        statusType2: ['审核拒绝','待审核','审核通过'],
        showMatter: false,
        showLighten: false,
        questionList: []
      }
    },
    components: {
      commonSwiper
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      if(options.selectIndex){
        this.selectIndex = options.selectIndex
      }
      this.api.verifyToken().then(() => {
        this.api.adrertList('home').then(res => {
          this.banner = res.records[0].img.split(",")
        })
      });
      let data = {
        size:10,
        current:1
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      // wx.showNavigationBarLoading(); //在标题栏中显示加载图标
      let data = {
        current: 1,
        size: 10
      }
      this.current = 1
      this.list = []
      this.getList(data);
      wx.stopPullDownRefresh();
    },

    onShareAppMessage() {
      return {

      }
    },

    methods: {
      moreNotice(id) {
        this.toPage('/pages/index/newDetail/main?id='+id+'&typeid=1')
      },
      toPage(url) {
        this.until.aHref(url)
      },
      choose(index) {
        this.selectIndex = index
        this.current = 1
        this.list = []
        let data = {
          size:10,
          current:1
        }
        this.getList(data)
      },
      getList(data) {
        if(this.selectIndex==0) {
          this.api.getMatterList({current: 1,size:10}).then(res => {
            this.matterList = res.records
          })
          this.api.getQuestionList({current: 1,size:10,pid:'0',status:2}).then(res => {
            this.questionList = res.records
          })
        } else if(this.selectIndex==1) {
          this.api.perApplyAllList(data).then(res => {
            this.list = res.records
            this.total = res.total
          })
        } else if(this.selectIndex==2) {
          let thisData = {
            travelId: '1423198267428073474',
            current: 1,
            size: 5
          }
          let thisData2 = {
            travelId: '1423207319421181953',
            current: 1,
            size: 5
          }
          this.api.getAdvertList(thisData).then(res => {
            this.list = res.records
          })
          this.api.getAdvertList(thisData2).then(res => {
            this.list2 = res.records
          })
        } else if (this.selectIndex == 3) {
          data.project = 1
          this.api.getProjectList(data).then(res => {
            this.list = res.records
            this.total = res.total
          })
        } else if(this.selectIndex==4) {
          this.api.getNoticeList(data).then(res => {
            res.records.forEach(item => {
              item.createTime = item.createTime.substring(0,10)
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
        }
      },
      showLightenText(flag) {
        let data = {
          size: 10,
          current: 1
        }
        this.showLighten = true
        if(flag==1) {
          this.api.getGuideInfo(data).then(res => {
            res.records[0].cont = this.until.imgStyle(res.records[0].cont)
            this.lightenInfo = res.records[0]
          })
        } else if (flag==2) {
          this.api.getGuideInfo(data).then(res => {
            res.records[1].cont = this.until.imgStyle(res.records[1].cont)
            this.lightenInfo = res.records[1]
          })
        }
      },
      checkMatter(id) {
        this.showMatter = true
        this.api.getMatterDetail({id:id}).then(res => {
          this.matterInfo = res
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    // padding: 20rpx;
    padding-bottom: 40rpx;
    box-sizing: border-box;
    .topBg {
      width: 100%;
      height: 198rpx;
      display: block;
    }
    .bg-blue {
      background-color: #1794EC;
    }
    .bg-red {
      background-color: #EC2C17;
    }
    .bg-gray {
      background-color: #ACACAC;
    }
    .tab-box {
      width: 750rpx;
      height: 402rpx;
      // margin: 30rpx auto;
      padding: 182rpx 30rpx 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 2rpx solid #DDDDDD;
      div {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 20rpx 0;
        margin-top: 40rpx;
        img {
          width: 100rpx;
          height: 100rpx;
        }
        span {
          color: #333333;
          font-size: 28rpx;
        }
        .select-img {
          width: 108rpx;
          height: 10rpx;
          position: absolute;
          bottom: 0;
        }
      }
    }
    .module {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 20rpx auto;
      .module-title {
        width: 710rpx;
        height: 88rpx;
        display: flex;
        align-items: center;
        padding: 0 30rpx;
        justify-content: space-between;
        box-sizing: border-box;
        color: #fff;
        font-size: 28rpx;
        background-color: #EC2C17;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
        div {
          display: flex;
          align-items: center;
        }
        img {
          width: 30rpx;
          height: 30rpx;
          margin-right: 17rpx;
        }
        div:last-child {
          font-size: 20rpx;
          img {
            width: 10rpx;
            height: 18rpx;
            margin-right: 0;
            margin-left: 10rpx;
          }
        }
      }
      .module-list-item {
        padding: 30rpx;
        box-sizing: border-box;
        border-top: 1px solid rgba(0,0,0,0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          height: 28rpx;
        }
        .list-item-title {
          color: #303030;
          font-size: 26rpx;
        }
        .list-item-time {
          color: #909090;
          font-size: 24rpx;
          margin-left: 14rpx;
        }
      }
      .module-list-item:first-child {
        border-top: 0;
      }
    }
    .lighten-cont {
      width: 710rpx;
      padding: 40rpx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 101;
      span {
        width: 100%;
        text-align: center;
        margin-bottom: 30rpx;
        font-size: 26rpx;
        color: #303030;
      }
    }
    .common-title {
      font-size: 32rpx;
      color: #333333;
      margin: 30rpx;
      font-weight: 600;
    }
    .common-title-red {
      width: 710rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      justify-content: space-between;
      box-sizing: border-box;
      color: #fff;
      font-size: 28rpx;
      background-color: #EC2C17;
      margin: 0 auto;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
      margin-top: 20rpx;
      div {
        display: flex;
        align-items: center;
      }
      img {
        width: 38rpx;
        height: 38rpx;
        margin-right: 17rpx;
      }
      div:last-child {
        font-size: 20rpx;
        img {
          width: 10rpx;
          height: 18rpx;
          margin-right: 0;
          margin-left: 10rpx;
        }
      }
    }
    .question-box {
      width: 710rpx;
      margin: 0 auto;
      border-bottom-left-radius: 10rpx;
      border-bottom-right-radius: 10rpx;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .question-item {
        display: flex;
        flex-direction: column;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F4F4F4;
        .question-item-top {
          display: flex;
          color: #303030;
          font-size: 26rpx;
          margin-bottom: 20rpx;
          div {
            background: url(../../../../static/images/other.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 29rpx;
            height: 32rpx;
            margin-right: 13rpx;
            color: #fff;
            font-size: 18rpx;
          }
          .question-item-first {
            background: url(../../../../static/images/first.png) no-repeat;
            background-size: 100% 100%;
          }
          .question-item-second {
            background: url(../../../../static/images/second.png) no-repeat;
            background-size: 100% 100%;
          }
          .question-item-third {
            background: url(../../../../static/images/third.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .question-item-bottom {
          padding-left: 35rpx;
          box-sizing: border-box;
          span {
            margin-right: 60rpx;
          }
          img {
            height: 20rpx;
            margin-right: 10rpx;
          }
        }
      }
      .question-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40rpx 0;
        div {
          width: 506rpx;
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          border-radius: 40rpx;
          background-color: #EC2C17;
          color: #fff;
          font-size: 30rpx;
        }
      }
    }
    .matter-box {
      width: 710rpx;
      margin: 0 auto;
      border-bottom-left-radius: 10rpx;
      border-bottom-right-radius: 10rpx;
      background-color: #fff;
      .matter-item {
        display: flex;
        font-size: 26rpx;
        color: #303030;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid rgba(0,0,0,0.1);
      }
      .matter-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40rpx 0;
        div {
          width: 214rpx;
          height: 64rpx;
          line-height: 64rpx;
          text-align: center;
          border-radius: 60rpx;
          color: #fff;
          background-color: #599BFF;
          font-size: 24rpx;
        }
      }
    }
    .matter-bottom {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 20rpx auto;
      color: #333;
      font-size: 28rpx;
    }
    .picker-line {
      width: 690rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      .picker-box {
        width: 310rpx;
        height: 80rpx;
        border: 2rpx solid #EC2C17;
        border-radius: 8rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx 30rpx;
        box-sizing: border-box;
        color: #EC2C17;
        font-size: 24rpx;
        .pickerClass {
          flex: 1;
        }
        img {
          width: 18rpx;
          height: 11rpx;
          flex-shrink: 1;
        }
      }
    }
    .build-item {
      width: 100%;
      background-color: #fff;
      border-radius: 20rpx;
      padding: 20rpx;
      box-sizing: border-box;
      overflow-x: scroll;
      .build-inner-box {
        display: inline-block;
        .build-line-title {
          background-color: #265EFF;
          font-size: 24rpx;
          color: #fff;
          border-top-left-radius: 8rpx;
          border-top-right-radius: 8rpx;
          display: flex;
          align-items: center;
          height: 90rpx;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #fff;
            box-sizing: border-box;
            height: 100%;
            text-align: center;
            flex-shrink: 1;
          }
          div:last-child {
            border-right: none;
          }
        }
        .build-line-item {
          font-size: 24rpx;
          color: #fff;
          display: flex;
          align-items: center;
          height: 90rpx;
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #fff;
            box-sizing: border-box;
            text-align: center;
            padding: 5rpx;
            height: 100%;
            line-height: 45rpx;
            flex-shrink: 1;
            span {
              width: 16rpx;
              height: 16rpx;
              border-radius: 50%;
              background-color: #31EE6A;
            }
          }
          div:last-child {
            border-right: none;
          }
        }
        .odd {
          background-color: #599BFF;
        }
        .even {
          background-color: #A6C9FF;
        }
      }
    }
    .common-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40rpx 0;
      div {
        width: 240rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        border-radius: 60rpx;
        border: 2rpx solid #599BFF;
        color: #599BFF;
        font-size: 24rpx;
      }
      div:last-child {
        color: #fff;
        background-color: #599BFF;
        margin-left: 60rpx;
      }
    }
    .mask {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      background-color: rgba(0,0,0,0.5);
    }
    .mask-box {
      width: 650rpx;
      padding: 40rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-size: 24rpx;
      color: #606060;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 101;
      background-color: #fff;
      border-radius: 10rpx;
      span {
        margin-bottom: 30rpx;
      }
      span:first-child {
        font-size: 26rpx;
        color: #303030;
      }
    }
  }
</style>

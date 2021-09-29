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
    <!-- 阳光村务 -->
    <block v-if='selectIndex==0'>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/jjfzqk.png" mode="heightFix">经济发展情况</span>
        <div class="sunShine-economy">
          <div class="sunShine-economy-item">
            <span class="sunShine-economy-item-top">比去年 <span
                style="font-weight: 800;font-size: 30rpx;">{{economyInfo[18].cont}}</span></span>
            <span class="sunShine-economy-item-middle">
              <AnimatedNumber :value="economyInfo[20].cont" :precision="1"></AnimatedNumber>
              <span>万元</span>
            </span>
            <span class="sunShine-economy-item-bottom">本年度经济总收入目标</span>
          </div>
          <div class="sunShine-economy-item">
            <span class="sunShine-economy-item-top" style="color: #1BA409;">比去年 <span
                style="font-weight: 800;font-size: 30rpx;">{{economyInfo[19].cont}}</span></span>
            <span class="sunShine-economy-item-middle" style="border-color: #5087EC;color: #5087EC;">
              <AnimatedNumber :value="economyInfo[21].cont" :precision="1"></AnimatedNumber>
              <span>万元</span>
            </span>
            <span class="sunShine-economy-item-bottom">本年度村级可用收入目标</span>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title sunShine-title2">
          <div>
            <img src="/static/images/hyjy.png" mode="heightFix">会议纪要
          </div>
          <div @click="toPage('/pages/honest/meetingList/main')">
            查看更多<img src="/static/images/arrowR.png" mode="heightFix">
          </div>
        </span>
        <div class="sunShine-inner-box" style="flex-direction: column;padding: 0;">
          <div class="sunShine-inspect-item sunShine-inspect-item2" v-for="(item,index) in meetingList" :key="index"
          @click="toPage('/pages/honest/meetingDetail/main?id='+item.id)">
            <span>· {{item.name}}</span>
            <span style="color: #909090;"><img src="/static/images/time-logo.png">{{item.meetTime}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="sunShine-item">
        <span class="sunShine-title" style="position: relative;">
          <img src="/static/images/lwyg.png" mode="heightFix">劳务用工
          <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);">{{mouth}}</div>
        </span>
        <div class="sunShine-inner-box" style="height: 326rpx;">
          <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
        </div>
        <div style="display: flex;align-items: center;width: 100%;justify-content: center;color: #909090;font-size: 20rpx;margin-bottom: 20rpx;">
          <img src="/static/images/slider.png" style="width: 28rpx;height: 30rpx;margin-right: 10rpx;">滑动查看更多数据
        </div>
      </div> -->
      <div class="sunShine-item" @click="toPage('/pages/convenience/list/main?selectIndex=1')">
        <div class="sunShine-title">
          <img src="/static/images/cmjf.png" mode="heightFix">
          村民建房
          <div style="width: 1px;height: 59rpx;background-color: rgba(0,0,0,0.1);margin: 0 20rpx;"></div>
          <div class="sunShine-inner-box" style="padding: 0;width: 50%;">
            本季度要求建房
            <span style="color: #EC2C17;margin: 0 6rpx;">{{economyInfo[22].cont}}</span>户
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/xwql.png" mode="heightFix">小微权力</span>
        <div class="sunShine-inner-box sunShine-inner-box-4">
          <div class="sunShine-inner-item" v-for="(item,index) in powerList" :key="index"
            @click="showThisImg(item.img)">
            <img src="/static/images/ppt.png">
            <div>{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/cwgk.png" mode="heightFix">财务公开</span>
        <div class="sunShine-inner-box sunShine-inner-box-5">
          <div class="sunShine-inner-item" v-for="(item,index) in financeopenList" :key="index"
            @click="showThisImg(item.img)">
            <img :src="item.logo">
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title sunShine-title2">
          <div>
            <img src="/static/images/zcgl.png" mode="heightFix">资产管理
          </div>
          <div @click="toPage('/pages/honest/assetsList/main')">
            查看更多<img src="/static/images/arrowR.png" mode="heightFix">
          </div>
        </span>
        <div class="sunShine-inner-box" style="padding: 20rpx 10rpx;flex-direction: column;">
          <div class="sunShine-line-title" style="height: 70rpx;line-height: 70rpx;">
            <div style="width: 80rpx;">序号</div>
            <div style="width: 240rpx;">承租方</div>
            <div style="width: 160rpx;">租期</div>
            <div style="width: 130rpx;">租金</div>
            <div style="width: 80rpx;">预警</div>
          </div>
          <div :class="{odd:index%2==1,even:index%2==0}" class="sunShine-line-item" v-for="(item,index) in assestList"
            :key="index" @click="toPage('/pages/honest/assetsDetail/main?id='+item.id)">
            <div style="width: 80rpx;">{{index+1}}</div>
            <div style="width: 240rpx;">{{item.tenantry}}</div>
            <div style="width: 160rpx;">{{item.leaseStart}}-{{item.leaseEnd}}</div>
            <div style="width: 130rpx;">{{item.rent}}</div>
            <div style="width: 80rpx;">
              <img src="/static/images/greenLight.png"  v-if="item.status==0"/>
              <img src="/static/images/yellowLight.png" v-if="item.status==1" />
              <img src="/static/images/redLight.png" v-if="item.status==2" />
            </div>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title sunShine-title2">
          <div>
            <img src="/static/images/gcjs.png" mode="heightFix">工程建设
          </div>
          <div @click="toPage('/pages/honest/projectList/main')">
            查看更多<img src="/static/images/arrowR.png" mode="heightFix">
          </div>
        </span>
        <div class="sunShine-inner-box" style="padding: 20rpx 10rpx;flex-direction: column;">
          <div class="sunShine-line-title" style="height: 70rpx;line-height: 70rpx;">
            <div style="width: 80rpx;">序号</div>
            <div style="width: 240rpx;">项目名称</div>
            <div style="width: 240rpx;">工程规模及造价</div>
            <div style="width: 130rpx;">进展情况</div>
          </div>
          <div :class="{odd:index%2==1,even:index%2==0}" class="sunShine-line-item" v-for="(item,index) in projList"
            :key="index" @click="toPage('/pages/convenience/reportList/main?id='+item.id)">
            <div style="width: 80rpx;">{{index+1}}</div>
            <div style="width: 240rpx;">{{item.name}}</div>
            <div style="width: 240rpx;">{{item.fund}}</div>
            <div style="width: 130rpx;">{{statusType[item.status]}}</div>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/tdzy.png" mode="heightFix">土地征用</span>
        <div class="sunShine-inner">
          <div class="sunShine-inner-top" style="justify-content: space-around;">
            <div class="sunShine-inner-top-item">
              <img src="/static/images/zysj.png">
              <div>
                <span class="">{{economyInfo[0].cont}}<span>月</span></span>
                <span class="">征用时间</span>
              </div>
            </div>
            <div class="sunShine-inner-top-item">
              <img src="/static/images/zymj.png">
              <div>
                <span class="">{{economyInfo[1].cont}}<span>亩</span></span>
                <span class="">征用面积</span>
              </div>
            </div>
          </div>
          <div class="sunShine-inner-bottom">
            <div class="sunShine-inner-bottom-item">
              <div class="color-y border-yellow">{{economyInfo[2].cont}}<span>元</span></div>
              <span>征用总费用</span>
            </div>
            <div class="sunShine-inner-bottom-item">
              <div class="color-r border-red">{{economyInfo[3].cont}}<span>元</span></div>
              <span>已到位金额</span>
            </div>
            <div class="sunShine-inner-bottom-item">
              <div class="color-b border-blue">{{economyInfo[4].cont}}<span>元</span></div>
              <span>已发放金额</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/shbz.png" mode="heightFix">社会保障</span>
        <div class="sunShine-inner">
          <div class="sunShine-inner-top">
            <div class="sunShine-inner-top-item" @click="showDB">
              <img src="/static/images/xsdb.png">
              <div>
                <span class="">{{economyInfo[5].cont}}<span>人</span></span>
                <span class="">享受低保</span>
              </div>
            </div>
            <div class="sunShine-inner-top-item">
              <img src="/static/images/ylbx.png">
              <div>
                <span class="">{{economyInfo[6].cont}}<span>人</span></span>
                <span class="">医疗保险</span>
              </div>
            </div>
            <div class="sunShine-inner-top-item">
              <img src="/static/images/glylbxrs.png">
              <div>
                <span class="">{{economyInfo[7].cont}}<span>人</span></span>
                <span class="">各类养老保险人数</span>
              </div>
            </div>
          </div>
          <div class="sunShine-inner-bottom">
            <div class="sunShine-inner-bottom-item">
              <div class="color-y border-yellow">{{economyInfo[8].cont}}<span>人</span></div>
              <span>本季度新增低保人数</span>
            </div>
            <div class="sunShine-inner-bottom-item">
              <div class="color-b border-blue">{{economyInfo[9].cont}}<span>人</span></div>
              <span>本季度新增医疗保险</span>
            </div>
            <div class="sunShine-inner-bottom-item">
              <div class="color-r border-red">{{economyInfo[10].cont}}<span>人</span></div>
              <span>本季度新增养老人数</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/shjz.png" mode="heightFix">社会救助</span>
        <div class="sunShine-inner">
          <div class="sunShine-inner-top">
            <div class="sunShine-inner-top-item" @click="showBZ">
              <img src="/static/images/bjdbz.png">
              <div>
                <span class="">{{economyInfo[11].cont}}<span>人</span></span>
                <span class="">本季度补助</span>
              </div>
            </div>
            <div class="sunShine-inner-top-item" @click="showBT">
              <img src="/static/images/bjdbt.png">
              <div>
                <span class="">{{economyInfo[12].cont}}<span>人</span></span>
                <span class="">本季度补贴</span>
              </div>
            </div>
            <div class="sunShine-inner-top-item" @click="showYD">
              <img src="/static/images/xsydfx.png">
              <div>
                <span class="">{{economyInfo[13].cont}}<span>人</span></span>
                <span class="">本村享受优待抚恤</span>
              </div>
            </div>
          </div>
          <div class="sunShine-inner-bottom">
            <div class="sunShine-inner-bottom-item">
              <div class="color-y border-yellow">{{economyInfo[14].cont}}<span>元</span></div>
              <span>本季度补助金额</span>
            </div>
            <div class="sunShine-inner-bottom-item">
              <div class="color-b border-blue">{{economyInfo[15].cont}}<span>元</span></div>
              <span>本季度补贴金额</span>
            </div>
            <div class="sunShine-inner-bottom-item">
              <div class="color-r border-red">{{economyInfo[16].cont}}<span>人</span></div>
              <span>本季度新增抚恤</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/qtgk.png" mode="heightFix">其他公开</span>
        <div class="sunShine-inner-box" style="font-size: 28rpx;color: #303030;height: auto;padding: 40rpx;">
          {{economyInfo[17].cont}}</div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title"><img src="/static/images/jdjg.png" mode="heightFix">监督机构</span>
        <div class="sunShine-inner-box" style="flex-direction: column;padding: 0;">
          <div class="sunShine-inspect-item" v-for="(item,index) in superviseList" :key="index"
            @click="toPage('/pages/honest/supervise/main?id='+item.id)">
            <span>· {{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="sunShine-item">
        <span class="sunShine-title sunShine-title2">
          <div>
            <img src="/static/images/ssgk.png" mode="heightFix">实时公开
          </div>
          <div @click="toPage('/pages/honest/openList/main')">
            查看更多<img src="/static/images/arrowR.png" mode="heightFix">
          </div>
        </span>
        <div class="sunShine-inner-box" style="flex-direction: column;padding: 0;">
          <div class="sunShine-inspect-item3" style="color: #929292;">
            <span>主题</span>
            <span>内容</span>
            <span>时间</span>
          </div>
          <div class="sunShine-inspect-item3" v-for="(item,index) in ssgkList" :key="index"
            @click="toPage('/pages/honest/openDetail/main?id='+item.id)">
            <span>{{item.name}}</span>
            <span>{{item.content}}</span>
            <span>{{item.time}}</span>
          </div>
        </div>
      </div>
      <div class="mask" catchtouchmove="true" v-if="isShow" @click="isShow=false"></div>
      <div class="mask-box" v-if="isShow">
        <div class="mask-item" v-for="(item,index) in peopleList" :key="index">
          <span>姓名：{{item.name}}</span>
          <span v-if="type==2">补贴金额：{{item.money}}元</span>
          <span v-if="type==3">补助金额：{{item.money}}元</span>
        </div>
      </div>
    </block>
    <!-- 村民说事 -->
    <block v-if='selectIndex==1'>
      <div class="list-box">
        <div class="module">
          <div class="module-title">
            <div class="module-left">
              <!-- <img src="/static/images/saySomething-logo.png"> -->
              <span>说事主题</span>
            </div>
          </div>
          <div class="module-list">
            <div class="module-list-item" v-for="(item,index) in list" :key="index"
              @click="toPage('/pages/honest/say/main?id='+item.id)">
              <img :src="item.img[0]" mode="aspectFill">
              <div class="list-right">
                <span class="list-name">{{item.name}}</span>
                <div class="list-info">
                  <span>发起人：{{item.nickName||item.realName}}</span>
                  <span><img src="/static/images/time-logo.png">{{item.handleTime}}</span>
                  <span><img src="/static/images/msg-logo.png">{{item.commentNum}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-btn" @click="toPage('/pages/honest/apply/main?type=1')">我说事</div>
    </block>
    <!-- 民意体检 -->
    <block v-if='selectIndex==2'>
      <div class="list-box">
        <div class="module">
          <div class="module-title">
            <div class="module-left">
              <!-- <img src="/static/images/site-logo.png"> -->
              <span>民意体检</span>
            </div>
          </div>
          <div class="module-list">
            <div class="module-list-item" v-for="(item,index) in list" :key="index"
              @click="toPage('/pages/honest/opinion/main?id='+item.id)">
              <img :src="item.img[0]" mode="aspectFill">
              <div class="list-right" style="justify-content: flex-start;">
                <span class="list-name" style="margin: 20rpx 0;">{{item.name}}</span>
                <div class="list-info">
                  <span class="four-line">{{item.eventHandle}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </block>
    <!-- 清风廉韵 -->
    <block v-if='selectIndex==3'>
      <!-- 下拉框 -->
      <div class="picker-line">
        <div class="picker-tab">
          <span @click="changeHonest(index)" :class="{'picker-tab-active':honestTypeIndex==index}" v-for="(item,index) in honestTypeList" :key="index">{{item.dictValue}}</span>
        </div>
        <div class="picker-box">
          <picker @change="changeHonest2" :value="honestTypeIndex2" :range="honestTypeList2" range-key="name"
            class='pickerClass'>
            <view>
              {{honestTypeList2[honestTypeIndex2].name}}
            </view>
          </picker>
          <img src="/static/images/arrowDown.png">
        </div>
      </div>
      <div class="honest-box" v-if="honestTypeIndex==1">
        <img class="top-bg" src="/static/images/qfly-Bg.png" mode="widthFix">
        <div class="honest-title">
          <div></div>
          <span>{{honestTypeList2[honestTypeIndex2].name}}</span>
        </div>
        <div class="honest-html" v-html="cont"></div>
      </div>
      <div class="honest-box" v-else-if="honestTypeIndex==2&&honestTypeIndex2==2">
        <img class="top-bg" src="/static/images/qfly-Bg.png" mode="widthFix">
        <div class="honest-title">
          <div></div>
          <span>{{honestTypeList2[honestTypeIndex2].name}}</span>
        </div>
        <video :src="videoSrc" class="honest-video"></video>
      </div>
      <div class="honest-box" v-else>
        <img class="top-bg" src="/static/images/qfly-Bg.png" mode="widthFix">
        <div class="honest-title">
          <div></div>
          <span>{{honestTypeList2[honestTypeIndex2].name}}</span>
        </div>
        <img :src="item.img" mode="widthFix" v-for="(item,index) in imgList" :key="index" class="honest-img"
          @click="viewImg(item.img,imgList)">
      </div>
    </block>
  </div>
</template>

<script>
  import commonSwiper from '@/components/commonSwiper'
  import * as echarts from '../../../../static/echarts.min'
  import mpvueEcharts from 'mpvue-echarts'
  import AnimatedNumber from '@gaomd/mpvue-animated-number';
  let chart = null;
  let myOption = {
    xAxis: {
      type: 'category',
      data: ['1', '2', '3', '4', '5', '6', '7'],
      name: '日期'
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      name: '每日用工数'
    },
    dataZoom: [{
      type: 'inside',
      start: '0',
      end: "20",
    }],
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: {
        color: '#67B580'
      },
      barWidth: 20,
      type: 'bar'
    }],
    grid: {
      top: 30,
      left: 30,
      bottom: 20,
      right: 40
    }
  }

  function initChart(canvas, width, height) {
    chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = myOption; // ECharts 配置项

    chart.setOption(option);

    return chart; // 返回 chart 后可以自动绑定触摸操作
  }
  export default {
    data() {
      return {
        banner: [],
        list: [],
        tabList: [{
          title: '阳光村务',
          url: '/static/images/sunShineLogo-u.png',
          selectUrl: '/static/images/sunShineLogo.png'
        }, {
          title: '村民说事',
          url: '/static/images/saySomethingLogo-u.png',
          selectUrl: '/static/images/saySomethingLogo.png'
        }, {
          title: '民意体检',
          url: '/static/images/publicOpinionLogo-u.png',
          selectUrl: '/static/images/publicOpinionLogo.png'
        }, {
          title: '清风廉韵',
          url: '/static/images/honestLogo-u.png',
          selectUrl: '/static/images/honestLogo.png'
        }],
        current: 1,
        total: 0,
        selectIndex: 0,
        honestTypeList: [], //清风廉韵一级菜单
        honestTypeIndex: 0,
        honestTypeList2: [], //清风廉韵二级菜单
        honestTypeIndex2: 0,
        cont: '',
        imgList: [],
        economyInfo: [], //经济发展情况
        assestList: [], //资产管理列表
        projList: [], //工程建设列表
        financeopenList: [], //财务公开列表
        videoSrc: '',
        echarts,
        onInit: initChart,
        showImg: false,
        imgSrc: "",
        powerList: [], //小微权力列表
        personType: '', //角色
        superviseList: [], //监督机构列表
        isShow: false,
        meetingList: [],
        mouth: '2021年7月份',
        peopleList: [],
        type: 1,
        statusType: ['未开始','进行中','已结束'],
        ssgkList: [{
          name: '建党一百周年',
          content: '热烈庆祝建党一百周年',
          time: '2021.10.22'
        }]
      }
    },
    components: {
      commonSwiper,
      mpvueEcharts,
      AnimatedNumber
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.personType = wx.getStorageSync('loginInfo').personType
      if (options.selectIndex) {
        this.selectIndex = options.selectIndex
      }
      this.api.getDataList('honestType').then(res => {
        this.honestTypeList = res
        let data = {
          size: 10,
          current: 1,
          type: res[0].dictKey
        }
        this.getHonestList(data)
        let data2 = {
          size: 10,
          current: 1,
          travelId: this.honestTypeList2[this.honestTypeIndex2].id
        }
        this.getHonestImgList(data2)
      })
      this.api.verifyToken().then(() => {
        this.api.adrertList('home').then(res => {
          this.banner = res.records[0].img.split(",")
        })
      });
      this.getSunShineList()
      let data = {
        current: 1,
        size: 10
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
      toPage(url) {
        this.until.aHref(url)
      },
      choose(index) {
        this.selectIndex = index
        this.list = [],
          this.current = 1
        let data = {
          current: 1,
          size: 10,
        }
        this.getList(data)
      },
      changeHonest(index) {
        this.honestTypeIndex = index
        let data = {
          current: 1,
          size: 10,
          type: this.honestTypeList[this.honestTypeIndex].dictKey
        }
        this.honestTypeIndex2 = 0
        this.getHonestList(data)
      },
      changeHonest2(e) {
        this.honestTypeIndex2 = e.mp.detail.value
        let data = {
          current: 1,
          size: 10,
          type: this.honestTypeList[this.honestTypeIndex].dictKey
        }
        this.getHonestList(data)
      },
      getHonestList(data) {
        this.api.getHonestList(data).then(res => {
          this.honestTypeList2 = res.records
          let data2 = {}
          if (this.honestTypeIndex != 1) {
            data2 = {
              current: 1,
              size: 10,
              travelId: this.honestTypeList2[this.honestTypeIndex2].id
            }
          } else {
            data2 = {
              id: this.honestTypeList2[this.honestTypeIndex2].id
            }
          }
          this.getHonestImgList(data2)
        })
      },
      getHonestImgList(data) {
        if (this.honestTypeIndex == 1) {
          this.api.getHonestDetail(data).then(res => {
            this.cont = this.until.imgStyle(res.cont)
          })
        } else {
          this.api.getAdvertList(data).then(res => {
            if (this.honestTypeIndex2 == 2 && this.honestTypeIndex == 2) {
              this.videoSrc = res.records[0].cont
            } else {
              this.imgList = res.records
            }
          })
        }
      },
      getSunShineList() {
        let data = {
          current: 1,
          size: 50
        }
        // let wordData = {
        //   pid: '1428270070682173441',
        //   current: 1,
        //   size: 50
        // }
        // this.api.getSunShineList(wordData).then(res => {
        //   let xData = [],
        //     sData = []
        //   res.records.forEach((item, index) => {
        //     xData.push(index + 1)
        //     sData.push(item.cont)
        //   })
        //   myOption.xAxis.data = xData
        //   myOption.series[0].data = sData
        // })
        this.api.getSunShineList(data).then(res => {
          res.records.forEach((item, index) => {
            if (index < 17) {
              item.cont = item.cont.substring(0, item.cont.length - 1)
            }
          })
          this.economyInfo = res.records
        })
        this.api.getAssetsList(data).then(res => {
          res.records.forEach(item => {
            item.leaseStart = item.leaseStart.substring(0,10)
            item.leaseEnd = item.leaseEnd.substring(0,10)
          })
          this.assestList = res.records
        })
        this.api.getProjectList({size:10,current:1,project:'0'}).then(res => {
          this.projList = res.records
        })
        this.api.getFinanceopenList(data).then(res => {
          res.records.forEach(item => {
            item.img = item.img.split(",")
          })
          this.financeopenList = res.records
        })
        let powerData = {
          pid: '1428651807502376961',
          current: 1,
          size: 50
        }
        this.api.getSunShineList(powerData).then(res => {
          res.records.forEach(item => {
            item.img = item.img.split(",")
          })
          this.powerList = res.records
        })
        this.api.getSuperviseList(data).then(res => {
          this.superviseList = res.records
        })
        this.api.getMeetingList({current:1,size:5}).then(res => {
          res.records.forEach(item => {
            item.meetTime = item.meetTime.substring(0,10)
          })
          this.meetingList = res.records
        })
      },
      showThisImg(img) {
        this.until.viewImg(img[0], img)
      },
      viewImg(img, imgList) {
        let list = []
        imgList.forEach(item => {
          list.push(item.img)
        })
        this.until.viewImg(img, list)
      },
      getList(data) {
        if (this.selectIndex == 1) {
          data.status=2
          this.api.getSayList(data).then(res => {
            res.records.forEach(item => {
              item.img = item.img.split(",")
              item.handleTime = item.handleTime.substring(0, 10)
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
        } else if (this.selectIndex == 2) {
          this.api.getOpinionList(data).then(res => {
            res.records.forEach(item => {
              item.img = item.img.split(",")
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
        }
      },
      showDB(){
        this.isShow = true
        this.type = 1
        this.peopleList = [{
          name: '应瑞根'
        },{
          name: '傅正虎'
        },{
          name: '沈振兴'
        },{
          name: '何巧儿'
        },{
          name: '沈立琴'
        },{
          name: '王世辉'
        },{
          name:'李阿毛'
        },{
          name:'沈振华'
        },{
          name:'沈仁平'
        },{
          name:'沈振东'
        },{
          name:'倪仁梅'
        },{
          name:'徐树民'
        },{
          name:'王建平'
        }]
      },
      showBT(){
        this.isShow = true
        this.type = 2
        this.peopleList = [{
          name: '王松迪',
          money: 5000
        }]
      },
      showBZ(){
        this.isShow = true
        this.type = 3
        this.peopleList = [{
          name: '邱惠国',
          money: 150
        },{
          name: '嵇爱君',
          money: 150
        },{
          name: '王广远',
          money: 150
        },{
          name: '钱申义',
          money: 150
        }]
      },
      showYD(){
        this.isShow = true
        this.type = 1
        this.peopleList = [{
          name: '谢国耀'
        },{
          name: '王善康'
        }]
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

    .border-yellow {
      border-color: #F39423 !important;
    }

    .border-blue {
      border-color: #5087EC !important;
    }

    .border-red {
      border-color: #EC2C17 !important;
    }

    .color-y {
      color: #F39423;
    }

    .color-b {
      color: #5087EC;
    }

    .color-r {
      color: #EC2C17;
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
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        padding: 20rpx 0;

        img {
          width: 140rpx;
          height: 140rpx;
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

    .sunShine-item {
      width: 710rpx;
      margin: 20rpx auto;
      display: flex;
      flex-direction: column;
      border-radius: 10rpx;
      background-color: #fff;

      .sunShine-title {
        width: 100%;
        font-size: 28rpx;
        color: #EC2C17;
        display: flex;
        align-items: center;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        img {
          height: 31rpx;
          margin-right: 10rpx;
        }
      }

      .sunShine-title2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
          align-items: center;
        }
        div:last-child {
          font-size: 20rpx;
          color: #606060;
          img {
            width: 8rpx;
            height: 15rpx;
            margin-left: 10rpx;
          }
        }
      }

      .sunShine-economy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .sunShine-economy-item {
          width: 354rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30rpx;
          box-sizing: border-box;
          font-size: 24rpx;

          .sunShine-economy-item-top {
            color: #EC2C17;
          }

          .sunShine-economy-item-middle {
            width: 167rpx;
            height: 167rpx;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 20rpx solid #F39423;
            font-size: 52rpx;
            color: #F39423;
            border-radius: 50%;
            margin: 20rpx auto;

            span:last-child {
              font-size: 22rpx;
              color: #303030;
              margin-top: 15rpx;
            }
          }

          .sunShine-economy-item-bottom {
            width: 100%;
            text-align: center;
            color: #303030;
          }
        }

        .sunShine-economy-item2 {
          height: 190rpx;
          justify-content: center;

          img {
            height: 190rpx;
          }

          .sunShine-economy-item-middle {
            margin-bottom: 10rpx;

            span {
              top: -20rpx;
              right: -30rpx;
            }
          }

          .sunShine-economy-item-bottom {
            color: #333;
          }
        }

        .sunShine-economy-bg {
          width: 334rpx;
          background-color: #fff;
          border-radius: 20rpx;
          margin-bottom: 20rpx;
        }
      }

      .sunShine-inner-box {
        width: 100%;
        border-radius: 20rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 40rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        color: #000000;

        .sunShine-line-title {
          width: 690rpx;
          background-color: #265EFF;
          font-size: 24rpx;
          color: #fff;
          border-top-left-radius: 8rpx;
          border-top-right-radius: 8rpx;
          display: flex;
          align-items: center;

          div {
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #fff;
            box-sizing: border-box;
          }

          div:last-child {
            border-right: none;
          }
        }

        .sunShine-line-item {
          width: 690rpx;
          font-size: 22rpx;
          color: #606060;
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
            img {
              width: 32rpx;
              height: 32rpx;
            }
          }

          div:nth-child(2) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          div:last-child {
            border-right: none;
          }
        }

        .odd {
          background-color: #fff;
        }

        .even {
          background-color: #EDF4FF;
        }

        .sunShine-inspect-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20rpx 30rpx;
          box-sizing: border-box;
          color: #303030;
          font-size: 24rpx;
          border-bottom: 1px solid #E9E9E9;
        }

        .sunShine-inspect-item:last-child {
          border-bottom: none;
        }
        .sunShine-inspect-item2 {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          img {
            width: 21rpx;
            height: 21rpx;
            margin-right: 13rpx;
          }
        }
        .sunShine-inspect-item3 {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 20rpx 30rpx;
          box-sizing: border-box;
          color: #303030;
          font-size: 24rpx;
          border-bottom: 1px solid #E9E9E9;
          span{
            width: 25%;
            text-align: center;
          }
          span:nth-child(2) {
            width: 50%;
          }
        }
        .sunShine-inspect-item3:last-child {
          border-bottom: none;
        }
      }

      .sunShine-inner-box-4 {
        padding: 40rpx;
        height: auto;
        flex-wrap: wrap;
        padding-bottom: 10rpx;

        .sunShine-inner-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 33%;
          margin-bottom: 30rpx;

          img {
            width: 56rpx;
            height: 56rpx;
            margin-bottom: 10rpx;
          }

          div {
            font-size: 20rpx;
            text-align: center;
            color: #666666;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }

      .sunShine-inner-box-3 {
        padding: 30rpx;
        height: auto;
        flex-wrap: wrap;
        padding-bottom: 10rpx;

        .sunShine-inner-item {
          background-color: #EC2C17;
          width: 200rpx;
          height: 72rpx;
          font-size: 24rpx;
          color: #fff;
          margin-right: 20rpx;
          margin-bottom: 30rpx;
          line-height: 72rpx;
          text-align: center;
          border-radius: 10rpx;
        }

        .sunShine-inner-item:nth-child(3n) {
          margin-right: 0;
        }
      }

      .sunShine-inner-box-5 {
        padding: 30rpx;
        flex-wrap: wrap;
        padding-bottom: 0;
        .sunShine-inner-item {
          width: 33%;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 24rpx;
          color: #303030;
          margin-bottom: 40rpx;
          img {
            width: 60rpx;
            height: 50rpx;
            margin-bottom: 5rpx;
          }
        }
        .sunShine-inner-item:nth-child(3n) {
          margin-right: 0;
        }
      }

      .sunShine-inner {
        width: 100%;
        padding: 40rpx 20rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .sunShine-inner-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .sunShine-inner-top-item {
            display: flex;
            img {
              width: 70rpx;
              height: 70rpx;
              margin-right: 8rpx;
            }
            div {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              color: #303030;
              font-size: 18rpx;
              span:first-child {
                font-size: 28rpx;
                color: #F39423;
                span {
                  font-size: 14rpx;
                }
              }
            }
          }
        }
        .sunShine-inner-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40rpx;
          .sunShine-inner-bottom-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            div {
              width: 133rpx;
              height: 133rpx;
              border: 10rpx solid #F39423;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              border-radius: 50%;
              span {
                font-size: 20rpx;
                color: #303030;
                margin-top: 15rpx;
              }
            }
            span:last-child {
              width: 120rpx;
              word-wrap: break-word;
              font-size: 24rpx;
              color: #303030;
              margin-top: 16rpx;
              text-align: center;
            }
          }
        }
      }
    }

    .list-box {
      width: 710rpx;
      background-color: #fff;
      margin: 20rpx auto;
      border-radius: 14rpx;
      display: flex;
      flex-direction: column;

      .module-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;

        .module-left {
          display: flex;
          align-items: center;
          color: #EC2C17;
          font-size: 28rpx;

          img {
            width: 28rpx;
            height: 28rpx;
            margin-right: 17rpx;
          }
        }
      }

      .module-list {
        width: 710rpx;

        .module-list-item {
          padding: 30rpx;
          box-sizing: border-box;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          display: flex;

          img {
            width: 300rpx;
            height: 200rpx;
            border-radius: 5rpx;
            flex-shrink: 1;
            margin-right: 30rpx;
          }

          .list-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .list-name {
              max-width: 320rpx;
              font-size: 28rpx;
              color: #303030;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }

            .list-info {
              max-width: 320rpx;
              display: flex;
              flex-direction: column;
              color: #909090;
              font-size: 24rpx;

              img {
                width: 21rpx;
                height: 21rpx;
                margin-right: 15rpx;
              }
            }
          }
        }
      }
    }

    .four-line {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
    }

    .common-btn {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-color: #599BFF;
      color: #fff;
      line-height: 100rpx;
      text-align: center;
      font-size: 28rpx;
      margin: 40rpx auto;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.16);
    }

    .picker-line {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      padding: 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin: 20rpx auto;
      border-radius: 20rpx;
      .picker-tab {
        width: 100%;
        overflow-x: scroll;
        font-size: 26rpx;
        color: #606060;
        display: flex;
        align-items: center;
        span {
          margin-right: 60rpx;
        }
        .picker-tab-active {
          font-size: 30rpx;
          color: #EC2C17;
        }
      }
      .picker-box {
        width: 100%;
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
        margin: 30rpx auto;

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

    .honest-box {
      width: 710rpx;
      margin: 50rpx auto;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 20rpx;
      position: relative;
      .top-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 710rpx;
        z-index: 0;
      }
      .honest-title {
        display: flex;
        align-items: center;
        margin: 40rpx 0;
        padding: 0 40rpx;
        box-sizing: border-box;
        z-index: 1;
        div {
          width: 6rpx;
          height: 32rpx;
          margin-right: 20rpx;
          background-color: #EC2C17;
        }

        span {
          font-size: 28rpx;
          color: #333333;
        }
      }

      .honest-html {
        width: 620rpx;
        margin: 30rpx auto;
        z-index: 1;
      }

      .honest-video {
        width: 620rpx;
        margin: 30rpx auto;
        border-radius: 20rpx;
        z-index: 1;
      }

      .honest-img {
        width: 620rpx;
        margin: 30rpx auto;
        border: 2rpx solid #707070;
        border-radius: 20rpx;
        z-index: 1;
      }
    }

    .mask {
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }
    .mask-box {
      width: 400rpx;
      max-height: 90vh;
      overflow: scroll;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 101;
      background-color: #fff;
      border-radius: 10rpx;
      .mask-item {
        padding: 10rpx 40rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        font-size: 24rpx;
        color: #606060;
        span {
          margin-top: 10rpx;
        }
        span:first-child {
          font-size: 26rpx;
          color: #303030;
          margin-top: 0;
        }
      }
      .mask-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>

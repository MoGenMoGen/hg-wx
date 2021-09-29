<template>
  <div class="home">
    <search @searchEvent="searchMatter($event)"></search>
    <div class="picker-line">
      <div class="picker-box">
        <picker @change="changeUnit" :value="unitIndex" :range="unitList" range-key="dictValue" class='pickerClass'>
          <view>
            {{unitList[unitIndex].dictValue}}
          </view>
        </picker>
        <img src="/static/images/arrowDown.png">
      </div>
      <div class="picker-box">
        <picker @change="changeMatter" :value="matterIndex" :range="matterList" range-key="dictValue" class='pickerClass'>
          <view class="two-more">
            {{matterList[matterIndex].dictValue}}
          </view>
        </picker>
        <img src="/static/images/arrowDown.png">
      </div>
    </div>
    <div class="matter-box">
      <div class="matter-item" v-for="(item,index) in list" :key="index" @click="checkMatter(item.id)">
        <span>{{index+1}}、{{item.name}}</span>
      </div>
    </div>
    <div class="mask" catchtouchmove='ture' v-if="showMatter" @click="showMatter=false"></div>
    <div class="mask-box" v-if="showMatter">
      <span>{{matterInfo.name}}</span>
      <span>事项性质：{{matterInfo.quality}}</span>
      <span>受理层级：{{matterInfo.level}}</span>
    </div>
  </div>
</template>

<script>
  import search from '@/components/search'
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0,
        unitIndex: 0,
        matterIndex: 0,
        unitList: [],
        matterList: [],
        showMatter: false,
        matterInfo: {},
        keyword: ''
      }
    },
    components: {
      search
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getDataList('quality').then(res=>{
        let firstData = {
          code: "party",
          dictKey: "0",
          dictValue: "全部",
          id: "",
          isDeleted: -1,
          isSealed: -1,
          parentId: "",
          remark: "",
          sort: 1,
          tenantId: ""
        }
        res.unshift(firstData)
        this.unitList = res
      })
      this.api.getDataList('item-level').then(res=>{
        let firstData = {
          code: "party",
          dictKey: "0",
          dictValue: "全部",
          id: "",
          isDeleted: -1,
          isSealed: -1,
          parentId: "",
          remark: "",
          sort: 1,
          tenantId: ""
        }
        res.unshift(firstData)
        this.matterList = res
      })
      let data = {
        name: this.keyword,
        current: 1,
        size: 20
      }
      this.getList(data)
    },
    onShow() {

    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          name: this.keyword,
          current: this.current + 1,
          size: 20,
          quality: this.unitList[this.unitIndex].dictKey,
          level: this.matterList[this.matterIndex].dictKey
        }
        if(this.unitIndex==0) {
          data.quality = ""
        }
        if(this.matterIndex==0) {
          data.level = ""
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
        size: 20,
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
      searchMatter(e) {
        this.current = 1
        this.list = []
        this.matterIndex = 0
        this.unitIndex = 0
        this.keyword = e.mp.detail.value
        let data = {
          name: this.keyword,
          current: 1,
          size: 20
        }
        this.getList(data)
      },
      changeUnit(e) {
        this.unitIndex = e.mp.detail.value
        this.list = []
        this.current = 1
        let data = {
          name: this.keyword,
          current: 1,
          size: 20,
          quality: this.unitList[this.unitIndex].dictKey,
          level: this.matterList[this.matterIndex].dictKey
        }
        if(this.unitIndex==0) {
          data.quality = ""
        }
        if(this.matterIndex==0) {
          data.level = ""
        }
        this.getList(data)
      },
      changeMatter(e) {
        this.matterIndex = e.mp.detail.value
        this.list = []
        this.current = 1
        let data = {
          name: this.keyword,
          current: 1,
          size: 20,
          quality: this.unitList[this.unitIndex].dictKey,
          level: this.matterList[this.matterIndex].dictKey
        }
        if(this.unitIndex==0) {
          data.quality = ""
        }
        if(this.matterIndex==0) {
          data.level = ""
        }
        this.getList(data)
      },
      getList(data) {
        this.api.getMatterList(data).then(res => {
          this.list = this.list.concat(res.records)
          this.total = res.total
        })
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
    padding: 20rpx;
    box-sizing: border-box;
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
        background-color: #fff;
        .pickerClass {
          flex: 1;
        }
        img {
          width: 18rpx;
          height: 11rpx;
          flex-shrink: 1;
        }
        .two-more {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .matter-box {
      width: 710rpx;
      margin: 20rpx auto;
      border-radius: 20rpx;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .matter-item {
        display: flex;
        font-size: 24rpx;
        color: #222222;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #F4F4F4;
        .matter-cont {
          display: flex;
          flex-direction: column;
          span {
            margin-bottom: 10rpx;
          }
          span:last-child {
            margin-bottom: 0;
          }
        }
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

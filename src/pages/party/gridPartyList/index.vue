<template>
  <div class="home">
    <div class="picker-box">
      <picker @change="changeParty" :value="partyIndex" :range="partyList" range-key="dictValue" class='pickerClass'>
        <view>
          {{partyList[partyIndex].dictValue}}
        </view>
      </picker>
      <img src="/static/images/arrowDown.png">
    </div>
    <div class="party-leader">
      <div class="party-leader-item" v-for="(item,index) in partyLeaderList" :key="index">
        <span>{{item.name}}</span>
        <img :src="item.url">
        <span>{{item.post}}</span>
      </div>
    </div>
    <div class="module-list-item" v-for="(item,index) in list" :key="index">
      <div class="list-img">
        <img :src="item.img" mode="aspectFill">
        <img src="/static/images/partyLogo.png" class="party-logo">
      </div>
      <div class="list-right">
        <div>
          <span class="list-name">{{item.name}}</span>
          <div class="list-info">
            <span>出生年月：{{item.birthday}}</span>
            <span>入党时间：{{item.joinTime}}</span>
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
        current: 1,
        size: 10,
        partyList: [],
        partyIndex: 0,
        list: [],
        partyLeaderList: [{
        	name: '王佳丹',
        	url: '/static/images/zhs.png',
        	post: '支部书记'
        },{
        	name: '王佳丹',
        	url: '/static/images/zhs.png',
        	post: '支部委员'
        },{
        	name: '112',
        	url: '/static/images/zrs.png',
        	post: '党员人数'
        }]
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getDataList('party').then(res=>{
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
        this.partyList = res
      })
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
          size: 10,
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
        size: 10,
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
      changeParty(e) {
        this.partyIndex = e.mp.detail.value
        this.current = 1
        this.list = []
        let data = {
          current: 1,
          size: 10
        }
        this.getList(data)
      },
      getList(data) {
        if(this.partyIndex==0) {
          this.api.getPartyList(data).then(res=>{
            res.records.forEach(item => {
              item.birthday = item.birthday.substring(0,10)
              item.joinTime = item.joinTime.substring(0,10)
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
          this.partyLeaderList[0].name = '无'
          this.partyLeaderList[1].name = '无'
          this.partyLeaderList[2].name = 112
        } else {
          data.dept = this.partyList[this.partyIndex].dictKey
          this.api.getPartyList(data).then(res=>{
            res.records.forEach(item => {
              item.birthday = item.birthday.substring(0,10)
              item.joinTime = item.joinTime.substring(0,10)
            })
            this.list = this.list.concat(res.records)
            this.total = res.total
          })
          this.api.getPartyList2({type:this.partyList[this.partyIndex].dictKey}).then(res => {
            this.partyLeaderList[0].name = res.boss || '无'
            this.partyLeaderList[1].name = res.wy || '无'
            this.partyLeaderList[2].name = res.num
          })
        }
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
    .picker-box {
      width: 640rpx;
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
    .party-leader {
      width: 640rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 20rpx 0;
      margin: 0 auto;
      .party-leader-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 24rpx;
        color: #333;
        img {
          width: 38rpx;
          height: 38rpx;
          margin: 10rpx 0;
        }
      }
    }
    .module-list-item {
      width: 710rpx;
      padding: 30rpx;
      box-sizing: border-box;
      display: flex;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 20rpx auto;
      img {
        width: 200rpx;
        height: 190rpx;
        border-radius: 5rpx;
        flex-shrink: 1;
        margin-right: 30rpx;
      }
      .list-img {
        position: relative;
        img {
          width: 200rpx;
          height: 190rpx;
          border-radius: 20rpx;
        }
        .party-logo {
          width: 60rpx;
          height: 60rpx;
          position: absolute;
          bottom: 8rpx;
          right: 8rpx;
        }
      }
      .list-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list-name {
          max-width: 420rpx;
          font-size: 28rpx;
          color: #303030;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .list-info {
          max-width: 420rpx;
          display: flex;
          flex-direction: column;
          color: #909090;
          font-size: 24rpx;
          margin-top: 30rpx;
          img {
            width: 21rpx;
            height: 21rpx;
            margin-right: 15rpx;
          }
        }
        .list-more {
          font-size: 24rpx;
          color: #EC2C17;
        }
      }
    }
  }
</style>

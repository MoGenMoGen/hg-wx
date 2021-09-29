<template>
  <div>
    <div class="num-info">
      <span style="color: #EC2C17;">党员总数</span>
      <div></div>
      <span>共计<span style="color: #EC2C17;">{{all}}</span>人</span>
    </div>
    <div class="num-info" @click="toPage('/pages/party/developList/main')">
      <span style="color: #EC2C17;">发展党员</span>
      <div></div>
      <span>计划<span style="color: #EC2C17;">{{ing}}</span>人</span>
    </div>
    <!-- 村两委班子 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/cwlbz.png">
            <span>村两委班子</span>
          </div>
          <div class="module-right" @click="toPage('/pages/party/leaderList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="display: flex;flex-direction: column;">
          <div class="module-list-item" v-for="(item,index) in leaderList" :key="index">
            <img :src="item.img" mode="aspectFill" style="width: 200rpx;height: 250rpx;">
            <div class="list-right" style="max-width: 420rpx;">
              <div>
                <span class="list-name" style="max-width: 420rpx;">{{item.name}}</span>
                <div class="list-info" style="max-width: 420rpx;">
                  <span>职位：{{item.post}}</span>
                  <span>电话：{{item.mob}}</span>
                  <span>干事承诺：{{item.promise}}</span>
                </div>
              </div>
              <!-- <span class="list-more">查看详情 ></span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 网格党支部 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/wgdzb.png">
            <span>网格党支部</span>
          </div>
          <div class="module-right" @click="toPage('/pages/party/gridPartyList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="display: flex;flex-direction: column;">
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
          <div class="module-list-item" v-for="(item,index) in gridList" :key="index">
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
      </div>
    </div>
    <!-- 荣誉 -->
    <div class="list-box">
      <div class="module">
        <div class="module-title">
          <div class="module-left">
            <img src="/static/images/ry.png">
            <span>荣誉</span>
          </div>
          <div class="module-right" @click="toPage('/pages/party/honorList/main')">
            <span>查看更多</span>
            <img src="/static/images/arrowRightW.png">
          </div>
        </div>
        <div class="module-list" style="flex-wrap: wrap;padding: 30rpx;box-sizing: border-box;">
          <div class="module-list-item-two" v-for="(item,index) in honorList" :key="index" @click="viewImg(item.img)">
            <img :src="item.img" mode="aspectFill">
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

    },
    data() {
      return {
        activeIndex: 0,
        state: 1,
        status: 1,
        partyList: [],
        partyIndex: 0,
        leaderList: [],
        gridList: [],
        all: '',
        ing: '',
        honorList: [],
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
    components: {},
    async onLoad() {
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
      this.getList()
    },
    onShow() {

    },

    methods: {
      toPage(url) {
        this.until.aHref(url)
      },
      activeIndexChange(e) {
        this.activeIndex = e.mp.detail.current
      },
      changeParty(e) {
        this.partyIndex = e.mp.detail.value
        if(this.partyIndex==0) {
          this.api.getPartyList({current:1,size:10}).then(res=>{
            res.records.forEach(item => {
              item.birthday = item.birthday.substring(0,10)
              item.joinTime = item.joinTime.substring(0,10)
            })
            this.gridList = res.records
          })
          this.partyLeaderList[0].name = '无'
          this.partyLeaderList[1].name = '无'
          this.partyLeaderList[2].name = 112
        } else {
          let data = {
            current:1,
            size:10,
            dept: this.partyList[this.partyIndex].dictKey
          }
          this.api.getPartyList(data).then(res=>{
            res.records.forEach(item => {
              item.birthday = item.birthday.substring(0,10)
              item.joinTime = item.joinTime.substring(0,10)
            })
            this.gridList = res.records
          })
          this.api.getPartyList2({type:this.partyList[this.partyIndex].dictKey}).then(res => {
            this.partyLeaderList[0].name = res.boss || '无'
            this.partyLeaderList[1].name = res.wy || '无'
            this.partyLeaderList[2].name = res.num
          })
        }
      },
      viewImg(img) {
        let imgList = img.split(',')
        this.until.viewImg(img,imgList)
      },
      getList() {
        this.api.getPartyNum().then(res=>{
          this.all = res.all
          this.ing = res.ing
        })
        this.api.getLeaderList({current:1,size:5}).then(res=>{
          this.leaderList = res.records
        })
        this.api.getPartyList({current:1,size:10}).then(res=>{
          res.records.forEach(item => {
            item.birthday = item.birthday.substring(0,10)
            item.joinTime = item.joinTime.substring(0,10)
          })
          this.gridList = res.records
        })
        if(this.partyIndex==0) {
          this.partyLeaderList[0].name = '无'
          this.partyLeaderList[1].name = '无'
          this.partyLeaderList[2].name = 112
        } else {
          this.api.getPartyList2({type:this.partyList[this.partyIndex].dictKey}).then(res => {
            this.partyLeaderList[0].name = res.boss || '无'
            this.partyLeaderList[1].name = res.wy || '无'
            this.partyLeaderList[2].name = res.num
          })
        }
        this.api.getHonorList({current:1,size:10}).then(res => {
          this.honorList = res.records
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../css/common.less");
  .bg-blue {
    background-color: #1794EC;
  }
  .bg-red {
    background-color: #EC2C17;
  }
  .bg-gray {
    background-color: #ACACAC;
  }
  .num-info {
    width: 710rpx;
    display: flex;
    align-items: center;
    margin: 20rpx auto;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    box-sizing: border-box;
    span {
      font-size: 28rpx;
      color: #333333;
    }
    div {
      width: 2rpx;
      height: 32rpx;
      background-color: #EC2C17;
      margin: 0 30rpx;
    }
  }
  .list-box {
    width: 710rpx;
    background-color: #fff;
    margin: 20rpx auto;
    border-radius: 14rpx;
    display: flex;
    flex-direction: column;
    .module {
      width: 100%;
      border-radius: 10rpx;
      overflow: hidden;
      .module-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        background-color: #EC2C17;
        .module-left {
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 28rpx;
          img {
            width: 28rpx;
            height: 28rpx;
            margin-right: 17rpx;
          }
        }
        .module-right {
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 20rpx;
          img {
            width: 8rpx;
            height: 15rpx;
            margin-left: 17rpx;
          }
        }
      }
      .module-list {
        width: 710rpx;
        display: flex;
        .module-list-title {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 30rpx;
          box-sizing: border-box;
        }
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
          padding: 30rpx;
          box-sizing: border-box;
          border-top: 1px solid rgba(0,0,0,0.1);
          display: flex;
          img {
            width: 300rpx;
            height: 200rpx;
            border-radius: 5rpx;
            flex-shrink: 1;
            margin-right: 30rpx;
          }
          .list-img {
            position: relative;
            // margin-right: 30rpx;
            img {
              width: 200rpx;
              height: 250rpx;
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
        .module-list-item-two {
          width: 310rpx;
          margin-right: 30rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30rpx;
          img {
            width: 100%;
            height: 200rpx;
            border-radius: 10rpx;
          }
          span {
            font-size: 28rpx;
            color: #303030;
            margin: 10rpx 0;
          }
        }
        .module-list-item-two:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
</style>

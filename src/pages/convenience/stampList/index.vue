<template>
  <div class="home">
    <search @searchEvent="searchKeyWord($event)"></search>
    <div class="module">
      <div class="module-list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/convenience/stampDetail/main?id='+item.id)">
        <div style="display:flex;flex-direction: column;">
          <span class="list-item-title">{{index+1}}.{{item.name}}</span>
        </div>
      </div>
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
        id: ""
      }
    },
    components: {
      search
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      if(options.type==1) {
        this.id = '1423198267428073474'
      } else if (options.type==2) {
        this.id = '1423207319421181953'
      }
      let data = {
        travelId: this.id,
        current: 1,
        size: 100
      }
      this.getList(data)
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
      toPage(url) {
        this.until.aHref(url)
      },
      getList(data) {
        this.api.getAdvertList(data).then(res => {
          this.list = res.records
          this.total = res.total
        })
      },
      searchKeyWord(e) {
        let thisData = {
          travelId: this.id,
          current: 1,
          size: 20
        }
        if(e.mp.detail.value!="") {
          this.api.getAdvertList(thisData).then(res => {
            this.list = res.records
            this.list = this.list.filter(item=>item.name.indexOf(e.mp.detail.value)>-1)
          })
        } else {
        	this.api.getAdvertList(thisData).then(res => {
            this.list = res.records
          })
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    padding: 20rpx;
    padding-bottom: 170rpx;
    box-sizing: border-box;
    .module {
      width: 710rpx;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 20rpx;
      margin: 20rpx auto;
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
  }
</style>

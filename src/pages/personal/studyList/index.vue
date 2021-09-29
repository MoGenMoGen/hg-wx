<template>
  <div class="home">
    <block  v-if="list.length>0">
      <div class="list-box">
        <div class="list-item" v-for="(item,index) in list" :key="index" @click="toPage('/pages/personal/study/main?type=2&id='+item.id)">· {{item.content}}</div>
      </div>
    </block>
    <block v-else>
      <div class="no-study">
        <img src="/static/images/noStudy.png">
        <span>暂无学习内容</span>
      </div>
    </block>
    <div class="bottom-btn" @click="toPage('/pages/personal/study/main?type=1&id='+id)">立即申请</div>
  </div>
</template>

<script>
  import addImg from '@/components/addImg'
  export default {
    data() {
      return {
        current: 1,
        total: 0,
        list: [],
        id:''
      }
    },
    components: {
      addImg
    },
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      this.id = wx.getStorageSync('loginInfo').partId
      
    },
    onShow() {
      this.list = []
      this.current = 1
      let data = {
        current: 1,
        size: 10,
        mbrId: this.id
      }
      this.getList(data)
    },
    //解底事件
    onReachBottom() {
      if (this.total > this.list.length) {
        let data = {
          current: this.current + 1,
          size: 10,
          mbrId: this.id
        }
        this.getList(data)
        this.current += 1
      }
    },

    //下拉刷新
    onPullDownRefresh() {
      let data = {
        current: 1,
        size: 10,
        mbrId: this.id
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
      getList(data) {
        this.api.getSeparateStudyList(data).then(res => {
          this.list = this.list.concat(res.records)
          this.total = res.total
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
    .list-box {
      width: 710rpx;
      font-size: 28rpx;
      color: #303030;
      font-weight: 500;
      background-color: #fff;
      border-radius: 20rpx;
      display: flex;
      flex-direction: column;
      .list-item {
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0,0,0,0.1);
      }
      .list-item:last-child {
        border-bottom: 0;
      }
    }
    .no-study {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 150rpx auto;
      img {
        width: 208rpx;
        height: 129rpx;
        margin-bottom: 40rpx;
      }
    }
    .bottom-btn {
    	width: 360rpx;
    	height: 80rpx;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	color: #FFFFFF;
    	background-color: #EC2C17;
    	border-radius: 40rpx;
    	position: fixed;
    	bottom: 46rpx;
    	left: 195rpx;
    }
  }
</style>

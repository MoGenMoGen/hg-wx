<template>
  <div class="home">
    <block v-for="(item,index) in list" :key="index">
      <div class="list-box" @click="toPage('/pages/homeStead/applyDetail/main?id='+item.id)">
        <span>九龙湖数字乡村村民宅基地申请</span>
        <span>{{item.createTime}}</span>
      </div>
    </block>
	<div class="bottom-btn" @click="toPage('/pages/homeStead/apply/main')">发起申请</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        current: 1,
        total: 0
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      let data = {
        current: 1,
        size: 10
      }
      this.api.verifyToken().then(() => {
        this.getList(data)
      });
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
      this.name = "",
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
        this.api.perApplyList(data).then((res) => {
          res.data.records.forEach(item => {
            item.createTime = item.createTime.substring(0, 16)
          })
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
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
    padding: 0;
    box-sizing: border-box;
    .list-box {
      width: 100%;
      padding: 40rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      color: #909090;
      font-weight: 500;
      background-color: #fff;
      border-radius: 12rpx;
      display: flex;
      flex-direction: column;
      margin: 20rpx 0;
      span:first-child {
        font-size: 30rpx;
        color: #303030;
        margin-bottom: 20rpx;
      }
    }
	.bottom-btn {
		width: 570rpx;
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background-color: #EC2C17;
		border-radius: 35rpx;
		position: fixed;
		bottom: 46rpx;
		left: 90rpx;
	}
  }
</style>

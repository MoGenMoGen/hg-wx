<template>
  <div class="home">
    <div
      class="item"
      @click="toDetail(item.id)"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="img">
        <image :src="dh" mode="widthFix" class="dh" v-if="item.politic == 3" />
        <image :src="item.avatar" mode="aspectFill" class="userImg" />
      </div>
      <div class="cont">
        <p><image :src="user" mode="widthFix" />{{ item.realName }}</p>
        <p><image :src="tel" mode="widthFix" />{{ item.phone }}</p>
        <p><image :src="xqah" mode="widthFix" />{{ item.abilityNm }}</p>
      </div>
    </div>
    <no-more></no-more>
    <button @click="toPage('/pages/informationCollect/cohabitAdd/main')">
      添加同住人员
    </button>
  </div>
</template>

<script>
import user from "../../../../static/images/user2.png";
import dh from "../../../../static/images/dh.png";
import tel from "../../../../static/images/tel2.png";
import xqah from "../../../../static/images/xqah.png";

import noMore from "@/components/noMore";
export default {
  data() {
    return {
      commentContent: "",
      commentId: "",
      focus: false,
      user,
      dh,
      tel,
      xqah,
      list: [],
      page: { current: 1, size: 10 },
    };
  },
  components: {
    noMore,
  },
  async onLoad() {},
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(() => {
      this.list = [];
      this.page.current = 1;
      this.Refresh(this.page);
    });
  },
  //解底事件
  onReachBottom() {
    console.log("111111");
    if (this.total == this.list.length) {
      console.log(this.total, this.list.length, "fffff");
    } else {
      console.log(this.total, this.list.length);
      this.page.current += 1;
      this.Refresh(this.page);
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    this.list = [];
    this.page.current = 1;
    this.Refresh(this.page);
    wx.stopPullDownRefresh();
  },
  onShareAppMessage() {
    return {};
  },

  methods: {
    //下拉刷新
    Refresh(data) {
      console.log("refresh111");
      this.api.handleroommatelist(data).then((res) => {
        console.log("2222", this.list);
        this.list.push(...res.data.records);
        console.log("33", this.list);
        this.total = res.data.total;
      });
    },
    toDetail(id) {
      this.toPage("/pages/informationCollect/cohabitDetail/main?id=" + id);
    },

    toPage(url) {
      this.until.aHref(url);
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  min-height: 100vh;
  width: 100vw;
  padding: 20rpx 0 120rpx;
  box-sizing: border-box;
  > button {
    position: fixed;
    bottom: 40rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 570rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    background: #eb020e;
    border-radius: 35rpx;
    color: #ffffff;
    font-size: 30rpx;
    margin: 0 auto;
  }
  .item {
    margin: 0 auto 20rpx;
    width: 100vw;
    background: #ffffff;
    border-radius: 12rpx;
    padding: 40rpx 0;
    box-sizing: border-box;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    .img {
      width: 120rpx;
      flex-shrink: 0;
      margin: 0 50rpx;
      position: relative;
      .dh {
        position: absolute;
        bottom: 0;
        right: 5rpx;
        width: 37rpx;
      }
      .userImg {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }
    }
    .cont {
      flex: 1;
      p {
        line-height: 35rpx;
        color: #999999;
        margin-bottom: 10rpx;
        display: flex;
        align-items: center;
        image {
          width: 25rpx;
          margin-right: 20rpx;
        }
      }
    }
  }
}
</style>

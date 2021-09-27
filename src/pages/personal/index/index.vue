<template>
  <div class="home">
    <div class="info" @click="toPage('/pages/personal/personInfo/main')">
      <div class="img">
        <image :src="info.avatar" mode="aspectFill" class="userImg" />
        <image :src="dh" mode="widthFix" class="dh" v-if="info.politic==3"/>
      </div>
      <div class="cont">
        <p>
          <span>{{ info.realName }}</span
          >({{ info.phone }})
        </p>
        <p>{{ info.house }} ({{ info.status==1?'待审核': info.type==1 ? '户主' : '同住人' }})</p>
      </div>
      <image :src="arrowRWhite" mode="widthFix" />
    </div>
    <ul>
      <li
        v-for="(item, index) in menuList"
        :key="index"
        @click="toPage(item.href)"
      >
        <image :src="item.img" mode="widthFix" />
        <p>{{ item.nm }}</p>
        <image :src="arrowR" mode="widthFix" />
      </li>
    </ul>
    <!--仅户主可以添加同住人员-->
    <ul v-if="info.type==1">
      <li @click="toPage('/pages/informationCollect/cohabitList/main')">
        <image :src="img6" mode="widthFix" />
        <p>同住人员</p>
        <image :src="arrowR" mode="widthFix" />
      </li>
    </ul>
    <ul>
      <li @click="toPage('/pages/personal/capableApply/main')">
        <image :src="personApply" mode="widthFix" />
        <p>能人申请</p>
        <image :src="arrowR" mode="widthFix" />
      </li>
    </ul>
  </div>
</template>

<script>
import img1 from "../../../../static/images/personImg1.png";
import img2 from "../../../../static/images/personImg2.png";
import img3 from "../../../../static/images/reportForRepair.png";
import img4 from "../../../../static/images/personImg4.png";
import img5 from "../../../../static/images/personImg5.png";
import img6 from "../../../../static/images/personImg6.png";
import personApply from "../../../../static/images/personApply.png";
import arrowR from "../../../../static/images/arrowR.png";
import arrowRWhite from "../../../../static/images/arrowRWhite.png";
import dh from "../../../../static/images/dh.png";
import img7 from "../../../../static/images/personImg7.png";
export default {
  data() {
    return {
      arrowR,
      arrowRWhite,
      dh,
      img6,
      personApply,
      info: {},
      menuList: [
        // {
        //   img: img1,
        //   nm: "社区活动",
        //   href: "/pages/personal/active/main",
        // },
        // {
        //   img: img7,
        //   nm: "团队活动",
        //   href: "/pages/personal/activeTeam/main",
        // },
        {
          img: img2,
          nm: "我的积分",
          href: "/pages/shopping/integral/main",
        },
        {
          img: img3,
          nm: "报事报修",
          href: "/pages/reportRepair/list/main",
        },
        {
          img: img4,
          nm: "我的求助",
          href: "/pages/helpServices/historyList/main",
        },
        {
          img: img5,
          nm: "我的建议",
          href: "/pages/suggest/list/main",
        },
      ],
    };
  },
  components: {},
  async onLoad() {
  },
  onShow() {

    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(()=>{
      this.getInfo()
    });
  },
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    async getInfo(){
      this.info = await this.api.userInfo()

    },
    toPage(url) {
      this.until.aHref(url);
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home:after{
    content: '';
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2rpx;
    background-color: #e9e9e9;
    z-index: 10001;
  }
.home {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background: url("../../../../static/images/header-bg.png") center top
    no-repeat;
  background-size: 100%;
  .info {
    padding: 10rpx 60rpx 40rpx;
    display: flex;
    align-items: center;
    > image {
      width: 18rpx;
    }
    .img {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      border: 6rpx solid rgba(255, 255, 255, 0.26);
      position: relative;
      .dh {
        position: absolute;
        bottom: 0;
        right: 5rpx;
        width: 37rpx;
      }
      .userImg {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .cont {
      color: #ffffff;
      flex: 1;
      padding-left: 20rpx;
      p {
        margin-bottom: 18rpx;
        span {
          font-size: 30rpx;
        }
      }
    }
  }
  ul {
    background: #ffffff;
    box-shadow: 4rpx 7rpx 27rpx 0px rgba(120, 120, 120, 0.12);
    border-radius: 10rpx;
    margin: 0 30rpx 20rpx;
    li {
      display: flex;
      align-items: center;
      padding-right: 25rpx;
      height: 104rpx;
      &:not(:last-of-type) {
        border-bottom: 1px solid #f1f1f1;
      }
      image:first-of-type {
        width: 32rpx;
        margin-left: 40rpx;
        margin-right: 20rpx;
      }
      image:last-of-type {
        width: 18rpx;
      }
      p {
        flex: 1;
        color: #303030;
        font-size: 26rpx;
      }
    }
  }
}
</style>

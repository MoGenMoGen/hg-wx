<template>
  <div class="home">
    <div class="info" @click="toPage('/pages/personal/personInfo/main')">
      <div class="img">
        <image :src="info.avatar==''?'/static/images/avatar.png':info.avatar" mode="aspectFill" class="userImg" />
        <image :src="dh" mode="widthFix" class="dh" v-if="info.partMember==1" />
      </div>
      <div class="cont">
        <p>
          <span>{{ info.nickName }}</span><span>({{ info.phone==''?info.account:info.phone }})</span>
        </p>
        <p>{{ userList[info.personType] }}</p>
      </div>
      <image :src="arrowRWhite" mode="widthFix" />
    </div>
    <ul>
      <li v-for="(item, index) in menuList" :key="index" @click="toPage(item.href)" v-if="item.isShow">
        <image :src="item.img" mode="widthFix" />
        <p>{{ item.nm }}</p>
        <image :src="arrowR" mode="widthFix" />
      </li>
    </ul>
    <ul>
      <li @click="toPage('/pages/personal/modifyPsw/main')">
        <image :src="img4" mode="widthFix" />
        <p>修改密码</p>
        <image :src="arrowR" mode="widthFix" />
      </li>
    </ul>
    <div class="loginOutBtn" @click="loginOut()">退出登录</div>
  </div>
</template>

<script>
  import img1 from "../../../../static/images/myInfo.png";
  import img2 from "../../../../static/images/myApply.png";
  import img3 from "../../../../static/images/myVote.png";
  import img4 from "../../../../static/images/updatePaw.png";
  import img5 from "../../../../static/images/nyIssue.png";
  import img6 from "../../../../static/images/myReport.png";
  import img7 from "../../../../static/images/myInitiate.png";
  import img8 from "../../../../static/images/myStudy.png";
  import arrowR from "../../../../static/images/arrowR.png";
  import arrowRWhite from "../../../../static/images/arrowRWhite.png";
  import dh from "../../../../static/images/dh.png";
  export default {
    data() {
      return {
        arrowR,
        arrowRWhite,
        dh,
        img4,
        info: {},
        userList:['游客','村民','用户','管理员'],
        menuList: [{
            img: img1,
            nm: "个人信息",
            href: "/pages/personal/personInfo/main",
            isShow: true
          },
          {
            img: img2,
            nm: "我的申请",
            href: "/pages/personal/apply/main",
            isShow: true
          },
          {
            img: img3,
            nm: "我的投票",
            href: "/pages/personal/vote/main",
            isShow: true
          },
          {
            img: img5,
            nm: "我的提问",
            href: "/pages/personal/issue/main",
            isShow: true
          },
          {
            img: img6,
            nm: "我的上报",
            href: "/pages/personal/report/main",
            isShow: true
          },
          {
            img: img7,
            nm: "我的发起",
            href: "/pages/personal/initiate/main",
            isShow: true
          },
          {
            img: img8,
            nm: "我的学习",
            href: "/pages/personal/studyList/main",
            isShow: false
          }
        ],
      };
    },
    components: {},
    async onLoad() {},
    onShow() {
      Object.assign(this.$data, this.$options.data())
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {
        this.getInfo()
        if(wx.getStorageSync('loginInfo').partMember) {
          this.api.getPartyMemberDetail({id: wx.getStorageSync('loginInfo').partId}).then(res => {
            if(res.separate==1) {
              this.menuList[6].isShow = true
            } else {
              this.menuList[6].isShow = false
            }
          })
        } else {
          this.menuList[6].isShow = false
        }
      });
    },
    //解底事件
    onReachBottom() {},

    onShareAppMessage() {
      return {};
    },

    methods: {
      async getInfo() {
        this.info = await this.api.userInfo()

      },
      toPage(url) {
        this.until.aHref(url);
      },
      loginOut() {
        let that = this
        wx.showModal({
          title: '提示',
          content: '确认退出登录吗？',
          success(res) {
            if (res.confirm) {
              that.api.loginOut().then(res => {

              })
              wx.clearStorageSync()
              wx.reLaunch({
                url: '/pages/register/login/main'
              })
            }
          }
        })
      }
    },
  };
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home:after {
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
    background: url("../../../../static/images/header-bg.png") center top no-repeat;
    background-size: 100%;

    .info {
      padding: 10rpx 60rpx 40rpx;
      display: flex;
      align-items: center;

      >image {
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

    .loginOutBtn {
      width: 260rpx;
      height: 70rpx;
      background: #FFFFFF;
      border: 1px solid #E5E5E5;
      border-radius: 34rpx;
      line-height: 70rpx;
      font-size: 28rpx;
      text-align: center;
      margin: 60rpx auto;
      font-weight: 500;
      color: #909090;
    }
  }
</style>

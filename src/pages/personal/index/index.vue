<template>
  <div class="home">
    <div class="info" @click="toPage('/pages/personal/personInfo/main')">
      <div class="img">
        <image :src="info.avatar" mode="aspectFill" class="userImg" />
        <!-- <image :src="dh" mode="widthFix" class="dh" v-if="info.partMember==1" /> -->
      </div>
      <div class="cont">
        <p>{{info.phone}}
        </p>
        <p>欢迎光临</p>
      </div>
      <!-- <image :src="arrowRWhite" mode="widthFix" /> -->
    </div>
    <ul>
      <li v-for="(item, index) in menuList" :key="index" @click="toPage(item.href)">
        <!-- <image :src="item.img" mode="widthFix" /> -->
        <div>{{ item.nm }}</div>
        <div>
          <div>{{item.value}}</div>
        <image src="/static/images/arrowR.png" style="margin-left:30rpx;" mode="widthFix" v-show='item.isarrow' />
        </div>
        
      </li>
    </ul>
    <div class="loginOutBtn" @click="loginOut()">退出登录</div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return {
       
        info: {
          avatar:'https://tse1-mm.cn.bing.net/th/id/OIP-C.-NoLyCcaIpFEueTKnNIZWQHaHa?w=208&h=208&c=7&r=0&o=5&pid=1.7',
          phone:'13255881234'
        },
        menuList: [
          {
            nm: "登录名",
            value:'13255881234',
            isarrow:false
          },
          {
            nm: "修改密码",
            value:'',
            isarrow:true

          },
          {
            nm: "姓名",
            value:'张三',
            isarrow:false


          },
          {
            nm: "性别",
            value:'女',
            isarrow:false


          },
          {
            nm: "联系方式",
            isarrow:false,
            value:'13255881234',

          },
          {
            nm: "联系邮箱",
            value:'',
            isarrow:false

          },
          
        ],
      };
    },
    components: {},
    async onLoad() {
      console.log(this.info.avatar)
    },
    onShow() {
      Object.assign(this.$data, this.$options.data())
     
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
        padding-right: 54rpx;
        padding-left: 54rpx;
        justify-content: space-between;
        height: 104rpx;

        &:not(:last-of-type) {
          border-bottom: 1px solid #f1f1f1;
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

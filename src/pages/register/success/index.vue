<template>
  <div class="home">
    <img mode="widthFix" class="success" src="/static/images/success.png" alt="" />
    <p>注册成功</p>
    <ul>
      <li>
        <span>姓名：</span><span class="spanname">{{ info.name }}</span>
        <img mode="widthFix" src="/static/images/partyEmblem.png" alt="" />
      </li>
      <li>
        <span>联系电话：</span><span>{{ info.tel }}</span>
      </li>
      <li>
        <span>楼层信息：</span><span>{{ info.floor }}</span>
      </li>
      <li>
        <span>小区名称：</span><span>{{ info.community }}</span>
      </li>
    </ul>
    <span class="go" @tap="gotoIndex">去首页</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {
          name: "张晓西",
          tel: 15000111100,
          floor: "207单元 1207室",
          community: "金邑水岸智慧小区",
        },
      };
    },
    methods: {
      gotoIndex() {
        let url = "/pages/index/index/main";
        wx.reLaunch({
          url
        });
      },
    },
  };
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    background-color: #f1f3f2;
    box-sizing: border-box;
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .success {
      width: 80rpx;
      height: 80rpx;
      margin-top: 202rpx;
      margin-bottom: 54rpx;
    }

    >p {
      width: 112rpx;
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40rpx;
      color: #333333;
      opacity: 1;
      margin-bottom: 126rpx;
    }

    ul {
      display: flex;
      flex-direction: column;
      width: 670rpx;
      height: 300rpx;
      background: #ffffff;
      opacity: 1;
      border-radius: 14rpx;
      padding-top: 40rpx;
      padding-bottom: 20rpx;
      padding-left: 48rpx;

      li {
        flex: 1;
        margin-bottom: 20rpx;
        display: flex;
        align-items: center;

        span:nth-child(1) {
          width: 140rpx;
          height: 40rpx;
          margin-right: 20rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40rpx;
          color: #999999;
          opacity: 1;
          text-align: justify;

          &::after {
            display: inline-block;
            width: 100%;
            content: "";
            height: 0;
          }
        }

        span:nth-child(2):not(.spanname) {
          flex: 1;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40rpx;
          color: #999999;
          opacity: 1;
          height: 40rpx;
        }
      }

      li:nth-child(1) {
        img {
          width: 40rpx;
          height: 40rpx;
        }

        span:nth-child(2) {
          width: 153rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40rpx;
          color: #999999;
          opacity: 1;
          height: 40rpx;
        }
      }
    }

    .go {
      width: 84rpx;
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40rpx;
      color: #eb020e;
      text-decoration: underline;
      opacity: 1;
      margin-top: 60rpx;
    }
  }
</style>

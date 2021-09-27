<template>
  <div class="home">
    <div class="info">
      <div class="userInfo">
        <b>{{info.realName}}</b>
        <p>
          <image :src="unit" mode="widthFix" />{{info.house}}
        </p>
        <p>
          <image :src="userType" mode="widthFix" />{{info.type==1 ? '户主' : '同住人'}}
        </p>
      </div>
      <p>邻里中心</p>
    </div>
    <div class="main">
      <div class="car-list" v-if="carNum!=''">
        <span class="list-title">车辆信息</span>
        <block v-for="(item,index) in carNumList" :key="index">
          <div class="car-info">
            <span>{{item.carNum}}</span>
            <span>解除绑定</span>
          </div>
        </block>
      </div>
      <div class="add-car" @click="addCar">
        <span>+</span>
        添加车辆信息
      </div>
    </div>
    <div class="mask" v-if="isAdd"></div>
    <div class="show-car-input" v-if="isAdd">
      <span>添加车辆</span>
      <div class="car-input">
        <car-num  @result='getCarNum'  :nums='num'></car-num>
      </div>
      <div class="car-type">
        <radio-group class="radio-group" @change="radioChange">
          <label class="radio" v-for="(item, index) in carType" :key="index">
            <radio :value="item.name" :checked="item.checked" /> {{item.value}}
          </label>
        </radio-group>
      </div>
      <div class="btn-group">
        <span class="cancel">取消</span>
        <span class="submit">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
  import userType from '../../../../static/images/owner.png'
  import unit from '../../../../static/images/address2.png'
  import carNum from '@/components/carNum.vue'
  export default {
    data() {
      return {
        unit,
        userType,
        info: {},
        carNumList: [{
          carNum: '浙B12345'
        }],
        isAdd: false,
        num: 7,
        carType: [{
          name: 7,
          value: '小型车牌',
          checked: 'true'
        }, {
          name: 8,
          value: '新能源车牌'
        }]
      }
    },
    components: {
      carNum
    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
    },
    onShow() {
      this.api.verifyToken().then(() => {
        this.info = wx.getStorageSync('loginInfo')
      });
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
      addCar() {
        this.isAdd = true
      },
      getCarNum(value) {
        console.log(value)
      },
      radioChange(e) {
        console.log(e.mp.detail.value)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    .info {
      width: 691rpx;
      height: 192rpx;
      background: #EB020E;
      box-shadow: 0px 4rpx 29rpx 0px rgba(157, 157, 157, 0.41);
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      margin: 30rpx auto;

      .userInfo {
        padding-left: 43rpx;
        color: #ffffff;
        flex: 1;

        b {
          font-size: 30rpx;
        }

        p {
          padding-top: 15rpx;
          display: flex;
          align-items: center;
          font-size: 24rpx;

          image {
            width: 22rpx;
            margin-right: 10rpx;
          }
        }
      }

      >p {
        width: 117rpx;
        height: 117rpx;
        background: #FFFFFF;
        border: 4prx solid rgba(255, 255, 255, 0.2);
        box-shadow: 0px 6rpx 43px 0rpx rgba(235, 2, 14, 0.42);
        border-radius: 50%;
        margin-right: 64rpx;
        color: @color;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding: 0 32rpx;
      }
    }

    .main {
      flex: 1;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background: #ffffff;
      width: 100vw;
      height: 100%;
      border-radius: 12rpx 12rpx 0 0;

      .car-list {
        width: 100%;
        display: flex;
        flex-direction: column;

        .list-title {
          width: 100%;
          padding: 30rpx 50rpx;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 28rpx;
          color: #303030;
          font-weight: bold;
          line-height: 27rpx;
        }

        .list-title:before {
          content: "";
          display: inline-block;
          width: 6rpx;
          height: 27rpx;
          background: #EB020E;
          margin-right: 20rpx;
        }

        .car-info {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 30rpx 50rpx;
          box-sizing: border-box;

          span {
            font-size: 30rpx;
            color: #303030;
            font-weight: bold;
          }

          span:last-child {
            width: 130rpx;
            height: 38rpx;
            line-height: 38rpx;
            text-align: center;
            font-size: 24rpx;
            color: #606060;
            font-weight: 500;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 19px;
          }
        }
      }

      .add-car {
        width: 500rpx;
        height: 136rpx;
        border: 1px dashed #d3d3d3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #666666;
        line-height: 30rpx;
        font-size: 22rpx;
        box-sizing: border-box;
        margin: 20rpx auto;

        span {
          color: #999999;
          font-size: 60rpx;
          margin-bottom: 20rpx;
        }
      }
    }

    .mask {
      position: fixed;
      left: 0px;
      top: 0px;
      background: rgba(0, 0, 0, 0.25);
      width: 100%;
      height: 100%;
      opacity: 1;
      z-Index: 50;
    }

    .show-car-input {
      width: 660rpx;
      height: 505rpx;
      background-color: #fff;
      border-radius: 12rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 51;
      padding: 40rpx;
      box-sizing: border-box;

      span {
        font-size: 30rpx;
        font-weight: bold;
        color: #303030;
      }

      .car-input {
        width: 100%;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .car-type {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #606060;
        font-size: 24rpx;
        font-weight: 400;
        /deep/ .radio {
          margin-right: 140rpx;
        }
        /deep/ .radio:last-child {
          margin-right: 0;
        }
        /deep/ .wx-radio-input {
          width: 23rpx;
          height: 23rpx;
          border-color: #BABABA;
        }

        /deep/ .wx-radio-input-checked {
          width: 23rpx;
          height: 23rpx;
          border-color: #EB020E;
          background-color: #EB020E;
        }

        /deep/ .wx-radio-input-checked::before {
          content: '';
          width: 23rpx;
          height: 23rpx;
          border-radius: 50%;
        }
      }

      .btn-group {
        width: 100%;
        display: flex;
        justify-content: space-around;

        span {
          width: 220rpx;
          height: 70rpx;
          line-height: 70rpx;
          text-align: center;
          font-size: 30rpx;
          font-weight: 500;
          color: #606060;
          border: 1px solid #BABABA;
          border-radius: 35rpx;
        }

        span:last-child {
          background-color: #EB020E;
          border: none;
          color: #fff;
        }
      }
    }
  }
</style>

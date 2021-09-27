<template>
  <div class="home">
    <!-- 商品轮播 -->
    <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" duration="500">
      <block v-for="(item, index) in banner" :key="index">
        <swiper-item class="swiper-item">
          <img class="slide-image" :src="item" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="shop-info">
      <span class="shop-name">{{info.name}}</span>
      <div class="shop-stock">
        <span>{{info.credit}}积分</span>
        <span>数量：{{info.stock}}</span>
      </div>
    </div>
    <!-- 兑换规则 -->
    <div class="exchange-rule" v-html="info.dtl"></div>
    <div class="num-box">
      <span>购买数量</span>
      <div class="num-btn">
        <p @click="del()" :class="isDel?'':'cannot'">-</p>
        <p class="num-item">{{num}}</p>
        <p @click="add()" :class="isAdd?'':'cannot'">+</p>
      </div>
    </div>
    <!-- 兑换按钮 -->
    <div class="exchange-btn" @click="showModal" :class="{gray:userInfo.credit<info.credit}">
      {{userInfo.credit < info.credit * num ? '积分不足':'免费兑换'}}</div>
    <!-- 遮罩 -->
    <div v-if="isShow" class="mask" catchtouchmove='ture'></div>
    <!-- 弹窗 -->
    <div v-if="isShow" class="input-box">
      <div class="top-tips">兑换人信息</div>
      <div class="input-inner">
        <span>姓名</span>
        <div>
          <input type="text" :value="name" @input="nameChange($event)">
          <img :src="pen" mode="widthFix">
        </div>
      </div>
      <div class="input-inner">
        <span>电话</span>
        <div>
          <input type="number" :value="phone" @input="phoneChange($event)">
          <img :src="pen" mode="widthFix">
        </div>
      </div>
      <div class="input-btn">
        <span @click="cancel()">取消</span>
        <span @click="toExchange()">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import pen from '../../../../static/images/pen.png'
  export default {
    data() {
      return {
        pen,
        banner: [],
        info: {},
        userInfo: {},
        id: '',
        isShow: false,
        isAdd: true, //是否可以加数量
        isDel: false, //是否可以减数量
        num: 1,
        name: "",
        phone: "",
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.id = options.id
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {
        this.getData()
      });
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
      // 加
      add() {
        if (this.num < this.info.stock&&this.userInfo.credit >= this.info.credit*(this.num+1)) {
          this.num += 1
          this.isDel = true
        } else {
          this.isAdd = false
        }
        //  else if (this.num+1<this.info.stock) {
        //   wx.showToast({
        //     title: '积分不足',
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   this.isAdd = false
        // } else if (this.num+1>this.info.stock) {
        //   wx.showToast({
        //     title: '库存不足',
        //     icon: 'none',
        //     duration: 2000
        //   })
        //   this.isAdd = false
        // }
      },
      // 减
      del() {
        if (this.num > 1) {
          this.num -= 1
          this.isAdd = true
        } else {
          this.isDel = false
        }
      },
      // 取消
      cancel() {
        this.isShow = false
      },
      // 显示确认框
      showModal() {
        if (this.userInfo.credit >= this.info.credit* this.num) {
          this.isShow = true
        }
      },
      // 修改姓名
      nameChange(e) {
        if(e.mp.detail.value) {
          this.name = e.mp.detail.value
        } else {
          this.name = this.userInfo.name
        }
      },
      // 修改手机号
      phoneChange(e) {
        if(e.mp.detail.value) {
          this.phone = e.mp.detail.value
        } else {
          this.phone = this.userInfo.phone
        }
      },
      // 确认兑换
      toExchange() {
        if(!this.name) {
          wx.showToast({
            title: "请填写名字",
            icon: 'none',
            duration: 2000
          })
          return
        }
        if(this.reg.checkPhone(this.phone)!='ok') {
          return wx.showToast({
            title: this.reg.checkPhone(this.info.phone),
            icon: 'none',
            duration: 2000
          })
        }
        this.api.proExchange({
          id: this.id,
          num: this.num,
          userName: this.name,
          phone: this.phone
        }).then(() => {
          wx.showToast({
            title: '兑换成功',
            icon: 'success',
            duration: 2000
          })
          this.getData()
          this.isShow = false
        })
      },
      toPage(url) {
        this.until.aHref(url)
      },
      getData() {
        this.api.userInfo().then(res => {
          this.userInfo = res
          this.name = res.name
          this.phone = res.phone
        })
        this.api.proDetail({
          id: this.id
        }).then(res => {
          this.info = res
          this.info.dtl = this.until.imgStyle(this.info.dtl)
          this.banner = this.info.img ? this.info.img.split(',') : []
          if(this.userInfo.credit <= this.info.credit) {
            this.isAdd = false
            this.isDel = false
          } else if (this.userInfo.credit < this.info.credit*(this.num+1)) {
            this.isAdd = false
            this.isDel = false
          }
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
    padding: 0 0 130rpx;
    box-sizing: border-box;

    .swiper-container {
      width: 100%;
      height: 100vw;

      .swiper-item {
        width: 100%;
        height: 100%;

        .slide-image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .shop-info {
      width: 100vw;
      padding: 50rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      flex-direction: column;

      .shop-name {
        font-size: 30rpx;
        font-weight: 500;
        line-height: 30rpx;
        color: #303030;
        text-align: justify;
      }

      .shop-stock {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 32rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #EB020E;

        span:last-child {
          font-size: 24rpx;
          color: #606060;
        }
      }

    }

    .exchange-rule {
      width: 100vw;
      padding: 50rpx 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 24rpx;
      font-weight: 500;
      color: #606060;
      line-height: 48rpx;
      display: flex;
      flex-direction: column;
      margin: 20rpx 0;
    }

    .exchange-btn {
      width: 570rpx;
      height: 70rpx;
      background: #EB020E;
      border-radius: 35rpx;
      position: fixed;
      bottom: 34rpx;
      left: 90rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: #fff;
      line-height: 70rpx;
      text-align: center;
    }

    .gray {
      background: #e4e4e4;
      color: #333333;
    }

    .num-box {
      width: 100%;
      padding: 40rpx 32rpx;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 28rpx;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .num-btn {
        display: flex;
        align-items: center;
        p {
          width: 56rpx;
          height: 56rpx;
          line-height: 56rpx;
          font-size: 50rpx;
          background-color: #F2F3F5;
          border-radius: 6rpx;
          margin-right: 4rpx;
          text-align: center;
        }
        .num-item {
          width: auto;
          font-size: 28rpx;
          line-height: 56rpx;
          padding: 0 25rpx;
        }
        p:last-child {
          margin-right: 0;
        }
        .cannot {
          color: #C8C9CC;
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
      z-Index: 999;
    }

    .input-box {
      width: 530rpx;
      padding: 30rpx 0;
      border-radius: 12rpx;
      background-color: #fff;
      z-index: 1000;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .top-tips {
        width: 100%;
        text-align: center;
        padding-bottom: 30rpx;
        font-size: 30rpx;
        color: #303030;
        font-weight: bold;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .input-inner {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        span {
          font-size: 24rpx;
          color: #303030;
          font-weight: bold;
        }
        div {
          display: flex;
          align-items: center;
          input {
            font-size: 24rpx;
            color: #606060;
            text-align: right;
          }
          img {
            width: 23rpx;
            margin-left: 20rpx;
          }
        }
      }
      .input-btn {
        padding-top: 20rpx;
        display: flex;
        span {
          flex: 1;
          font-size: 28rpx;
          font-weight: 500;
          color: #909090;
          padding: 10rpx 0;
          text-align: center;
        }
        span:last-child {
          color: #18BA14;
          border-left: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
</style>

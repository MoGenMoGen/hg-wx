<template>
  <div class="home">
    <div class="info-title">建房需求意向表</div>
    <div class="info-box">
      <div class="info-item">
        <span>申请人姓名：</span>
        <input type="text" class="input-class" placeholder="请输入姓名" placeholder-class="placeholder-class"
          v-model="info.name">
      </div>
      <div class="info-item">
        <span>申请人联系电话：</span>
        <input type="number" class="input-class" placeholder="请输入联系电话" placeholder-class="placeholder-class"
          v-model="info.phone">
      </div>
      <div class="info-item">
        <span>性 别：</span>
        <div class="picker-class">
          <picker :range="info.sexPicker" :value="info.sexIndex" range-key="name" @change="sexChange">
            <view :style="{color:info.sexIndex==0?'#909090':'#303030'}">{{info.sexPicker[info.sexIndex].name}}</view>
          </picker>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="info-item">
        <span>年 龄：</span>
        <input type="number" class="input-class" placeholder="请输入年龄" placeholder-class="placeholder-class"
          v-model="info.age">
      </div>
      <div class="info-item">
        <span>户口类型：</span>
        <div class="picker-class">
          <picker :range="info.houseHolderPicker" :value="info.houseHolderIndex" range-key="name" @change="houseHolderChange">
            <view :style="{color:info.houseHolderIndex==0?'#909090':'#303030'}">{{info.houseHolderPicker[info.houseHolderIndex].name}}</view>
          </picker>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="info-item">
        <span>所属行政村：</span>
        <div class="picker-class">
          <picker :range="villagePicker" :value="villageIndex" range-key="dictValue" @change="villageChange">
            <view :style="{color:villageIndex==0?'#909090':'#303030'}">{{villagePicker[villageIndex].dictValue}}</view>
          </picker>
          <img src="/static/images/arrowRight.png">
        </div>
      </div>
      <div class="info-item" @click="callPhone">
        <span>村联系电话：</span>
        <span style="text-align: right;">{{phoneList[villageIndex].mob}}</span>
      </div>
    </div>
    <div class="btn" @click="submit">提交</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {
          name: '',
          age: '',
          phone: '',
          sexIndex: 0,
          sexPicker: [{
            value: 0,
            name: '请选择性别'
          }, {
            value: 1,
            name: '男'
          }, {
            value: 2,
            name: '女'
          }],
          houseHolderIndex: 0,
          houseHolderPicker: [{
            value: '农业家庭户口',
            name: '农业家庭户口'
          },{
            value: '非农业家庭户口',
            name: '非农业家庭户口'
          }],
        },
        villagePicker: [],
        villageIndex: 0,
        phoneList: []
      }
    },
    components: {

    },
    async onLoad(options) {
      Object.assign(this.$data, this.$options.data())
      this.api.getDataList('village').then(res => {
        this.villagePicker = res
      })
      this.api.getPhone({size:20,current:1}).then(res => {
        this.phoneList = res.records
      })
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
      sexChange(e) {
        this.info.sexIndex = e.target.value
      },
      houseHolderChange(e) {
        this.info.houseHolderIndex = e.target.value
      },
      villageChange(e) {
        this.villageIndex = e.target.value
      },
      submit() {
        let that = this
        let data = {
          name: this.info.name,
          phone: this.info.phone,
          sex: this.info.sexIndex,
          age: this.info.age,
          householderType: this.info.houseHolderPicker[this.info.houseHolderIndex].name,
          village: this.villagePicker[this.villageIndex].dictKey
        }
        if(data.name==""){
          wx.showToast({
            title: '请输入姓名',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if (this.reg.checkPhone(data.phone) != 'ok') {
          return wx.showToast({
            title: this.reg.checkPhone(data.phone),
            icon: 'none',
            duration: 2000
          })
        }
        if(data.sex==0){
          wx.showToast({
            title: '请选择性别',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if(data.age=="") {
          wx.showToast({
            title: '请输入年龄',
            icon: 'none',
            duration: 1500
          })
          return
        }
        that.api.perApply(data).then(res => {
          that.until.aHrefRedirectTo('/pages/homeStead/applyDetail/main?id=' + res.data.data.applyId)
        })
      },
      callPhone(){
        wx.makePhoneCall({
          phoneNumber: '13888888888'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;

    .info-title {
      width: 100%;
      font-size: 30rpx;
      font-weight: bold;
      color: #303030;
      margin: 60rpx auto;
      text-align: center;
    }

    .info-box {
      width: 710rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      background-color: #fff;
      margin: 20rpx auto;
      border-radius: 20rpx;
      position: relative;

      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 24rpx;
        color: #303030;
        padding: 20rpx 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        span {
          width: 50%;
        }

        .input-class {
          flex: 1;
          font-size: 24rpx;
          text-align: right;
        }

        .placeholder-class {
          color: #C4C4C4;
        }

        .picker-class {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 24rpx;

          picker {
            flex: 1;
            text-align: right;
          }

          img {
            width: 8rpx;
            height: 15rpx;
            margin-left: 15rpx;
          }
        }
      }

      .info-item:last-child {
        border-bottom: none;
      }
    }

    .btn {
      width: 330rpx;
      height: 100rpx;
      background-color: #599BFF;
      border-radius: 60rpx;
      line-height: 100rpx;
      text-align: center;
      font-size: 28rpx;
      color: #fff;
      margin: 60rpx auto;
      box-shadow: 0px 6px 12px rgba(38, 148, 248, 0.22);
    }
  }
</style>

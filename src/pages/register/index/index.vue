<template>
  <div class="home">
    <picker id="area" @change="bindPickerChange" :value="Index" :range="info.Community">
      <view class="picker-name">
        {{ info.Community[Index] }}
        <img mode="widthFix" src="/static/images/selectone.png" alt="" />
      </view>
    </picker>

    <ul>
      <li>
        <img src="/static/images/required.png" class="required">
        <img mode="widthFix" src="/static/images/phone.png" alt="" class="logo" />
        <span>|</span>
        <input placeholder-style="color:#cbcbcb" type="number" v-model="info.phone" placeholder="请输入联系方式"
          maxlength="11" />
      </li>

      <li>
        <img src="/static/images/required.png" class="required">
        <img mode="widthFix" src="/static/images/user.png" alt="" style="width: 35rpx;margin-left: 9rpx;"
          class="logo" />
        <span>|</span>
        <input placeholder-style="color:#cbcbcb" type="text" v-model="info.realName" placeholder="请输入真实姓名" />
      </li>

      <li>
        <!-- <img src="/static/images/required.png" class="required"> -->
        <img mode="widthFix" src="/static/images/IDCard.png" alt="" class="logo" style="margin-left: 46rpx;"/>
        <span>|</span>
        <input type="idcard" placeholder-style="color:#cbcbcb" v-model="info.idCard" placeholder="请输入身份证号"
          maxlength="18" />
      </li>

      <li class="li-picker">
        <img src="/static/images/required.png" class="required">
        <img mode="widthFix" src="/static/images/address1.png" alt="" class="logo" />
        <span>|</span>
        <!-- <input placeholder-style="color:#cbcbcb" type="text" v-model="info.address"
          placeholder="请输入楼房号码（xxx幢xxxx室）" /> -->
        <picker mode="multiSelector" :value="addIndex" :range="addArr" @columnchange="changeNextCol" @change="addChange"
          class="pickerStyle">
          <view v-if="info.address==''" style="color: #cbcbcb;">请选择楼房号码</view>
          <view v-else>
            {{addArr[0][addIndex[0]]}}{{addArr[1][addIndex[1]]}}
          </view>
        </picker>
        <img src="/static/images/selecttwo.png" style="width:34rpx;margin-left: 0;" alt="" mode="widthFix" />
      </li>

      <li class="li-picker">
        <img src="/static/images/required.png" class="required">
        <img mode="widthFix" src="/static/images/political_status.png" alt="" class="logo" />
        <span>|</span>
        <picker @change="PickerChange" :value="Index1" range-key="label" :range="info.status" class="pickerStyle">
          <view v-if="Index1 == -1" style="color: #cbcbcb;">请选择政治面貌</view>
          <view v-else>
            {{ info.status[Index1].label }}
          </view>
        </picker>
        <img src="/static/images/selecttwo.png" style="width:34rpx;margin-left: 0;" alt="" mode="widthFix" />
      </li>
      <!-- <li class="li-picker">
      <img src="/static/images/required.png" class="required">
        <img mode="widthFix" src="/static/images/age.png" alt="" class="logo"/>
        <span>|</span>
        <picker @change="ageChange" :value="ageIndex" range-key="dictValue" :range="info.ageList" class="pickerStyle">
          <view v-if="ageIndex == -1" style="color: #cbcbcb;">请选择年龄层次</view>
          <view v-else>
            {{ info.ageList[ageIndex].dictValue }}
          </view>
        </picker>
        <img src="/static/images/selecttwo.png" style="width:34rpx;margin-left: 0;" alt="" mode="widthFix" />
      </li> -->
      <li class="li-picker">
        <img mode="widthFix" src="/static/images/industry.png" alt="" style="margin-left: 46rpx;" class="logo" />
        <span>|</span>
        <picker @change="industryChange" :value="industryIndex" range-key="dictValue" :range="info.industry"
          class="pickerStyle">
          <view v-if="industryIndex == -1" style="color: #cbcbcb;">请选择行业属性</view>
          <view v-else>
            {{ info.industry[industryIndex].dictValue }}
          </view>
        </picker>
        <img src="/static/images/selecttwo.png" style="width:34rpx;margin-left: 0;" alt="" mode="widthFix" />
      </li>
    </ul>
    <button @tap="ToNext">下一步</button>
    <button class="loginBtn" open-type='getPhoneNumber' @getphonenumber="getPhoneNumber">去登录</button>
    <p class="tel">社区联系电话：89098721</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Index: 0,
        Index1: -1,
        ageIndex: -1,
        industryIndex: -1,
        addArr: [],
        addIndex: [0, 0],
        info: {
          status: [{
            value: 3,
            label: '党员'
          },{
            value: 1,
            label: '群众'
          }, {
            value: 2,
            label: '团员'
          },  {
            value: 4,
            label: '其他'
          }],
          phone: "",
          realName: "",
          idCard: "",
          address: "",
          Community: ["金邑水岸智慧小区"],
          json: [],
          chooseList: []
        },
      };
    },
    methods: {
      ToNext() {
        if (this.reg.checkPhone(this.info.phone) != 'ok') {
          return wx.showToast({
            title: this.reg.checkPhone(this.info.phone),
            icon: 'none',
            duration: 2000
          })
        }
        if (!this.info.realName) {
          return wx.showToast({
            title: '请输入真实姓名',
            icon: 'none',
            duration: 2000
          })
        }
        // if (this.reg.isIdCard(this.info.idCard) != 'ok') {
        //   return wx.showToast({
        //     title: this.reg.isIdCard(this.info.idCard),
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }
        if (!this.info.address) {
          return wx.showToast({
            title: '请输入楼房号码',
            icon: 'none',
            duration: 2000
          })
        }
        if (this.Index1 < 0) {
          return wx.showToast({
            title: '请选择政治面貌',
            icon: 'none',
            duration: 2000
          })
        }
        // if (this.ageIndex < 0) {
        //   return wx.showToast({
        //     title: '请选择年龄层次',
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }
        // if (this.industryIndex < 0) {
        //   return wx.showToast({
        //     title: '请选择行业属性',
        //     icon: 'none',
        //     duration: 2000
        //   })
        // }
        let data = {}
        if (this.industryIndex < 0) {
          data = {
            phone: this.info.phone,
            realName: this.info.realName,
            idCard: this.info.idCard,
            houseId: this.info.address,
            politic: Number(this.Index1) + 1
          }
        } else {
          data = {
            phone: this.info.phone,
            realName: this.info.realName,
            idCard: this.info.idCard,
            houseId: this.info.address,
            politic: Number(this.Index1) + 1,
            industryCategory: this.info.industry[this.industryIndex].id
          }
        }
        wx.setStorageSync("registerData", data)
        wx.navigateTo({
          url: "/pages/register/label/main"
        });
      },
      // 选小区下拉框
      bindPickerChange(e) {
        this.Index = e.target.value;
      },
      // 选政治面貌下拉框
      PickerChange(e) {
        this.Index1 = e.target.value;
      },
      // 年龄层次
      ageChange(e) {
        this.ageIndex = e.target.value;
      },
      // 行业属性
      industryChange(e) {
        this.industryIndex = e.target.value;
      },
      getPhoneNumber(e) {
        if (e.mp.detail.errMsg == "getPhoneNumber:ok") {
          console.log(e.mp.detail.iv, e.mp.detail.encryptedData, wx.getStorageSync('code'))
          let data = {
            iv: e.mp.detail.iv,
            encryptedData: e.mp.detail.encryptedData,
            code: wx.getStorageSync('code')
          }
          this.api.wxPhoneLogin(data).then(res => {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            })
            if(wx.getStorageSync("loginInfo").faceImg == "") {
              setTimeout(() => {
                // wx.switchTab({
                //   url: '/pages/index/index/main'
                // })
                wx.reLaunch({
                  url: '/pages/informationCollect/face/main'
                })
              }, 1500)
            } else {
              setTimeout(() => {
                // wx.switchTab({
                //   url: '/pages/index/index/main'
                // })
                wx.reLaunch({
                  url: '/pages/index/index/main'
                })
              }, 1500)
            }
          })
        } else if (e.mp.detail.errMsg == "getPhoneNumber:fail user deny") {
          wx.showToast({
            title: '请注册登录',
            icon: 'none',
            duration: 2000
          })
        }
      },
      changeNextCol(e) {
        console.log(e)
        if(e.target.column==0) {
          let parentId = this.json[e.target.value].id
          this.api.getHouseId({parentId:parentId}).then(res => {
            this.chooseList = res.data
            this.addArr.splice(1,1,res.data.map(function(v){return v.fullName}))
          })
        }
        this.addIndex[e.target.column] = e.target.value;
      },
      addChange(e) {
        console.log(e.target.value)
        this.addIndex = e.target.value
        this.info.address = this.chooseList[e.target.value[1]].id
      }
    },
    onLoad() {
      Object.assign(this.$data, this.$options.data())
      this.api.getDataList('ageSeg').then(res => {
        this.info.ageList = res
      })
      this.api.getDataList('industryCategory').then(res => {
        this.info.industry = res
      })
      let data = {
        parentId: '1123598813738675201'
      }
      this.api.getHouseId(data).then(res => {
        this.json = res.data
        this.api.getHouseId({parentId:res.data[0].id}).then(respon => {
          this.chooseList = respon.data
          this.addArr = []
          console.log(this.addArr)
          this.addArr.push(res.data.map(function(v){return v.fullName}))
          this.addArr.push(respon.data.map(function(v){return v.fullName}))
        })
      })
    },
    onShow() {
      wx.login({
        success: (res) => {
          wx.setStorageSync('code', res.code)
        }
      })
    },
    onShareAppMessage() {
      return {

      }
    },
  };
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    background-color: #ffffff;
    box-sizing: border-box;
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    #area {
      width: 690rpx;
      margin-top: 52rpx;
      margin-bottom: 52rpx;

      .picker-name {
        padding-left: 60rpx;
        width: 352rpx;
        height: 60rpx;
        font-size: 44rpx;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 60rpx;
        color: #333333;
        opacity: 1;

        img {
          width: 32rpx;
          height: 32rpx;
          position: absolute;
          left: 444rpx;
          top: 64rpx;
        }
      }
    }

    ul {
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: center;

      li {
        display: flex;
        align-items: center;
        width: 660rpx;
        height: 100rpx;
        border-bottom: 1px solid #f1f3f2;

        .required {
          width: 20rpx;
          height: 20rpx;
          margin-right: 26rpx;
        }

        .logo {
          width: 44rpx;
          margin-right: 24rpx;
        }

        span {
          color: #cbcbcb;
          width: 1px;
          margin-right: 34rpx;
        }

        input {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 40rpx;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
        }
      }

      li:last-child {
        border: none;
      }

      .li-picker {
        .pickerStyle {
          flex: 1;
          height: 40rpx;
          line-height: 40rpx;

          view {
            width: 100%;
            font-size: 28rpx;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    button {
      width: 660rpx;
      height: 88rpx;
      background: #eb020e;
      box-shadow: 0rpx 6rpx 12rpx rgba(248, 38, 38, 0.05);
      opacity: 1;
      border-radius: 14rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 88rpx;
      color: #ffffff;
      // 挑
      margin-top: 100rpx;
      text-align: center;
    }

    .loginBtn {
      width: 400rpx;
      height: 88rpx;
      font-size: 32rpx;
      margin-top: 40rpx;
      box-shadow: none;
      text-decoration: underline;
      color: #eb020e;
      background-color: #fff;
    }

    .tel {
      height: 40rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 40rpx;
      color: #cbcbcb;
      opacity: 1;
      text-align: center;
      position: absolute;
      bottom: 40rpx;
    }
  }
</style>

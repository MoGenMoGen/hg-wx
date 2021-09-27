<template>
  <div class="home">
    <div>
      <div class="main">
        <div class="form">
          <div>
            <image :src="tel" mode="widthFix" />
            <span></span>
            <input
              type="number"
              maxlength="11"
              v-model="form.phone"
              placeholder-class="gray"
              placeholder="请输入联系方式"
            />
          </div>
          <div>
            <image :src="user" mode="widthFix" />
            <span></span>
            <input
              type="text"
              v-model="form.realName"
              placeholder-class="gray"
              placeholder="请输入真实姓名"
            />
          </div>
          <div>
            <image :src="cardId" mode="widthFix" />
            <span></span>
            <input
              type="idcard"
              v-model="form.idCard"
              placeholder-class="gray"
              placeholder="请输入身份证号"
            />
          </div>
          <div>
            <image :src="politics" mode="widthFix" />
            <span></span>
            <picker @change="changePicker2" :value="Index" range-key="label" :range="StatusList">
              <view v-if="Index == -1">请选择政治面貌</view>
              <view class="picker" :class="{ gray: Index === -1 }" v-else>
                {{ StatusList[Index].label }}
              </view>
            </picker>
            <image :src="arrowDown" mode="widthFix" />
          </div>
        </div>
        <hobby @upData="changeHobby"></hobby>
      </div>
      <button @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
import tel from "../../../../static/images/tel2.png";
import user from "../../../../static/images/user.png";
import cardId from "../../../../static/images/cardId.png";
import addr from "../../../../static/images/addr.png";
import politics from "../../../../static/images/politics.png";
import arrowDown from "../../../../static/images/arrowDown.png";

import hobby from "@/components/hobby";
export default {
  data() {
    return {
      Index: -1,
      StatusList: [{
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
      SexList: ["男", "女"],
      tel,
      user,
      cardId,
      addr,
      politics,
      arrowDown,
      form: {
        realName: "",
        phone: "",
        idCard: "",
        politic: "0",
        sex: "1",
        ability: "",
      },
    };
  },
  components: {
    hobby,
  },
  async onLoad() {
    // 清空this.form
    this.form = {
      realName: "",
      phone: "",
      idCard: "",
      politic: "0",
      sex: "-1",
      ability: "",
    };
    Index: -1;
  },
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    // this.api.verifyToken().then(()=>{
    // });
  },
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    //选择兴趣爱好
    changeHobby(info) {
      this.form.ability = info.map(item=>item.id).join(',');
    },
    // 选择政治面貌
    changeType(e) {
      this.pickerIndex = e.mp.detail.value;
    },
    // 下拉框值改变
    changePicker2(e) {
      console.log("picker发送选择改变，携带值为", e.target.value);
      this.Index = e.target.value;
      this.form.politic = this.StatusList[this.Index].value;
    },

    submit() {
      let that = this;
      if (this.reg.checkPhone(this.form.phone) != "ok") {
        return wx.showToast({
          title: this.reg.checkPhone(this.form.phone),
          icon: "none",
          duration: 2000,
        });
      }
      if (!this.form.realName) {
        return wx.showToast({
          title: "请输入真实姓名",
          icon: "none",
          duration: 2000,
        });
      }
      // if (this.reg.isIdCard(this.form.idCard) != "ok") {
      //   return wx.showToast({
      //     title: this.reg.isIdCard(this.form.idCard),
      //     icon: "none",
      //     duration: 2000,
      //   });
      // }

      if (Number(this.form.politic) == 0) {
        return wx.showToast({
          title: "请选择政治面貌",
          icon: "none",
          duration: 2000,
        });
      }
      this.api.handleAddconhabit(this.form).then((res) => {
        wx.showToast({
          title: res.msg, //提示文字
          duration: 1500, //显示时长
          mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false
          icon: "success", //图标，支持"success"、"loading"
          success: function () {
            that.until.aHrefRedirectTo(
              "/pages/informationCollect/cohabitDetail/main?id="+res.data.id
            );
          }, //接口调用成功
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  height: 100vh;
  width: 100vw;
  padding: 20rpx 20rpx;
  box-sizing: border-box;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 12rpx;
    .main {
      flex: 1;
      height: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      .form {
        padding: 0 20rpx;
        > div {
          height: 100rpx;
          display: flex;
          align-items: center;
          &:not(:last-of-type) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
          /deep/.gray {
            color: #cbcbcb;
          }
          image {
            width: 40rpx;
            margin: 0 20rpx;
          }
          span {
            display: block;
            height: 30rpx;
            width: 1rpx;
            margin-right: 20rpx;
            background: rgba(0, 0, 0, 0.1);
          }
          input,
          picker {
            flex: 1;
          }
        }
      }
    }
    > button {
      margin: 50rpx auto;
      width: 570rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      color: #ffffff;
      font-size: 30rpx;
      background: @color;
      border-radius: 35rpx;
    }
  }
}
</style>

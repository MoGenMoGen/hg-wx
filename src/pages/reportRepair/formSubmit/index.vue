<template>
  <div class="home">
    <p>报修地点</p>
    <div class="input">
      <p>
        <image :src="addr" mode="aspectFit" />
        <input
          placeholder="请输入详细地址，方便上门服务"
          placeholder-class="gray"
          v-model="form.addr"
        />
      </p>
    </div>
    <p>报修内容</p>
    <div class="areatext">
      <textarea
        placeholder="请简短描述问题，限50字"
        placeholder-class="gray"
        maxlength="50"
        v-model="form.content"
      ></textarea>
      <add-img @upData="updateImg" ref="addImg"></add-img>
    </div>
    <p>联系方式</p>
    <div class="input">
      <p>
        <image :src="user" mode="aspectFit" />
        <input
          placeholder="请输入姓名"
          placeholder-class="gray"
          v-model="form.contacts"
        />
      </p>
      <p>
        <image :src="tel" mode="aspectFit" />
        <input
          placeholder="请输入联系方式"
          placeholder-class="gray"
          type="number"
          maxlength="11"
          v-model="form.contactNumber"
        />
      </p>
    </div>
    <div class="btn">
      <button @click="toSubmit">提交</button>
      <p @click="toPage('/pages/reportRepair/list/main')">历史报修</p>
    </div>
  </div>
</template>

<script>
import addr from "../../../../static/images/addr.png";
import tel from "../../../../static/images/tel.png";
import user from "../../../../static/images/user.png";

import addImg from "@/components/addImg";
export default {
  data() {
    return {
      addr,
      tel,
      user,
      form: {
        addr: "",
        content: "",
        img: "",
        contacts: "",
        contactNumber: "",
      },
    };
  },
  components: {
    addImg,
  },
  async onLoad() {
    // 清空this.form
    let info = wx.getStorageSync('loginInfo')
    this.form = {
      addr: "",
      content: "",
      img: "",
      contacts: info.realName,
      contactNumber: info.phone,
    };
  },
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    // this.api.verifyToken().then(()=>{
    // });
  },

  methods: {
    toSubmit() {
      let that = this;
      let copyobj = Object.assign({}, this.form);
      delete copyobj.img;
      console.log(copyobj);
      console.log("211", this.form);
      let news1 = this.reg.checkEmpty(copyobj);
      let news2 = this.reg.checkPhone(Number(copyobj.contactNumber));
      if (news1 != "ok") {
        wx.showToast({
          title: news1, // 标题
          icon: "error", // 图标类型，默认success
          duration: 1000, // 提示窗停留时间，默认1500ms
        });
      } else if (news2 != "ok") {
        wx.showToast({
          title: news2, // 标题
          icon: "error", // 图标类型，默认success
          duration: 1000, // 提示窗停留时间，默认1500ms
        });
      } else {
        this.api.handleReportrepair(this.form).then((res) => {
          wx.showToast({
            title: res.msg, //提示文字
            duration: 1500, //显示时长
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false
            icon: "success", //图标，支持"success"、"loading"
            success: function () {
              that.until.aHrefRedirectTo(
                "/pages/reportRepair/submitSuccess/main?id=" + res.data.id
              );
            }, //接口调用成功
            fail: function () {}, //接口调用失败的回调函数
            complete: function () {}, //接口调用结束的回调函数
          });
        });
      }
    },

    toPage(url) {
      this.until.aHref(url);
    },
    updateImg(img) {
      this.form.img = img.join(",");
      console.log(this.form.img);
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
  /deep/.gray {
    color: #cbcbcb;
  }
  > p {
    text-align: center;
    color: #333333;
    font-size: 24rpx;
    padding: 45rpx 0 30rpx;
  }
  > div {
    background: #ffffff;
    border-radius: 20rpx;
    padding: 0 20rpx;
  }
  .input {
    p {
      display: flex;
      align-items: center;
      height: 50rpx;
      padding: 20rpx 0;
      line-height: 50rpx;
      &:not(:last-of-type) {
        border-bottom: 1px solid #f1f3f2;
      }
      image {
        width: 30rpx;
        height: 30rpx;
      }
      input {
        margin-left: 20rpx;
        padding-left: 20rpx;
        flex: 1;
        border-left: 1px solid #cbcbcb;
      }
    }
  }
  .areatext {
    padding-top: 20rpx;
    padding-bottom: 20rpx;
  }
  .btn {
    background: none;
    width: 80vw;
    margin: 45rpx auto;
    button {
      margin-bottom: 30rpx;
      background: @color;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-size: 22rpx;
      color: #ffffff;
      border-radius: 20rpx;
      box-shadow: 0px 4rpx 9rpx rgba(248, 38, 38, 0.05);
    }
    p {
      color: @color;
      font-size: 22rpx;
      text-decoration: underline;
      text-align: center;
    }
  }
}
</style>

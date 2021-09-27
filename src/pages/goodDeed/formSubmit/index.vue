<template>
  <div class="home">
    <div class="areatext">
      <textarea
        v-model="form.content"
        placeholder="请输入好人好事表扬内容"
        placeholder-class="gray"
      ></textarea>
      <add-img @upData="updateImg" ref="addImg"></add-img>
    </div>

    <div class="btn">
      <button @click="toCancel">取消</button>
      <button @click="toSubmit">确认</button>
    </div>
  </div>
</template>

<script>
import addImg from "@/components/addImg";
export default {
  data() {
    return {
      form: {
        img: [],
        content: "",
      },
    };
  },
  components: {
    addImg,
  },
  async onLoad() {
    // 清空this.form
    this.form = {
      img: [],
      content: "",
    };
  },
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    // this.api.verifyToken().then(()=>{
    // });
  },

  methods: {
    toSubmit() {
      if (this.form.content == "") {
        wx.showToast({
          title: "请补全信息", // 标题
          icon: "error", // 图标类型，默认success
          duration: 1000, // 提示窗停留时间，默认1500ms
        });
      } else {
        this.api.handlegoodDeed(this.form).then((res) => {
          wx.showToast({
            title: "提交成功",
            icon: "success",
            duration: 2000,
          });
          setTimeout(() => {
            this.until.aHrefRedirectTo("/pages/goodDeed/list/main");
          }, 1500);
        });
      }
    },
    toCancel() {
      this.until.back();
    },
    toPage(url) {
      this.until.aHref(url);
    },
    updateImg(img) {
      this.form.img = img.join(",");
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  /deep/.gray {
    color: #cbcbcb;
  }
  .areatext {
    margin: 50rpx 0;
    border-radius: 14rpx;
    background: #ffffff;
    padding: 20rpx;
  }
  .btn {
    width: 100vw;
    margin: 45rpx auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    button {
      width: 45vw;
      background: @color;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      font-size: 22rpx;
      color: #ffffff;
      border-radius: 14rpx;
      &:first-of-type {
        background: #ffffff;
        box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.05);
        color: #303030;
      }
      &:last-of-type {
        box-shadow: 0px 3px 6px rgba(248, 38, 38, 0.1);
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <!--兴趣爱好选择-->
    <div class="hobby" v-if="hobbyShow" @click="hobbyShow = false">
      <div class="hobbyMain" @click.stop="">
        <hobby @upData="changeHobby" :id="info.ability"></hobby>
        <button @click.stop="hobbyConfirm">确定</button>
      </div>
    </div>
    <div class="faceImg">
      <add-face ref="addFace" @updata="upDateFace" :ifEdit="ifEdit"></add-face>
    </div>
    <div class="info">
      <div>
        <span>真实姓名</span>
        <input
          v-model="info.realName"
          placeholder-class="gray"
          :disabled="!ifEdit"
        />
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>手机号码</span>
        <input
          v-model="info.phone"
          type="number"
          placeholder-class="gray"
          :disabled="!ifEdit"
        />
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>身份证号</span>
        <input
          v-model="info.idCard"
          type="idcard"
          placeholder-class="gray"
          :disabled="!ifEdit"
        />
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>家庭住址</span>
        <input v-model="info.house" placeholder-class="gray" disabled />
      </div>
      <div>
        <span>性 别</span>
        <picker
          @change="changeSex"
          :value="info.sex === 1 ? '男' : '女'"
          :range="sexList"
          :disabled="!ifEdit"
        >
          <view class="picker">
            {{ info.sex > -1 ? sexList[info.sex] : '请选择性别'}}

          </view>
        </picker>
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>属 性</span>
        <p>同住人员</p>
      </div>
      <div>
        <span class="xqah">兴趣爱好、能力标签</span>
        <p v-show="!ifEdit">
          {{ info.abilityNm ? info.abilityNm : "请选择兴趣爱好" }}
        </p>
        <p @click="hobbyShow = true" v-show="ifEdit">
          {{ info.abilityNm ? info.abilityNm : "请选择兴趣爱好" }}
        </p>

        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
    </div>
    <button @click="ifEdit = true" v-show="!ifEdit">修改信息</button>
    <button @click="save" v-show="ifEdit">保存信息</button>
  </div>
</template>

<script>
import pen from "../../../../static/images/pen.png";
import addFace from "@/components/addFace.vue";
import hobby from "@/components/hobby";
export default {
  data() {
    return {
      hobbyShow: false,
      ifEdit: false,
      pen,
      sexList: ["男", "女"],
      sexIndex: 1,
      typeList: ["同住人员"],
      hobbyList:[],
      typeIndex: 0,
      id: "",
      info: {
        avatar: "",
        realName: "",
        phone: "",
        abilityNm: "", //技能
        idCard: "",
        house: "",
        status: 1, //0审核中，1审核通过
        faceStatus: 1, //0未采集 1已采集
      },
    };
  },
  components: {
    addFace,
    hobby,
  },
  async onLoad() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(() => {
      console.log("111111", this.$root.$mp.query);
      this.id = this.$root.$mp.query;
      this.api.handlecohabitdetail(this.id).then((res) => {
        // console.log(res);
        this.info = res.data;
        wx.setNavigationBarTitle({
          title: this.info.realName,
        });
        if (this.info.avatar) {
          this.$refs.addFace.initData(this.info.avatar); //通过$refs可以使用子组件所以方法和data变量
        }
        // console.log(this.info);
      });
    });
  },
  onShow() {
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    this.api.verifyToken().then(()=>{
    });
  },

  methods: {
    hobbyConfirm(){
      this.info.abilityNm = this.hobbyList.map(item=> item.dictValue).join(',')
      this.info.ability = this.hobbyList.map(item=> item.id).join(',')
      this.hobbyShow = false
    },
    save() {
      if (!this.info.realName) {
        return wx.showToast({
          title: "请输入真实姓名",
          icon: "none",
          duration: 2000,
        });
      }
      if (this.reg.checkPhone(this.info.phone) != "ok") {
        return wx.showToast({
          title: this.reg.checkPhone(this.info.phone),
          icon: "none",
          duration: 2000,
        });
      }
      if (this.reg.isIdCard(this.info.idCard) != "ok") {
        return wx.showToast({
          title: this.reg.isIdCard(this.info.idCard),
          icon: "none",
          duration: 2000,
        });
      }

      let param = {
        id:this.info.id,
        avatar:this.info.avatar,
        ability:this.info.ability,
        realName:this.info.realName,
        idCard:this.info.idCard,
        sex:this.info.sex,
        phone:this.info.phone,
      }
      this.api.conhabitChange(param).then(()=>{
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
        this.ifEdit = false
      })
    },
    // 选择性别
    changeSex(e) {
      this.info.sex = e.mp.detail.value;
    },
    // 选择属性
    changeType(e) {
      this.typeIndex = e.mp.detail.value;
    },
    upDateFace(img) {
      if (!this.ifEdit) {
        this.ifEdit = true;
      }
      this.info.avatar = img
    },
    //选择兴趣爱好
    changeHobby(info) {
      this.hobbyList = info;
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  > div {
    width: 100%;
    background: #ffffff;
    border-radius: 12rpx;
    margin: 20rpx 0;
  }
  .hobby {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    .hobbyMain {
      width: 90%;
      max-height: 90%;
      overflow-y: auto;
      background: #fff;
      border-radius: 12rpx;
      > button {
        width: 261rpx;
        height: 69rpx;
        line-height: 69rpx;
        text-align: center;
        margin: 65rpx auto;
        background: #ffffff;
        border: 1px solid #e5e5e5;
        border-radius: 34rpx;
        font-size: 28rpx;
        color: #303030;
      }
    }
  }
  .faceImg {
    padding: 50rpx 0;
    display: flex;
    justify-content: center;
  }
  .info {
    > div {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      padding: 0 36rpx;
      height: 83rpx;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      box-sizing: border-box;
      span {
        color: #303030;
        text-align: justify;
        text-align-last: justify;
        width: 100rpx;
      }
      .xqah {
        width: auto;
      }
      input,
      picker,
      p {
        color: #909090;
        flex: 1;
        text-align: right;
      }
      /deep/.gray {
      }
      image {
        width: 23rpx;
        margin-left: 10rpx;
      }
    }
  }
  > button {
    width: 261rpx;
    height: 69rpx;
    line-height: 69rpx;
    text-align: center;
    margin: 65rpx auto;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 34rpx;
    font-size: 28rpx;
    color: #303030;
  }
}
</style>

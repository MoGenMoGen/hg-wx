<template>
  <div class="home">
    <!--兴趣爱好选择-->
    <div class="hobby" v-if="hobbyShow" @click="hobbyShow=false">
      <div class="hobbyMain" @click.stop="">
        <hobby @upData="changeHobby" :id="info.ability"></hobby>
        <button @click="hobbyConfirm">确定</button>
      </div>
    </div>
    <div class="faceImg">
      <div class="img" @click="toAddImg">
        <image :src="info.avatar==''?'/static/images/avatar.png':info.avatar" mode="aspectFill" />
      </div>
      <image :src="pen" mode="widthFix" v-show="ifEdit" />
    </div>
    <div class="info">
      <div>
        <span>昵 称</span>
        <input v-model="info.nickName" placeholder-class="gray" disabled="true" />
        <!-- <image :src="pen" mode="widthFix" v-show="ifEdit" /> -->
      </div>
      <div>
        <span>真实姓名</span>
        <input v-model="info.realName" placeholder-class="gray" :disabled="!ifEdit" />
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>手机号码</span>
        <input v-model="info.phone" type="number" placeholder-class="gray" :disabled="!ifEdit" />
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>身份证号</span>
        <input v-model="info.idCard" type="idcard" placeholder-class="gray" :disabled="!ifEdit" />
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>家庭住址</span>
        <input v-model="info.house" placeholder-class="gray" :disabled="!ifEdit" />
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <div>
        <span>性 别</span>
        <picker @change="changeSex" :value="info.sex" :range="sexList" :disabled="!ifEdit">
          <view class="picker">
            {{info.sex>-1 ? sexList[info.sex] : "请选择性别"}}
          </view>
        </picker>
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div>
      <!-- <div>
        <span>属 性</span>
        <picker @change="changeType" :value="typeIndex" :range="typeList" :disabled="!ifEdit">
          <view class="picker">
            {{typeList[typeIndex]}}
          </view>
        </picker>
        <image :src="pen" mode="widthFix" v-show="ifEdit" />
      </div> -->
    </div>
    <button @click="ifEdit=true" v-show="!ifEdit">修改信息</button>
    <button @click="save" v-show="ifEdit">保存信息</button>
  </div>
</template>

<script>
  import pen from '../../../../static/images/pen.png'
  export default {
    data() {
      return {
        ifEdit: false,
        pen,
        hobbyList: [],
        sexList: ['未知', '男', '女'],
        sexIndex: 0,
        typeList: ['非党员', '党员'],
        typeIndex: 0,
        info: {}
      }
    },
    components: {},
    async onLoad() {
      Object.assign(this.$data, this.$options.data())
      this.info = wx.getStorageSync('loginInfo')
      if (this.info.phone == "") {
        this.info.phone = this.info.account
      }
      if (this.info.avatar) {
        this.$refs.addFace.initData(this.info.avatar)
      }
    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      this.api.verifyToken().then(() => {

      });
    },


    methods: {
      //更换头像
      toAddImg() {
        if (this.ifEdit) {
          this.api.chooseImg(1).then(res => {
            this.info.avatar = res.path[0]
          })
        }
      },
      save() {
        this.api.updateInfo(this.info).then(() => {
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
        this.info.sex = e.mp.detail.value
      },
      // 选择属性
      changeType(e) {
        this.typeIndex = e.mp.detail.value
      }
    }
  }
</script>

<style scoped lang="less">
  @import url("../../../css/common.less");

  .home {
    height: 100vh;
    width: 100vw;
    padding-top: 20rpx;
    box-sizing: border-box;

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

        >button {
          width: 261rpx;
          height: 69rpx;
          line-height: 69rpx;
          text-align: center;
          margin: 65rpx auto;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 34rpx;
          font-size: 28rpx;
          color: #303030;
        }
      }
    }

    .faceImg,
    .info {
      width: 100%;
      background: #ffffff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
    }

    .faceImg {
      padding: 50rpx 36rpx;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      .img {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          border-radius: 50%;
          width: 100rpx;
          height: 100rpx;
        }
      }

      >image {
        width: 23rpx;
      }

    }

    .info {
      >div {
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

        /deep/.gray {}

        image {
          width: 23rpx;
          margin-left: 10rpx;
        }
      }
    }

    >button {
      width: 261rpx;
      height: 69rpx;
      line-height: 69rpx;
      text-align: center;
      margin: 65rpx auto;
      background: #FFFFFF;
      border: 1px solid #E5E5E5;
      border-radius: 34rpx;
      font-size: 28rpx;
      color: #303030;
    }
  }
</style>

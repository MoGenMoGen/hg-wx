<template>
  <div class="tag">
    <p>请选择您的兴趣爱好、能力标签</p>
    <ul>
      <li
        v-for="(item, index) in hobbies"
        :key="index"
        @click="check(item, index)"
        :class="{ active: item.checked }"
      >
        {{ item.dictValue }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    id:{
      type:String,
      default:'',
    }
  },
  data() {
    return {
      ids: [],
      checkList:[],
      hobbies: [],
    };
  },
  components: {},
  async onLoad() {},
  mounted() {
    this.getList();
    console.log("mounted");
  },
  onShow() {
    console.log("onShow");
    //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
    // this.api.verifyToken().then(()=>{

    // });
  },
  watch:{

  },
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    async getList() {
      this.ids = this.id.split(',')
      this.checkList = []
      this.hobbies = await this.api.getDataList("ability");
      if(this.ids.length>0){
        this.hobbies.forEach((item,index)=>{
          if(this.ids.findIndex(v=>v===item.id)>-1){
            item.checked = true
            this.checkList.push(item)
          }else {
            item.checked = false
          }
          this.$set(this.hobbies,index,item)
        })
      }
    },
    check(item, index) {
      if (!item.checked && this.ids.length === 3) {
        wx.showToast({
          title: "最多选三个",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      item.checked = !item.checked;
      this.$set(this.hobbies, index, item);
      this.checkList = this.hobbies
        .filter((item) => {
          return item.checked;
        })

      this.ids = this.checkList.map((item) => item.id);
      this.$emit("upData", this.checkList);
    },
  },
};
</script>

<style scoped lang="less">
@import url("../css/common.less");
.tag {
  padding: 30rpx;
  width: 100%;
  box-sizing: border-box;
  p {
    margin-bottom: 30rpx;
  }
  ul {
    overflow: hidden;
    li {
      float: left;
      width: 49%;
      border-radius: 60rpx;
      height: 88rpx;
      text-align: center;
      line-height: 88rpx;
      border: 1px solid #cbcbcb;
      margin-bottom: 20rpx;
      color: #cbcbcb;
      font-size: 28rpx;
      box-sizing: border-box;
      &:nth-of-type(2n + 1) {
        margin-right: 2%;
      }
    }
    .active {
      color: #666666;
      border-color: #666666;
    }
  }
}
</style>

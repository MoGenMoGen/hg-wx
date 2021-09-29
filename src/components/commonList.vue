<template>
  <div>
    <div class="list-box" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
      <img :src="item.img" mode="aspectFill">
      <div class="list-right">
        <span>{{item.name}}</span>
        <span>{{item.createTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type:Array,
        default:()=>{
          return []
        }
      },
      url: {
        type: String,
        default: ""
      }
    },
    data() {
      return {}
    },
    components: {},
    async onLoad() {

    },
    onShow() {
      //这个函数是确保在调接口前有token，如果当前页面的接口不需要token，可以不用
      // this.api.verifyToken().then(()=>{

      // });
    },

    methods: {
      toDetail(id){
        let url = this.url+'?id='+id
        this.until.aHref(url)
      },
    }
  }
</script>

<style scoped lang="less">
  @import url("../css/common.less");
  .list-box {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #FFF;
    margin: 20rpx 0;
    img {
      width: 248rpx;
      height: 140rpx;
      margin-right: 40rpx;
    }
    .list-right {
      width: 400rpx;
      height: 140rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 30rpx;
      font-weight: 500;
      color: #303030;
      span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      span:last-child {
        font-size: 24rpx;
        color: #909090;
      }
    }
  }
</style>

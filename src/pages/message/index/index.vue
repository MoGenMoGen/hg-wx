<template>
  <!-- 消息页面 -->
  <div class="container">
    <div class="title">
      <div
        class="title_text"
        @click="hangleNotice"
        :class="{ active: titleIndex == 0 }"
      >
        通知公告
      </div>
      <div
        class="title_text"
        @click="hangleSysMessage"
        :class="{ active: titleIndex == 1 }"
      >
        系统消息
      </div>
    </div>
    <div class="notice_list" v-show="titleIndex == 0">
      <div
        class="notice_item"
        v-for="(item1, index1) in noticeList"
        :key="index1"
      >
        <div class="item1_title">{{ item1.title }}</div>
        <div class="item1_date">{{ item1.date }}</div>
      </div>
    </div>
    <div class="sys_list_box" v-show="titleIndex == 1">
      <div class="searchbox">
        <input class="search_input" placeholder="请输入标题" />
        <button class="btn">搜索</button>
      </div>
      <div class="sys_list">
        <div class="sys_item" v-for="(item2, index2) in sysList" :key="index2">
          <img
            src="/static/images/messageCover.png"
            style="width: 74rpx; padding-right: 18rpx"
            mode="widthFix"
            alt=""
          />
          <div class="rightpart">
            <div class="top">
              <div class="item2_title">{{ item2.title }}</div>
              <div class="item2_date">{{ item2.date }}</div>
            </div>
            <div class="bottom">
              <div class="item2_message">{{ item2.message }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleIndex: 0,
      noticeList: [
        { title: "项目/企业预约参观通知", date: "2021-09-01 09:00:00" },
        { title: "项目/企业预约参观通知", date: "2021-09-01 09:00:00" },
        { title: "项目/企业预约参观通知", date: "2021-09-01 09:00:00" },
      ],
      sysList: [
        {
          title: "报表填写提醒",
          date: "2021-09-01 09:00:00",
          message: "您的2021年06月份的月报表已生成  请及时查收",
        },
        {
          title: "报表填写提醒",
          date: "2021-09-01 09:00:00",
          message: "您的2021年06月份的月报表已生成  请及时查收",
        },
        {
          title: "报表填写提醒",
          date: "2021-09-01 09:00:00",
          message: "您的2021年06月份的月报表已生成  请及时查收",
        },
      ],
      info: {},
    };
  },
  components: {},
  async onLoad(options) {},
  onShow() {},
  //解底事件
  onReachBottom() {},

  onShareAppMessage() {
    return {};
  },

  methods: {
    toPage(url) {
      this.until.aHref(url);
    },
    // 通知公告
    hangleNotice() {
      this.titleIndex = 0;
    },
    // 系统消息
    hangleSysMessage() {
      this.titleIndex = 1;
    },
  },
};
</script>

<style scoped lang="less">
@import url("../../../css/common.less");

.container {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: #f7f7f7;
  border-top: 1rpx solid rgba(0, 0, 0, 0.1);
  .title {
    width: 100%;
    height: 84rpx;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .title_text {
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #909090;
      width: 198rpx;
      text-align: center;
    }
    .active {
      color: #ff5400;
      font-weight: bold;
      position: relative;
      width: 198rpx;
      height: 84rpx;
      line-height: 84rpx;
      border-bottom: 4rpx solid #ff5400;
    }
  }
  .notice_list {
    margin: 20rpx;
    width: 710rpx;
    .notice_item {
      border-radius: 10rpx;
      padding: 30rpx;
      background: #fff;
      border-bottom: 1px solid #e5e5e5;
      .item1_title {
        font-size: 26rpx;
        font-weight: bold;
        color: #303030;
      }
      .item1_date {
        margin-top: 10rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: #909090;
      }
    }
  }
  .sys_list_box {
    .searchbox {
      padding: 30rpx 20rpx;
      width: 710rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search_input {
        width: 553rpx;
        height: 60rpx;
        line-height: 60rpx;
        padding-left: 36rpx;
        background: #ffffff;
        border-radius: 30rpx;
        box-sizing: border-box;
      }
      .btn {
        width: 128rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #ff5400;
        text-align: center;
        border-radius: 30rpx;
        font-size: 24rpx;
        color: #ffffff;
      }
    }
    .sys_list {
      width: 710rpx;
      margin:0 auto;
      .sys_item {
        border-radius: 10rpx;
        padding: 30rpx;
        background: #fff;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        box-sizing: border-box;
        .rightpart {
          flex: 1;
          .top {
            display: flex;
            justify-content: space-between;
            .item2_title {
              font-size: 26rpx;
              font-weight: bold;
              color: #303030;
            }
            .item2_date {
              font-size: 24rpx;
              font-weight: 500;
              color: #909090;
            }
          }
          .bottom {
            margin-top: 14rpx;
            .item2_message {
              font-size: 24rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #909090;
            }
          }
        }
      }
    }
  }
}
</style>

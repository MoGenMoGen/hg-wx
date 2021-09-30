const config = require("./config");
import store from '../store'
import query from "@/utils/query"
import Vue from 'vue'
import qs from 'qs'
Vue.prototype.store = store.store;
const app = getApp()

const hostUrl = config.serverURL;
// Vue.prototype.globalData = getApp().globalData

const appid = 'wxa2af9a033ae21107'

function get(url, data, header, loading) {
  // console.log(url)
  if (loading) {
    wx.showLoading({
      title: "加载中"
    });
  }
  let myData = {};
  if (data) {
    //过滤掉空的参数
    for (let [key, val] of Object.entries(data)) {
      if (val) {
        myData[key] = val;
      }
    }
  }
  // console.log(wx.getStorageSync('token'))
  if (wx.getStorageSync('token')) {
    // console.log('=====================================')
    header = header ? header : {}
    Object.assign(header, {
      'Blade-Auth': 'bearer ' + wx.getStorageSync('token')
    })
    // console.log(header)
  }
  let promise = new Promise((resolve, reject) => {
    wx.request({
      data: myData,
      method: "get",
      header: header,
      url: config.serverURL + url,
      success: function(res) {
        if (res.statusCode == 200&&url.indexOf('wxLogin') > -1) {
          resolve(res);
        } else if (res.statusCode == 200&&url.indexOf('visit') > -1) {
          resolve(res);
        } else if (res.errMsg == 'request:ok'&&url.indexOf('getWeather') > -1) {
          resolve(res.data)
        } else if (res.data.code == 200 || res.data.code == 400) {
          resolve(res.data);
        } else if (res.data.code == 401) {
          wx.removeStorageSync('token')
        } else if (res.data.code == 0) {
          resolve(res.data);
        } else {
          if (res.data.error_description) {
            wx.showToast({
              icon: "none",
              title: res.data.error_description,
              duration: 2000
            });
          }
          // reject(res.data)
        }
      },
      fail: function(err) {
        wx.showToast({
          icon: "none",
          title: JSON.stringify(err),
          duration: 2000
        });
        reject(err);
      },
      complete: function() {
        if (loading) {
          // setTimeout(()=>{
          wx.hideLoading();
          // },2000)
        }
      }
    });
  });
  return promise;
}

function post(url, data, header) {
  if (wx.getStorageSync('token')) {
    console.log('=====================================')
    header = header ? header : {}
    Object.assign(header, {
      'Blade-Auth': 'bearer ' + wx.getStorageSync('token')
    })
    // console.log(header)
  }
  // console.log(url)
  wx.showLoading({
    title: "加载中"
  });
  let promise = new Promise((resolve, reject) => {
    wx.request({
      data: data,
      header,
      method: "post",
      url: config.serverURL + url,
      success: function(res) {
        if (res.statusCode == 200) {
          resolve(res);
        } else if (res.data.code == 200 || !res.data.code) {
          if (url.indexOf('wxLogin') == -1) {
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 2000
            })
          }
          resolve(res.data);
        } else if (res.data.code == 401) {
          console.log('token失效了')
          wx.removeStorageSync('token')
        } else {
          console.log(res)
          if (res.data.code == 400 && url.indexOf('wxLogin') > -1) {
            if (res.data.msg == '还未注册') {
              wx.reLaunch({
                url: '/pages/register/login/main'
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
              setTimeout(function() {
                wx.reLaunch({
                  url: '/pages/register/login/main'
                })
              }, 1000)
            }
            return
          }
          if (res.data.error_description || res.data.msg) {
            wx.showToast({
              icon: "none",
              title: res.data.error_description || res.data.msg,
              duration: 2000
            });
          }
          // reject(res.data.msg)
        }
      },
      fail: function(err) {
        console.log('err')
        console.log(err)
        wx.showToast({
          icon: "none",
          title: JSON.stringify(err),
          duration: 2000
        });
        // reject(err)
      },
      complete: function() {
        // setTimeout(()=>{
        wx.hideLoading();
        // },2000)
      }
    });
  });
  return promise;
}



class api {
  // 在等待拿到token值之后才执行success方法
  verifyToken(type) {
    return new Promise((resolve, reject) => {
      let that = this;
      let time = 1000 * 60 * 60 //时间间距
      // let time = 1 //时间间距
      if (wx.getStorageSync('token') && wx.getStorageSync('tokenTime') && (new Date().getTime() - new Date(wx
          .getStorageSync('tokenTime')).getTime() < time)) {
        console.log("t不需要获取token");
        resolve(true)
      } else {
        console.log("token不存在,正在重新拿token..");
        if (wx.getStorageSync('token')) {
          wx.removeStorageSync('token')
        }
        wx.login({
          success(loginRes) {
            let param = {
              code: loginRes.code,
            };
            // console.log(loginRes)
            // return
            that.login(param).then(() => {
              resolve(true)
            })
          }
        });
      }
    })
  };
  //自动登录并获取token
  login(data) {
    let header = {
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
    };
    return new Promise((resolve, reject) => {
      get("/blade-auth/oauth/wxLogin", data, header).then(res => {
        if (res.data.error_code == 401 && res.data.error_description == "请绑定账号") {
          wx.reLaunch({
            url: '/pages/register/login/main'
          })
        } else {
          wx.setStorageSync("token", res.data.access_token);
          this.userInfo()
          wx.setStorageSync("tokenTime", new Date());
          resolve(res);
        }
      });
    });
  }
  // 注册
  register(data) {
    let header = {
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
      "content-type": "application/x-www-form-urlencoded"
    };
    return new Promise((resolve, reject) => {
      post("/blade-auth/oauth/register", data, header).then(res => {
        wx.setStorageSync("token", res.data.access_token);
        this.userInfo()
        wx.setStorageSync("tokenTime", new Date());
        resolve(res);
      });
    });
  }
  // 手动登录
  loginInput(data) {
    let header = {
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0",
      "content-type": "application/x-www-form-urlencoded"
    };
    return new Promise((resolve, reject) => {
      post("/blade-auth/oauth/appLogin", data, header).then(res => {
        if (res.data.error_code == 400) {
          wx.showToast({
            title: res.data.error_description,
            icon: 'none',
            duration: 1500
          })
          return
        } else {
          wx.setStorageSync("token", res.data.access_token);
          this.userInfo()
          wx.setStorageSync("tokenTime", new Date());
          resolve(res);
        }
      });
    });
  }
  visitLogin(data) {
    let header = {
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
    };
    return new Promise((resolve, reject) => {
      get("/blade-auth/oauth/visit", data, header).then(res => {
        wx.setStorageSync("token", res.data.access_token);
        this.userInfo()
        wx.setStorageSync("tokenTime", new Date());
        resolve(res);
      });
    });
  }
  // 获取验证码
  getPhoneCode(data) {
    return new Promise(resolve => {
      get("/blade-auth/oauth/sendMsg",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 退出登录
  loginOut() {
    return new Promise(resolve => {
      get("/blade-auth/oauth/logout").then(res => {
        resolve(res)
      })
    })
  }
  // 修改密码
  updatePas(data) {
    return new Promise((resolve, reject) => {
      post("/blade-user/update-password", data).then(res => {
        resolve(res)
      })
    })
  }
  // 获取用户信息
  userInfo() {
    return new Promise(resolve => {
      get("/blade-user/info").then(res => {
        wx.setStorageSync("loginInfo", res.data);
        resolve(res.data)
      })
    })
  }
  updateInfo(data) {
    return new Promise((resolve, reject) => {
      post("/blade-user/update-info", data).then(res => {
        resolve(res)
      })
    })
  }
  //选择图片
  chooseImg(num, sourceType) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: num ? num : 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: sourceType ? sourceType : ['album', 'camera'], //从相册选择
        success: (res) => {
          let urlArr = res.tempFilePaths
          // console.log(urlArr);
          wx.showLoading({
            title: '上传中'
          });
          let promiseArr = []
          urlArr.forEach(item => {
            promiseArr.push(this.uploadImg(item))
          })
          Promise.all(promiseArr).then(res => {
            resolve({
              path: res
            })
            wx.hideLoading()
          })
        },
        fail: (err) => {
          reject(err)
        }
      });
    })

  }
  //上传图片
  async uploadImg(url) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config.serverURL + '/blade-resource/oss/endpoint/put-file', //仅为示例，非真实的接口地址
        filePath: url,

        name: 'file',
        header: {
          'Blade-Auth': 'bearer ' + wx.getStorageSync('token')
        },
        formData: {
          'user': 'test'
        },
        success: (uploadFileRes) => {
          if (JSON.parse(uploadFileRes.data).code == 401) {
            console.log('token失效了')
            wx.removeStorageSync('token')

          } else {
            resolve(JSON.parse(uploadFileRes.data).data.link)
          }
        },
        fail: (err) => {},
        complete: () => {

        }
      });
    })
  }
  //富文本
  getRichText(id) {
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id=" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  // 申请指南
  getGuide(id) {
    return new Promise(resolve => {
      get("/blade-service/guide/detail?id=" + id).then(res => {
        resolve(res.data)
      })
    })
  }
  //数据字典
  getDataList(data) {
    return new Promise(resolve => {
      get("/blade-system/dict-biz/dictionary?code=" + data).then(res => {
        resolve(res.data)
      })
    })
  }
  //轮播图
  adrertList(position) {
    return new Promise(resolve => {
      get("/blade-xc/swiper/list?position=" + position).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取天气
  getWeather() {
    return new Promise(resolve => {
      get("/blade-xc/hik/getWeather").then(res => {
        resolve(res)
      })
    })
  }
  // 党员活动详情
  partyActiveDetail(data) {
    return new Promise(resolve => {
      get("/blade-part/activity/info",data).then(res => {
        resolve(res)
      })
    })
  }
  // 党员活动签到
  partyActiveSign(data) {
    return new Promise(resolve => {
      get("/blade-part/sign/siginIn",data).then(res => {
        resolve(res)
      })
    })
  }
  // 我的活动列表
  myActiveList(data) {
    return new Promise(resolve => {
      get("/blade-part/sign/mySign",data).then(res => {
        resolve(res)
      })
    })
  }
  // 获取行政区划
  getRegion(data) {
    return new Promise(resolve => {
      get("/blade-system/region/lazy-tree",data).then(res => {
        resolve(res)
      })
    })
  }
  // 宅基地申请
  perApply(data) {
    return new Promise((resolve, reject) => {
      post("/blade-base/per/apply", data).then(res => {
        resolve(res)
      })
    })
  }
  // 宅基地申请列表
  perApplyAllList(data) {
    return new Promise(resolve => {
      get("/blade-base/open/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 我的宅基地申请
  perApplyList(data) {
    return new Promise(resolve => {
      get("/blade-base/per/myList",data).then(res => {
        resolve(res)
      })
    })
  }
  // 宅基地申请详情
  perApplyDetail(data) {
    return new Promise(resolve => {
      get("/blade-base/per/detail",data).then(res => {
        resolve(res)
      })
    })
  }
  // 获取数据字典
  getCode(data) {
    return new Promise(resolve => {
      get("/blade-system/dict-biz/dictionary",data).then(res => {
        resolve(res)
      })
    })
  }
  // 根据二维码id获取信息
  getScanCode(data) {
    return new Promise(resolve => {
      get("/blade-scan/qr/detail",data).then(res => {
        resolve(res)
      })
    })
  }
  // 上报问题
  reportAdd(data) {
    return new Promise(resolve => {
      post("/blade-scan/report/add",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 我的上报列表
  getMyReportList(data) {
    return new Promise(resolve => {
      get("/blade-scan/report/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 上报详情
  getMyReportDetail(data) {
    return new Promise(resolve => {
      get("/blade-scan/report/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 农家乐列表
  getEatList(data) {
    return new Promise(resolve => {
      get("/blade-travel/eat/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 十大碗列表
  getTenList(data) {
    return new Promise(resolve => {
      get("/blade-travel/bowl/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 十大碗详情
  getTenDetail(data) {
    return new Promise(resolve => {
      get("/blade-travel/bowl/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 乡村西餐
  getWestList(data) {
    return new Promise(resolve => {
      get("/blade-travel/west/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 乡村西餐详情
  getWestDetail(data) {
    return new Promise(resolve => {
      get("/blade-travel/west/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 代驾联盟
  getDriveList(data) {
    return new Promise(resolve => {
      get("/blade-travel/driver/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 民宿
  getHotelList(data) {
    return new Promise(resolve => {
      get("/blade-travel/hotel/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 游玩
  getSiteList(data) {
    return new Promise(resolve => {
      get("/blade-travel/site/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 游玩
  getSiteDetail(data) {
    return new Promise(resolve => {
      get("/blade-travel/site/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 购物
  getShopList(data) {
    return new Promise(resolve => {
      get("/blade-travel/shop/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 购物详情
  getShopDetail(data) {
    return new Promise(resolve => {
      get("/blade-travel/shop/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党支部人员
  getPartyList(data) {
    return new Promise(resolve => {
      get("/blade-part/mbr/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 网格党支部
  getPartyList2(data) {
    return new Promise(resolve => {
      get("/blade-part/mbr/pcData",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党员活动
  getActiveList(data) {
    return new Promise(resolve => {
      get("/blade-part/activity/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 清风廉韵列表
  getHonestList(data) {
    return new Promise(resolve => {
      get("/blade-honest/upright/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 广告管理列表
  getAdvertList(data) {
    return new Promise(resolve => {
      get("/blade-travel/advert/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 广告管理详情
  getAdvertDetail(data) {
    return new Promise(resolve => {
      get("/blade-travel/advert/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 清风廉韵详情
  getHonestDetail(data) {
    return new Promise(resolve => {
      get("/blade-honest/upright/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 通知公告列表
  getNoticeList(data) {
    return new Promise(resolve => {
      get("/blade-desk/notice/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 通知公告详情
  getNoticeDetail(data) {
    return new Promise(resolve => {
      get("/blade-desk/notice/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村委两班子
  getLeaderList(data) {
    return new Promise(resolve => {
      get("/blade-part/open/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 减负清单
  getGuideInfo(data) {
    return new Promise(resolve => {
      get("/blade-service/guide/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 微心愿
  getWishList(data) {
    return new Promise(resolve => {
      get("/blade-part/wish/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 微心愿详情
  getWishDetail(data) {
    return new Promise(resolve => {
      get("/blade-part/wish/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 微心愿数据
  getWishData() {
    return new Promise(resolve => {
      get("/blade-part/wish/wishData",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 微心愿申请
  wishApply(data) {
    return new Promise(resolve => {
      post("/blade-part/wish/applyWish",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 微心愿点亮
  wishLight(data) {
    return new Promise(resolve => {
      post("/blade-part/wish/lightUp",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 阳关村务相关列表
  getSunShineList(data) {
    return new Promise(resolve => {
      get("/blade-honest/value/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 资产管理列表
  getAssetsList(data) {
    return new Promise(resolve => {
      get("/blade-honest/assets/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 资产管理详情
  getAssetsDetail(data) {
    return new Promise(resolve => {
      get("/blade-honest/assets/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 财务公开列表
  getFinanceopenList(data) {
    return new Promise(resolve => {
      get("/blade-xc/financeopen/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 项目进度列表
  getProjectList(data) {
    return new Promise(resolve => {
      get("/blade-honest/project/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 项目进度详情
  getProjectDetail(data) {
    return new Promise(resolve => {
      get("/blade-honest/project/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 项目进度上报
  reportProject(data) {
    return new Promise(resolve => {
      post("/blade-honest/upload/save",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取监控url
  getUrl(data) {
    return new Promise(resolve => {
      get("/blade-xc/hik/getCameraUrl",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村民说事列表
  getSayList(data) {
    return new Promise(resolve => {
      get("/blade-honest/say/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村民说事详情
  getSayDetail(data) {
    return new Promise(resolve => {
      get("/blade-honest/say/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 民意体检列表
  getOpinionList(data) {
    return new Promise(resolve => {
      get("/blade-honest/opinion/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 民意体检详情
  getOpinionDetail(data) {
    return new Promise(resolve => {
      get("/blade-honest/opinion/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 投票
  vote(data) {
    return new Promise(resolve => {
      post("/blade-honest/vote/add",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 评价
  evaluate(data) {
    return new Promise(resolve => {
      post("/blade-honest/evaluate/add",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 评论
  comment(data) {
    return new Promise(resolve => {
      post("/blade-honest/comment/add",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取评论列表
  getCommentList(data) {
    return new Promise(resolve => {
      get("/blade-honest/comment/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取参数
  getParam(data) {
    return new Promise(resolve => {
      get("/blade-system/param/list?current=1&size=10&paramKey=" + data,{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 监督机构列表
  getSuperviseList(data){
    return new Promise(resolve => {
      get("/blade-honest/supervise/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 监督机构详情
  getSuperviseDetail(data){
    return new Promise(resolve => {
      get("/blade-honest/supervise/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 监督机构人员列表
  getSupervisorList(data){
    return new Promise(resolve => {
      get("/blade-honest/supervisor/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 会议纪要列表
  getMeetingList(data){
    return new Promise(resolve => {
      get("/blade-honest/meeting/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 会议纪要详情
  getMeetingDetail(data){
    return new Promise(resolve => {
      get("/blade-honest/meeting/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 我的投票列表
  getMyVoteList(data) {
    return new Promise(resolve => {
      get("/blade-honest/vote/myList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色课堂视频列表
  getRedClassVideo(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclassvideo/home",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色课堂视频列表
  getRedClassVideoList(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclassvideo/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色课堂视频详情
  getRedClassVideoDetail(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclassvideo/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色历史首页
  getRedHistory() {
    return new Promise(resolve => {
      get("/blade-xc/redclasshistory/home",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色历史列表
  getRedHistoryList(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasshistory/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色历史详情
  getRedHistoryDetail(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasshistory/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色百宝箱首页
  getRedCase() {
    return new Promise(resolve => {
      get("/blade-xc/redclasscase/home",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色百宝箱列表
  getRedCaseList(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasscase/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 红色百宝箱详情
  getRedCaseDetail(data) {
    return new Promise(resolve => {
      get("/blade-xc/redclasscase/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 精品课程
  getRedCourse() {
    return new Promise(resolve => {
      get("/blade-xc/redclasscourse/home",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 三会一课列表
  getPartClassList(data) {
    return new Promise(resolve => {
      get("/blade-part/partclass/apiList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 三会一课首页
  getPartClass() {
    return new Promise(resolve => {
      get("/blade-part/partclass/home",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 先锋榜列表
  getTopList(data) {
    return new Promise(resolve => {
      get("/blade-part/partvan/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 先锋榜详情
  getTopDetail(data) {
    return new Promise(resolve => {
      get("/blade-part/partvan/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党员详情
  getPartyMemberDetail(data) {
    return new Promise(resolve => {
      get("/blade-part/mbr/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取党员人数
  getPartyNum(){
    return new Promise(resolve => {
      get("/blade-part/mbr/partMbrNum",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取荣誉列表
  getHonorList(data) {
    return new Promise(resolve => {
      get("/blade-part/parthonor/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 获取户居分离列表
  getSeparateList(data){
    return new Promise(resolve => {
      get("/blade-part/mbr/separateList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 户居分离学习提交
  separateSubmit(data) {
    return new Promise(resolve => {
      post("/blade-part/partmbrstudy/save",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 户居分离学习列表
  getSeparateStudyList(data){
    return new Promise(resolve => {
      get("/blade-part/partmbrstudy/studyList",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 户居分离学习列表
  getSeparateStudyDetail(data){
    return new Promise(resolve => {
      get("/blade-part/partmbrstudy/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 党费缴纳
  getPartCost(data){
    return new Promise(resolve => {
      get("/blade-part/partcost/costLog",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 资料列表
  getResList(data) {
    return new Promise(resolve => {
      get("/blade-base/res/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 民生事项列表
  getMatterList(data) {
    return new Promise(resolve => {
      get("/blade-service/item/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 民生事项详情
  getMatterDetail(data) {
    return new Promise(resolve => {
      get("/blade-service/item/detail",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 发展党员列表
  getDevelopList(data) {
    return new Promise(resolve => {
      get("/blade-part/partgrow/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村民常问发起
  addQuestion(data) {
    return new Promise(resolve => {
      post("/blade-honest/question/add",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村民常问列表
  getQuestionList(data) {
    return new Promise(resolve => {
      get("/blade-honest/question/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村民常问详情
  getQuestionDetail(data) {
    return new Promise(resolve => {
      get("/blade-honest/question/info",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村民说事发起
  addSay(data) {
    return new Promise(resolve => {
      post("/blade-honest/say/submit",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 民意体检发起
  addOpinion(data) {
    return new Promise(resolve => {
      post("/blade-honest/opinion/submit",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 是否可以签到
  getPerM(data) {
    return new Promise(resolve => {
      get("/blade-part/activityMbr/hasPerm",data).then(res => {
        resolve(res)
      })
    })
  }
  // 项目上报列表
  getUploadList(data) {
    return new Promise(resolve => {
      get("/blade-honest/upload/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 村电话
  getPhone(data) {
    return new Promise(resolve => {
      get("/blade-govern/village/list",data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 客流量
  getPassengerFlow() {
    return new Promise(resolve => {
      get("/blade-xc/hik/passengerFlow",{}).then(res => {
        resolve(res.data)
      })
    })
  }
  // 车流量
  getCarNum() {
    return new Promise(resolve => {
      get("/blade-xc/hik/carNum?type=0",{}).then(res => {
        resolve(res.data)
      })
    })
  }
}
export {
  api
};

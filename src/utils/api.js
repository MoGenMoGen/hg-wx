const config = require("./config");
import store from '../store'
import query from "@/utils/query"
import Vue from 'vue'
Vue.prototype.store = store.store;
const app = getApp()

const hostUrl = config.serverURL;
// Vue.prototype.globalData = getApp().globalData

const appid = 'wx8114dbfb09324d83'

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
      success: function (res) {

        if (res.data.code == 200 || res.data.code == 400) {
          resolve(res.data);
        } else if (res.data.code == 401) {
          wx.removeStorageSync('token')
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
      fail: function (err) {
        wx.showToast({
          icon: "none",
          title: JSON.stringify(err),
          duration: 2000
        });
        reject(err);
      },
      complete: function () {
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
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 200 || !res.data.code) {
          if (url.indexOf('wxRegisterLogin') == -1) {
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
          if (res.data.code == 400 && url.indexOf('wxRegisterLogin') > -1) {
            if(res.data.msg=='还未注册') {
              wx.reLaunch({ url: '/pages/register/index/main' })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
              setTimeout(function(){
                wx.reLaunch({ url: '/pages/register/index/main' })
              },1000)
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
      fail: function (err) {
        console.log('err')
        console.log(err)
        wx.showToast({
          icon: "none",
          title: JSON.stringify(err),
          duration: 2000
        });
        // reject(err)
      },
      complete: function () {
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
        if(type==='visited'){  //需要加个判断，不然每个页面都会调这个，数值不准确
          console.log('调增加访客的接口')
          that.addVisit()
        }
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
            console.log(loginRes)
            // return
            that.login(param).then(() => {
              if(type==='visited'){
                console.log('调增加访客的接口2')
                that.addVisit()
              }
              resolve(true)
            })
          }
        });
      }
    })

  };
  //增加访问人数
  addVisit() {
    return new Promise(resolve => {
      get("/blade-system/param/addVisit").then(res => {
        resolve(res.data)
      })
    })
  }
  //首页统计人数
  homeNum() {
    return new Promise(resolve => {
      get("/blade-user/indexTotal").then(res => {
        resolve(res.data)
      })
    })
  }
  //轮播图
  adrertList(cd) {
    return new Promise(resolve => {
      get("/blade-advert/open/advertinfo/listAdsByPos?posCd=" + cd).then(res => {
        resolve(res.data)
      })
    })
  }
  //富文本
  getRichText(id) {
    return new Promise(resolve => {
      get("/blade-desk/notice/detail?id="+id).then(res => {
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
  };
  //获取token
  login(data) {
    let header = {
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
    };
    // data = {
    //   "tenantId": "000000",
    //   "username": "admin",
    //   "password": "21232f297a57a5a743894a0e4a801fc3",
    //   "grant_type": "password"
    // }
    return new Promise((resolve, reject) => {

      post("/blade-auth/oauth/wxRegisterLogin", data, header).then(res => {

        // console.log(res.data)
        wx.setStorageSync("token", res.data.access_token);
        wx.setStorageSync("loginInfo", res.data.userInfo);
        this.userInfo()
        // console.log('登录')
        // console.log(wx.getStorageSync("loginInfo"))
        // store.store.commit('token', res.token)
        wx.setStorageSync("tokenTime", new Date());
        // console.log('保存token111')

        // console.log(res.data.token)
        resolve(res);
      });
    });
  }

  // 手机号登录
  wxPhoneLogin(data) {
    let header = {
      "Authorization": "Basic c3dvcmQ6c3dvcmRfc2VjcmV0"
    };
    return new Promise((resolve, reject) => {
      post("/blade-auth/oauth/wxPhoneLogin", data,header).then(res => {
        wx.setStorageSync("token", res.data.access_token);
        wx.setStorageSync("loginInfo", res.data.userInfo);
        this.userInfo()
        wx.setStorageSync("tokenTime", new Date());
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
            resolve({ path: res })
            wx.hideLoading()
          })
        },
        fail:(err) => {
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
        fail: (err) => { },
        complete: () => {

        }
      });
    })

  }
  // 个人信息
  userInfo(data) {
    return new Promise((resolve, reject) => {
      get("/blade-user/myInfo", data, {}, true).then(res => {
        wx.setStorageSync("loginInfo", res.data);
        if(res.data.faceImg==""){
          wx.reLaunch({ url: '/pages/informationCollect/face/main' })
        }
        resolve(res.data)
      })
    })
  }
  // 党建资讯列表
  partyNewsList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/partynews/apiList", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 党建资讯详情
  partyNewsDetail(data) {
    return new Promise((resolve, reject) => {
      get('/blade-zx/partynews/detail', data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 党建活动列表
  partyActiveList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/partybuild/page", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 党建活动详情
  partyActiveDetail(data) {
    return new Promise((resolve, reject) => {
      get('/blade-zx/partybuild/apiDetail', data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 党建活动签到
  partyActiveSignIn(data) {
    return new Promise((resolve, reject) => {
      get('/blade-zx/partybuild/signIn', data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 垃圾分类列表
  garbageNewsList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/garbagenews/apiList", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 垃圾分类详情
  garbageNewsDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/garbagenews/detail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 垃圾分类
  garbageType(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/garbagetype/list", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 垃圾搜索
  garbageTextSearch(data) {
    wx.showLoading({
      title: "加载中"
    });
    let myData = {};
    let header = {};
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
    // console.log(myData,header,config.serverURL + '/blade-zx/garbagenews/garbageTextSearch')
    let promise = new Promise((resolve, reject) => {
      wx.request({
        data: myData,
        method: "get",
        header: header,
        url: config.serverURL + '/blade-zx/garbagenews/garbageTextSearch',
        success: function (res) {

          if (res.data.code == '10000') {
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
        fail: function (err) {
          wx.showToast({
            icon: "none",
            title: JSON.stringify(err),
            duration: 2000
          });
          reject(err);
        },
        complete: function () {
          wx.hideLoading();
        }
      });
    })
    return promise;
  }
  // 活动列表
  activeList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/communityactivities/page", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 活动详情
  activeDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/communityactivities/apiDetail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 活动报名
  activeSignUp(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/communityactivities/signUp", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 发起活动
  activeLaunch(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/communityactivities/launch", data).then(res => {
        resolve(res)
      })
    })
  }
  // 提交报事报修
  handleReportrepair(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/repair/save", data).then(res => {
        resolve(res);
      })
        .catch(res => reject(res))
    });

  }
  // 处理历史报修
  handleHistoryrepair(data) {
    return new Promise((resolve, reject) => {
      let header = {}
      get("/blade-zx/repair/historyList", data, header, true)
        .then(res => {
          resolve(res)
        })
    })
  }

  //投诉建议提交
  suggestSubmit(data) {
    return new Promise((resolve, reject) => {
      let header = {}
      post('/blade-zx/proposal/save', data, header, true)
        .then(res => {
          resolve(res)
        }
        )
    })
  }
  //投诉建议提交
  suggestDetail(id) {
    return new Promise((resolve, reject) => {
      get('/blade-zx/proposal/detail?id=' + id)
        .then(res => {
          resolve(res.data)
        }
        )
    })
  }
  //投诉建议提交
  suggestList(data) {
    return new Promise((resolve, reject) => {
      get('/blade-zx/proposal/historyList', data)
        .then(res => {
          resolve(res.data)
        })
    })
  }
  // 报修详情
  Repairdetail(data) {
    return new Promise((resolve, reject) => {
      let header = {}
      get("/blade-zx/repair/detail", data, header, true)
        .then(res => {
          resolve(res)
        }
        )
    })
  }
  // 居民议事列表
  discussionList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/discuss/page", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 居民议事详情
  discussionDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/discuss/apiDetail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 居民议事评论列表
  discussionReplyList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/discusscomment/page", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 居民议事点赞与取消赞
  discussionLikes(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/discusslikes/likes", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 居民议事发布评论
  discussionReply(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/discusscomment/save", data).then(res => {
        resolve(res)
      })
    })
  }
  // 居民议事发起
  discussionLaunch(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/discuss/save", data).then(res => {
        resolve(res)
      })
    })
  }
  // 线上决议列表
  resolutionList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/resolution/page", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 线上决议详情
  resolutionDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/resolution/apiDetail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 线上决议同意
  resolutionVoteAgree(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/resolutionvote/agree", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 线上决议不同意
  resolutionVoteDisagree(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/resolutionvote/disagree", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  //求助服务列表
  helpList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/help/page", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  //历史求助服务列表
  helpHirstoryList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/help/myList", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  //求助服务详情
  helpDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/help/detail", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  //求助服务解决
  helpSolve(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/help/updState", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  //求助服务评论详情
  helpCommentList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/helpcomment/page", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  // 求助服务评价
  helpToComment(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/helpcomment/save", data).then(res => {
        resolve(res.data)
      })
    })
  }
  // 求助服务发起
  helpSubmit(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/help/save", data).then(res => {
        resolve(res)
      })
    })
  }
  // 能人列表
  capableList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/capable/apiList", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 社区成员列表
  communityMemberList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/members/communityMember", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 党员先锋列表
  partyMemberList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/members/partyMember", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 团队名称列表
  teamNameList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/team/list", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 团队名称详情
  teamNameDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/team/detail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 团队活动列表
  teamActiveList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/teamactivities/page", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  //积分商品列表
  proList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/creditgoods/apiList", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  //积分商品详情
  proDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/creditgoods/detail", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  //积分商品兑换
  proExchange(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/creditgoods/exchange", data, {}, true).then(res => {
        if (res.code != 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          resolve(res.data)
        }
      })
    })
  }
  //积分商品兑换记录
  proExchangeRecords(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/creditlog/myList", data, {}, true).then(res => {
        resolve(res.data)
      })
    })
  }
  //积分明细
  creditdtlList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/creditdtl/myList", data, {}, true).then(res => {
        if (res.code != 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          resolve(res.data)
        }
      })
    })
  }
  //积分规则
  creditrule(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/creditrule/apiList", data, {}, true).then(res => {
        if (res.code != 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          resolve(res.data)
        }
      })
    })
  }
  //签到
  sign(){
    return new Promise((resolve, reject) => {
      get("/blade-zx/signlog/save", '', {}, true).then(res => {
        if (res.code != 200) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '签到成功！',
            icon: 'success',
            duration: 2000
          })
          resolve(res.data)
        }
      })
    })
  }
  // 团队活动详情
  teamActiveDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/teamactivities/apiDetail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 团队活动报名
  teamActiveSignUp(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/teamactivities/signUp", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 团队风采列表
  teamNewList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/teamnews/apiList", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 团队风采详情
  teamNewDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/teamnews/detail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 我参与的活动列表
  myActiveList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/communityactivities/myList", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 我发起的活动列表
  myLaunchActiveList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/communityactivities/myLaunchList", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 我的活动详情报名列表
  activeSignList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/communityactivitiesenroll/listByPid", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 直通车列表
  communityProblemList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/communityproblem/page", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 社区通知列表
  communityNoticeList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-desk/notice/list", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 社区通知详情
  communityNoticeDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-desk/notice/detail", data, {}, true).then(res => {
        resolve(res)
      })
    })
  }
  // 提交好事表扬
  handlegoodDeed(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/praise/save", data).then(res => {
        resolve(res);
      })
    });

  }
  // 好人好事列表
  handlegoodDeedlist(data) {
    return new Promise((resolve, reject) => {
      let header = { "Content-Type": "multipart/form-data" }
      get("/blade-zx/praise/apiList", data, header, true)
        .then(res => {
          resolve(res)
        })
    })
  }
  // 好人好事详情
  handgoodDeedDetail(data) {
    console.log("haoren");
    return new Promise((resolve, reject) => {
      let header = {}
      get("/blade-zx/praise/detail", data, header, true)
        .then(res => {
          resolve(res)
        })
    })
  }


  // 同住人员列表
  handleroommatelist(data) {
    return new Promise((resolve, reject) => {
      let header = {}
      get("/blade-zx/cohabituser/myList", data, header, true)
        .then(res => {
          resolve(res)
        })
    })
  }

  // 添加同住人员
  handleAddconhabit(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/cohabituser/save", data).then(res => {
        resolve(res);
      })
    });
  }
  // 同住人员详情
  handlecohabitdetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/cohabituser/detail", data).then(res => {
        resolve(res);
      })
    });
  }
  //修改同住人员信息
  conhabitChange(data){
    return new Promise((resolve, reject) => {
      post("/blade-zx/cohabituser/update", data).then(res => {
        resolve(res);
      })
    });
  }
  //修改个人信息
  infoChange(data){
    return new Promise((resolve, reject) => {
      post("/blade-user/update-info", data).then(res => {
        this.userInfo()
        resolve(res);
      })
    });
  }
  // 能人申请
  capableApply(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/capable/apply", data).then(res => {
        resolve(res);
      })
    });
  }
  // 社区直通车提问
  communityProblemPut(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/communityproblem/put", data).then(res => {
        resolve(res);
      })
    });
  }
  // 我参与的团队活动
  myActiveTeamList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/teamactivities/myList", data).then(res => {
        resolve(res);
      })
    });
  }
  // 门禁列表
  getDoorList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/access/list", data).then(res => {
        resolve(res);
      })
    });
  }
  // 开门
  openDoor(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/access/openDoor", data).then(res => {
        resolve(res);
      })
    });
  }
  // 开门记录
  openDoorList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/accesslog/myList", data).then(res => {
        resolve(res);
      })
    });
  }
  // 红榜
  redList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/redblack/listred", data).then(res => {
        resolve(res);
      })
    });
  }
  // 黑榜
  blackList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/redblack/listblack", data).then(res => {
        resolve(res);
      })
    });
  }
  // 人脸采集
  getFace(data) {
    return new Promise((resolve, reject) => {
      get("/blade-user/updFace", data).then(res => {
        resolve(res);
      })
    });
  }
  // 物业评分列表
  getScoreList(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/score/page", data).then(res => {
        resolve(res);
      })
    });
  }
  // 物业评分列表
  getScoreDetail(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/score/detail", data).then(res => {
        resolve(res);
      })
    });
  }
  // 是否评分
  isScore(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/scorelog/isScore", data).then(res => {
        resolve(res);
      })
    });
  }
  // 我的评分
  getMyScore(data) {
    return new Promise((resolve, reject) => {
      get("/blade-zx/scorelog/myScore", data).then(res => {
        resolve(res);
      })
    });
  }
  // 提交评分
  submitMyScore(data) {
    return new Promise((resolve, reject) => {
      post("/blade-zx/scorelog/save", data).then(res => {
        resolve(res);
      })
    });
  }
  // 楼幢房号
  getHouseId(data) {
    return new Promise((resolve, reject) => {
      get("/blade-system/dept/lazy-list",data).then(res => {
        resolve(res);
      })
    });
  }
}
export {
  api
};

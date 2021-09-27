const langCd = '2052';
const type = '3050.130';
const myLanguage = "1033"
const myLang = "en"

class until {
  imgStyle(cont){
    let myContent = cont.replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/(<img[^>]*)(\/?>)/gi, "$1style='max-width:100%;height:auto;' $2")
      // return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style

    })
    console.log('======')
    console.log(myContent)
    console.log('=======')
    return myContent
  }
  //每隔三位数一个逗号
  addCommas(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }
  //ajax请求
  get(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url,
        data,
        async: true,
        cache: false,
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      })
    });
    return promise;
  }
  postData(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url,
        data,
        async: true,
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      })
    });
    return promise;
  }
  postImg(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        contentType: false,
        processData: false,
        url,
        data,
        cache: false,
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        },
      })
    });
    return promise;
  }
  postEnty(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url,
        data,
        async: true,
        cache: false,
        dataType: 'json',
        contentType: "application/json",
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      })
    });
    return promise;
  }
  upImg(e, ipPk, imgNm, hostUrl) {
    let $q = new Promise((resolve, reject) => {
      let blob = e.target.files[0];
      if (!/^image/.test(blob.type)) {
        return reject('请选择图片文件');
      }
      let param = new FormData();
      param.append('file', blob);
      param.append('ipPk', ipPk);
      param.append('imgNm', imgNm);
      this.postImg(hostUrl + '/bus/bss/ip/upload', param)
        .then(res => {
          e.target.value = '';
          // if(res.status == 200){
          resolve(res);
          // }else {
          //   reject(res.msg);
          // }
        }, err => {
          e.target.value = '';
          reject('上传失败');
        })
    });
    return $q;
  }
  post(url, data) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url,
        data,
        async: true,
        cache: false,
        dataType: 'json',
        success(data) {
          resolve(data);
        },
        error(data) {
          reject(data);
        }
      })
    });
    return promise;
  }
  requestAPI(url, type, data) {
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: url, // 仅为示例，并非真实的接口地址
        method: type,
        data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    });
    return promise;
  }
  //fetch请求
  async fetch(url, data) {
    if (window.fetch) {
      let body = this.param(data);
      let requestConfig = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache",
        body
      }
      try {
        const response = await fetch(url, requestConfig);
        const responseJson = await response.json();
        return responseJson
      } catch (error) {
        throw new Error(error)
      }
    } else {
      this.post(url, data);
    }
  }
  //fetch参数格式化
  param(data) {
    let str = "";
    Object.keys(data).forEach((index) => {
      str = str + index + "=" + data[index] + "&"
    })
    str = str.substring(0, str.length - 1);
    return str;
  }
  //是否登录并跳转
  isLogin() {
    let state = this.seGet('YJ_token') ? true : false;
    if (!state) {
      this.href('../system/home.html');
      return false;
    }
    return state;
  }
  //是否登录
  isLogged() {
    let state = this.seGet('YJ_token') ? true : false;
    return state;
  }
  //,分割数组
  cutArray(str) {
    let result = [];
    if (str.indexOf(",") > -1) {
      result = str.split(',');
    } else {
      result.push(str);
    }
    return result;
  }
  //跳转页面
  aHref(url) {
    // console.log(url)
    wx.navigateTo({
      url
    })
    // window.location.href = url;
  }
  //跳转页面
  aHrefRedirectTo(url) {
    wx.redirectTo({
      url
    })
    // window.location.href = url;
  }
  //后退
  back(num) {
    if (num) {
      wx.navigateBack({
        delta: num
      })
    } else {
      wx.navigateBack()
    }
  }
  //session存取
  seSave(name, obj) {
    wx.setStorageSync(name, obj)
  }
  seGet(name) {
    return wx.getStorageSync(name)
  }
  seRemove(name) {
    wx.removeStorageSync(name);
  }
  //local存取
  loSave(name, obj) {
    localStorage.setItem(name, obj);
  }
  loGet(name) {
    return localStorage.getItem(name);
  }
  loRemove(name) {
    localStorage.removeItem(name);
  }
  //获取TS_token
  getToken() {
    return JSON.parse(sessionStorage.getItem('YJ_token'));
  }
  getIpPk(obj) {
    let ipPk = obj.ipPk;
    return ipPk;
  }
  //截取URL参数
  getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  }
  //获取html里的图片地址
  getimgsrc(htmlstr) {
    var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    var arr = [];
    let tem;
    while (tem = reg.exec(htmlstr)) {
      arr.push(tem[2]);
    }
    return arr;
  }
  //判断是否空对象
  isEmptyObject(obj) {
    for (var name in obj) {
      return false; //返回false，不为空对象
    }
    return true; //返回true，为空对象
  }
  //格式化日期,返回 年 月 日 星期
  formatDate(str = "") {
    str = str == "" ? new Date() : new Date(str);
    let week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let year = str.getFullYear();
    let month = str.getMonth() + 1 < 10 ? "0" + (str.getMonth() + 1) : str.getMonth() + 1;
    let day = str.getDate() < 10 ? "0" + str.getDate() : str.getDate();
    let hour = str.getHours() < 10 ? "0" + str.getHours() : str.getHours();
    let minite = str.getMinutes() < 10 ? "0" + str.getMinutes() : str.getMinutes();
    let second = str.getSeconds() < 10 ? "0" + str.getSeconds() : str.getSeconds();
    week = week[str.getDay()];
    return {
      year,
      month,
      day,
      week,
      hour,
      minite,
      second
    };
  }
  // 格式化日期,返回年月日时分秒
  formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
  }
  formatTime(date) {
    var date = new Date(date)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + " " + this.formatTen(hour) + ":" + this.formatTen(minute) +
      ":" + this.formatTen(second);
  }
  //指定时间倒计时(结束秒数)
  TimeSlot(count) {
    let end = new Date();
    //Date类型的valueOf(),返回当前日期毫秒数,可以直接比较
    if (count < end) {
      return {
        day: 0,
        h: '00',
        m: '00',
        s: '00'
      }
    }
    let total = (count - end.getTime()) / 1000;
    let day = Math.floor(total / (60 * 60) / 24)
    let h = parseInt(total / (60 * 60) % 24);
    let m = parseInt(total / 60 % 60);
    let s = parseInt(total % 60);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return {
      day,
      h,
      m,
      s
    };
  }
  TimeStep(times, endTime) {
    let start = new Date(times.replace(/-/g, '/'));
    let end = endTime ? new Date(endTime.replace(/-/g, '/')) : new Date()
    let count = (end.getTime() - start.getTime()) / 1000;
    // console.log(count)
    let d = parseInt(count / (60 * 60) / 24);
    return d;
  }
  DayStep(targetDate) {
    let date1 = new Date(targetDate.replace(/-/g, '/'));
    let date2 = new Date();
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = date2.getTime() - date1.getTime();
    const diffDate = diff / (24 * 60 * 60 * 1000);
    return diffDate;
  }
  //设置只能输入数字
  formatNumber(val) {
    let reg = /^\d+$/g;
    val = val.toString();
    if (val.match(reg)) {
      return val * 1;
    } else {
      if (val == "") {
        return "";
      }
      if (!val[0].match(reg)) {
        return "";
      }
      let str = "",
        len = val.length;
      for (let i = 0; i < len; i++) {
        str += val[i].match(reg) ? val[i] : "";
      }
      return parseInt(str);
    }
  }
  count(flag, val, max) { //加减按钮点击
    max = parseInt(max);
    if (max == 0) {
      return 0;
    }
    if (flag == "-") {
      return val == 1 ? 1 : --val;
    } else {
      return val == max ? max : ++val;
    }
  }
  //数组排序(某属性数值)
  Sort(array, flag, state = 'up') {
    let box = array.sort((v1, v2) => {
      if (state == 'up') {
        return v1[flag] - v2[flag];
      } else {
        return v2[flag] - v1[flag];
      }
    })
    return box;
  }
  //随机生成 n~m 之间的数
  Random(min, max) {
    let choices = max - min + 1;
    return Math.floor(Math.random() * choices + min);
  }
  //小程序图片预览
  viewImg(url, list) {
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  }
}
class reg {
  //验证是否有空值
  checkEmpty(obj) {
    for (let [key, val] of Object.entries(obj)) {
      if (val === '') {
        return "请补全信息！"
      }
    }
    return 'ok'
  }
  //6-8位数字
  checkPwd(str) {
    let regPhone = /^\d{6,8}$/;
    if (str == "") {
      return "请输入密码";
    }
    if (str.match(regPhone) == null) {
      return "请设置6-8位数字密码";
    }
    return 'ok';
  }
  //验证身份证号码
  checkCard(str) {
    //15位数身份证正则表达式
    let arg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //18位数身份证正则表达式
    let arg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
    if (str == "") {
      return "请输入身份证号码";
    }
    if (str.match(arg1) == null && str.match(arg2) == null) {
      return "请输入正确的身份证号码";
    }
    return 'ok';
  }
  // 验证身份证格式是否正确
  isIdCard(idCard) {
  	// 15位和18位身份证号码的正则表达式
  	var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (idCard == "") {
      return "请输入身份证号码";
    }
  	// 如果通过该验证，说明身份证格式正确，但准确性还需计算
  	if (regIdCard.test(idCard)) {
  		if (idCard.length == 18) {
  			var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10,
  					5, 8, 4, 2); // 将前17位加权因子保存在数组里
  			var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
  			var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
  			for (var i = 0; i < 17; i++) {
  				idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
  			}

  			var idCardMod = idCardWiSum % 11;// 计算出校验码所在数组的位置
  			var idCardLast = idCard.substring(17);// 得到最后一位身份证号码

  			// 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
  			if (idCardMod == 2) {
  				if (idCardLast == "X" || idCardLast == "x") {
  					//alert("恭喜通过验证啦！");
  					// return true;
            return 'ok';
  				} else {
  					//alert("身份证号码错误！");
  					// return false;
            return "请输入正确的身份证号码";
  				}
  			} else {
  				// 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
  				if (idCardLast == idCardY[idCardMod]) {
  					//alert("恭喜通过验证啦！");
  					// return true;
            return 'ok';
  				} else {
  					//alert("身份证号码错误！");
  					// return false;
            return "请输入正确的身份证号码";
  				}
  			}
  		}else{
  			// return true;
        return 'ok';
  		}
  	} else {
  		//alert("身份证格式不正确!");
  		// return false;
      return "请输入正确的身份证号码";
  	}
  }
  //验证手机号
  checkPhone(str) {
    let regPhone =
      /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|17[0-9]{1}|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if (!str) {
      return "请输入手机号";
    }

    if (!regPhone.test(str)) {
      return "请填写正确的手机号";
    }
    return 'ok';
  }
  //验证电话号和手机号
  checkTel(str) {
    let regPhone = /(^(\d{3,4}-)?\d{7,8})$|(1[3|5|7|8]\d{9})/;
    if (str == "") {
      return "请输入电话号";
    }

    if (!regPhone.test(str)) {
      return "请填写正确的电话号";
    }
    return 'ok';
  }
  //验证用户名
  checkUserName(str) {
    let reg = /[\u4e00-\u9fa5]/g;
    if (str.length == 0) {
      return "请输入用户名";
    }
    if (reg.test(str)) {
      return "用户名不能包含中文";
    }
    return 'ok';
  }
  //验证真实姓名
  checkName(str) {
    let reg = /^[\u4E00-\u9FA5]+$/;
    if (str.length == 0) {
      return "请输入真实姓名";
    }
    if (str.length < 2) {
      return "请输入正确名字";
    }
    if (!reg.test(str)) {
      return "请输入中文名";
    }
    return 'ok';
  }

  //验证邮箱
  checkMail(str) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (str == "") {
      return "请输入邮箱";
    }
    if (!reg.test(str)) {
      return "请输入正确的邮箱";
    }
    return 'ok';
  }

  //验证银行卡号
  checkMoney(str) {
    let reg = /^([1-9]{1})(\d{14}|\d{18})$/;
    if (str == "") {
      return "请输入银行卡号";
    }
    if (!reg.test(str)) {
      return "请输入正确的银行卡号";
    }
    return 'ok';
  }
  //验证特殊符号
  checkSymbol(str) {
    console.log('验证特殊符号')
    var regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    console.log(regEn.test(str))
    if (regEn.test(str) || regCn.test(str)) {
      return ('您输入了非法字符，请重新输入')
    }
    return 'ok'
  }
}
class App {
  //调用本地java方法
  NativeInterface(name, data) {
    let $q = new Promise((resolve, reject) => {
      window.WebViewJavascriptBridge.callHandler(
        name, data, (res = undefined) => {
          res = res ? res : JSON.parse(res);
          resolve(res);
        }
      )
    });
    return $q;
  }
  //判断JS环境
  IsAndroid() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    return isAndroid;
  }
  IsIos() {
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
  }
  IsWx() {
    let u = navigator.userAgent.toLowerCase();
    let isWx = u.match(/MicroMessenger/i) == "micromessenger";
    return isWx;
  }
}

export {
  until,
  reg,
  langCd,
  type,
  hostUrl,
  myLanguage,
  myLang
};

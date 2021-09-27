import { until, reg } from "@/utils/until";
import { api } from "@/utils/api";
import query from "@/utils/query"
import  store from '@/store'

require('../css/common.css')
require('../css/iconfont.css')

export default{
  install(Vue){
     Vue.prototype.until = new until();
     Vue.prototype.reg = new reg();
     Vue.prototype.api = new api();
     Vue.prototype.query = query;

    Vue.prototype.store = store.store;
  }
}

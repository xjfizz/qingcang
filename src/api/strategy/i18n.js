import request from "../../utils/request";
import _ from "lodash";

var i18n = {
  // 获取
  query: function(options){
    options = options || {};
    return request({
      method: "GET",
      url: "/zsCheck",
      params: _.pick(options, ["page", "key"])
    })
    
  }
}


export default i18n;
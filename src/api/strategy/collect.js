import request from "../../utils/request";
import _ from "lodash";

var collect = {
  // 获取搜藏列表
  favorite: function (options) {
    options = options || {};
    return request({
      method:'GET',
      url:'',
      params: _.pick(options, ["page", "key"])
    })
  }


}

export default collect
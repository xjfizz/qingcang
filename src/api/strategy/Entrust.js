import request from "../../utils/request";
import _ from "lodash";
var Entrust = {
  // 获取委托列表
  query: function(options) {
    options = options || {};
    return request({
      method: "GET",
      // url: "/entrust",
      url: `/entrust?etNo=${options.etNo}&contTel=${options.contTel}`,
      params: _.pick(options, ["page","limit"])
    });
  },
  // 编辑委托
  redact: function(options) {
    options = options || {};
    return request({
      method: "PUT",
      url: "/entrust",
      data: options
    });
  },

  // 删除委托
  deletes: function (options) {
    options = options || {};
    return request({
      method: 'DELETE',
      url: `/entrust/${options.id}`,
      params: _.pick(options, [])
    })
  },

  // 查询某客户所有委托
  seek: function (options) {
    options = options || {};
    return request({
      method: 'GET',
      url: '/entrust/self',
      params: _.pick(options, ["page"])
    })
  }
};

export default Entrust;

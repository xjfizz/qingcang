import request from "../../utils/request";
import _ from "lodash";

var jurisdiction = {
  // 获取
  query: function(options) {
    options = options || {};
    return request({
      method: "GET",
      url: "/security/authority/tree",
      params: _.pick(options, ["page", "key"])
    });
  },
  // 编辑
  redact: function(options) {
    options = options || {};
    return request({
      method: "PUT",
      url: "/security/authority",
      data: options
    });
  },
  // 添加
  addition: function(options) {
    options = options || {};
    return request({
      method: "POST",
      url: "/security/authority",
      // params: _.pick(options, ['page','key'])
      data: options
    });
  },
  // 删除
  deletes: function(options) {
    console.log(options);
    options = options || {};
    return request({
      method: "DELETE",
      url: `/security/authority/${options.id}`,
      params: _.pick(options, [])
      // data: options
    });
  }
};

export default jurisdiction;

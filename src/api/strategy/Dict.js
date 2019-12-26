import request from "../../utils/request";
import _ from "lodash";

var Dict = {
  // 获取数据字典列表
  query: function(options) {
    options = options || {};
    return request({
      method: "GET",
      // url: "/dictionary/findWithSubDictionary",
      url:`/dictionary/findWithSubDictionary?name=${options.name}&value=${options.value}`,
      params: _.pick(options, ["page", 'limit'])
    });
  },
  // 编辑数据字典
  redact: function(options) {
    options = options || {};
    return request({
      method: "PUT",
      url: "/dictionary",
      data: options
    });
  },
  // 添加数据字典
  addition: function(options) {
    options = options || {};
    return request({
      method: "POST",
      url: "/dictionary",
      data: options
    });
  },
  // 删除数据字典
  deletes: function(options) {
    options = options || {};
    return request({
      method: "DELETE",
      url: `/dictionary/${options.id}`,
      params: _.pick(options, [])
    });
  },
  // 搜索
  search: function(options) {
    option = option || {};
    return request({
      method: 'POST',
      url: '/dictionary/trees',
      params: _.pick(options, ["page", "key"])
    })
  }
};

export default Dict;

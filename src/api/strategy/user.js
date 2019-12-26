import request from "../../utils/request";
import _ from "lodash";

var user = {
  // 获取
  query: function(options) {
    options = options || {};
    return request({
      method: "GET",
      // url: "/user?username" + options.username,
      url: `/user?username=${options.username}&nickname=${options.nickname}`,
      params: _.pick(options, ["page", "key"])
    });
  },

  // 编辑
  redact: function(options) {
    options = options || {};
    return request({
      method: "PUT",
      url: "/user",
      data: options
    });
  },

  // 添加
  addition: function(options) {
    options = options || {};
    return request({
      method: "POST",
      url: "/user",
      data: options
    });
  },

  // 删除
  deletes: function(options) {
    options = options || {};
    return request({
      method: "DELETE",
      url:`/user/${options.userId}`,
      params: _.pick(options, ["page", "key"])
    });
  },
  //获取角色
  getRoles:function(options){
    options = options || {};
    return request({
      method: "GET",
      // url: "/security/role",
      url: `/security/role`,
      params: _.pick(options, ["page", 'limit'])
    })
  },
};

export default user;

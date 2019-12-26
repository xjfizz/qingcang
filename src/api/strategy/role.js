import request from "../../utils/request";
import _ from "lodash";

var Role={
  // 查看
  query:function(options){
    options = options || {};
    return request({
      method: "GET",
      // url: "/security/role",
      url: `/security/role?search=${options.search}`,
      params: _.pick(options, ["page", 'limit'])
    })
  },
  // 编辑
  redact: function(options){
    options = options || {};
    return request({
      method: 'PUT',
      url: '/security/role',
      data: options
    })
  },
  // 添加
  addition:function(options){
    options = options || {};
    return request({
      method: 'POST',
      url: '/security/role',
      data: options
    })
  },
  // 删除
  deletes:function(options){
    options = options || {};
    return request({
      method: 'DELETE',
      url: `/security/role/${options.id}`
    })
  },
   // 获取权限数列表
   getTreeList:function(options){
    options = options || {};
    return request({
      method: "GET",
      url: "/security/authority/tree",
      params: _.pick(options, [])
    })
  },

}

export default Role;
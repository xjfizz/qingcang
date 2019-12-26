import request from "../../utils/request";
import _ from "lodash";

var LookFor = {
  // 获取找仓列表
  query:function(options){
    options = options || {};
      return request({
        method: "GET",
        // url: "/look4wh",
          url:`/look4wh?contTel=${options.contTel}&zcNo=${options.zcNo}`,
        params: _.pick(options, ["page","limit"])
      })
  },
  // 编辑找仓列表
  redact:function(options){
    options = options || {};
    return request({
      method: "PUT",
      url:'/look4wh',
      data: options
    })
  },
  // 删除
  deletes:function(options){
    options = options || {};
    return request({
      method: "DELETE",
      url: `/look4wh/${options.id}`,
      params: _.pick(options, [])
    })
  },
  // 搜索客户ID
  seek:function(options){
    options = options || {};
    return request({
      method:'GET',
      url:`/look4wh/self?customId=${options.customId}`,
      params: _.pick(options, ["page",])
    })
  }

}


export default LookFor;
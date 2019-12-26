import request from "../../utils/request";
import _ from "lodash";

var Booking = {
  // 查看
  query: function(options) {
    options = options || {};
    return request({
      method: "GET",
      // url: "/reserve",
      url: `/reserve?yyNo=${options.yyNo}&contTel=${options.contTel}`,
      params: _.pick(options, ["page", "limit"])
    });
  },
  // 编辑
  redact: function(options) {
    options = options || {};
    return request({
      method: "PUT",
      url: "/reserve",
      data: options
    });
  },
  // 删除
  deletes: function(options) {
    options = options || {};
    return request({
      method: "DELETE",
      url: `/reserve/${options.reserveId}`
    });
  }
};

export default Booking;

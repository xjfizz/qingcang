import request from "../../utils/request";
import _ from "lodash";

var Area = {
    // 查看
    query: function (options) {
        options = options || {};
        return request({
            method: "GET",
            // url: "/reserve",
            url: "/spaceCond",
            params: _.pick(options, ["page"])
        });
    },
    // 编辑
    redact: function (options) {
        options = options || {};
        return request({
            method: "PUT",
            url: "/spaceCond",
            data: options
        });
    },
    // 删除
    deletes: function (options) {
        options = options || {};
        return request({
            method: "DELETE",
            url: `/spaceCond/${options.id}`
        });
    },
//    添加
    add: function (options) {
        options = options || {};
        return request({
            method: "POST",
            url: "/spaceCond",
            data: options
        });
    },
};

export default Area;

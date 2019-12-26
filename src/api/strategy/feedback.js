import request from "../../utils/request";
import _ from "lodash";

var Feedback = {
    // 获取意见反馈列表
    getFeedback: function(options) {
        options = options || {};
        return request({
            method: "GET",
            url: `/feedback`,
            params: _.pick(options, ["page","limit","tel"])
        });
    },
    // 编辑
    redact: function(options) {
        options = options || {};
        return request({
            method: "PATCH",
            url: `/feedback/read/${options.id}`,
            params: _.pick(options, [])
        });
    },
//    删除
    deletes: function(options) {
        options = options || {};
        return request({
            method: 'DELETE',
            url:`/feedback/${options.id}`,
            params: _.pick(options, ["page"])
        })
    }
};

export default Feedback;
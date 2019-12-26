import request from "../../utils/request";
import _ from "lodash";

var Banner = {
    // 获取轮播图列表
    getBannerList: function(options) {
        options = options || {};
        return request({
            method: "GET",
             url: `/banner`,
            params: _.pick(options, ["page", 'limit'])
        });
    },
    // 编辑
    redact: function(options) {
        options = options || {};
        return request({
            method: "PUT",
            url: "/banner",
            data: options
        });
    },
    // 添加图片
    addition: function(options) {
        options = options || {};
        return request({
            method: "POST",
            url: "/file",
            data: options
        });
    },
    // 添加图片
    addImgSubmit: function(options) {
        options = options || {};
        return request({
            method: "POST",
            url: "/banner",
            data: options
        });
    },
//    删除
    deletes: function (options) {
        options = options || {};
        return request({
            method: 'DELETE',
            url:`/banner/${options.id}`,
            params: _.pick(options, ["page", 'limit'])
        })
    }
};

export default Banner;

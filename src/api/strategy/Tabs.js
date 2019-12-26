import request from "../../utils/request";
import _ from "lodash";
import store from '@/store'

var Tabs = {
    // 获取
    query: function (options) {
        options = options || {};
        return request({
            method: "GET",
            // url: '/warehouse',
            url: `/warehouse?whName=${options.whName}`,
        // &contTel=${options.contTel}
            params: _.pick(options, ["page", "limit"])
        });
    },
    //根据客户ID获取
    search: function (options) {
        options = options || {};
        return request({
            method: 'GET',
            url: `/warehouse/self?customId=${options.customId}`,
            params: _.pick(options, ["page"])
        })
    },
    // 仓库详情
    getdetails: function (options) {
        options = options || {};
        return request({
            method: 'GET',
            url: `/warehouse/${options.id}`,
            params: _.pick(options)
        })
    },

    // 编辑
    storeEdit: function (options) {
        options = options || {};
        return request({
            method: 'PUT',
            url: '/warehouse',
            data: options
        })
    },

    //添加
    addition: function (options) {
        console.log('--------options--------', options)
        options = options || {};
        return request({
            method: 'POST',
            url: '/warehouse',
            data: options
        })
    },

    // 删除
    deletes: function (options) {
        options = options || {};
        return request({
            method: 'DELETE',
            url: `/warehouse/${options.whId}`,
            params: _.pick(options, ["page"])
        })
    },
    // 获取经纬度
    getLocation: function (options) {
        console.log('-----444---', store.state.map.mapState)
        options = options || {};
        return request({
            method: 'GET',
            url: `/v3/geocode/geo`,
            params: _.pick(options, ["key", 's', 'address'])
        })
    },
    //上传图片
    uploadImg: function (options) {
        options = options || {};
        return request({
            method: 'POST',
            url: '/file',
            data: options
        })
    },
    // 获取客户列表
    getCustomList: function (options) {
        options = options || {}
        return request({
            method: 'GET',
            url: '/custom',
            params: _.pick(options)
        })
    },
};

export default Tabs;

import request from '../../utils/request';
import _ from 'lodash'

var table = {

  // 获取客户列表
    getCustomList: function (options) { // get 列子
        options = options || {}
        return request({
            method: 'GET',
            url: '/custom?tel='+ options.tel ,
            //url: `/custom?tel=${options.tel}&company=${options.company}&qq=${options.qq}&name=${options.name}`,
            params: _.pick(options, ['page','limit'])
        })
    },
    // 编辑客户
    redact:function (options) {
        options = options || {}
        return request({
            method: 'PUT',
            url: '/custom',
            data:options
        })
    },

    // 添加客户
    addition: function (options) {
        options = options || {}
        return request({
            method: 'POST',
            url: '/custom',
            data: options
        })
    },
    // 删除
    deletes: function (options){
        options = options || {}
        return request({
            method: 'DELETE',
            url: `/custom/${options.id}`,
            params: _.pick(options, [])
        })
    }

    // // 条件查询人才资源分析列表
    // fetchData: function (options) { // post 列子
    //     options = options || {}
    //     return request({
    //     url: '/ms/table/list',
    //     method: 'post',
    //     data: options
    // })
    // },
    // // 删除表格数据
    // deleat: function (options) { // get 列子
    //     options = options || {}
    //     return request({
    //         method: 'GET',
    //         url: '/deleat',
    //         params: _.pick(options, ['id'])
    //     })
    // },
    // // 编辑表格数据
    // editTable: function (options) { // get 列子
    //     options = options || {}
    //     return request({
    //         method: 'GET',
    //         url: '/edit',
    //         params: _.pick(options, ['name','date','address','id'])
    //         // method: 'POST',
    //         // url: '/edit',
    //         // data: options
    //     })
    // },
    // // 新增表格数据
    // addTable: function (options) { // get 列子
    //     options = options || {}
    //     return request({
    //         method: 'GET',
    //         url: '/add',
    //         params: _.pick(options, ['name','date','address','id'])
    //     })
    // },
    // // 新增表格数据
    // searchKey: function (options) { // get 列子
    //     options = options || {}
    //     return request({
    //         method: 'GET',
    //         url: '/searchKey',
    //         params: _.pick(options, ['keyWords'])
    //     })
    // },
    // // 批量删除表格数据
    // deleteList: function (options) { // get 列子
    //     options = options || {}
    //     return request({
    //         method: 'GET',
    //         url: '/deleteList',
    //         params: _.pick(options, ['delIds'])
    //     })
    // },
}

export default table

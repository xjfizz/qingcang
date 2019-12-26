import request from '../../utils/request';
import _ from 'lodash'

var login = {
    // 登录
    login: function (options) { // post 列子
        console.log('options', options)
        options = options || {}
        return request({
            method: 'POST',
            url: '/login',
            data:options
        })
    },
    // 登出
    Quit: function (options) {
        options = options || {}
        return request({
            method: 'POST',
            url: '/logout',
            data:options
        })
    }
}

export default login

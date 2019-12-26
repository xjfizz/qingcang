import axios from 'axios';
import { Loading,Message } from 'element-ui'; // 引入Loading服务
import Vue from 'vue'
import store from '@/store'
import router from '../router'
import ElementUI from 'element-ui';


//开始加载动画
let loading;
let loadingCount = 0;
function startLoading() {
    console.log('dacoment',document)
    loading  = Loading.service({
        lock:true, //是否锁定
        text:'拼命加载中...',//加载中需要显示的文字
        background:'rgba(249,249,249,0.7)',//背景颜色
        target: document.querySelector('#content')
        // target: document.querySelector('#content')
    });
}
//结束加载动画
function endLoading() {
    if(loading && loading.close()) {
        loading.close();
    }
}

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // baseURL: 'http://192.168.1.179:9000/',
    //  baseURL: 'https://api.woho.live',
    // baseURL: 'https://restapi.amap.com/v3/geocode/geo',
    // baseURL:  'https://api.qincangyuncang.com/' ,
     timeout: 20000
})

service.interceptors.request.use( config => {
    console.log('----http----', config, localStorage.getItem('authorization '))
    /* 存过期标识 */
    let authorization = ''

    if(localStorage.getItem('authorization ') != 'undefined') {
         authorization = JSON.parse(localStorage.getItem('authorization '));
    }
    console.log('LOGIN', config, config.url )
    if (config.url == '/api/login' || config.url == '/login' ) {
        config.headers.Authorization = null
    } else {
        config.headers.Authorization = authorization
    }
    console.log('--------', config, store.state.map.mapState)
    if(store.state.map.mapState) {
        config.url = '/map' +  config.url;
    } else {
        config.url = '/api' +  config.url;
    }
    config.noLoading = config.noLoading || false
    config.onTimeout = function (request) {
        request.cancel()
    }
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        config.cache = false
    }
   // console.log('------------layer-----------', layer)
    if (!config.noLoading) {
        let url = config.url
        let ut = url.split('?')
        let u = ut[0]
        if (u !== 'captcha.do') {
            // console.log('layer', this.$layer)
            //layer.load(2, {shade: 0.2, area: ['32px', '64px']})
            //this.$layer.alert("找不到对象！");
        }
    }
     // startLoading();//请求时的加载动画
    if( loadingCount == 0) {
        startLoading();
    }
    loadingCount++;
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

service.interceptors.response.use(response => {
   // loading.close();
    console.log('所有接口返回信息', response) /* 正式环境，请注释此行代码*/
    if(response.config.url == '/api/login' || response.config.url == '/login') {
        localStorage.setItem('authorization ',JSON.stringify(response.headers.authorization));
    }
    /* 判断是否过期 */
    if (response.data.code && (response.data.code == 5002 || response.data.code == 5003 || response.data.code == 5004)) {
        // this.$message({
        //     type: 'warn',
        //     message:response.data.message
        // })
        console.log('router', router)
        ElementUI.MessageBox.alert(response.data.message, {
            confirmButtonText: '跳转到登录页',
            callback: action => {
                localStorage.removeItem("ms_username");
                sessionStorage.removeItem("token");
                router.replace({
                    path: '/login',
                })
            }
        })

    }
    if(response.status === 200){
         // endLoading();//结束加载动画
         // loading.close();
        if(loadingCount <= 0) {
            return
        }
        loadingCount--;
        if(loadingCount == 0) {
            endLoading();
        }
        return response.data;
    }else{
        console.log('请求接口error1')
        // endLoading();//结束加载动画
        if(loadingCount <= 0) {
            return
        }
        loadingCount--;
        if(loadingCount == 0) {
            endLoading();
        }
        Promise.reject();
    }
}, error => {

    console.log(error);
    // endLoading();//结束加载动画
    if(loadingCount <= 0) {
        return
    }
    loadingCount--;
    if(loadingCount == 0) {
        endLoading();
    }
     //endLoading();//结束加载动画
    return Promise.reject(error);
})


export default service;

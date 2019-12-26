import Vue from 'vue';
import Router from 'vue-router';
import { resolve } from 'path';

Vue.use(Router);

const router =  new Router({

    routes: [
        {
            path: '/',
            redirect: '/login',/*  dashboard */
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件',requireAuth: true },
            children:[
                {
                    path: '/test',
                    component: resolve => require(['../components/page/test/test.vue'], resolve),
                    meta: { title: '测试。。。。',requireAuth: true }
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页',requireAuth: true }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标',requireAuth: true }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '客户管理',requireAuth: true }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '仓库资料',requireAuth: true }
                },
                {
                    // 仓库添加
                    path:'/Tabsadd',
                    component: resolve => require(['../components/page/Tabsadd.vue'], resolve),
                    meta: {title: '仓库添加',requireAuth: true}
                },
                {
                    // 仓库编辑
                    path:'/whedit',
                    component: resolve => require(['../components/page/whedit.vue'],resolve),
                    meta: {title: '仓库编辑',requireAuth: true}
                },
                {
                    // 仓库详情
                    path:'/warehouse',
                    component: resolve => require(['../components/page/warehouse'],resolve),
                    meta: {title: '仓库详情',requireAuth: true}
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单',requireAuth: true }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器',requireAuth: true }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器',requireAuth: true }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传',requireAuth: true }
                },
                {
                    // 找仓审核
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: '找仓审核',requireAuth: true }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表',requireAuth: true }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框',requireAuth: true }
                },
                {
                    // 招商审核
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n.vue'], resolve),
                    meta: { title: '招商审核',requireAuth: true }
                },
                {
                    // 合作仓审核
                    path: '/Cooperation',
                    component: resolve => require(['../components/page/Cooperation.vue'], resolve),
                    meta: {title: '合作仓审核',requireAuth: true}
                },
                {
                    // 预约管理
                    path: '/booking',
                    component: resolve => require(['../components/page/Booking.vue'], resolve),
                    meta: {title: '预约管理', requireAuth: true}
                },
                {
                    // 收藏管理
                    path: '/collect',
                    component:resolve => require(['../components/page/collect.vue'],resolve),
                    meta: {title: '收藏管理',requireAuth:true}
                },
                {
                    // 委托管理
                    path: '/Entrust',
                    component: resolve => require(['../components/page/Entrust.vue'],resolve),
                    meta: {title: '委托管理', requireAuth:true}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true,requireAuth: true }
                },
                {
                    // 权限管理
                    path: '/Jurisdiction',
                    component: resolve => require(['../components/page/Jurisdiction.vue'], resolve),
                    meta: {title: '权限管理',permission: true,requireAuth: true}
                },
                {
                    // 角色管理
                    path: '/role',
                    component: resolve => require(['../components/page/role.vue'],resolve),
                    meta: {title: '角色管理',permission: true,requireAuth: true}
                },
                {
                    // 用户管理
                    path: '/user',
                    component: resolve => require(['../components/page/user.vue'],resolve),
                    meta: {title: '用户管理',permission:true,requireAuth:true}
                },
                {
                    // 数据字典
                    path: '/dict',
                    component: resolve => require(['../components/page/dict.vue'],resolve),
                    meta: {title: '数据字典', permission: true,requireAuth:true}
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404',requireAuth: true }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403',requireAuth: true }
                },
                {
                    //轮播图
                    path: '/banner',
                    component: resolve => require(['../components/page/banner.vue'], resolve),
                    meta: { title: '轮播图',requireAuth: true }
                },
                {
                    //意见反馈
                    path: '/feedback',
                    component: resolve => require(['../components/page/feedback.vue'], resolve),
                    meta: { title: '意见反馈',requireAuth: true }
                },
                {
                    // 意见详情
                    path:'/feedDetail',
                    component: resolve => require(['../components/page/feedDetail'],resolve),
                    meta: {title: '意见详情',requireAuth: true}
                },
                {
                    // 面积
                    path:'/area',
                    component: resolve => require(['../components/page/area'],resolve),
                    meta: {title: '面积',requireAuth: true}
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
export default router





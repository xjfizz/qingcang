<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                :collapse="collapse"
                background-color="#324157"
                text-color="#bfcbd9"
                active-text-color="#20a0ff"
                unique-opened
                router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" v-if="menuList.indexOf(item.code) > -1">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem,i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                >{{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-if="menuList.indexOf(item.code) > -1">
                        <i :class="item.icon"></i>
                        <span slot="title" style="color: #ffffff">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from "../common/bus";
    import API from "../../api";

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: "el-icon-lx-home",
                        index: "dashboard",
                        title: "系统首页"
                    },
                    {
                        icon: "el-icon-user",
                        index: "table",
                        title: "客户管理",
                        code: "CUSTOM_MANAGE"
                    },
                    {
                        icon: "el-icon-house",
                        index: "9",
                        title: "仓库管理",
                        code: "WAREHOUSE_MANAGE",
                        subs: [
                            {
                                index: "tabs",
                                title: "仓库资料"
                            },
                            {
                                index: "Tabsadd",
                                title: "仓库添加"
                            },
                        ]
                    },
                    {
                        icon: "el-icon-pie-chart",
                        index: "charts",
                        title: "找仓审核"
                    },
                    {
                        icon: "el-icon-lx-global",
                        index: "booking",
                        title: "预约管理",
                        code: 'RESERVE_MANAGE'
                    },
                    {
                        icon: "el-icon-s-check",
                        index: "Entrust",
                        title: "委托管理",
                        code: "ENTRUST_MANAGE"
                    },
                    {
                        icon: "el-icon-collection",
                        index: "Jurisdiction",
                        title: "权限管理",
                        code: "AUTHORITY_MANAGE"
                    },
                    {
                        icon: "el-icon-s-custom",
                        index: "role",
                        title: "角色管理",
                        code: "ROLE_MANAGE"
                    },
                    {
                        icon: "el-icon-user-solid",
                        index: "user",
                        title: "用户管理",
                        code: "USER_MANAGE"
                    },
                    {
                        icon: "el-icon-receiving",
                        index: "dict",
                        title: "数据字典",
                        code: "DICTIONARY_MANAGE"
                    },
                    {
                        icon: "el-icon-lx-warn",
                        index: "7",
                        title: "错误处理",
                        subs: [
                            {
                                index: "permission",
                                title: "权限测试"
                            },
                            {
                                index: "404",
                                title: "错误处理"
                            }
                        ],
                    },
                    {
                        icon: "el-icon-picture-outline",
                        index: "banner",
                        title: "轮播图管理",
                        code: "BANNER_MANAGE"
                    },
                    {
                        icon: "el-icon-warning-outline",
                        index: "feedback",
                        title: "意见反馈",
                        code: "FEEDBACK_MANAGE"
                    },
                    {
                        icon: "el-icon-view",
                        index: "charts",
                        title: "找仓管理",
                        code: "LOOKING_MANAGE"
                    },
                    {
                        icon: "el-icon-menu",
                        index: "area",
                        title: "面积管理",
                        code: "AREA_MANAGE"
                    },
                ],
                menuList: [],
                menu: []
            };
        },
        mounted() {
            this.getUserInfo();
        },
        methods: {
            getUserInfo() {
                this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                this.menu = this.userInfo.authorityTree
                console.log("+++++", this.menu)
                this.getMenuPower();
            },
            // 递归获取菜单权限
            getMenuPower() {
                console.log('this.menu', this.menu)
                this.menuList = []
                this.menu.forEach(item => {
                    if (item.type == 'PAGE') {
                        this.menuList.push(item.code)
                    }
                })
                console.log('menuList-----', this.menuList)
            },
            // 获取权限列表
            query() {
                API.Role.getList().then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.authorities = res.data;
                    }
                });
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace("/", "");
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on("collapse", msg => {
                this.collapse = msg;
            });
        }
    };
</script>

<style scoped lang="less">
    @import "../../assets/icon/sideBar_icon.css";

    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>

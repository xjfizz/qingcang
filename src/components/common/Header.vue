<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
<!--      <i class="el-icon-menu"></i>-->
      <img class="sign" src="../../../public/logo.png" alt="">

    </div>
     <div class="logo">秦仓后台管理系统</div>
    <!-- <el-button type="warn" @click="change()">更改</el-button> -->
<!--    <router-link target="_blank" :to="{url:'http://192.168.1.153/swagger-ui.html#/'}">新页面打开home页</router-link>-->

    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
<!--        <div class="btn-bell">-->
<!--          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">-->
<!--            <router-link to="/tabs">-->
<!--              <i class="el-icon-bell"></i>-->
<!--            </router-link>-->
<!--          </el-tooltip>-->
<!--          <span class="btn-bell-badge" v-if="message"></span>-->
<!--        </div>-->
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{userInfo.nickname}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../../api";
import bus from "../common/bus";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfo: {},
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2,
    };
  },
  computed: {
    info() {
      return this.$store.state.test.info;
    }
  },
  created() {
    this.init();
  },

  methods: {
    //初始化
    init() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      console.log('userInfo', this.userInfo)
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
         API.Login.Quit();
        localStorage.removeItem("ms_username");
        sessionStorage.removeItem("token");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    // 测试store
    // change() {
    //     let info = this.info
    //     this.$store.dispatch('changeInfo')
    //     console.log('info', info)
    //     this.messageClose()
    // },
    // 弹框关闭
    messageClose() {
      console.log("关闭触发");
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
  // watch:{
  //     info: function () {
  //         console.log('变', this.info)
  //         this.val++
  //     }
  // }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
  .sign{
    margin-top: 20px;
    width: 30px;
    height: 30px;
  }
</style>

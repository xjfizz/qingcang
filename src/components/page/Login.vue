<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title login_title">
                <span class="login_title">
                    <img src="../../../public/logo.png" alt="" style="width: 25px;height: 25px">
                </span>
                <span class="login_title_name" >秦仓后台管理系统</span>
            </div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" @click="reset()">重置</el-button>
                        </el-col>
                    </el-row>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
                <div class="box clearfix">
                    <div class="rt">
                        <el-checkbox v-model="checked" style="color:#000000;">一周内记住密码</el-checkbox>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import API from '../../api';

    export default {
        data: function () {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                checked: false
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        API.Login.login({
                            username: this.ruleForm.username,
                            password: this.ruleForm.password,
                            rememberMe: this.checked
                        }).then((res) => {
                            console.log('res', res)
                            // this.tableData = res.list;
                            if (res.success) {
                                sessionStorage.setItem('token', 'true')
                                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                                // localStorage.setItem('userInfo',this.ruleForm.username);
                                localStorage.setItem('ms_username', JSON.stringify(this.ruleForm.username));

                                this.$router.push('/dashboard');
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '用户名或密码错误!'
                                })
                            }
                        })
                        // if( this.ruleForm.username === 'admin' && this.ruleForm.password === '123' ) {
                        //     sessionStorage.setItem('token', 'true')
                        //     localStorage.setItem('ms_username',this.ruleForm.username);
                        //     this.$router.push('/dashboard');
                        // } else {
                        //     this.$message({
                        //         type: 'error',
                        //         message: '用户名或密码错误!'
                        //     })
                        // }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 重置密码
            reset() {
                if (this.ruleForm) {
                    this.ruleForm.username = ''
                    this.ruleForm.password = ''
                }
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url("http://demo.open.renren.io/renren-fast/1909041233/static/img/login_bg.144e19d.jpg"); /*url(../../assets/img/login-bg.jpg);*/
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 20px;
        color: #ffffff;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #060606;
    }
    .login_title{
       display: flex;
        justify-content: center;
        align-items: center
    }
    .login_title_name{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;

    }
</style>

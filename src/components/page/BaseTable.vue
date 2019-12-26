<template>
    <div class="main">
        <!--        <div class="crumbs">-->
        <!--            <el-breadcrumb separator="/">-->
        <!--                <el-breadcrumb-item>-->
        <!--                    <i class="el-icon-lx-cascades"></i> 客户表格-->
        <!--                </el-breadcrumb-item>-->
        <!--            </el-breadcrumb>-->
        <!--        </div>-->
        <el-input
                placeholder="请输入搜索手机号"
                v-model="input"
                clearable
                style="width:200px;hight:36px"
        ></el-input>&nbsp;
        <el-button type="primary" @click="doFilter">查找</el-button>
        <el-button
                type="primary"
                @click="dialogFormVisibles = true"
                plain
                style="margin-bottom:20px;margin-right:50px;float:right"
        >添加
        </el-button>
        <div class="table">
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
            >
                <!-- 展开行 -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="注册时间：" style="width:45%">
                                <!--                                <span>{{ props.row.regTime }}</span>-->
                                <span>{{props.row.regTime ? props.row.regTime : '无'}}</span>
                            </el-form-item>
                            <el-form-item label="公司地址：" style="width:45%">
                                <!--                                <span>{{ props.row.companyAddress }}</span>-->
                                <span>{{props.row.companyAddress ? props.row.companyAddress : '无'}}</span>
                            </el-form-item>
                            <el-form-item label="QQ：" style="width:45%">
                                <!--                                <span>{{ props.row.qq }}</span>-->
                                <span>{{props.row.qq ? props.row.qq : '无'}}</span>
                            </el-form-item>
                            <el-form-item label="微信ID：" style="width:45%">
                                <!--                                <span>{{ props.row.openId }}</span>-->
                                <span>{{props.row.openId ? props.row.openId : '无'}}</span>
                            </el-form-item>
                            <el-form-item label="微信昵称：" style="width:45%">
                                <!--                                <span>{{ props.row.nickname }}</span>-->
                                <span>{{props.row.nickname ? props.row.nickname : '无'}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- 结束 -->
                <!--                <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column type="index" label="#" width="50px"></el-table-column>
                <el-table-column prop="customId" label="用户ID" width="280px"></el-table-column>
                <el-table-column prop="tel" label="手机号" width="120px">
                    <template slot-scope="scope">
                        <span>{{scope.row.tel ? scope.row.tel : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="100px">
                    <template slot-scope="scope">
                        <span>{{scope.row.name ? scope.row.name : '无'}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="email" label="邮箱" width="150px">
                    <template slot-scope="scope">
                        <span>{{scope.row.email ? scope.row.email : '无'}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="qq" label="QQ号" >
                </el-table-column>-->
                <el-table-column prop="company" label="公司">
                    <template slot-scope="scope">
                        <span>{{scope.row.company ? scope.row.company : '无'}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="companyAddress" label="公司地址">
                </el-table-column>-->
                <!-- <el-table-column prop="regTime" label="注册时间" >
                </el-table-column>-->
                <el-table-column prop="lastLoginTime" label="最近登陆时间" width="140">
                    <template slot-scope="scope">
                        <span>{{scope.row.lastLoginTime ? scope.row.lastLoginTime : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="最近登陆位置" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.address ? scope.row.address : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="authStatus" label="认证状态" width="70px">
                    <template slot-scope="scope">
<!--                        <span>{{scope.row.authStatus === false ? "未认证" : "已认证"}}</span>-->
                        <span v-if="scope.row.authStatus == '1'"> 已认证</span>
                        <span v-else >未认证</span>
                    </template>
                </el-table-column>
                <el-table-column prop="loginCount" label="访问次数" width="70px"></el-table-column>
                <!-- <el-table-column prop="openId" label="微信ID">
                </el-table-column>-->
                <el-table-column label="操作" width="200px" align="center">
                    <template slot-scope="scope">
                        <!-- <el-switch
                          v-model="scope.row.authStatus"
                          active-value="false"
                          inactive-value="true"
                          active-text="未认证"
                          inactive-text="已认证"
                          style="margin-right: 30px"
                          @change="assessor(scope.row)"
                        ></el-switch>-->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="handleEdit(scope.row)"></el-button>
                        <el-button
                                type="primary"
                                icon="el-icon-delete"
                                class="red"
                                size="mini"
                                @click="removes(scope.row)"
                        >
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageInfo.page"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageInfo.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageInfo.total">
                </el-pagination>
            </div>
            <!-- 编辑 -->
            <el-dialog title="编辑" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="姓名：" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" :label-width="formLabelWidth">
                        <el-input v-model="form.tel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" :label-width="formLabelWidth">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公司：" :label-width="formLabelWidth">
                        <el-input v-model="form.company" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址：" :label-width="formLabelWidth">
                        <el-input v-model="form.companyAddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="微信号：" :label-width="formLabelWidth">
                        <el-input v-model="form.openId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="微信昵称：" :label-width="formLabelWidth">
                        <el-input v-model="form.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ：" :label-width="formLabelWidth">
                        <el-input v-model="form.qq" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="认证状态" :label-width="formLabelWidth">
                        <el-select v-model="form.authStatus" placeholder="请选择状态">
                            <el-option label="未认证" value="2"></el-option>
                            <el-option label="已认证" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="compile">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 添加 -->
            <el-dialog title="添加" :visible.sync="dialogFormVisibles">
                <el-form :model="forms">
                    <el-form-item label="姓名：" :label-width="formLabelWidth">
                        <el-input v-model="forms.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" :label-width="formLabelWidth">
                        <el-input v-model="forms.tel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" :label-width="formLabelWidth">
                        <el-input v-model="forms.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名：" :label-width="formLabelWidth">
                        <el-input v-model="forms.company" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址：" :label-width="formLabelWidth">
                        <el-input v-model="forms.companyAddress" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="微信号：" :label-width="formLabelWidth">
                        <el-input v-model="forms.openId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="微信昵称：" :label-width="formLabelWidth">
                        <el-input v-model="forms.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ：" :label-width="formLabelWidth">
                        <el-input v-model="forms.qq" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="认证状态" :label-width="formLabelWidth">
                        <el-select v-model="forms.authStatus" placeholder="请选择状态">
                            <el-option label="未认证" value="2"></el-option>
                            <el-option label="已认证" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibles = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import API from "../../api";
    import {utilt} from "../../components/common/utilt";
    import list from "../../utils/dataConfig/testList";

    export default {
        name: "basetable",
        components: {},
        data() {
            return {
                // 分页
                count: 0,
                page: 1,
                tableData: [],
                multipleSelection: [],
                tableDataName: "",
                input: '',
                dialogFormVisibles: false,
                dialogFormVisible: false,
                form: {
                    name: "",
                    tel: "",
                    email: "",
                    company: "",
                    companyAddress: "",
                    openId: "",
                    nickname: "",
                    qq: "",
                    authStatus: false
                },
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                forms: {},
                formLabelWidth: "120px"
            };
        },
        created() {
            this.init();
        },
        computed: {},
        filters: {},
        methods: {
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.querys();
            },
            // 初始化
            init() {
                this.getList();
            },
            // 搜索
            doFilter() {
                // if(this.tableDataName == '') {
                //   this.$message.warning("条件不能为空");
                //   return;
                // }
                this.pageInfo.page = 1;
                this.getList()

            },
            // 获取列表
            getList() {
                const params = {
                    page: 0,
                    // key: this.input || '',
                    // qq: this.input || '',
                    name: this.name || '',
                    company: this.company || '',
                    tel: this.input || '',
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                this.page = this.page - 1;
                API.Table.getCustomList(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        res.data.rows.forEach(item => {
                            item.authStatus = String( item.authStatus)
                        })
                        this.tableData = res.data.rows;
                        this.pageInfo.total = res.data.total
                    } else {
                        this.$message({
                            type: "warn",
                            message: res.message
                        });
                    }
                    this.count = res.data.rows.length;
                });
            },

            // 编辑
            handleEdit(row) {
                this.dialogFormVisible = true;
                this.form = row;
            },
            compile() {
                if (this.form.authStatus) {
                    this.form.authStatus = Number(this.form.authStatus)
                }
                API.Table.redact(this.form).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.dialogFormVisible = false;
                        this.getList();
                    } else {
                        this.$message({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },

            // 添加
            add() {
                if (this.forms.authStatus) {
                    this.forms.authStatus = Number(this.forms.authStatus)
                }
                API.Table.addition(this.forms).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.dialogFormVisibles = false;
                        this.getList();
                    } else {
                        this.$message({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },
            // 删除
            removes(row) {
                this.$confirm('是否将其永久删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.remove(row)
                }).catch(() => {
                });
            },
            remove(row) {
                let obj = {id: row.customId};
                console.log(obj);
                API.Table.deletes(obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.getList();
                    } else {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },
            // 认证状态
            // assessor(row) {
            //   console.log("row", row.authStatus);
            //   console.log("row--", row);
            //   let params = {
            //     id: row.id,
            //     authStatus: row.authStatus
            //   };
            //   API.Table.redact(params).then(res => {
            //     console.log(res);
            //     if (res.data.authStatus == false) {
            //       this.$message.error("取消认证");
            //     } else if (res.data.authStatus == true) {
            //       this.$message.success("认证成功 ");
            //     } else {
            //       this.$message.error("认证出错");
            //     }
            //   });
            // },
            // 表格多选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //  分页
            handleSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.pageInfo.page = val
                this.getList()
            },
        }
    };
</script>

<style scoped>
</style>

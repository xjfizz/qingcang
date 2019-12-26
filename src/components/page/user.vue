<template>
    <div>
        <template>
            <el-input placeholder="请输入用户名" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
            <el-input placeholder="请输入昵称" v-model="inputs" clearable style="width:200px;hight:36px"></el-input>&nbsp;
            <el-button type="primary" @click="doFilter">查找</el-button>
            <el-button
                    type="primary"
                    plain
                    style="margin-bottom:10px;margin-right:50px;float:right"
                    @click="add"
            >添加
            </el-button>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="nickname" label="昵称"></el-table-column>
                <el-table-column prop="roles" label="角色">
                    <template slot-scope="scope">
                        <span v-for="item in scope.row.roles">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="editF(scope.row)"
                                   size="mini"></el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="removes(scope.row)"
                                   size="mini"></el-button>
                        <!--                        <el-button type="primary" icon="el-icon-menu" @click="redact(scope.row)"-->
                        <!--                                   size="mini"></el-button>-->
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
        </template>
        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisibleF" width="500px">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input placeholder="更改密码" show-password v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名" :label-width="formLabelWidth">
                    <!--                    <span>{{item.roleId}}</span>-->
                    <!--                    <el-input v-model="item.name" autocomplete="off"></el-input>-->
                    <el-select v-model="form.roles" placeholder="请选择">
                        <el-option
                                v-for="item in roleList"
                                :key="item.roleId"
                                :label="item.name"
                                :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleF = false">取 消</el-button>
                <el-button type="primary" @click="complice">确 定</el-button>
            </div>
        </el-dialog>
        <!--        <el-dialog title="编辑子" :visible.sync="dialogFormVisible">-->
        <!--            <el-table :data="childrenData">-->
        <!--                <el-table-column property="name" label="角色名" width="150"></el-table-column>-->
        <!--                <el-table-column property="roleId" label="角色Id"></el-table-column>-->
        <!--                <el-table-column property="createTime" label="创建时间"></el-table-column>-->
        <!--                <el-table-column label="操作">-->
        <!--                    <template slot-scope="scope">-->
        <!--                        <el-button type="primary" icon="el-icon-edit" @click="editS(scope.row)"-->
        <!--                                   size="mini"></el-button>-->
        <!--                        <el-button type="primary" icon="el-icon-delete" @click="remove(scope.row)"-->
        <!--                                   size="mini"></el-button>-->
        <!--                    </template>-->
        <!--                </el-table-column>-->
        <!--            </el-table>-->
        <!--        </el-dialog>-->
        <!--      编辑子级-->
        <!--        <el-dialog title="编辑角色名" :visible.sync="dialogFormVisiblez" width="500px">-->
        <!--            <el-form :model="formz">-->
        <!--                <el-form-item label="角色名" :label-width="formLabelWidth" label-width="60px">-->
        <!--                    <el-input v-model="formz.name" autocomplete="off"></el-input>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="dialogFormVisiblez = false">取 消</el-button>-->
        <!--                <el-button type="primary" @click="compliceSon">确 定</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->
        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisibles" width="500px">
            <el-form :model="forms">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="forms.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="forms.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input placeholder="请输入密码" show-password v-model="forms.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择角色" :label-width="formLabelWidth">
                    <el-select  v-model="forms.roles" placeholder="请选择角色">
                        <el-option
                                v-for="item in roleList"
                                :key="item.roleId"
                                :label="item.name"
                                :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="append">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import API from "../../api";

    export default {
        data() {
            return {
                // 分页
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                input: "",
                inputs: "",
                tableData: [],
                dialogFormVisible: false,
                dialogFormVisibles: false,
                dialogFormVisibleF: false,
                dialogFormVisiblez: false,

                form: {
                    userId: "",
                    username: "",
                    nickname: "",
                    roles: []
                },
                forms: {
                    // userId: "",
                    username: "",
                    nickname: "",
                    password: "",
                    roles: ''
                },
                formz: {
                    name: ''
                },
                formLabelWidth: "120px",
                childrenData: [],
                roleList: []
            };
        },
        methods: {
            // 分页
            handleSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.pageInfo.page = val
                this.getList()
            },
            //初始化
            init() {
                this.getRole();
            },
            // 搜索
            doFilter() {
                this.pageInfo.page = 1,
                this.getList();
            },
            // 获取用户列表
            getList() {
                const params = {
                    page: 0,
                    username: this.input || "",
                    nickname: this.inputs || "",
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.User.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.tableData = res.data.rows;
                        this.pageInfo.total = res.data.total
                        this.tableData = res.data.rows;
                    } else {
                        this.$message.warning({
                            type: 'warn',
                            message: res.message
                        })
                    }
                    this.count = res.data.rows.length
                });
            },
            // 编辑
            redact(row) {
                console.log(row)
                this.dialogFormVisible = true;
                this.childrenData = JSON.parse(JSON.stringify(row.roles))
                /* this.form = {
                     userId: row.userId,
                     username: row.username,
                     nickname: row.nickname,
                     roles: row.roles.name
                 };*/
            },
            // 父级编辑
            editF(row) {
                console.log(row)
                this.dialogFormVisibleF = true;
                let name = ''
                if(row.roles.length == 0) {
                    name = ''
                } else {
                    name =   row.roles[0].name
                }
                this.form = {
                    userId: row.userId,
                    username: row.username,
                    nickname: row.nickname,
                    roles: name || ''
                };
            },
            complice() {
                let options = JSON.parse(JSON.stringify(this.form))
                let roles = {}
                this.roleList.forEach(item => {
                    if (item.roleId === options.roles) {
                        roles.name = item.name
                        roles.roleId = item.roleId
                    }
                })
                let params = {
                    userId: this.form.userId || '',
                    nickname: options.nickname,
                    password: options.password,
                    roles: [roles]
                }

                console.log(this.form);
                API.User.redact(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.dialogFormVisibleF = false;
                        this.getList();
                    } else {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },
            //子级编辑
            editS(row) {
                console.log(row);
                this.dialogFormVisiblez = true;
                this.formz = this.childrenData[0]
            },
            compliceSon() {
                let params = {
                    roleId: this.formz.roleId,
                    name: this.formz.name
                }
                console.log(params);
                API.User.redact(params).then(res => {
                    console.log(res);
                })
            },

            // 添加
            add() {
                this.dialogFormVisibles = true;
            },
            append() {
                console.log(this.forms)
                let options = JSON.parse(JSON.stringify(this.forms))
                let roles = {}
                this.roleList.forEach(item => {
                    if (item.roleId === options.roles) {
                        roles.name = item.name
                        roles.roleId = item.roleId
                    }
                })
                let params = {
                    userId: this.form.userId || '',
                    username: options.username,
                    nickname: options.nickname,
                    password: options.password,
                    roles: [roles]
                }
                console.log(params)
                API.User.addition(params).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.dialogFormVisibles = false;
                        this.getList();
                    } else {
                        this.$message.success({
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
                let obj = {userId: row.userId};
                API.User.deletes(obj).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                    } else {
                        this.$message.error({
                            type: "warn",
                            message: res.message
                        });
                    }
                    this.getList();
                });
            },
            //    获取角色
            getRole() {
                API.User.getRoles().then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.roleList = res.data.rows
                        console.log(this.roleList)
                    }
                })
            }
        },
        created() {
            this.getList();
            this.init();
        }
    };
</script>

<style>
</style>
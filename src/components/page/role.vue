<template>
    <div>
        <el-input placeholder="请输入名称号" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <el-button type="primary" @click="doFilter">查找</el-button>
        <el-button
                type="primary"
                plain
                style="margin-bottom:10px;margin-right:50px;float:right"
                @click="add"
        >添加
        </el-button>
            <template>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="角色名称" width="260px"></el-table-column>
                    <el-table-column prop="authorities" label="权限">
                        <template slot-scope="scope">
                            <span v-for="item in scope.row.authorities">{{item.name}},</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="260px"></el-table-column>
                    <el-table-column prop label="操作" width="260px" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" @click="redact(scope.row)"
                                       size="mini"></el-button>
                            <el-button
                                    type="primary"
                                    icon="el-icon-delete"
                                    @click="removes(scope.row)"
                                    size="mini"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        <!--分页-->
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
        <el-dialog title="编辑角色" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form">
                <el-form-item label="角色名称" :label-width="formLabelWidth" label-width="80px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth" label-width="50px">
                    <el-tree
                            :data="authorities"
                            show-checkbox
                            default-expand-all
                            node-key="authorityId"
                            :default-checked-keys="editHaveSelectData"
                            ref="treeEdit"
                            highlight-current
                            :props="defaultProps"
                            @check-change="getTreeSelectDataEdit"
                    ></el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog title="添加角色" :visible.sync="dialogFormVisibles" width="500px">
            <el-form :model="forms">
                <el-form-item label="角色名称" :label-width="formLabelWidth" label-width="80px">
                    <el-input v-model="forms.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth" label-width="50px">
                    <el-tree
                            :data="authorities"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            ref="tree"
                            highlight-current
                            :props="defaultProps"
                            @check-change="getTreeSelectData"
                    ></el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import API from "../../api";

    export default {
        data() {
            return {
                //分页
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                input: "",
                tableData: [],
                userInfo: {},
                dialogFormVisible: false,
                dialogFormVisibles: false,
                form: {
                    name: "",
                    selectedTree: []
                },
                forms: {
                    name: "",
                    selectedTree: []
                },
                formLabelWidth: "120px",
                textarea2: "",
                // 树形图
                authorities: [
                    {
                        id: "111",
                        label: "",
                        children: [
                            {
                                id: "222",
                                label: "",
                                children: [
                                    {
                                        id: "333",
                                        label: ""
                                    },
                                    {
                                        id: "444",
                                        label: ""
                                    }
                                ]
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: "children",
                    label: "name"
                },
                editHaveSelectData: [] // 编辑树的赋值
            };
        },
        methods: {
            //初始化
            init() {
                this.userInfo = JSON.parse(localStorage.getItem("ms_username"));
                this.getPowerTreeList();
                console.log("userInfo", this.userInfo);
            },
            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getList()
            },
            // 搜索
            doFilter() {
                this.pageInfo.page = 1,
                    this.getList();
            },
            // 获取列表
            getList() {
                const params = {
                    search: this.input || "",
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.Role.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.pageInfo.total = res.data.total
                        this.tableData = res.data.rows;
                    } else {
                        this.$message.warning({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },
            // 编辑
            redact(row) {
                console.log(row);
                this.dialogFormVisible = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.editHaveSelectData = this.form.authorities.map(item => {
                    return item.authorityId;
                });
                console.log("this.editHaveSelectData", this.editHaveSelectData);
            },
            editSubmit() {
                let authorities = this.form.selectedTree.map(item => {
                    return {authorityId: item.authorityId, name: item.name};
                });
                let params = {
                    authorities: authorities || [],
                    createTime: this.form.createTime || "",
                    name: this.form.name || "",
                    roleId: this.form.roleId || ""
                };
                console.log("params", params);
                API.Role.redact(params).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.dialogFormVisible = false;
                        this.getList();
                    } else {
                        this.$message.warning({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },
            // 添加
            add() {
                this.dialogFormVisibles = true;
            },
            addSubmit() {
                let authorities = this.forms.selectedTree.map(item => {
                    return {authorityId: item.authorityId, name: item.name};
                });
                let params = {
                    name: this.forms.name,
                    authorities: authorities || []
                };
                API.Role.addition(params).then(res => {
                    console.log(res);
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

            //删除
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
                console.log(row);
                const obj = {id: row.roleId};
                API.Role.deletes(obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                    } else {
                        this.$message.warning({
                            type: "warn",
                            message: res.message
                        });
                    }
                    this.getList();
                });
            },

            // 树形图
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([
                    {
                        id: 5,
                        label: "二级 2-1"
                    },
                    {
                        id: 9,
                        label: "三级 1-1-1"
                    }
                ]);
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },

            // 获取权限树列表
            getPowerTreeList() {
                API.Role.getTreeList().then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.authorities = res.data;
                    }
                });
            },
            getTreeSelectData() {
                const data = this.$refs.tree.getCheckedNodes();
                this.forms.selectedTree = data;
                console.log(data);
            },
            getTreeSelectDataEdit() {
                const data = this.$refs.treeEdit.getCheckedNodes();
                this.form.selectedTree = data;
                console.log(data);
            }
        },
        created() {
            this.init();
            this.getList();
        }
    };
</script>

<style>
</style>
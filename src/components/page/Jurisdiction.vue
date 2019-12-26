<template>
    <div>
        <el-button type="primary" plain style="margin-bottom:10px;margin-right:50px;float:right" @click="addPower()">
            添加
        </el-button>
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="name"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 'ACTION' ">操作</span>
                    <span v-else-if="scope.row.type == 'PAGE' ">页面</span>
                    <span v-else="scope.row.type == 'MENU' ">菜单</span>

                </template>
            </el-table-column>
            <el-table-column prop label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="redact(scope.row)" size="mini"></el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="add(scope.row)" size="mini"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="removes(scope.row)" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth" label-width="50px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="编码" :label-width="formLabelWidth" label-width="50px">
                    <el-input v-model="form.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth" label-width="50px">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="3">菜单</el-radio>
                        <el-radio :label="6">页面</el-radio>
                        <el-radio :label="9">操作</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="compile">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisibles" width="400px">
            <el-form :model="forms">
                <el-form-item label="名称" :label-width="formLabelWidth" label-width="50px">
                    <el-input v-model="forms.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="编码" :label-width="formLabelWidth" label-width="50px">
                    <el-input v-model="forms.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth" label-width="50px">
                    <el-radio-group v-model="forms.type">
                        <el-radio :label="3">菜单</el-radio>
                        <el-radio :label="6">页面</el-radio>
                        <el-radio :label="9">操作</el-radio>
                    </el-radio-group>
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
                tableData: [],
                dialogFormVisible: false,
                dialogFormVisibles: false,

                // 编辑
                type: "",
                radio: "",
                form: {
                    name: "",
                    code: "",
                    type: ""
                },
                formLabelWidth: "120px",
                // 添加
                type: "",
                forms: {
                    name: "",
                    code: "",
                    type: ""
                },
                addForm: {}
            };
        },
        methods: {
            load(tree, treeNode, resolve) {
                setTimeout(() => {
                    resolve([
                        {
                            name: "",
                            code: "",
                            type: ""
                        }
                    ]);
                }, 1000);
            },

            // 列表
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
            // 获取列表
            getList() {
                const params = {
                    page: 0,
                    key: ""
                };
                API.jurisdiction.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.tableData = res.data;
                    }
                });
            },
            // 编辑
            redact(row) {
                console.log(row);
                let options = JSON.parse(JSON.stringify(row));
                //  row.type = Number(row.type);
                switch (row.type) {
                    case "MENU":
                        options.type = 3;
                        break;
                    case "PAGE":
                        options.type = 6;
                        break;
                    case "ACTION":
                        options.type = 9;
                        break;
                }
                this.dialogFormVisible = true;
                this.form = options;
                console.log(this.form);
            },
            compile() {
                let options = JSON.parse(JSON.stringify(this.form));
                console.log(options);
                switch (this.form.type) {
                    case 3:
                        options.type = "MENU";
                        break;
                    case 6:
                        options.type = "PAGE";
                        break;
                    case 9:
                        options.type = "ACTION";
                        break;
                }
                let params = {
                    authorityId: options.authorityId || '',
                    code: options.code || '',
                    name: options.name || '',
                    parentId: options.parentId || '',
                    type: options.type || '',
                }
                if (params.parentId == '') {
                    params.parentId = null
                }
                API.jurisdiction.redact(params).then(res => {
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
                    this.dialogFormVisible = false;
                    this.getList();
                });
            },
            // 添加
            add(row) {
                if(this.forms != ''){
                    this.forms.name = ''
                    this.forms.code = ''
                    this.forms.type = ''
                }
                if (row) {
                    this.addForm = row
                }
                this.dialogFormVisibles = true;
            },
            addPower() {
                this.addForm.authorityId = null
                this.dialogFormVisibles = true;
            },
            append() {
                let options = JSON.parse(JSON.stringify(this.forms));
                options.parentId = this.addForm.authorityId
                switch (this.forms.type) {
                    case 3:
                        options.type = "MENU";
                        break;
                    case 6:
                        options.type = "PAGE";
                        break;
                    case 9:
                        options.type = "ACTION";
                        break;
                }
                API.jurisdiction.addition(options).then(res => {
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
                    this.dialogFormVisibles = false;
                    this.getList();
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
                let obj = {id: row.authorityId};
                console.log(obj);
                API.jurisdiction.deletes(obj).then(res => {
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
            }
        },
        created() {
            this.getList();
        }
    };
</script>

<style lang="less">
    .tab_sty{
        text-align: center;
    }
</style>
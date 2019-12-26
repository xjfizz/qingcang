<template>
    <div>
        <el-input placeholder="请输入字典名" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <el-input placeholder="请输入字典值" v-model="inputs" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <el-button type="primary" @click="doFilter">查找</el-button>
        <el-button
                type="primary"
                plain
                style="margin:0px 50px 10px 10px;float:right"
                @click="addPower"
        >添加
        </el-button>
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="name"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
            <!-- <el-table-column prop="dictionaryId" label="字典ID" sortable width="90px"></el-table-column> -->
            <el-table-column prop="name" label="字典名称" sortable></el-table-column>
            <el-table-column prop="value" label="字典值">
            </el-table-column>
            <el-table-column prop label="操作" width="200px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="redacts(scope.row)" size="mini"></el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="add(scope.row)" size="mini"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="removes(scope.row)" size="mini"></el-button>
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
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form">
                <el-form-item label="字典名称" :label-width="formLabelWidth" label-width="70px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典值" :label-width="formLabelWidth" label-width="70px">
                    <el-input v-model="form.value" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="complice">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisibles" width="500px">
            <el-form :model="forms">
                <el-form-item label="字典名称" :label-width="formLabelWidth" label-width="70px">
                    <el-input v-model="forms.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典值" :label-width="formLabelWidth" label-width="70px">
                    <el-input v-model="forms.value" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
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
                form: {
                    name: "",
                    value: "",
                    detail: ""
                },
                formLabelWidth: "120px",
                dialogFormVisibles: false,
                forms: {
                    name: "",
                    value: "",
                    detail: ""
                },
                addForm: {},
            };
        },
        methods: {
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
            // 获取
            getList() {
                let params = {
                    name: this.input || "",
                    value: this.inputs || "",
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.Dict.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.pageInfo.total = res.data.total
                        this.tableData = res.data.rows;
                    } else {
                        this.$message.warning({
                            type: 'warn',
                            message: res.message
                        })
                    }
                });
            },
            // 编辑
            redacts(row) {
                this.dialogFormVisible = true;
                this.form = row;
            },
            complice() {
                API.Dict.redact(this.form).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.getList();
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },
            // 添加
            add(row) {
                if (this.forms != '') {
                    this.forms.name = ''
                    this.forms.value = ''
                }
                console.log(row)
                if (row) {
                    this.addForm = row
                }
                this.dialogFormVisibles = true;
            },
            addPower() {
                this.addForm.dictionaryId = null;
                this.dialogFormVisibles = true;
            },
            append() {
                let options = JSON.parse(JSON.stringify(this.forms));
                options.parentId = this.addForm.dictionaryId;
                API.Dict.addition(options).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        (this.dialogFormVisibles = false), this.getList();
                    } else {
                        this.$message.warning({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
                this.forms = ''
                this.getList();
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
                let obj = {id: row.dictionaryId};
                API.Dict.deletes(obj).then(res => {
                    console.log(res);
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
            //    取消
            cancel() {
                this.dialogFormVisibles = false
                this.forms = ''
            }
        },
        created() {
            this.getList();
        }
    };
</script>

<style>
</style>
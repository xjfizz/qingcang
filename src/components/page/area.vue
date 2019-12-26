<template>
    <div>
        <el-button
                type="primary"
                plain
                style="margin:10px 50px 10px 10px;float:right"
                @click="addPower()"
        >添加
        </el-button>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="scId"
                    label="id"
            >
            </el-table-column>
            <el-table-column
                    prop="label"
                    label="条件"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.label ? scope.row.label : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="space"
                    label="面积">
                <template slot-scope="scope">
                    <span>{{scope.row.space ? scope.row.space : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop label="操作" width="200px" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="compile(scope.row)" size="mini"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="removes(scope.row)" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--        编辑-->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form">
                <!--                <el-form-item label="条件" :label-width="formLabelWidth">-->
                <!--                    <el-input v-model="form.label" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="面积" :label-width="formLabelWidth">
                    <el-input type="number" v-model="form.space" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="redact">确 定</el-button>
            </div>
        </el-dialog>
        <!--        添加-->
        <el-dialog title="添加" :visible.sync="dialogFormVisibles" width="500px">
            <el-form :model="forms">
                <!--                <el-form-item label="条件" :label-width="formLabelWidth">-->
                <!--                    <el-input v-model="form.label" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item label="面积" :label-width="formLabelWidth">
                    <el-input type="number" v-model="forms.space" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
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
                form: {
                    space: '',
                    label: '',
                },
                forms: {
                    space: '',
                    label: '',
                },
                formLabelWidth: '50px'
            }
        },
        created() {
            this.init()
        },
        methods: {

            init() {
                this.getArea();
            },
            getArea() {
                const params = {
                    page: 0,
                    etNo: this.inputs || "",
                    contTel: this.input || "",
                };
                API.Area.query(params).then(res => {
                    console.log(res);
                    this.tableData = res.data
                })
            },
            compile(row) {
                this.dialogFormVisible = !this.dialogFormVisible;
                this.form = row
            },
            redact() {
                let params = {
                    scId: this.form.scId || '',
                    space: this.form.space || 0
                }

                API.Area.redact(params).then(res => {
                    this.dialogFormVisible = !this.dialogFormVisible;
                    if (res.code === 200) {
                        this.$message.success(res.message)
                    }
                })
            },
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
            // 删除
            remove(row) {
                let params = {
                    id: row.scId || '',
                }
                API.Area.deletes(params).then(res => {
                    if (res.code === 200) {
                        this.getArea()
                        this.$message.success(res.message)
                    }
                })
            },
            //    添加
            addPower() {
                this.dialogFormVisibles = !this.dialogFormVisibles;
            },
            add() {
                let params = {
                    space: this.forms.space || 0
                }

                API.Area.add(params).then(res => {
                    this.dialogFormVisibles = !this.dialogFormVisibles;
                    if (res.code === 200) {
                        this.$message.success({
                            type:'warn',
                            message:res.message,
                        })
                        this.forms = {}
                        this.getArea()
                        this.$message.success(res.message)
                    } else{
                        this.$message.warning({
                            type:'warn',
                            message:res.message,
                        })
                    }
                })
            },

        },


    }
</script>

<style scoped>

</style>
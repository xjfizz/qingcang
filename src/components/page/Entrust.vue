<template>
    <div>
        <template>
            <el-input placeholder="请输入联系电话" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
            <el-input placeholder="请输入委托单号" v-model="inputs" clearable style="width:200px;hight:36px"></el-input>&nbsp;
            <el-button type="primary" @click="doFilter" style="margin-bottom:10px;">查找</el-button>
            <!-- <el-button
              type="primary"
              plain
              style="margin:10px;margin-right:50px;float:right"
              @click="add"
            >添加</el-button>-->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="contTel" label="联系人电话">
                    <template slot-scope="scope">
                        <span>{{scope.row.contTel ? scope.row.contTel : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.createTime ? scope.row.createTime : '无'}}</span>
                    </template>
                </el-table-column>
                <!--                <el-table-column prop="customId" label="客户ID"></el-table-column>-->
                <el-table-column prop="endRentDate" label="租赁结束时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.endRentDate ? scope.row.endRentDate : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="etNo" label="委托单号">
                    <template slot-scope="scope">
                        <span>{{scope.row.etNo ? scope.row.etNo : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="processed" label="是否处理">
                    <template slot-scope="scope">
                        <span v-if="scope.row.processed">是 </span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                    <template slot-scope="scope">
                        <span>{{scope.row.remarks ? scope.row.remarks : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="service" label="服务类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.service ? scope.row.service : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="space" label="面积">
                    <template slot-scope="scope">
                        <span>{{scope.row.space ? scope.row.space : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="startRentDate" label="租赁开始时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.startRentDate ? scope.row.startRentDate : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="委托类型">
                    <template slot-scope="scope">
                        <!--                        <span>{{scope.row.type ? scope.row.type : '无'}}</span>-->
                        <span v-if="scope.row.type == 'BUSINESS' ">委托招商</span>
                        <span v-else-if="scope.row.type == 'MANAGE' ">委托园区管理</span>
                        <span v-else="scope.row.type == 'COOP' ">成为合作社</span>
                    </template>
                </el-table-column>
                <el-table-column prop="whRegion" label="区域">
                    <template slot-scope="scope">
                        <span>{{scope.row.whRegion ? scope.row.whRegion : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="redact(scope.row)"
                                   size="mini"></el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="removes(scope.row)"
                                   size="mini"></el-button>
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
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="联系人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.contTel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" :label-width="formLabelWidth">
                    <!--                    <el-input v-model="form.service" autocomplete="off"></el-input>-->
                    <el-checkbox-group v-model="serviceValue" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(item,index) in serviceList" :label="item" :key="index">{{item}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="面积" :label-width="formLabelWidth">
                    <el-input v-model="form.space" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="委托类型" :label-width="formLabelWidth">
                    <!--                    <el-input v-model="form.type" autocomplete="off"></el-input>-->
                    <el-radio-group v-model="form.type">
                        <el-radio label="BUSINESS">委托招商</el-radio>
                        <el-radio label="MANAGE">委托园区管理</el-radio>
                        <el-radio label="COOP">成为合作社</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否处理" :label-width="formLabelWidth">
                    <el-select v-model="form.processed" placeholder="请选择">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
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
                input: '',
                inputs: '',
                dialogFormVisible: false,
                form: {},
                formLabelWidth: "120px",
                tableData: [],
                // 分页
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                serviceList: [
                    '仓库租赁',
                    '仓配一体服务',
                    '电商服务'
                ],
                serviceValue: []

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
            // 搜索
            doFilter() {
                this.pageInfo.page = 1,
                this.getList();
            },
            // 获取委托列表
            getList() {
                const params = {
                    page: 0,
                    etNo: this.inputs || "",
                    contTel: this.input || "",
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.Entrust.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.tableData = res.data.rows;
                        this.pageInfo.total = res.data.total
                    }

                });
            },
            //编辑
            redact(row) {
                console.log(row)
                if (row.service !== '') {
                    this.serviceValue = row.service.split(',')
                }
                this.dialogFormVisible = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.form.processed = String(this.form.processed)
            },
            append() {
                console.log(this.serviceValue)
                this.form.service = this.serviceValue.join(',')
                let params = {
                    etId: this.form.etId,
                    contTel: this.form.contTel,
                    service: this.form.service,
                    space: this.form.space,
                    type: this.form.type,
                    processed: this.form.processed,
                };
                console.log(params);
                API.Entrust.redact(params).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.dialogFormVisible = false;
                        this.getList();
                    } else {
                        this.$message.error({
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
                let obj = {id: row.etId};
                API.Entrust.deletes(obj).then(res => {
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
            handleCheckedCitiesChange(value) {
                console.log(value)
            }

            // 添加
            // add() {
            //   this.dialogFormVisibles = true;
            // },
            // append(){

            // }
        },
        created() {
            this.getList();
        }
    };
</script>

<style>
</style>
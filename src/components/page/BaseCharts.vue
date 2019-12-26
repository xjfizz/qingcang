<template>
    <div class="table">
<!--        <div class="crumbs">-->
<!--            <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-lx-cascades"></i> 找仓表格-->
<!--                </el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
        <el-input placeholder="请输入手机号" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <el-input placeholder="找仓单编号" v-model="inputs" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <el-button type="primary" @click="doFilter" style="margin-bottom:10px">查找</el-button>
        <el-input
                placeholder="请输入客户ID"
                v-model="cid"
                clearable
                style="width:200px;hight:36px;margin-left:20px"
        ></el-input>&nbsp;
        <el-button type="primary" @click="grabble" style="margin-bottom:10px">搜索</el-button>
        <div class="container">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="zcNo" label="找仓单号"></el-table-column>
                <el-table-column prop="contTel" label="联系人电话">
                    <template slot-scope="scope">
                        <span>{{scope.row.contTel ? scope.row.contTel : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="whRegion" label="区域">
                    <template slot-scope="scope">
                        <span>{{scope.row.whRegion ? scope.row.whRegion : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="space" label="面积" width="50px">
                    <template slot-scope="scope">
                        <span>{{scope.row.space ? scope.row.space : '无'}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="customId" label="客户ID"></el-table-column> -->
                <!-- <el-table-column prop="processed" label="联系电话"></el-table-column> -->
                <el-table-column prop="serviceType" label="服务类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.serviceType ? scope.row.serviceType : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="startRentDate" label="起租日期"></el-table-column>
                <el-table-column prop="endRentDate" label="结束日期"></el-table-column>
                <el-table-column prop="remarks" label="备注">
                    <template slot-scope="scope">
                        <span>{{scope.row.remarks ? scope.row.remarks : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remarks" label="是否审核">
                    <template slot-scope="scope">
                        <!--                      v-model="scope.row.authStatus"-->
                        <el-switch
                                class="switch-sty"
                                v-model="scope.row.processed"
                                active-value="true"
                                inactive-value="false"
                                style="margin-right: 30px;"
                                @change="assessor(scope.row)"
                        ></el-switch>
                        <!--    active-text="已审核"
                              inactive-text="未审核" -->
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <!--                      v-model="scope.row.authStatus"-->
                        <el-button type="primary" icon="el-icon-edit" @click="redact(scope.row)"
                                   size="mini"></el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="removes(scope.row)"
                                   size="mini"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
                <el-form-item label="联系人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.contTel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="区域" :label-width="formLabelWidth">
                    <el-input v-model="form.whRegion" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="面积" :label-width="formLabelWidth">
                    <el-input v-model="form.space" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" :label-width="formLabelWidth">
                    <!--                    <el-input v-model="form.serviceType" autocomplete="off"></el-input>-->
                    <el-checkbox-group v-model="serviceValue" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(item,index) in serviceList" :label="item" :key="index">{{item}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remarks" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="compile">确 定</el-button>
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
                serviceList: [
                    '仓库租赁',
                    '仓配一体服务',
                    '电商服务'
                ],
                serviceValue: [],
                input: "",
                inputs: "",
                cid: "",
                tableData: [],
                dialogFormVisible: false,
                form: {
                    contTel: "",
                    whRegion: "",
                    space: "",
                    serviceType: "",
                    remarks: ""
                },
                formLabelWidth: "120px"
            };
        },

        created() {
            this.getList();
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
            handleCheckedCitiesChange(value) {
                console.log(value)
            },
            // 搜索
            doFilter() {
                this.pageInfo.page = 1,
                this.getList();
            },
            grabble() {
                let params = {
                    customId: this.cid || ""
                };
                API.LookFor.seek(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.tableData = res.data.rows;
                    }
                    this.count = res.data.rows.length;
                });
            },
            // 获取找仓列表
            getList() {
                const params = {
                    page: 0,
                    contTel: this.input || "",
                    zcNo: this.inputs || "",
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.LookFor.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {

                        res.data.rows.forEach(item => {
                            item.processed = String(item.processed)
                        })
                        this.tableData = res.data.rows;
                        this.pageInfo.total = res.data.total
                    } else {
                        this.$message.warning({
                            type: 'warn',
                            message: res.message
                        });
                    }
                    this.count = res.data.rows.length;
                });
            },
            // 编辑
            redact(row) {
                console.log(row)
                if (row.serviceType !== '') {
                    this.serviceValue = row.serviceType.split(',')
                }
                console.log(row);
                this.dialogFormVisible = true;
                this.form = {
                    customId: row.customId,
                    fwhId: row.fwhId,
                    contTel: row.contTel,
                    whRegion: row.whRegion,
                    space: row.space,
                    serviceType: row.serviceType,
                    remarks: row.remarks
                };
            },

            compile() {
                console.log(this.form, this.serviceValue)
                let params = {
                    customId: this.form.customId,
                    fwhId: this.form.fwhId,
                    contTel: this.form.contTel,
                    whRegion: this.form.whRegion,
                    space: this.form.space,
                    serviceType: this.serviceValue.join(','),
                    remarks: this.form.remarks,
                    service: this.form.service,
                }
                API.LookFor.redact(params).then(res => {
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
            //审核
            assessor(row) {
                console.log('row---', row.processed)
                console.log('row-----', row);
                let options = JSON.parse(JSON.stringify(row))
                let params = {
                    fwhId: options.fwhId,
                    processed: options.processed == 'true' ? true : false
                };
                console.log('params---', params)
                API.LookFor.redact(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.getList();
                        this.$message.error(res.message)
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            // 删除
            removes(row) {
                this.$confirm('是否将其永久?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.remove(row)
                }).catch(() => {
                });
            },
            remove(row) {
                let obj = {id: row.fwhId};
                API.LookFor.deletes(obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "warn",
                            message: res.message
                        });
                        this.getList();
                    } else {
                        this.$message.warning({
                            type: "warn",
                            message: res.message
                        });
                    }

                });
            }
        }
    };
</script>

<style lang="less">
    .color {
        color: #8c939d !important;
    }

    /*.el-switch__label .el-switch__label--left {*/
    /*    color: #8c939d;*/
    /*}*/
    .switch-sty .el-switch__label .el-switch__label--left {
        color: #8c939d;
    }

</style>
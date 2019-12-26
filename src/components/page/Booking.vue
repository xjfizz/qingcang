<template>
    <div class="table">
<!--        <div class="crumbs">-->
<!--            <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-lx-cascades"></i> 预约管理表格-->
<!--                </el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
        <el-input placeholder="请输入预约单号" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <el-input placeholder="请输入联系人电话" v-model="inputs" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <el-button type="primary" @click="doFilter" style="margin-bottom:10px">查找</el-button>
        <template>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="companyName" label="公司名"></el-table-column>
                <el-table-column prop="cont" label="联系人"></el-table-column>
                <el-table-column prop="contTel" label="联系电话"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="customId " label="客户ID"></el-table-column>
                <el-table-column prop="fromTime" label="看仓开始时间"></el-table-column>
                <el-table-column prop="remarks" label="备注"></el-table-column>
                <el-table-column prop="rent" label="预计租期"></el-table-column>
                <el-table-column prop="service" label="服务类型"></el-table-column>
                <el-table-column prop="toTime" label="看仓结束时间"></el-table-column>
                <el-table-column prop="yyNo" label="预约单号"></el-table-column>
                <el-table-column prop label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="compile(scope.row)"
                                   size="mini"></el-button>
                        <el-button type="primary" icon="el-icon-delete" @click="remove(scope.row)"
                                   size="mini"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="公司名" :label-width="formLabelWidth">
                    <el-input v-model="form.companyName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" :label-width="formLabelWidth">
                    <el-input v-model="form.cont" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="form.contTel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="看仓开始时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker
                                v-model="form.fromTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="pickerOptions0"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remarks" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="预计租期" :label-width="formLabelWidth">
                    <el-input v-model="form.rent" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" :label-width="formLabelWidth">
                    <!--                    <el-input v-model="form.service" autocomplete="off"></el-input>-->
                    <el-checkbox-group v-model="serviceValue" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(item,index) in serviceList" :label="item" :key="index">{{item}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="看仓结束时间" :label-width="formLabelWidth">
                    <div class="block">
                        <el-date-picker
                                v-model="form.toTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="pickerOptions0"
                        ></el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="预约单号" :label-width="formLabelWidth">
                    <el-input v-model="form.yyNo" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="edit">确 定</el-button>
            </div>
        </el-dialog>
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
    </div>
</template>


<script>
    import API from "../../api";

    export default {
        data() {
            return {
                input: "",
                inputs: "",
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
                tableData: [],
                dialogFormVisible: false,
                form: {},
                formLabelWidth: "120px",
                //        禁止选择当前日期之前的日期
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
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
            // 查询
            doFilter() {
                this.pageInfo.page = 1;
                this.getList();
            },
            //   获取列表
            getList() {
                const params = {
                    page: 0,
                    yyNo: this.input || "",
                    contTel: this.inputs || "",
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.Booking.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.tableData = res.data.rows;
                        this.pageInfo.total = res.data.total
                    } else {
                        this.$message.warning({
                            type: "warn",
                            message: res.message
                        });
                    }
                });
            },
            // 编辑
            compile(row) {
                this.dialogFormVisible = true;
                this.form = row;
                if (row.service !== '') {
                    this.serviceValue = row.service.split(',')
                }
            },
            edit() {
                this.form.service = this.serviceValue.join(',')
                API.Booking.redact(this.form).then(res => {
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
            // 删除
            remove(row) {
                let obj = {id: customId};
                API.Booking.deletes(obj).then(res => {
                    if (res.code == 200) {
                        this.$message.success({
                            type: "waen",
                            message: res.message
                        });
                        this.getList();
                    } else {
                        this.$message.success({
                            type: "waen",
                            message: res.message
                        });
                    }
                });
            },
            handleCheckedCitiesChange(value) {
                console.log(value)
            }
        },
        created() {
            this.getList();
        }
    };
</script>

<style scoped>
</style>
<template>
    <div>
        <template>
            <el-input placeholder="请输入用户手机号" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
            <el-button type="primary" @click="doFilter" style="margin-bottom: 15px">查找</el-button>
            <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    @row-click='jump'>
                <el-table-column
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="customId"
                        label="反馈人ID">
                </el-table-column>
                <el-table-column
                        prop="detail"
                        label="反馈内容">
                    <template slot-scope="scope">
                        <span>{{scope.row.detail ? scope.row.detail : '无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="img1"
                        label="反馈图片1">
                    <template slot-scope="scope">
                        <img width="70" height="70" v-if="scope.row.img1" :src="action + scope.row.img1">
                        <img style="width: 70px;height: 70px" v-else src="../../assets/image/listImg/no.jpg">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="img2"
                        label="反馈图片2">
                    <template slot-scope="scope">
                        <img style="width: 70px;height: 70px" v-if="scope.row.img2" :src="action + scope.row.img2">
                        <img style="width: 70px;height: 70px" v-else src="../../assets/image/listImg/no.jpg">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="img3"
                        label="反馈图片3">
                    <template slot-scope="scope">
                        <img width="70" height="70" v-if="scope.row.img3" :src="action + scope.row.img3" alt="暂无图片">
                        <img style="width: 70px;height: 70px" v-else src="../../assets/image/listImg/no.jpg">
                    </template>
                </el-table-column>
                <el-table-column
                        label="是否已阅">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status">已阅</span>
                        <span v-else-if="!scope.row.status">未阅</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type == 0">问题反馈</span>
                        <span v-else-if="scope.row.status == 1">意见反馈</span>
                        <span v-else="scope.row.status == 2">服务反馈</span>

                    </template>
                </el-table-column>
                <el-table-column prop label="操作" width="260px" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="primary"
                                icon="el-icon-delete"
                                @click.stop="removes(scope.row)"
                                size="mini"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--            分页-->
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
        <!--        编辑-->
        <el-dialog title="选择" :visible.sync="dialogFormVisible" width="230px">
            <el-form :model="form">
                <el-form-item label="是否已阅" :label-width="formLabelWidth" label-width="80px">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="已阅" value="true"></el-option>
                        <el-option label="未阅" value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="complie">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import API from '../../api'

    export default {
        data() {
            return {
                // 分页
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                input: '',
                tableData: [],
                dialogFormVisible: false,
                form: {
                    customId: '',
                    status: '',

                },
                formLabelWidth: '120px',
                action: 'https://file.qincangyuncang.com'
            }
        },
        methods: {
            // 分页
            handleSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getFeedback()
            },
            handleCurrentChange(val) {
                this.pageInfo.page = val
                this.getFeedback()
            },
            // 获取意见反馈列表
            getFeedback() {
                const params = {
                    tel: this.input || "",
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.Feedback.getFeedback(params).then(res => {
                    console.log(res);
                    this.tableData = res.data.rows;
                    this.pageInfo.total = res.data.total
                })
            },
            //    编辑
            redacts(row) {
                this.dialogFormVisible = true
                console.log(row);
                this.from = row.data
            },
            complie() {
                let params = {
                    id: this.from.customId,
                    read: this.from
                }
                API.Feedback.redact(params).then(res => {
                    console.log(res);
                })
            },
            //    跳转
            jump(row) {
                console.log(row);
                this.$router.push({
                    path: '/feedDetail',
                    query: {
                        id: row.feedId,
                        createTime: row.createTime,
                        detail: row.detail,
                        img1: row.img1,
                        img2: row.img2,
                        img3: row.img3,
                        type: row.type
                    }
                })
            },
            //搜索
            doFilter() {
                this.pageInfo.page = 1,
                    this.getFeedback()
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
            remove(row) {
                let obj = {id: row.feedId}
                API.Feedback.deletes(obj).then(res => {
                    console.log(res);
                    if(res.code == 200) {
                        this.$message({
                            type: 'success',
                            message: res.message
                        })
                        this.getFeedback()
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                })
            },

        },
        created() {
            this.getFeedback()
        }
    }
</script>

<style scoped>

</style>
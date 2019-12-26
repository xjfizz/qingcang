<template>
    <div class>
<!--        <div class="crumbs">-->
<!--            <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-lx-copy"></i>仓库资料-->
<!--                </el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
        <el-input placeholder="请输入仓库名" v-model="input" clearable style="width:200px;hight:36px"></el-input>&nbsp;
        <!-- <el-input placeholder="请输入联系电话" v-model="inputs" clearable style="width:200px;hight:36px"></el-input>&nbsp; -->
        <el-button type="primary" @click="doFilter" style="margin-bottom:10px">查找</el-button>
        <el-input placeholder="请输入客户ID" v-model="inputs" clearable
                  style="width:200px;hight:36px;margin-left:20px"></el-input>&nbsp;

        <el-button type="primary" @click="seek" style="margin-bottom:10px">搜索</el-button>
        <el-table :data="tableData" stripe style="width: 100%" @row-click='jump'>
            <el-table-column prop="contName " label="联系人姓名">
                <template slot-scope="scope">
                    <span>{{scope.row.contName ? scope.row.contName : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="contTel" label="联系人电话">
                <template slot-scope="scope">
                    <span>{{scope.row.contTel ? scope.row.contTel : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="whName" label="仓库名">
                <template slot-scope="scope">
                    <span>{{scope.row.whName ? scope.row.whName : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="whAddress" label="仓库地址">
                <template slot-scope="scope">
                    <span>{{scope.row.whAddress ? scope.row.whAddress : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="totalSpace" label="总面积">
                <template slot-scope="scope">
                    <span>{{scope.row.totalSpace ? scope.row.totalSpace : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="minSpace" label="起租面积">
                <template slot-scope="scope">
                    <span>{{scope.row.minSpace ? scope.row.minSpace : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="minRent" label="起租期限">
                <template slot-scope="scope">
                    <span>{{scope.row.minRent ? scope.row.minRent : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="minPrice" label="租赁起价">
                <template slot-scope="scope">
                    <span>{{scope.row.minPrice ? scope.row.minPrice : '无'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop label="操作" width="200px" align="center">
                <template slot-scope="scope">
                    <!--          <el-button type="primary" icon="el-icon-tickets" @click="jump" size="mini"></el-button>-->
                    <el-button type="primary" icon="el-icon-edit" @click.stop="redact(scope.row)"
                               size="mini"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click.stop="removes(scope.row)"
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
    </div>
</template>

<script>
    import API from "../../api";

    export default {
        //   name: "tabs",
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
                tableData: []
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
                this.getList();
            },
            seek() {
                let params = {
                    customId: this.inputs || ""
                };
                API.Tabs.search(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success({
                            type: 'warn',
                            message: res.message
                        })
                        this.pageInfo.total = res.data.total
                        this.tableData = res.data.rows;
                        // this.tableData = res.data.rows;
                        // this.count = res.data.rows.length;
                    } else {
                        this.$message.warning({
                            type: 'warn',
                            message: res.message
                        })
                    }
                })
            },
            // 获取仓库资料
            getList() {
                let params = {
                    page: 0,
                    whName: this.input || "",
                    // contTel:this.inputs ||'',
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                };
                API.Tabs.query(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.tableData = res.data.rows;
                        this.pageInfo.total = res.data.total
                    }
                    this.count = res.data.total;
                });
            },
            // 跳转
            jump(row) {
                console.log(row)
                // this.$router.push({path:'/warehouse'})
                this.$router.push({path: '/warehouse', query: {id: row.whId}})

            },
            //  编辑
            redact(row) {
                console.log(row);
                this.$router.push({path: '/whedit', query: {id: row.whId}})
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
                let obj = {whId: row.whId};
                API.Tabs.deletes(obj).then(res => {
                    console.log(res);
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
        },
        created() {
            this.getList();
        }
    };
</script>

<style>
</style>


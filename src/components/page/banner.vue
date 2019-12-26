<template>
    <div>
        <el-button
                type="primary"
                @click="add"
                plain
                style="margin-bottom:20px;margin-right:50px;float:right"
        >添加
        </el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="createTime"
                    label="创建时间"
            >
            </el-table-column>
            <el-table-column
                    prop="img"
                    label="图片">
                <template slot-scope="scope">
                            <img width="70" height="70" :src="action + scope.row.img">
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="是否显示">
                <template slot-scope="scope">
                    <span v-if="scope.row.status">显示</span>
                    <span v-else-if="!scope.row.status">未显示</span>
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
        <el-dialog title="编辑轮播图" :visible.sync="dialogFormVisibles">
            <el-form :model="forms">
                <el-form-item label="轮播图" :label-width="formLabelWidth">
                    <!--                    <el-input v-model="forms.name" autocomplete="off"></el-input>-->
                    <!--                    <img src="forms.img" alt="图片损坏">-->
                    <el-upload
                            action="action"
                            :file-list="fileListEdit"
                            :auto-upload="false"
                            list-type="picture-card"
                            :limit="1"
                            :on-change="uploadChangeEdit"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="是否显示" :label-width="formLabelWidth">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option label="显示" value="true"></el-option>
                        <el-option label="未显示" value="false"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibles = false">取 消</el-button>
                <el-button type="primary" @click="uploadImgSub()">确 定</el-button>
            </div>
        </el-dialog>
        <!--        添加-->
        <el-dialog title="添加轮播图" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="轮播图" :label-width="formLabelWidth">
                    <!--                    <el-input v-model="form.name" autocomplete="off"></el-input>-->
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :auto-upload="false"
                            limit="1"
                            :on-change="uploadChange">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addImg()">确 定</el-button>
            </div>
        </el-dialog>
        <!--        分页-->
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
                tableData: [],
                dialogFormVisibles: false,
                forms: {
                    img: '',
                },
                dialogFormVisible: false,
                form: {
                    img: "",
                },
                formLabelWidth: '120px',
                dialogImageUrl: '',
                dialogVisible: false,
                imageInfo: {},
                imageUrl: '',
                pageInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0
                },
                uploadImgEdit: {},
                fileListEdit: [],
                imgEdit: '',
                action: 'https://file.qincangyuncang.com/'
            }
        },
        created() {
            this.init();
        },
        methods: {
            // 初始化
            init() {
                this.getBannerList()
            },
            // 获取轮播图列表
            getBannerList() {
                let params = {
                    page: this.pageInfo.page - 1,
                    limit: this.pageInfo.pageSize
                }
                API.Banner.getBannerList(params).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.pageInfo.total = res.data.total
                        this.tableData = res.data.rows;

                    } else {
                        this.$message.warning({
                            type: 'warn',
                            message: res.message
                        })
                    }
                })
            },
            //    添加
            add() {
                this.dialogFormVisible = true
            },

            uploadChange(file, fileList) {
                console.log(file, fileList);
                this.imageInfo = file.raw;
            },
            uploadImage() {
                let formData = new FormData();
                formData.append('id', 'banner')
                formData.append('file', this.imageInfo)

                API.Banner.addition(formData).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success({
                            type: 'warn',
                            message: res.message
                        })
                        this.dialogFormVisible = false;
                        this.imageUrl = res.data
                        this.addImgSubmit();
                    } else {
                        this.$message.warning({
                            type: 'warn',
                            message: res.message
                        })
                    }
                })
            },
            addImg() {
                this.uploadImage();
            },
            addImgSubmit() {
                let params = {
                    img: this.imageUrl
                }
                API.Banner.addImgSubmit(params).then(res => {
                    this.getBannerList()
                    console.log(res);
                })
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val
                this.getBannerList()
            },
            handleCurrentChange(val) {
                this.pageInfo.page = val
                this.getBannerList()
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
                const obj = {id: row.bid};
                API.Banner.deletes(obj).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$message.success({
                            type: 'warn',
                            message: res.message
                        })
                        this.getBannerList();
                    } else {
                        this.$message.warning({
                            type: 'warn',
                            message: res.message
                        })
                    }
                })
            },
            //    编辑
            compile(row) {
                console.log(row);
                this.fileListEdit = [{url: this.action + row.img}]
                this.forms = row
                this.dialogFormVisibles = true
            },
            // 图片删除
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            uploadChangeEdit(file, fileList) {
                this.uploadImgEdit = file;
            },
            uploadImgSub() {
                let formData = new FormData();
                formData.append('id', 'banner')
                formData.append('file', this.uploadImgEdit.raw)
                if(this.uploadImgEdit.raw) {
                    API.Banner.addition(formData).then(res => {
                        if (res.code == 200) {
                            this.dialogFormVisibles = false
                            this.imgEdit = res.data;
                            this.updateBanner();
                        }

                    })
                } else {
                    this.imgEdit = this.forms.img
                    this.updateBanner();
                }

            },
            // 更新轮播图
            updateBanner() {
                let params = {
                    bid: this.forms.bid || '',
                    img: this.imgEdit || '',
                    status: this.form.status || '',
                }
                API.Banner.redact(params).then(res => {
                    if (res.code == 200) {
                        this.getBannerList()
                    }
                })
            }
        },
        computed: {},
        watch: {},

    }

</script>


<style>
</style>

<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="add">新增</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <!-- <el-option key="1" label="广东省" value="广东省"></el-option> -->
                    <!-- <el-option key="2" label="湖南省" value="湖南省"></el-option> -->
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <export-excel v-if="list !== null" :list="list" :tHeader="tHeader" :tValue="tValue">导出</export-excel>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="#"  width="50"></el-table-column>
                <el-table-column prop="date" label="用户ID" sortable >
                </el-table-column>
                <el-table-column prop="name" label="合作单号" >
                </el-table-column>
                <el-table-column prop="name" label="面积" >
                </el-table-column>
                <el-table-column prop="name" label="区域" >
                </el-table-column>
                <el-table-column prop="address" label="手机号" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="审核状态" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="服务方式" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="启租日期" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="到租日期" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="address" label="备注" :formatter="formatter" >
                </el-table-column>
                <el-table-column prop="address" label="生成时间" :formatter="formatter" >
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增提示框 -->
<!--        <el-dialog title="新增" :visible.sync="delVisibleAdd" width="30%">-->
        <el-dialog title="新增" :visible.sync="delVisibleAdd" width="30%">
            <el-form  :model="form" label-width="50px">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd()">取 消</el-button>
                <el-button type="primary" @click="addData()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import  API  from '../../api';
    import list from '../../utils/dataConfig/testList'
    import dateFormat from '../../utils/dataConfig/dateFormat'
    import  ExportExcel from '../common/ExportExcel'
    import Schart from 'vue-schart';
    export default {
        name: 'basetable',
        components:{
            ExportExcel
        },
        data() {
            return {
                tableList: [],
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                id: -1,
                formTime: '2019-08-15 13:15:46',
                list:[ {
                    "id":1,
                    "type":"徐俊",
                    "content":"徐俊2",
                    "time":"徐俊4",
                    "count":"徐俊5",
                }, {
                        "id":2,
                        "type":"徐俊sss",
                        "content":"徐俊aaa",
                        "time":"徐俊sss",
                        "count":"徐俊555",
                    },],
                tHeader:['Id', '告警类型', '告警内容', '告警时间（段）', '告警次数'],
                tValue:['id', 'type', 'content', 'time', 'count'],
                delVisibleAdd:false,
                positionLabel: 'right'
            }
        },
        created() {
            this.getData();
            this.init()
           // this.setDate()
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        filters: {
            formatDate1(time) {
                // let date = new Date(time)
                return dateFormat(time)
            }
        },
        methods: {
            init() {
                this.tableList = list.result.map(item => {
                    return {date: item.date1, name: item.name1, address: item.address1 }
                })
                console.log('tableList', this.tableList)
            },
            setDate(time) {
                // let time = '2018-08-24 12:23:45'
                 time = dateFormat(time)
                return time
            },

            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                 //this.getData();
            },
            // 获取 easy-mock 的模拟数据
             getData() {
                let a = []
                   API.Table.fetchData1({
                    courierId: 123456
                }).then((res) => {
                    if(res.code === 200) {
                        console.log('res',res)
                        res.data.forEach(item => {
                            item.date = this.setDate(item.date)
                            // item.date = item.date.substr(0,10)
                        })
                        this.tableData = res.data;
                        a = res.data;
                    }
                })
                return a
                // setTimeout( () => {
                //     console.log('a:setTimeout', a)
                // },500)
            },
            search() {
                console.log('form', this.select_word)
                this.select_word = this.select_word.replace(/\s*/g, '')
                let params = {
                    keyWords: this.select_word || ''
                }
                API.Table.searchKey(params).then((res) => {
                    if(res.code === 200) {
                        res.data.forEach(item => {
                            item.date = this.setDate(item.date)
                            // item.date = item.date.substr(0,10)
                        })
                        this.tableData = res.data;
                    }
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                // this.idx = index;
                this.id = row.id;
                this.form = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                console.log('row', row)
                this.delVisible = true;
            },
            delAll() {
                // this.$store.dispatch('changeInfo')
                console.log('multipleSelection', this.multipleSelection)
                let delIds = []
                // let delIdsStr = ''
                this.multipleSelection.forEach(item => {
                    delIds.push(item.id)
                })
                console.log('delIds', delIds)
                // delIds.forEach(item => {
                //     delIdsStr += item + ','
                // })
                API.Table.deleteList({
                    delIds: delIds
                }).then((res) => {
                    if(res.code === 200) {
                        this.getData()
                        this.$message.success('删除成功');
                    }
                })
            },
            /* 新增*/
            add() {
                this.form = {}
                this.delVisibleAdd = true
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                let params = {
                    id: this.form.id || '',
                    name: this.form.name || '',
                    date: this.form.date || '',
                    address:this.form.address || '',
                }
                API.Table.editTable(params).then((res) => {
                    if(res.code === 200) {
                        this.getData()
                    }
                })
            },
            // 确定删除
            deleteRow(){
                API.Table.deleat({
                    id: this.id
                }).then((res) => {
                    if(res.code === 200) {
                        this.$message.success('删除成功');
                        this.delVisible = false;
                        this.search()
                    }
                })
            },
            /* 新增表单提交 */
            addData() {
                console.log('form', this.form)
                this.delVisibleAdd = false
                let params = {
                    name: this.form.name || '',
                    date: this.form.date || '',
                    address:this.form.address || '',
                }
                API.Table.addTable(params).then((res) => {
                    if(res.code === 200) {
                        this.getData()
                    }
                })
            },
            /* 新增表单取消 */
            cancelAdd() {
                this.delVisibleAdd = false
            }
        }
       
    }
</script>

<style scoped>
.handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    
</style>
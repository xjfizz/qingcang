<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="10">
                <span class="main-item-name"> 创建时间:</span>
                <span class="main-item-value">{{form.createTime}}</span>
            </el-col>
            <el-col :span="10">
                <span class="main-item-name"> 类型:</span>
<!--                <span class="main-item-value">{{form.type}}</span>-->
                <span class="main-item-value" v-if="form.type == 0 ">问题反馈</span>
                <span class="main-item-value" v-else-if="form.type == 1 ">意见反馈</span>
                <span class="main-item-value" v-else="form.type == 2 ">服务反馈</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="10">
                <span class="main-item-name"> 反馈内容:</span>
                <span class="main-item-value">{{form.detail}}</span>
            </el-col>
        </el-row>
        <el-row>
            <span class="main-item-name"> 反馈图片:</span>
        </el-row>
        <el-row :gutter="24" style="text-align: center">
            <el-col :span="6">
                <span class="main-item-value"> <img style="width:300px;height:300px !important;" :src="action + form.img1"
                                                    alt="暂无图片"></span>
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="form.img2" :src="action + form.img2" style="width:300px;height:300px !important;">
                    <img style="width: 70px;height: 70px" v-else src="../../assets/image/listImg/no.jpg">
                </span>
            </el-col>
            <el-col :span="6">
                <!--                <span class="main-item-name"> 反馈图片3:</span>-->
                <!--                <span class="main-item-value">{{ action + form.img3}}</span>-->
                <span class="main-item-value">
                    <img v-if="form.img3" :src="action + form.img3" style="width:300px;height:300px !important;">
                    <img style="width: 70px;height: 70px" v-else src="../../assets/image/listImg/no.jpg">
                </span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import API from '../../api'

    export default {
        data() {
            return {
                form: {
                    img1: '',
                    img2: '',
                    img3: ''
                },
                action: 'https://file.qincangyuncang.com',
            }
        },

        created() {
            this.init()

        },
        methods: {
            //初始化
            init() {
                let params = this.$route.query
                console.log(params);
                this.form = params;
                // 标记消息为已读
                this.MessageReaded();
            },
            // 标记为已读
            MessageReaded() {
                let params = {
                    id: this.form.id || ''
                }
                API.Feedback.redact(params).then(res => {
                })
            }


        }
    }
</script>

<style scoped>
    .main-item-name {
        font-size: 16px;
        color: #2a2d2c;
        line-height: 32px;
        margin: 50px;
        padding: 10px;
    }

    .main-item-value {
        font-size: 15px;
        color: #858e89;
    }
</style>
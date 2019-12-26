<template>
    <div class="main">
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 仓库名:</span>
                <!--                    <span class="main-item-value">{{storeDetail.whName}}</span>-->
                <span class="main-item-value">{{storeDetail.whName ? storeDetail.whName : '无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 区域:</span>
                <!--                    <span class="main-item-value">{{storeDetail.whRegion}}</span>-->
                <span class="main-item-value">{{storeDetail.whRegion ? storeDetail.whRegion :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 仓库地址:</span>
                <span class="main-item-value">{{storeDetail.whAddress ? storeDetail.whAddress :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 联系人身份:</span>
                <span class="main-item-value">{{storeDetail.contRole ? storeDetail.contRole :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 联系人姓名:</span>
                <span class="main-item-value">{{storeDetail.contName ? storeDetail.contName :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 联系人电话:</span>
                <span class="main-item-value">{{storeDetail.contTel}}</span>
                <span class="main-item-value">{{storeDetail.contTel ? storeDetail.contTel :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 联系人邮箱:</span>
                <!--                    <span class="main-item-value">{{storeDetail.contEmail}}</span>-->
                <span class="main-item-value">{{storeDetail.contEmail ? storeDetail.contEmail : '无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 公司名称:</span>
                <!--                    <span class="main-item-value">{{storeDetail.companyName}}</span>-->
                <span class="main-item-value">{{storeDetail.companyName ? storeDetail.companyName : '无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 认证状态:</span>
                <span class="main-item-value" v-if="storeDetail.authStatus == 0 ">已认证</span>
                <span class="main-item-value" v-else-if="storeDetail.authStatus == 1 ">未认证</span>
                <span class="main-item-value" v-else="storeDetail.authStatus == 2 ">未通过</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 认证时间:</span>
                <span class="main-item-value">{{storeDetail.authTime}}</span>
                <span class="main-item-value">{{storeDetail.authTime ? storeDetail.authTime :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 认证备注:</span>
                <!--                    <span class="main-item-value">{{storeDetail.authRemarks}}</span>-->
                <span class="main-item-value">{{storeDetail.authRemarks ? storeDetail.authRemarks :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 租赁起价:</span>
                <!--                    <span class="main-item-value">{{storeDetail.minPrice}}</span>-->
                <span class="main-item-value">{{storeDetail.minPrice ? storeDetail.minPrice :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 起租面积:</span>
                <!--                    <span class="main-item-value">{{storeDetail.minSpace}}</span>-->
                <span class="main-item-value">{{storeDetail.minSpace ? storeDetail.minSpace :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 可租面积:</span>
                <!--                    <span class="main-item-value">{{storeDetail.availSpace}}</span>-->
                <span class="main-item-value">{{storeDetail.availSpace ? storeDetail.availSpace :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 总面积:</span>
                <!--                    <span class="main-item-value">{{storeDetail.totalSpace}}</span>-->
                <span class="main-item-value">{{storeDetail.totalSpace ? storeDetail.totalSpace :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 存储类型:</span>
                <!--                    <span class="main-item-value">{{storeDetail.storeType}}</span>-->
                <span class="main-item-value">{{storeDetail.storeType ? storeDetail.storeType :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 服务类型:</span>
                <!--                    <span class="main-item-value">{{storeDetail.serviceType}}</span>-->
                <span class="main-item-value">{{storeDetail.serviceType ? storeDetail.serviceType :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 仓库类型:</span>
                <!--                    <span class="main-item-value">{{storeDetail.whType}}</span>-->
                <span class="main-item-value">{{storeDetail.whType ? storeDetail.whType :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 底层层高:</span>
                <!--                    <span class="main-item-value">{{storeDetail.bottomHigh}}</span>-->
                <span class="main-item-value">{{storeDetail.bottomHigh ? storeDetail.bottomHigh :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 起租期限:</span>
                <span class="main-item-value">{{storeDetail.minRent ? storeDetail.minRent :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 是否保税:</span>
                <!--              <span class="main-item-value">{{storeDetail.bounded}}</span>-->
                <span class="main-item-value">{{storeDetail.bounded === true?'是' : '否' }}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <!--                <el-col :span="8">-->
            <!--                    <span class="main-item-name"> 仓库属性:</span>-->
            <!--&lt;!&ndash;                    <span class="main-item-value">{{storeDetail.whAtt}}</span>&ndash;&gt;-->
            <!--                    <span class="main-item-value">{{storeDetail.whAtt ? storeDetail.whAtt :'无'}}</span>-->
            <!--                </el-col>-->
            <el-col :span="8">
                <span class="main-item-name"> 建造年代:</span>
                <!--                    <span class="main-item-value">{{storeDetail.buildedYear}}</span>-->
                <span class="main-item-value">{{storeDetail.buildedYear ? storeDetail.buildedYear :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 建设状态:</span>
                <!--                    <span class="main-item-value">{{storeDetail.buildingState}}</span>-->
                <span class="main-item-value">{{storeDetail.buildingState ? storeDetail.buildingState :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 耐火等级:</span>
                <!--                    <span class="main-item-value">{{storeDetail.safety}}</span>-->
                <span class="main-item-value">{{storeDetail.safety ? storeDetail.safety :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 消防校验:</span>
                <span class="main-item-value">{{storeDetail.fireInspected ? '是':'否'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 防火等级:</span>
                <!--                    <span class="main-item-value">{{storeDetail.fireGrade }}</span>-->
                <span class="main-item-value">{{storeDetail.fireGrade ? storeDetail.fireGrade :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 地坪材质:</span>
                <!--                    <span class="main-item-value">{{storeDetail.floorMaterial }}</span>-->
                <span class="main-item-value">{{storeDetail.floorMaterial ? storeDetail.floorMaterial :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 地坪功能:</span>
                <!--                    <span class="main-item-value">{{storeDetail.floorFunction}}</span>-->
                <span class="main-item-value">{{storeDetail.floorFunction ? storeDetail.floorFunction :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 园区安保:</span>
                <!--                    <span class="main-item-value">{{storeDetail.security}}</span>-->
                <span class="main-item-value">{{storeDetail.security ? storeDetail.security :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 仓库设施:</span>
                <!--                    <span class="main-item-value">{{storeDetail.facilities}}</span>-->
                <span class="main-item-value">{{storeDetail.facilities ? storeDetail.facilities :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 建筑结构:</span>
                <!--                    <span class="main-item-value">{{storeDetail.structure}}</span>-->
                <span class="main-item-value">{{storeDetail.structure ? storeDetail.structure :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 供电电压:</span>
                <span class="main-item-value">{{storeDetail.powerVoltage ? storeDetail.powerVoltage :'无'}}</span>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <span class="main-item-name"> 供电方式:</span>
                <!--                    <span class="main-item-value">{{storeDetail.powerMethod}}</span>-->
                <span class="main-item-value">{{storeDetail.powerMethod ? storeDetail.powerMethod :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 出入口个数:</span>
                <!--                    <span class="main-item-value">{{storeDetail.gateCount}}</span>-->
                <span class="main-item-value">{{storeDetail.gateCount ? storeDetail.gateCount :'无'}}</span>
            </el-col>
            <el-col :span="8">
                <span class="main-item-name"> 详情描述:</span>
                <!--                    <span class="main-item-value">{{storeDetail.des}}</span>-->
                <span class="main-item-value">{{storeDetail.des ? storeDetail.des :'无'}}</span>
            </el-col>
        </el-row>
        <el-row>
            <span class="main-item-name"> 基本信息图片:</span>
        </el-row>
        <el-row :gutter="24" style="text-align: center">
            <el-col :span="6">
                     <span class="main-item-value">
                         <img v-if="storeDetail.baseImg1" :src="action + storeDetail.baseImg1">
                         <img v-else src="../../assets/image/listImg/no.jpg">
                     </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                    <span class="main-item-value">
                        <img v-if="storeDetail.baseImg2" :src=" action + storeDetail.baseImg2">
                        <img v-else src="../../assets/image/listImg/no.jpg">
                    </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                    <span class="main-item-value">
                        <img v-if="storeDetail.baseImg3" :src="action + storeDetail.baseImg3">
                        <img v-else src="../../assets/image/listImg/no.jpg">
                    </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                    <span class="main-item-value">
                        <img v-if="storeDetail.baseImg4" :src="action + storeDetail.baseImg4">
                        <img v-else src="../../assets/image/listImg/no.jpg">
                    </span>  <!--正式环境-->
            </el-col>
        </el-row>
        <el-row :gutter="24" style="text-align: center">
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.baseImg5" :src="action + storeDetail.baseImg5">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.baseImg6" :src="action + storeDetail.baseImg6">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.baseImg7" :src="action + storeDetail.baseImg7">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.baseImg8" :src="action + storeDetail.baseImg8">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
        </el-row>
        <el-row>
            <span class="main-item-name"> 认证图片:</span>
        </el-row>
        <el-row :gutter="24" style="text-align: center">
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.authImg1" :src="action + storeDetail.authImg1">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img  v-if="storeDetail.authImg2" :src="action + storeDetail.authImg2">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.authImg3" :src="action + storeDetail.authImg3">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                     <img v-if="storeDetail.authImg4" :src="action + storeDetail.authImg4">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
        </el-row>
        <el-row :gutter="24" style="text-align: center">
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.authImg5" :src="action + storeDetail.authImg5">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.authImg6" :src="action + storeDetail.authImg6">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.authImg7" :src="action + storeDetail.authImg7">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
            <el-col :span="6">
                <span class="main-item-value">
                    <img v-if="storeDetail.authImg8" :src="action + storeDetail.authImg8">
                    <img v-else src="../../assets/image/listImg/no.jpg">
                </span>  <!--正式环境-->
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import API from "../../api";

    export default {
        data() {
            return {
                id: "",
                storeDetail: {
                    whName: '',
                    whRegion: '',
                    whAddress: '',
                    contRole: '',
                    contName: '',
                    contTel: '',
                    contEmail: '',
                    companyName: '',
                    authStatus: '',
                    authTime: '',
                    authRemarks: '',
                    whAtt: '',
                    minPrice: '',
                    minSpace: '',
                    availSpace: '',
                    totalSpace: '',
                    storeType: '',
                    serviceType: '',
                    whType: '',
                    bottomHigh: '',
                    minRent: '',
                    bounded: '',
                    buildedYear: '',
                    buildingState: '',
                    safety: '',
                    fireInspected: '',
                    fireGrade: '',
                    floorMaterial: '',
                    floorFunction: '',
                    security: '',
                    facilities: '',
                    structure: '',
                    powerVoltage: '',
                    gateCount: '',
                    des: '',
                    baseImg1: '',
                    baseImg2: '',
                    baseImg3: '',
                    baseImg4: '',
                    baseImg5: '',
                    baseImg6: '',
                    baseImg7: '',
                    baseImg8: '',
                    authImg1: '',
                    authImg2: '',
                    authImg3: '',
                    authImg4: '',
                    authImg5: '',
                    authImg6: '',
                    authImg7: '',
                    authImg8: '',
                },
                ruleForm: {},
                action: 'https://file.qincangyuncang.com',
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            // 初始化
            init() {
                // 获取路由参数
                let routeParams = this.$route.query;
                this.id = routeParams.id;
                this.query();
                console.log("--路由--", routeParams, this.id);
            },
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        alert("submit!");
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 查看详情
            query() {
                let params = {
                    id: this.id || ""
                };
                API.Tabs.getdetails(params).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.storeDetail = res.data;
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .main {
        padding: 20px;

        .main-item-name {
            font-size: 16px;
            color: #2a2d2c;
            line-height: 32px;
            margin: 10px;
            padding: 20px 5px 10px 5px;
        }

        .main-item-value {
            font-size: 15px;
            color: #858e89;

            img {
                width: 100px;
                height: 100px;
            }
        }
    }

</style>
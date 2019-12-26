<template>
    <div class="mian" v-loading="loading">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
<!--                <el-col :span="8">-->
<!--                    <el-form-item class="itemSty" label="客户名称" prop="rolesId">-->
<!--                        &lt;!&ndash;                        <el-input v-model="ruleForm.customId"></el-input>&ndash;&gt;-->
<!--                        <el-select v-model="rolesId" placeholder="请选择">-->
<!--                            <el-option-->
<!--                                    v-for="item in roles"-->
<!--                                    :label="item.name"-->
<!--                                    :value="item.customId">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
                <el-col :span="8">
                    <el-form-item class="itemSty" label="仓库名" prop="whName">
                        <el-input v-model="ruleForm.whName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="区域" prop="whRegion">
                        <el-cascader
                                v-model="ruleForm.whRegion"
                                :options="cityList"
                                @change="handleChange"
                                :props="props"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="出入口个数" prop="gateCount">
                        <el-input v-model="ruleForm.gateCount"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--      <el-form-item label="仓库经度" >-->
            <!--        <el-input v-model="ruleForm.whLocationLng"></el-input>-->
            <!--      </el-form-item>-->
            <!--      <el-form-item label="仓库维度">-->
            <!--        <el-input v-model="ruleForm.whLocationLat"></el-input>-->
            <!--      </el-form-item>-->
            <el-row>
                <el-col :span="8">
                    <el-form-item label="仓库地址" prop="whAddress">
                        <el-input v-model="ruleForm.whAddress" @keyup.enter.native="getLocation"
                                  @change="getLocation"
                                  placeholder="输入仓库地址后请按回车键"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系人身份" prop="contRole">
                        <!--                        <el-input v-model="ruleForm.contRole"></el-input>-->
                        <el-select v-model="ruleForm.contRole" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系人姓名" prop="contName">
                        <el-input v-model="ruleForm.contName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="联系人电话" prop="contTel">
                        <el-input v-model="ruleForm.contTel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系人邮箱" prop="contEmail">
                        <el-input v-model="ruleForm.contEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="公司名称" prop="companyName">
                        <el-input v-model="ruleForm.companyName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <!--                    <el-form-item label="认证状态" prop="name">-->
                    <!--                        <el-input v-model="ruleForm.authStatus"></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="认证状态" :label-width="formLabelWidth" style="" prop="authStatus">
                        <el-select v-model="ruleForm.authStatus" placeholder="请选择">
                            <el-option label="已认证" value="0"></el-option>
                            <el-option label="未认证" value="1"></el-option>
                            <el-option label="未通过" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="租赁起价" prop="minPrice">
                        <el-input v-model="ruleForm.minPrice"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="起租面积" prop="minSpace">
                        <el-input v-model="ruleForm.minSpace"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="可租面积" prop="availSpace">
                        <el-input v-model="ruleForm.availSpace"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="总面积" prop="totalSpace">
                        <el-input v-model="ruleForm.totalSpace"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="存储类型" prop="storeType">
                        <!--                        <el-input v-model="ruleForm.storeType"></el-input>-->
                        <el-select v-model="ruleForm.storeType" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in storage"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="服务类型">
                        <!--                        <el-input v-model="ruleForm.serviceType"></el-input>-->
                        <el-checkbox-group v-model="serviceValue" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(item,index) in serviceList" :label="item" :key="index">{{item}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="仓库类型" prop="whType">
                        <!--                        <el-input v-model="ruleForm.whType"></el-input>-->
                        <el-select v-model="ruleForm.whType" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in warehouse"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="底层层高" prop="bottomHigh">
                        <el-input v-model="ruleForm.bottomHigh"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="起租期限" prop="minRent">
                        <el-input v-model="ruleForm.minRent"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="建造年代" prop="buildedYear">
                        <!--                        <el-input v-model="ruleForm.buildedYear"></el-input>-->
                        <el-select v-model="ruleForm.buildedYear" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in builting"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="建造状态" prop="buildingState">
                        <!--                        <el-input v-model="ruleForm.buildingState"></el-input>-->
                        <el-select v-model="ruleForm.buildingState" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in buildType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="耐火等级" prop="safety">
                        <!--                        <el-input v-model="ruleForm.safety"></el-input>-->
                        <el-select v-model="ruleForm.safety" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in fire"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="防火等级" prop="fireGrade">
                        <!--                        <el-input v-model="ruleForm.fireGrade"></el-input>-->
                        <el-select v-model="ruleForm.fireGrade" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in firewall"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="地坪材质" prop="floorMaterial">
                        <!--                        <el-input v-model="ruleForm.floorMaterial"></el-input>-->
                        <el-select v-model="ruleForm.floorMaterial" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in terrace"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="地坪功能" prop="floorFunction">
                        <!--                        <el-input v-model="ruleForm.floorFunction"></el-input>-->
                        <el-select v-model="ruleForm.floorFunction" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in terraces"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="园区安保" prop="security">
                        <!--                        <el-input v-model="ruleForm.security"></el-input>-->
                        <el-select v-model="ruleForm.security" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in garden"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="仓库设施" prop="facilities">
                        <!--                        <el-input v-model="ruleForm.facilities"></el-input>-->
                        <el-select v-model="ruleForm.facilities" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in facilities"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="建筑结构" prop="structure">
                        <!--                        <el-input v-model="ruleForm.structure"></el-input>-->
                        <el-select v-model="ruleForm.structure" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in building"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="供电电压" prop="powerVoltage">
                        <!--                        <el-input v-model="ruleForm.powerVoltage"></el-input>-->
                        <el-select v-model="ruleForm.powerVoltage" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in voltage"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="供电方式" prop="powerMethod">
                        <!--                        <el-input v-model="ruleForm.powerMethod"></el-input>-->
                        <el-select v-model="ruleForm.powerMethod" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in power"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="8">
                    <el-form-item label="品牌商" prop="brand">
                        <el-input v-model="ruleForm.brand"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="适用类型" prop="suitType">
                        <!--                        <el-input v-model="ruleForm.suitType"></el-input>-->
                        <el-select v-model="ruleForm.suitType" multiple clearable placeholder="请选择">
                            <el-option
                                    v-for="item in apply"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
<!--                <el-col :span="8">-->
<!--                    <el-form-item label="出入口个数" prop="gateCount">-->
<!--                        <el-input v-model="ruleForm.gateCount"></el-input>-->
<!--                    </el-form-item>-->
<!--                </el-col>-->
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="开具发票" prop="invoiced">
                        <el-radio-group v-model="ruleForm.invoiced">
                            <el-radio :label=true>是</el-radio>
                            <el-radio :label=false>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否自营" prop="selfRun">
                        <el-radio-group v-model="ruleForm.selfRun">
                            <el-radio :label=true>是</el-radio>
                            <el-radio :label=false>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否保税" prop="bounded">
                        <el-radio-group v-model="ruleForm.bounded">
                            <el-radio :label=true>是</el-radio>
                            <el-radio :label=false>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="消防检验" prop="fireInspected">
                        <el-radio-group v-model="ruleForm.fireInspected">
                            <el-radio :label=true>是</el-radio>
                            <el-radio :label=false>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="详情描述" prop="des">
                <el-input type="textarea" v-model="ruleForm.des"></el-input>
            </el-form-item>
            <el-form-item label="认证备注" prop="authRemarks">
                <el-input type="textarea" v-model="ruleForm.authRemarks"></el-input>
            </el-form-item>
            <el-form-item label="仓库图片" class="whimg">
                <el-upload
                        action=""
                        ref="upload"
                        :headers="headers"
                        :data="imgData"
                        list-type="picture"
                        :on-change="handleChange"
                        :file-list="fileList"
                        :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="认证图片" class="whimg">
                <el-upload
                        class="upload-demo"
                        action=""
                        list-type="picture"
                        ref="upload"
                        :headers="headers"
                        :data="imgData2"
                        :on-change="handleChange2"
                        :file-list="fileList2"
                        :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">
                    保存
                </el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import API from '../../api'
    import cityData from '../../utils/dataConfig/cityData'
    import axios from 'axios';

    export default {
        data() {
            return {
                loading: false,
                ruleForm: {
                    authStatus: '',
                    buildedYear: ''
                },
                headers: {
                    authorization: '',
                },
                rules: {
                    whName: [
                        {required: true, message: '请输入仓库名称', trigger: 'blur'},
                    ],
                    whRegion: [
                        {required: true, message: '请输入仓库区域', trigger: 'blur'},
                    ],
                    whAddress: [
                        {required: true, message: '请输入仓库地址', trigger: 'blur'},
                    ],
                    contTel: [
                        {required: true, message: '请输入电话', trigger: 'blur'},
                    ],
                    contRole: [
                        {required: true, message: '请输入联系人身份', trigger: 'blur'},
                    ],
                    contName: [
                        {required: true, message: '请输入联系人姓名', trigger: 'blur'},
                    ],
                    contEmail: [
                        {required: true, message: '请输入联系人邮箱', trigger: 'blur'},
                    ],
                    companyName: [
                        {required: true, message: '请输入公司名称', trigger: 'blur'},
                    ],
                    authStatus: [
                        {required: true, message: '请选择认证状态', trigger: 'blur'},
                    ],
                    minPrice: [
                        {required: true, message: '请输入租赁起价', trigger: 'blur'},
                    ],
                    minSpace: [
                        {required: true, message: '请输入起租面积', trigger: 'blur'},
                    ],
                    availSpace: [
                        {required: true, message: '请输入可租面积', trigger: 'blur'},
                    ],
                    totalSpace: [
                        {required: true, message: '请输入总面积', trigger: 'blur'},
                    ],
                    storeType: [
                        {required: true, message: '请选择存储类型', trigger: 'blur'},
                    ],
                    whType: [
                        {required: true, message: '请选择仓库类型', trigger: 'blur'},
                    ],
                    bottomHigh: [
                        {required: true, message: '请输入底层层高', trigger: 'blur'},
                    ],
                    minRent: [
                        {required: true, message: '请输入起租期限', trigger: 'blur'},
                    ],
                    buildedYear: [
                        {required: true, message: '请选择建造年代', trigger: 'blur'},
                    ],
                    buildingState: [
                        {required: true, message: '请选择建造状态', trigger: 'blur'},
                    ],
                    safety: [
                        {required: true, message: '请选择耐火等级', trigger: 'blur'},
                    ],
                    fireGrade: [
                        {required: true, message: '请选择防火等级', trigger: 'blur'},
                    ],
                    floorMaterial: [
                        {required: true, message: '请选择地坪材质', trigger: 'blur'},
                    ],
                    floorFunction: [
                        {required: true, message: '请选择地坪功能', trigger: 'blur'},
                    ],
                    security: [
                        {required: true, message: '请选择园区安保', trigger: 'blur'},
                    ],
                    facilities: [
                        {required: true, message: '请选择仓库设施', trigger: 'blur'},
                    ],
                    structure: [
                        {required: true, message: '请选择建筑结构', trigger: 'blur'},
                    ],
                    powerVoltage: [
                        {required: true, message: '请选择供电电压', trigger: 'blur'},
                    ],
                    powerMethod: [
                        {required: true, message: '请选择供电方式', trigger: 'blur'},
                    ],
                    brand: [
                        {required: true, message: '请输入品牌商', trigger: 'blur'},
                    ],
                    suitType: [
                        {required: true, message: '请选择适用类型', trigger: 'blur'},
                    ],
                    gateCount: [
                        {required: true, message: '请输入出入口个数', trigger: 'blur'},
                    ],
                    invoiced: [
                        {required: true, message: '请选择开具发票', trigger: 'blur'},
                    ],
                    selfRun: [
                        {required: true, message: '请选择是否自营', trigger: 'blur'},
                    ],
                    bounded: [
                        {required: true, message: '请选择是否保税', trigger: 'blur'},
                    ],
                    fireInspected: [
                        {required: true, message: '请选择消防检验', trigger: 'blur'},
                    ],
                    des: [
                        {required: true, message: '请输入详情描述', trigger: 'blur'},
                    ],
                    authRemarks: [
                        {required: true, message: '请输入认证备注', trigger: 'blur'},
                    ],
                },
                location: {x: 0, y: 0},
                fileList: [],
                imgList: [],
                fileList2: [],
                imgList2: [],
                userInfo: {},
                imgData: {},
                imgData2: {},
                itemWith: 12,
                rolesId: '',
                roles: [],
                contRole: '',

                formLabelWidth: '100px',
                serviceList: [
                    '仓库租赁',
                    '仓配一体服务',
                    '电商服务'
                ],
                serviceValue: [],
                //身份
                options: [{
                    value: '仓库业主',
                    label: '仓库业主'
                }, {
                    value: '运营方',
                    label: '运营方'
                }, {
                    value: '二房东',
                    label: '二房东'
                }],
                value: '',
                storage: [{
                    value: '普通仓'
                }, {
                    value: '恒温仓'
                }, {
                    value: '冷冻仓'
                }, {
                    value: '危险品仓'
                }, {
                    value: '化工仓'
                }],
                warehouse: [{
                    value: '平库'
                }, {
                    value: '高台库'
                }, {
                    value: '坡道库'
                }, {
                    value: '楼库'
                }, {
                    value: '立体库'
                }, {
                    value: '其他'
                }],
                builting: [{
                    value: "2019年"
                }, {
                    value: "2018年"
                }, {
                    value: "2017年"
                }, {
                    value: "2016年"
                }, {
                    value: "2015年"
                }, {
                    value: "2014年"
                }, {
                    value: "2013年"
                }, {
                    value: "2012年"
                }, {
                    value: "2011年"
                }, {
                    value: "2010年"
                }, {
                    value: "2009年"
                }, {
                    value: "2008年"
                }, {
                    value: "2007年"
                }, {
                    value: "2006年"
                }, {
                    value: "2005年"
                }, {
                    value: "2004年"
                }, {
                    value: "2003年"
                }, {
                    value: "2002年"
                }, {
                    value: "2001年"
                },],
                buildType: [{
                    value: '建设中'
                }, {
                    value: '已建成'
                }],
                fire: [{
                    value: '1',
                    label: '一级',
                }, {
                    value: '2',
                    label: '二级',
                }, {
                    value: '3',
                    label: '三级',
                }, {
                    value: '4',
                    label: '四级',
                }],
                firewall: [{
                    value: '1',
                    label: '一级',
                }, {
                    value: '2',
                    label: '二级',
                }, {
                    value: '3',
                    label: '三级',
                }, {
                    value: '4',
                    label: '四级',
                }],

                terrace: [{
                    value: '混凝土'
                }, {
                    value: '地砖'
                }, {
                    value: '环氧'
                }, {
                    value: '金刚砂'
                }, {
                    value: '水泥'
                }],
                terraces: [
                    {
                        value: '耐磨'
                    }, {
                        value: '防尘'
                    }, {
                        value: '防潮'
                    }],
                garden: [{
                    value: '警钟、连线报警灯'
                }, {
                    value: '园区保安'
                }, {
                    value: '视频监控'
                }, {
                    value: '红外感应'
                }, {
                    value: '电子围栏'
                }],
                facilities: [{
                    value: '月台'
                }, {
                    value: '雨棚'
                }, {
                    value: '电梯'
                }, {
                    value: '办公室'
                }, {
                    value: '停车场'
                }, {
                    value: '宿舍'
                }, {
                    value: '食堂'
                }],
                building: [{
                    value: '钢架结构'
                }, {
                    value: '砖混结构'
                }, {
                    value: '钢混结构'
                }, {
                    value: '其他'
                }],
                power: [{
                    value: '双电路'
                }, {
                    value: '单电路'
                }, {
                    value: '发电机'
                }],
                voltage: [{
                    value: '220V'
                }, {
                    value: '380V'
                }],
                apply: [{
                    value: '无'
                }, {
                    value: '适用于丙一类'
                }, {
                    value: '适用于丙二类'
                }, {
                    value: '其他'
                }],
                cityList: [],
                props: {
                    label: 'label',
                    value: 'label',
                    children: 'children'
                }
            };
        },
        created() {
            this.init();
        },
        methods: {
            // 初始化
            init() {
                // 获取路由参数
                let routeParams = this.$route.query;
                this.id = routeParams.id;
                this.query();
                console.log('cityData', cityData)
                this.getUserInfo();
                this.getClient()

            },
            // 查看详情
            query() {
                let params = {
                    id: this.id || ""
                };
                API.Tabs.getdetails(params).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        this.ruleForm = res.data;
                        if (this.ruleForm.serviceType != '') {
                            this.serviceValue = this.ruleForm.serviceType.split(',')
                        } else {
                            this.serviceValue = ''
                        }
                        if (this.ruleForm.whRegion && this.ruleForm.whRegion !== '') {
                            this.ruleForm.whRegion = this.ruleForm.whRegion.split(',')
                        } else {
                            this.ruleForm.whRegion = []
                        }
                        this.ruleForm.authStatus = String(this.ruleForm.authStatus)
                        if (this.ruleForm.storeType != '') {
                            this.ruleForm.storeType = this.ruleForm.storeType.split(',')
                        }
                        if (this.ruleForm.whType != '') {
                            this.ruleForm.whType = this.ruleForm.whType.split(',')
                        }
                        if (this.ruleForm.floorMaterial != '') {
                            this.ruleForm.floorMaterial = this.ruleForm.floorMaterial.split(',')
                        }
                        if (this.ruleForm.floorFunction != '') {
                            this.ruleForm.floorFunction = this.ruleForm.floorFunction.split(',')
                        }
                        if (this.ruleForm.structure != '') {
                            this.ruleForm.structure = this.ruleForm.structure.split(',')
                        }
                        if (this.ruleForm.security != '') {
                            this.ruleForm.security = this.ruleForm.security.split(',')
                        }
                        if (this.ruleForm.facilities != '') {
                            this.ruleForm.facilities = this.ruleForm.facilities.split(',')
                        }
                        if (this.ruleForm.powerMethod != '') {
                            this.ruleForm.powerMethod = this.ruleForm.powerMethod.split(',')
                        }
                        if (this.ruleForm.suitType != '') {
                            this.ruleForm.suitType = this.ruleForm.suitType.split(',')
                        }
                        if (this.ruleForm.fireGrade) {
                            this.ruleForm.fireGrade = String(this.ruleForm.fireGrade)
                        }
                        if (this.ruleForm.safety) {
                            this.ruleForm.safety = String(this.ruleForm.safety)
                        }
                        // for (let key in this.ruleForm) {
                        //     if(key.startsWith('authImg')) {
                        //         this.fileList.push({url: this.ruleForm[key]})
                        //     } else if(key.startsWith('baseImg')) {
                        //         this.fileList2.push({url: this.ruleForm[key]})
                        //     }
                        // }
                    }
                });
            },
            // 获取用户信息
            getUserInfo() {
                this.cityList = cityData.result
                let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                this.headers.authorization = JSON.parse(localStorage.getItem('authorization ',));
                console.log('userInfo', userInfo);
                this.userInfo = userInfo;
            },
            submitForm(formName) {
                console.log('formName', this.serviceValue, this.ruleForm, this.ruleForm.whName)
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.ruleForm.serviceType = this.serviceValue.join(',')
                        if (this.ruleForm.facilities.length !== 0) {
                            this.ruleForm.facilities = this.ruleForm.facilities.join(',')
                        } else {
                            this.ruleForm.facilities = ''
                        }
                        if (this.ruleForm.whRegion && this.ruleForm.whRegion.length !== 0) {
                            this.ruleForm.whRegion = this.ruleForm.whRegion.join(',')
                        } else {
                            this.ruleForm.whRegion = ''
                        }
                        if (this.ruleForm.floorFunction.length !== 0) {
                            this.ruleForm.floorFunction = this.ruleForm.floorFunction.join(',')
                        } else {
                            this.ruleForm.floorFunction = ''
                        }
                        if (this.ruleForm.floorMaterial.length !== 0) {
                            this.ruleForm.floorMaterial = this.ruleForm.floorMaterial.join(',')
                        } else {
                            this.ruleForm.floorMaterial = ''
                        }
                        if (this.ruleForm.powerMethod.length !== 0) {
                            this.ruleForm.powerMethod = this.ruleForm.powerMethod.join(',')
                        } else {
                            this.ruleForm.powerMethod = ''
                        }
                        if (this.ruleForm.security.length !== 0) {
                            this.ruleForm.security = this.ruleForm.security.join(',')
                        } else {
                            this.ruleForm.security = ''
                        }
                        if (this.ruleForm.storeType.length !== 0) {
                            this.ruleForm.storeType = this.ruleForm.storeType.join(',')
                        } else {
                            this.ruleForm.storeType = ''
                        }
                        if (this.ruleForm.structure.length !== 0) {
                            this.ruleForm.structure = this.ruleForm.structure.join(',')
                        } else {
                            this.ruleForm.structure = ''
                        }
                        if (this.ruleForm.suitType.length !== 0) {
                            this.ruleForm.suitType = this.ruleForm.suitType.join(',')
                        } else {
                            this.ruleForm.suitType = ''
                        }
                        if (this.ruleForm.whType.length !== 0) {
                            this.ruleForm.whType = this.ruleForm.whType.join(',')
                        } else {
                            this.ruleForm.whType = ''
                        }
                        /* 上传图片 */
                        if (this.ruleForm.whName !== undefined && this.ruleForm.whName !== null && this.ruleForm.whName !== '') {
                            this.imgUpload();
                            this.imgUpload2();
                            // let id = `${this.userInfo.userId}/${this.ruleForm.whName}/仓库认证图片`
                            // this.imgData.id = id
                            // console.log('this.imgData',this.imgData)
                            // this.$refs.upload.submit();
                        } else {
                            return this.$message({
                                type: 'error',
                                message: '请填写仓库名'
                            })
                        }
                        setTimeout(() => {
                            console.log(this.ruleForm)
                            let params = JSON.parse(JSON.stringify(this.ruleForm));
                            params.whLocationLng = Number(params.whLocationLng); // 经度
                            params.whLocationLat = Number(params.whLocationLat); // 维度
                            params.authStatus = Number(params.authStatus); // 认证状态
                            params.selfRun = Boolean(params.selfRun); // 是否自营
                            params.bounded = Boolean(params.bounded); // 是否保税
                            params.invoiced = Boolean(params.invoiced); // 开具发票
                            params.fireInspected = Boolean(params.fireInspected); // 消防校验
                            params.minPrice = Number(params.minPrice); // 租赁起价
                            params.minSpace = Number(params.minSpace); // 起租面积
                            params.availSpace = Number(params.availSpace); // 可租面积
                            params.totalSpace = Number(params.totalSpace); // 总面积
                            params.minRent = Number(params.minRent); // 起租期限
                            params.bottomHigh = Number(params.bottomHigh); // 底层层高
                            params.safety = Number(params.safety); // 耐火等级
                            params.fireGrade = Number(params.fireGrade); // 防火等级
                            params.gateCount = Number(params.gateCount); // 出入口个数0
                            console.log(params);
                            API.Tabs.storeEdit(params).then(res => {
                                console.log(res);
                                if (res.code == 200) {
                                    this.$message.success({
                                        type: 'success',
                                        message: res.message
                                    })
                                    this.loading = false;
                                    this.$router.push({path: '/tabs'})
                                } else {
                                    this.$message.warning({
                                        type: 'warn',
                                        message: res.message
                                    })
                                }
                            })
                        }, 500)


                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
                /* 上传图片-end */
                // this.$router.push({path: '/tabs'})
                // this.ruleForm = ''
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm = '';
            },
            // 获取经纬度
            getLocation() {
                let params = {
                    key: '677b3e3a3366f0b6cc298f0e89e6bd26',
                    s: 'rsv3',
                    address: this.ruleForm.whAddress

                }
                console.log('获取经纬度')
                this.$store.dispatch('changeMapState')
                API.Tabs.getLocation(params).then(res => {
                    this.$store.dispatch('changeMapState')
                    if (res.info == 'OK') {
                        let location = res.geocodes[0].location.split(',')
                        this.ruleForm.whLocationLng = location[0]
                        this.ruleForm.whLocationLat = location[1]
                        console.log(this.ruleForm)
                    }
                    console.log(res);
                })
            },
            handleChange(file, fileList) {
                this.imgList = fileList
            },
            handleChange2(file, fileList) {
                this.imgList2 = fileList
            },
            // 批量上传图片仓库信息
            imgUpload() {
                /*  id/warehouse/info*/
                let id = `${this.userInfo.userId}/warehouse/info`
                let imgList = [];
                console.log('---', this.imgList)
                if (this.imgList) {
                    this.imgList.forEach(item => {
                        imgList.push(item.raw)
                    })
                    imgList.forEach((item, index) => {
                        let formDate = new FormData();
                        formDate.append('id', id);
                        formDate.append(`file`, imgList[index]);
                        console.log('formDate', formDate)
                        API.Tabs.uploadImg(formDate).then(res => {
                            if (res.code == 200) {
                                let imgName = 'baseImg' + (index + 1);
                                this.ruleForm[imgName] = res.data;
                                console.log(this.ruleForm)
                            }
                        })
                    })

                }

            },
            // 批量上传图片认证
            imgUpload2() {
                /* id/warehouse/auth*/
                let id = `${this.userInfo.userId}/warehouse/auth`
                let imgList = [];
                this.imgList2.forEach(item => {
                    imgList.push(item.raw)
                })
                imgList.forEach((item, index) => {
                    let formDate = new FormData();
                    formDate.append('id', id);
                    formDate.append(`file`, imgList[index]);
                    console.log('formDate', formDate)
                    API.Tabs.uploadImg(formDate).then(res => {
                        if (res.code == 200) {
                            let imgName = 'authImg' + (index + 1);
                            this.ruleForm[imgName] = res.data;
                        }
                    })
                })
            },
            //  获取用户ID
            getClient() {
                API.Tabs.getCustomList().then(res => {
                    if (res.code == 200) {
                        console.log(res);
                        this.roles = res.data.rows
                    }
                })
            },
            handleCheckedCitiesChange(value) {
                console.log(value)
            }
        }
    };
</script>

<style>
    .el-upload--text {
        /*height: 10%;*/
        /*width: 30%;*/
    }
</style>
<style lang="less" scoped>
    .mian {
        width: 100%;

        .whimg {
            width: 23%;
        }
    }
</style>
<template>
  <!-- <section class="main">
        
  </section>-->
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="#" width="50"></el-table-column>
          <el-table-column prop="date" label="用户ID" sortable></el-table-column>
          <el-table-column prop="name" label="招商单号"></el-table-column>
          <el-table-column prop="name" label="面积"></el-table-column>
          <el-table-column prop="name" label="区域"></el-table-column>
          <el-table-column prop="address" label="手机号" </el-table-column>
          <el-table-column prop="address" label="审核状态"></el-table-column>
          <el-table-column prop="address" label="类型"></el-table-column>
          <el-table-column prop="address" label="启租日期" ></el-table-column>
          <el-table-column prop="address" label="到租日期" ></el-table-column>
          <el-table-column prop="address" label="备注" ></el-table-column>
          <el-table-column prop="address" label="生成时间"></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import API from '../../api/strategy/i18n'
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods:{

  }
};
</script>

<style scoped>
  
</style>


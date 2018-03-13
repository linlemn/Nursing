<template>
    <div>
      <el-container>
        <el-header class="sub-header">
          <el-row>
            <el-col :span="6" :offset="9">
              入院申请
            </el-col>
            <el-col :span="1" :offset="3">
              <el-button type="success" plain size="small">新增</el-button>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="primary" plain size="small">修改</el-button>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="danger" plain size="small">删除</el-button>
            </el-col>
          </el-row>
          <el-row class="header-row">
              <el-form :inline="true" :model="searchForm" label-width="80px">
                <el-col :span="6" :offset="-2">
                  <el-form-item label="姓名">
                    <el-input v-model="searchForm.name" placeholder="请输入姓名" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="-2" class="select-box">
                  <el-form-item label="流程状态">
                    <multiselect v-model="searchForm.processState" :options="processStateOps" placeholder="请选择">
                    </multiselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="-2" class="select-box">
                  <el-form-item label="状态" >
                      <multiselect v-model="searchForm.state" :options="stateOps" placeholder="请选择" >
                      </multiselect>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <!-- <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item> -->
                </el-col>
              </el-form>
          </el-row>
        </el-header>
      </el-container>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
      Multiselect
  },
  data() {
    return {
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        searchForm: {
          name: "",
          processState: "",
          state: ""
        },
        processStateOps:["全部", "入驻申请"],
        stateOps: ["全部", "正常", "删除"],

    }
  },
  methods: {

  },
}
</script>

<style>
.header-row {
  margin-top: 10px;
}
.sub-header {
  background: white;
  margin-bottom: 20px;
}
.select-box {
    line-height: 0;
}

</style>
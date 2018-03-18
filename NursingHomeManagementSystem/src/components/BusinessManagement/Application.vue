<template>
    <div>
      <el-container>
        <el-header class="sub-header">
          <el-row>
            <el-col :span="6" :offset="9">
              入住申请
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
        </el-header>
        <el-main>
          <el-row class="header-row">
            <el-col :span="24">
              <el-card>
                <div slot="header">
                  <el-row>
                    <el-form :inline="true" :model="searchForm" label-width="70px">
                      <el-col :span="7">
                        <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]">
                          <el-input v-model="searchForm.name" placeholder="请输入姓名" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="流程状态">
                          <div class="select-box">
                            <multiselect v-model="searchForm.processState" :options="processStateOps" placeholder="请选择"></multiselect>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="状态" >
                          <div class="select-box">
                            <multiselect v-model="searchForm.state" :options="stateOps" placeholder="请选择" ></multiselect>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="3">
                        <el-form-item>
                          <el-button type="primary" @click="onSearch" size="small">查询</el-button>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </el-row>
                </div>
                <div>
                  <el-table
                    :data="searchResult"
                    height="250"
                    border
                    style="width: 100%"
                    @selection-change="handleSeclection">
                    <el-table-column
                    type="selection"
                    fixed
                    ></el-table-column>
                    <el-table-column
                      prop="id"
                      label="序号"
                      fixed>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别">
                    </el-table-column>
                    <el-table-column
                      prop="birth"
                      label="出生日期">
                    </el-table-column>
                    <el-table-column
                      prop="hometown"
                      label="籍贯">
                    </el-table-column>
                    <el-table-column
                      prop="nationality"
                      label="民族">
                    </el-table-column>    
                    <el-table-column
                      prop="marriageStatus"
                      label="婚姻状态">
                    </el-table-column> 
                    <el-table-column
                      prop="politicsStatus"
                      label="政治面貌">
                    </el-table-column>   
                    <el-table-column
                      prop="processStatus"
                      label="流程状态">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </template>                      
                    </el-table-column>                                                                            
                  </el-table>
                </div>  
              </el-card>
            </el-col>
          </el-row>
        </el-main>
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
        searchForm: {
          name: "",
          processState: "",
          state: ""
        },
        processStateOps:["全部", "入驻申请"],
        stateOps: ["全部", "正常", "删除"],
        searchResult: [{
          id: "",
          name: "",
          gender: "",
          birth: "",
          hometown: "",
          nationality: "",
          marriageStatus: "",
          politicsStatus: "",
          processStatus: ""
        }],
    }
  },
  methods: {
    onSearch: function() {

    },
    handleSelection: function() {

    },
    handleDelete: function() {

    }
  },
}
</script>

<style>
.header-row {
  margin-top: 0px;
}
.sub-header {
  background: white;
  padding: 20px;
}
.select-box {
    line-height: 0;
}

</style>
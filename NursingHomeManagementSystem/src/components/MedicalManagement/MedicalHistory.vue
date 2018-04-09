<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            病史记录管理
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="addMedicalHistoryFormVisible = true">新增</el-button>
            <el-dialog title="添加病史记录" :visible.sync="addMedicalHistoryFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="addMedicalHistoryForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="addMedicalHistoryForm.storeyNo" placeholder="请选择" size="small">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="addMedicalHistoryForm.roomNo" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input v-model="addMedicalHistoryForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>                                    
                </el-row>  
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="病史介绍">
                      <el-checkbox-group v-model="addMedicalHistoryForm.historyData" size="small">
                        <el-checkbox label="高血压" border></el-checkbox>
                        <el-checkbox label="脑血管意外" border></el-checkbox>
                        <el-checkbox label="心肌梗死" border></el-checkbox>
                        <el-checkbox label="帕金森氏症" border></el-checkbox>
                        <el-checkbox label="郁闷倾向" border></el-checkbox>
                        <el-checkbox label="老年性痴呆" border></el-checkbox>
                        <el-checkbox label="癫痫" border></el-checkbox>
                        <el-checkbox label="肺气肿" border></el-checkbox>
                        <el-checkbox label="慢性消化系统疾病" border></el-checkbox>
                        <el-checkbox label="泌尿系统" border></el-checkbox>
                        <el-checkbox label="糖尿病" border></el-checkbox>
                        <el-checkbox label="皮肤病" border></el-checkbox>
                        <el-checkbox label="肿瘤" border></el-checkbox>
                        <el-checkbox label="肢体骨折" border></el-checkbox>
                        <el-checkbox label="骨质疏松" border></el-checkbox>
                        <el-checkbox label="白内障" border></el-checkbox>
                        <el-checkbox label="青光眼" border></el-checkbox>
                        <el-checkbox label="弱视" border></el-checkbox>
                        <el-checkbox label="失明" border></el-checkbox>
                        <el-checkbox label="听力受损（中）" border></el-checkbox>
                        <el-checkbox label="听力受损（重）" border></el-checkbox>
                        <el-checkbox label="失聪" border></el-checkbox>
                      </el-checkbox-group>                  
                    </el-form-item>                    
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="其他疾病">
                      <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="addMedicalHistoryForm.otherDisease">
                        </el-input>
                    </el-form-item>                    
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="诊断日期">
                      <el-input v-model="addMedicalHistoryForm.diagnoseDate" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>              
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addMedicalHistoryFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>              
            </el-dialog>
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
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <el-form :inline="true" label-position="left" :model="medicalHistoryForm" label-width="60px">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="楼层">
                        <el-select v-model="medicalHistoryForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="medicalHistoryForm.roomNo" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="姓名">
                        <el-input v-model="medicalHistoryForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input v-model="medicalHistoryForm.roomNo" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults" height="250" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="storeyNo" label="楼层" fixed>
                  </el-table-column>
                  <el-table-column prop="roomNo" label="房间号" fixed>
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" fixed>
                  </el-table-column>
                  <el-table-column prop="age" label="年龄"></el-table-column>
                  <el-table-column prop="marriageStatus" label="婚姻情况">
                  </el-table-column>
                  <el-table-column prop="historyStatus" label="病史情况">
                  </el-table-column>
                  <el-table-column prop="diagnoseDate" label="诊断时间">
                  </el-table-column>
                  <el-table-column label="操作" fixed="right">
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
export default {
  data() {
    return {
        medicalHistoryForm: {
          storeyNo: "",
          roomNo: "",
          bedNo: "",
          name: ""
        },
        storeys: [{
            value: "选项1",
            label: "1楼"
          },
          {
            value: "选项2",
            label: "2楼"
          },
          {
            value: "选项3",
            label: "3楼"
          },
          {
            value: "选项4",
            label: "4楼"
          }
        ],
        searchResults: [],
        addMedicalHistoryFormVisible: false,
        addMedicalHistoryForm: [],
        upadateMedicalHistoryFormVisible: false,

    }
  },
  methods: {
    handleDeletion: function() {

    },
    handleAddSubmit: function() {

    },
  }
}
</script>

<style scoped> 

</style>
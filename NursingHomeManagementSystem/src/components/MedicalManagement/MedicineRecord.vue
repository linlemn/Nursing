<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            药品出入库管理
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="addMedicineRecordFormVisible = true">新增</el-button>
            <el-dialog title="添加病史记录" :visible.sync="addMedicineRecordFormVisible" width="80%" style="text-align: left">
              <el-form label-width="200px" v-model="addMedicineRecordForm">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="药名">
                      <el-input v-model="addMedicineRecordForm.medicineName" size="small" placeholder="输入药名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="数量">
                      <el-input v-model="addMedicineRecordForm.amount" size="small" placeholder="输入数量">
                      </el-input>
                    </el-form-item>
                  </el-col>                                  
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="批单">
                      <el-input v-model="addMedicineRecordForm.endorsements" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="零单">
                      <el-input v-model="addMedicineRecordForm.retail" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>                                  
                </el-row>                                  
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="类型">
                      <el-input v-model="addMedicineRecordForm.type" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="日期">
                      <el-input v-model="addMedicineRecordForm.date" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>                                  
                </el-row> 
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="备注">
                      <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="addMedicineRecordForm.remarks">
                        </el-input>
                    </el-form-item>                    
                  </el-col>
                </el-row>              
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addMedicineRecordVisible = false">取 消</el-button>
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
                <el-form :inline="true" label-position="left" :model="medicineRecordForm" label-width="70px">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="药品名称">
                        <el-input v-model="medicineRecordForm.medicineName" size="small" placeholder="输入药品名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="日期">
                        <el-input v-model="medicineRecordForm.medicineDate" size="small" placeholder="输入日期"></el-input>
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
                  <el-table-column prop="name" label="药品名称" fixed>
                  </el-table-column>
                  <el-table-column prop="amount" label="数量" fixed>
                  </el-table-column>
                  <el-table-column prop="type" label="出入类型" fixed>
                  </el-table-column>
                  <el-table-column prop="endorsements" label="批单" fixed>
                  </el-table-column>
                  <el-table-column prop="retail" label="零单" >
                  </el-table-column>
                  <el-table-column prop="operationTime" label="操作时间">
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
        medicineRecordForm: {
          date: "",
          medicineName: ""
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
        roomNos: [],
        searchResults: [],
        addMedicineRecordFormVisible: false,
        addMedicineRecordForm: [],
        upadateMedicineRecordFormVisible: false,

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

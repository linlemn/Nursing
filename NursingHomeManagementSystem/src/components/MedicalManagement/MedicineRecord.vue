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
            <el-dialog title="添加药品出入库记录" :visible.sync="addMedicineRecordFormVisible" width="80%" style="text-align: left">
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
                      <el-input v-model="addMedicineRecordForm.number" size="small" placeholder="输入数量">
                      </el-input>
                    </el-form-item>
                  </el-col>                                  
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="批单">
                      <el-input v-model="addMedicineRecordForm.batchOrders" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="零单">
                      <el-input v-model="addMedicineRecordForm.retailOrders" size="small" placeholder="请输入">
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
                      <el-date-picker
                        v-model="addMedicineRecordForm.date"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>  
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
                          v-model="addMedicineRecordForm.note">
                        </el-input>
                    </el-form-item>                    
                  </el-col>
                </el-row>              
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addMedicineRecordFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>              
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
            <el-dialog title="添加药品出入库记录" :visible.sync="updateMedicineRecordFormVisible" width="80%" style="text-align: left">
              <el-form label-width="200px" v-model="updateMedicineRecordForm">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="药名">
                      <el-input v-model="updateMedicineRecordForm.medicineName" size="small" placeholder="输入药名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="数量">
                      <el-input v-model="updateMedicineRecordForm.number" size="small" placeholder="输入数量">
                      </el-input>
                    </el-form-item>
                  </el-col>                                  
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="批单">
                      <el-input v-model="updateMedicineRecordForm.batchOrders" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="零单">
                      <el-input v-model="updateMedicineRecordForm.retailOrders" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>                                  
                </el-row>                                  
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="类型">
                      <el-input v-model="updateMedicineRecordForm.type" size="small" placeholder="请输入">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="日期">
                      <el-date-picker
                        v-model="updateMedicineRecordForm.date"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker> 
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
                          v-model="updateMedicineRecordForm.note">
                        </el-input>
                    </el-form-item>                    
                  </el-col>
                </el-row>              
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateMedicineRecordFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleModifySubmit">提 交</el-button>
              </div>              
            </el-dialog>            
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="handleDeletion">删除</el-button>
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
                        <el-input v-model="medicineRecordForm.name" size="small" placeholder="输入药品名称"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="日期">
                        <el-date-picker
                          v-model="medicineRecordForm.date"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>                        
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary" @click="onSearch">查询</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults" border style="width: 100%" highlight-current-row @current-change="handleSelection">
                  <el-table-column prop="medicineName" label="药品名称" fixed>
                  </el-table-column>
                  <el-table-column prop="number" label="数量" fixed>
                  </el-table-column>
                  <el-table-column prop="type" label="出入类型" fixed>
                  </el-table-column>
                  <el-table-column prop="batchOrders" label="批单" fixed>
                  </el-table-column>
                  <el-table-column prop="retailOrders" label="零单" >
                  </el-table-column>
                  <el-table-column prop="date" label="操作时间">
                  </el-table-column>
                  <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
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
        roomNos: [{
            value: "选项1",
            label: "101"
          },
          {
            value: "选项2",
            label: "102"
          },
          {
            value: "选项3",
            label: "103"
          },
          {
            value: "选项4",
            label: "104"
          },
          {
            value: "选项5",
            label: "105"
          },
          {
            value: "选项6",
            label: "106"
          },
          {
            value: "选项7",
            label: "107"
          }
        ],
        searchResults: [],
        addMedicineRecordFormVisible: false,
        addMedicineRecordForm: {
          batchOrders: "",
          date: "",
          id: "",
          medicineName: "",
          note: "",
          number: "",
          retailOrders: "",
          type: "",
        },
        updateMedicineRecordForm: {
          batchOrders: "",
          date: "",
          id: "",
          medicineName: "",
          note: "",
          number: "",
          retailOrders: "",
          type: "",          
        },
        emptyForm: {
          batchOrders: "",
          date: "",
          id: "",
          medicineName: "",
          note: "",
          number: "",
          retailOrders: "",
          type: "",           
        },
        updateMedicineRecordFormVisible: false,
        middleUrl: "/drugAccess",
        idSelection: "",
        permanentResults:[],
    }
  },
    methods: {
      onSearch: function() {
        if (this.medicineRecordForm.date.length == 0 && this.medicineRecordForm.name.length == 0) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.results = this.permanentResults
        }
        var tempResults = []
        var count = 0
        for (var i in this.permanentResults) {
          if (this.checkValid(this.permanentResults[i])) {
            tempResults.push(this.permanentResults[i])
          }
          else {
            count += 1
          }
          
        }
        this.searchResults = tempResults
  
      },
      checkValid: function(val) {
        if (this.medicineRecordForm.name.length != 0) {
          if (val.medicineName.search(this.medicineRecordForm.name) == -1) {
            return false
          }
        }
        if (this.medicineRecordForm.date.length != 0) {
          if (val.date != this.medicineRecordForm.date) {
            return false
          }
        }                          
        return true
      },
      handleSelection: function(val) {
        if (val != null) {
          this.idSelection = val.id
        }
      },
      handleAddSubmit: function() {
        let self = this
        if (self.addMedicineRecordForm.medicineName.length == 0) {
          self.$message({
            message: '必填字段为空',
            type: 'error',
          });
          return
        }

        //发送请求
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/create',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.addMedicineRecordForm),
          success: function(data) {
            //解析返回的data
            console.log(data)
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.addMedicineRecordFormVisible = false
              self.getAllMedicineInfo()
              self.addMedicineRecordForm = self.emptyForm
            } else {
              self.$message({
                message: '创建失败',
                type: 'error',
              });
            }
          },
          error: function(err) {
            self.$alert('创建失败', '失败', {
              confirmButtonText: '确定'
            });
            console.log(err)
          }
        })
      },
      storeyChange: function(val) {
        switch (val) {
          case "1楼":
            this.changeRoomNo(1)
            break;
          case "2楼":
            this.changeRoomNo(2)
            break;
          case "3楼":
            this.changeRoomNo(3)
            break;
          case "4楼":
            this.changeRoomNo(4)
            break;
        }
  
      },
      changeRoomNo: function(val) {
        for (var i in this.roomNos) {
          var a = parseInt(i) + 1
          this.roomNos[i].label = val + "0" + a
        }
      },
      ableToModify: function() {  
        if (this.idSelection != "") {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i].id == this.idSelection) {
              this.updateMedicineRecordFormVisible = true
              this.updateMedicineRecordForm = this.permanentResults[i]
            }
          }
        } else {
          this.$message({
            message: '未选择修改对象！',
            type: 'error',
          });
        }
      },
      handleModifySubmit: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.updateMedicineRecordForm),
          success: function(data) {
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.updateMedicineRecordFormVisible = false
              self.getAllMedicineInfo()
            } else {
              self.$message({
                message: '提交失败',
                type: 'error',
              });
            }
          },
          error: function() {
            self.$message({
              message: '提交失败，请检查网络',
              type: 'error',
            });
          }
        })
      },
      getAllMedicineInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            self.searchResults = data.data
            self.permanentResults = data.data
            console.log(self.permanentResults)
          },
          error: function() {
            self.$message({
              message: '列表加载失败，请检查网络',
              type: 'error',
            });
          }
        })
      },
      handleDeletion: function() {
        if (this.idSelection == "") {
          this.$message({
            message: '未选择删除对象！',
            type: 'error',
          });
          return
        }
        this.handleDelete(this.idSelection)
      },
      handleDelete: function(id) {
        console.log(id)
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/delete',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: id
          }),
          success: function(data) {
            console.log(data)
            if (data[200] == "操作成功") {
              self.$message({
                message: '删除成功',
                type: 'success',
              });
              self.getAllMedicineInfo()
            } else {
              self.$message({
                message: '删除失败',
                type: 'error',
              });
            }
          },
          error: function() {
            self.$message({
              message: '删除失败，请检查网络',
              type: 'error',
            });
          }
        })
      },
    },
    mounted: function() {
      this.getAllMedicineInfo()
    }
}
</script>

<style scoped> 

</style>

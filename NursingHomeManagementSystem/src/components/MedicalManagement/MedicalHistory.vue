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
                      <el-select v-model="addMedicalHistoryForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="addMedicalHistoryForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input clearable v-model="addMedicalHistoryForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="病史介绍">
                      <el-checkbox-group v-model="illnessHistory" size="small">
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
                      <el-input clearable type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="addMedicalHistoryForm.otherIllness">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="诊断日期">
                    <el-date-picker v-model="addMedicalHistoryForm.diagnosisDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>                      
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
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
            <el-dialog title="修改病史记录" :visible.sync="updateMedicalHistoryFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="updateMedicalHistoryForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="updateMedicalHistoryForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="updateMedicalHistoryForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input clearable v-model="updateMedicalHistoryForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="病史介绍">
                      <el-checkbox-group v-model="illnessHistory" size="small">
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
                      <el-input clearable type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateMedicalHistoryForm.otherIllness">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="诊断日期">
                    <el-date-picker v-model="updateMedicalHistoryForm.diagnosisDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                    </el-date-picker>                      
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateMedicalHistoryFormVisible = false">取 消</el-button>
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
                <el-form :inline="true" label-position="left" :model="medicalHistoryForm" label-width="60px">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="楼层">
                        <el-select v-model="medicalHistoryForm.storeyNumber" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="medicalHistoryForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="姓名">
                        <el-input clearable v-model="medicalHistoryForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input clearable v-model="medicalHistoryForm.bedNumber" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary" @click="onSearch">查询</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" highlight-current-row @current-change="handleSelection">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="floor" label="楼层" fixed>
                  </el-table-column>
                  <el-table-column prop="roomNumber" label="房间号" fixed>
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" fixed>
                  </el-table-column>
                  <el-table-column prop="age" label="年龄"></el-table-column>
                  <el-table-column prop="marritalStatus" label="婚姻情况">
                  </el-table-column>
                  <el-table-column prop="medicalHistoryRecord" label="病史情况">
                  </el-table-column>
                  <el-table-column prop="diagnosisDate" label="诊断时间">
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
                <el-pagination small layout="prev, pager, next" :total="searchResults.length" :page-size="pagesize" @current-change="handleCurrentChange" :current-page="currentPage">
                </el-pagination>                                  
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
          floor: "",
          roomNumber: "",
          bedNumber: "",
          name: ""
        },
        storeys: [],
        roomNos: [],
        searchResults: [],
        addMedicalHistoryFormVisible: false,
        addMedicalHistoryForm: {
          age: "",
          diagnosisDate: "",
          floor: "",
          gender: "",
          id: "",
          maritalStatus: "",
          medicalHistoryRecord: "",
          name: "",
          otherIllness: "",
          roomNumber: "",
        },
        updateMedicalHistoryFormVisible: false,
        updateMedicalHistoryForm: {
          age: "",
          diagnosisDate: "",
          floor: "",
          gender: "",
          id: "",
          maritalStatus: "",
          medicalHistoryRecord: "",
          name: "",
          otherIllness: "",
          roomNumber: "",
        },
        emptyForm: {
          age: "",
          diagnosisDate: "",
          floor: "",
          gender: "",
          id: "",
          maritalStatus: "",
          medicalHistoryRecord: "",
          name: "",
          otherIllness: "",
          roomNumber: "",
        },
        middleUrl: "/medicalHistory",
        permanentResults: [],
        illnessHistory: [],
        idSelection: "",
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,        
      }
    },
    methods: {
      onSearch: function() {
        if (this.medicalHistoryForm.date.length == 0 && this.medicalHistoryForm.name.length == 0) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.results = this.permanentResults
        }
        var tempResults = []
        for (var i in this.permanentResults) {
          if (this.checkValid(this.permanentResults[i])) {
            tempResults.push(this.permanentResults[i])
          }
        }
        this.searchResults = tempResults
  
      },
      checkValid: function(val) {
        if (this.medicalHistoryForm.name.length != 0) {
          if (val.name.search(this.medicalHistoryForm.name) == -1) {
            return false
          }
        }
        if (this.medicalHistoryForm.floor.length != 0) {
          if (val.floor != this.medicalHistoryForm.floor) {
            return false
          }
        } 
        if (this.medicalHistoryForm.roomNumber.length != 0) {
          if (val.roomNumber != this.medicalHistoryForm.roomNumber) {
            return false
          }
        }  
        if (this.medicalHistoryForm.bedNumber.length != 0) {
          if (val.bedNumber != this.medicalHistoryForm.bedNumber) {
            return false
          }
        }                          
        return true
      },     
      handleSelection: function(val) {
        this.idSelection = val.id
      },      
      handleAddSubmit: function() {
        let self = this
        for (var i in self.illnessHistory) {
          if (self.illnessHistory[i] != undefined){
            self.addMedicalHistoryForm.medicalHistoryRecord += String(self.illnessHistory[i]) + " "
          }
        }     
        if (self.addMedicalHistoryForm.name.length == 0) {
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
          data: JSON.stringify(self.addMedicalHistoryForm),
          success: function(data) {
            //解析返回的data
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.addMedicalHistoryFormVisible = false
              self.addMedicalHistoryForm = self.emptyForm
              self.illnessHistory = []
              self.getAllHistoryInfo()
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
      getFloorOption() {
        this.storeys = []
        var count = 0
        var floorOption = []
        for (var i in this.floorData) {
          if ($.inArray(this.floorData[i].floor, floorOption) === -1) {
            floorOption.push(this.floorData[i].floor)
            count += 1
            this.storeys.push({value: "选项" + String(count), label: this.floorData[i].floor})
          }
        } 
        console.log(this.storeys)       
      },
      storeyChange: function(val) {
        this.changeRoomNo(val)
        console.log(val)
      },
      changeRoomNo: function(val) {
        this.roomNos = []
        var count = 0
        for (var i in this.floorData) {
          if (this.floorData[i].floor == val) {
            count += 1
            this.roomNos.push({value: "选项" + String(count), label: String(this.floorData[i].roomNumber)})
          }
        }
        console.log(this.roomNos)        
      },      
      getAllFloorInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/bedInfo/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            var info = []
            for (var i in data.data) {
              if (data.data[i].bedNumber === 'FloorInfo') {
                info.push(data.data[i])
              }
            }
            //解析返回的data
            self.floorData = info
            self.getFloorOption()
          },
          error: function() {
            self.$confirm('房间号加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllFloorInfo(flag)
            }).catch(() => {
              self.$message({
                type: 'info',
                message: '取消加载'
              });
            });
          }
        })
      },
      ableToModify: function() {
        // console.log(this.idSelection)
        if (this.idSelection != "" ) {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i].id == this.idSelection) {             
              this.updateMedicalHistoryFormVisible = true
              this.updateMedicalHistoryForm = this.permanentResults[i]
              var illness = this.updateMedicalHistoryForm.medicalHistoryRecord.split(' ')
              for (var i in illness) {
                this.illnessHistory.push(illness[i])
              }
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
          data: JSON.stringify(self.updateMedicalHistoryForm),
          success: function(data) {
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.updateMedicalHistoryFormVisible = false
              this.getAllHistoryInfo()
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
      getAllHistoryInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl +'/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            console.log(data)
            self.searchResults = data.data
            self.permanentResults = data.data
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
              self.getAllHistoryInfo()
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
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },                  
    },
    mounted: function() {
      this.getAllHistoryInfo()
      this.getAllFloorInfo()
    },
  }
</script>

<style scoped>
   
</style>
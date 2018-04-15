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
                      <el-input v-model="addMedicalHistoryForm.name" size="small" placeholder="输入姓名">
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
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="addMedicalHistoryForm.otherIllness">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="诊断日期">
                      <el-input v-model="addMedicalHistoryForm.diagnosisDate" size="small" placeholder="输入日期">
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
                      <el-input v-model="updateMedicalHistoryForm.name" size="small" placeholder="输入姓名">
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
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateMedicalHistoryForm.otherIllness">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="诊断日期">
                      <el-input v-model="updateMedicalHistoryForm.diagnosisDate" size="small" placeholder="输入日期">
                      </el-input>
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
                        <el-select v-model="medicalHistoryForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="medicalHistoryForm.roomNo" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
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
                        <el-input v-model="medicalHistoryForm.bedNo" size="small" placeholder="输入床号"></el-input>
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
                  <el-table-column prop="historyStatus" label="病史情况">
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
        roomNos: [{
            value: "选项1",
            label: "全部"
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
        addMedicalHistoryFormVisible: false,
        addMedicalHistoryForm: {},
        updateMedicalHistoryFormVisible: false,
        updateMedicalHistoryForm: {},
        middleUrl: "/medicalHistory",
        permanentResults: [],
        illnessHistory: [],
        idSelection: "",
      }
    },
    methods: {
      onSearch: function() {
        if (this.medicalHistoryForm.name.length == 0 ) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.results = this.permanentResults
        }
        var tempResults = []
        for (var i in this.permanentResults) {
          if (this.permanentResults[i].name.search(this.medicalHistoryForm.name) != -1) {
            tempResults.push(this.permanentResults[i])
          }
        }
        this.searchResults = tempResults
      },      
      handleSelection: function(val) {
        this.idSelection = val.id
      },      
      handleAddSubmit: function() {
        let self = this
        for (var i in self.illnessHistory) {
          self.addMedicalHistoryForm.illnessHistory += " "
          self.addMedicalHistoryForm.illnessHistory += String(self.illnessHistory[i])
        } 
        self.illnessHistory = []       
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
          if (i != 0) {
            var a = parseInt(i) + 1
            this.roomNos[i].label = val + "0" + a
          }
        }
      },
      ableToModify: function() {
        // console.log(this.idSelection)
        if (this.idSelection != "" ) {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i].id == this.idSelection) {             
              this.updateMedicalHistoryFormVisible = true
              this.updateMedicalHistoryForm = this.permanentResults[i]
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
    },
    mounted: function() {
      this.getAllHistoryInfo()
    },
  }
</script>

<style scoped>
   
</style>
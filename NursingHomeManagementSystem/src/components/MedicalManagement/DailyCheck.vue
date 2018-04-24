<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            日常检查
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="addDailyCheckFormVisible = true">新增</el-button>
            <el-dialog title="添加日常检查" :visible.sync="addDailyCheckFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="addDailyCheckForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="addDailyCheckForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="addDailyCheckForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input v-model="addDailyCheckForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="体温">
                      <el-input v-model="addDailyCheckForm.temperature" size="small" placeholder="℃"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="呼吸">
                      <el-input v-model="addDailyCheckForm.breathCondition" size="small" placeholder="次/分"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="脉搏">
                      <el-input v-model="addDailyCheckForm.pulse" size="small" placeholder="次/分"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="血糖值">
                      <el-input v-model="addDailyCheckForm.bloodSugarValue" size="small" placeholder="mol"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收缩压">
                      <el-input v-model="addDailyCheckForm.systolicPressure" size="small" placeholder="mmhg"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="舒张压">
                      <el-input v-model="addDailyCheckForm.diastolicPressure" size="small" placeholder="mmhg"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="主治医师">
                      <el-input v-model="addDailyCheckForm.doctor" size="small"></el-input>
                    </el-form-item>
                  </el-col>                  
                  <el-col :span="12">
                    <el-form-item label="巡房记录">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="addDailyCheckForm.patrolRecord">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addDailyCheckFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
            <el-dialog title="修改日常检查" :visible.sync="updateDailyCheckFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="updateDailyCheckForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="updateDailyCheckForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="updateDailyCheckForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input v-model="updateDailyCheckForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="体温">
                      <el-input v-model="updateDailyCheckForm.temperature" size="small" placeholder="℃"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="呼吸">
                      <el-input v-model="updateDailyCheckForm.breathCondition" size="small" placeholder="次/分"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="脉搏">
                      <el-input v-model="updateDailyCheckForm.pulse" size="small" placeholder="次/分"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="血糖值">
                      <el-input v-model="updateDailyCheckForm.bloodSugarValue" size="small" placeholder="mol"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收缩压">
                      <el-input v-model="updateDailyCheckForm.systolicPressure" size="small" placeholder="mmhg"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="舒张压">
                      <el-input v-model="updateDailyCheckForm.diastolicPressure" size="small" placeholder="mmhg"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="主治医师">
                      <el-input v-model="updateDailyCheckForm.doctor" size="small"></el-input>
                    </el-form-item>
                  </el-col>                  
                  <el-col :span="12">
                    <el-form-item label="巡房记录">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateDailyCheckForm.patrolRecord">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateDailyCheckFormVisible = false">取 消</el-button>
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
                <el-form :inline="true" label-position="left" :model="dailyCheckForm" label-width="60px">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="楼层">
                        <el-select v-model="dailyCheckForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="dailyCheckForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="姓名">
                        <el-input v-model="dailyCheckForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input v-model="dailyCheckForm.roomNumber" size="small" placeholder="输入床号"></el-input>
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
                  <el-table-column prop="temperature" label="体温">
                  </el-table-column>
                  <el-table-column prop="pulse" label="脉搏"></el-table-column>
                  <el-table-column prop="bloodSugarValue" label="血糖值">
                  </el-table-column>
                  <el-table-column prop="doctor" label="主治医师">
                  </el-table-column>
                  <el-table-column prop="latestTime" label="最近时间">
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
        dailyCheckForm: {
          floor: "",
          roomNumber: "",
          bedNumber: "",
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
        addDailyCheckFormVisible: false,
        addDailyCheckForm: {},
        updateDailyCheckFormVisible: false,
        updateDailyCheckForm: {},
        idSelection: "",
        permanentResults: [],
        middleUrl: "/dailyInspection",

      }
    },
    methods: {
      onSearch: function() {
        console.log(this.dailyCheckForm)
        if (this.dailyCheckForm.name.length == 0 && this.dailyCheckForm.floor.length == 0&& this.dailyCheckForm.roomNumber.length == 0) {
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
        if (this.dailyCheckForm.name.length != 0) {
          if (val.name.search(this.dailyCheckForm.name) == -1) {
            return false
          }
        }
        if (this.dailyCheckForm.floor.length != 0) {
          if (val.floor != this.dailyCheckForm.floor) {
            return false
          }
        }
        if (this.dailyCheckForm.roomNumber.length != 0) {
          if (val.roomNumber != this.dailyCheckForm.roomNumber) {
            return false
          }
        }
        if (this.dailyCheckForm.bedNo.length != 0) {
          if (val.bedNo!= this.dailyCheckForm.bedNo) {
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
        if (self.addDailyCheckForm.name.length == 0) {
          self.$message({
            message: '必填字段为空',
            type: 'error',
          });
          return
        }
        var myDate = new Date()
        self.addDailyCheckForm.latestTime = myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDate()        
        //发送请求
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/create',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.addDailyCheckForm),
          success: function(data) {
            //解析返回的data
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.addDailyCheckFormVisible = false
              self.getAllCheckInfo()
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
              this.updateDailyCheckFormVisible = true
              this.updateDailyCheckForm = this.permanentResults[i]
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
          data: JSON.stringify(self.updateDailyCheckForm),
          success: function(data) {
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.updateDailyCheckFormVisible = false
              self.getAllCheckInfo()
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
      getAllCheckInfo: function() {
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
              self.getAllCheckInfo()
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
      this.getAllCheckInfo()
    }
  }
</script>

<style scoped>
   
</style>
<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            日常巡查
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="addDailyInspectionFormVisible = true">新增</el-button>
            <el-dialog title="添加日常巡查" :visible.sync="addDailyInspectionFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="addDailyInspectionForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="addDailyInspectionForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="addDailyInspectionForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input v-model="addDailyInspectionForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="是否重点照料">
                      <el-radio-group v-model="addDailyInspectionForm.highPrrty">
                        <el-radio label="重点照料"></el-radio>
                        <el-radio label="非重点 照料"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="主治医师">
                      <el-input v-model="addDailyInspectionForm.doctor" size="small" placeholder="输入主治医师">
                      </el-input>
                    </el-form-item>
                  </el-col>                  
                </el-row>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="巡查内容">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="addDailyInspectionForm.patrolContent">
                      </el-input>
                    </el-form-item>
                  </el-col>                  
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addDailyInspectionFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
            <el-dialog title="修改日常巡查" :visible.sync="updateDailyInspectionFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="updateDailyInspectionForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="updateDailyInspectionForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="updateDailyInspectionForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input v-model="updateDailyInspectionForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="是否重点照料">
                      <el-radio-group v-model="updateDailyInspectionForm.highPrrty">
                        <el-radio label="重点照料"></el-radio>
                        <el-radio label="非重点 照料"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="主治医师">
                      <el-input v-model="updateDailyInspectionForm.doctor" size="small" placeholder="输入主治医师">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="巡查内容">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateDailyInspectionForm.patrolContent">
                      </el-input>
                    </el-form-item>
                  </el-col>                  
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateDailyInspectionFormVisible = false">取 消</el-button>
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
                <el-form :inline="true" label-position="left" :model="dailyInspectionForm" label-width="60px">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="楼层">
                        <el-select v-model="dailyInspectionForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="dailyInspectionForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="姓名">
                        <el-input v-model="dailyInspectionForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input v-model="dailyInspectionForm.roomNo" size="small" placeholder="输入床号"></el-input>
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
                  <el-table-column prop="gender" label="性别">
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
        dailyInspectionForm: {
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
        addDailyInspectionFormVisible: false,
        addDailyInspectionForm: {
          doctor: "",
          floor: "",
          gender: "",
          highPriority: "",
          highPrrty: "",
          id: "",
          latestTime: "",
          name: "",
          patrolContent: "",
          roomNumber: "",
        },
        updateDailyInspectionForm:{
          doctor: "",
          floor: "",
          gender: "",
          highPriority: "",
          highPrrty: "",
          id: "",
          latestTime: "",
          name: "",
          patrolContent: "",
          roomNumber: "",
        },
        emptyForm: {
          doctor: "",
          floor: "",
          gender: "",
          highPriority: "",
          highPrrty: "",
          id: "",
          latestTime: "",
          name: "",
          patrolContent: "",
          roomNumber: "",
        },
        updateDailyInspectionFormVisible: false,
        middleUrl: "/dailyPatrol",
        permanentResults: [],
        idSelection: "",
        currentClick: -1,
        currentPage: 1,
        pagesize: 20, 
      }
    },
    methods: {
      onSearch: function() {
        console.log(this.dailyInspectionForm)
        if (this.dailyInspectionForm.name.length == 0 && this.dailyInspectionForm.floor.length == 0&& this.dailyInspectionForm.roomNumber.length == 0) {
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
        if (this.dailyInspectionForm.name.length != 0) {
          if (val.name.search(this.dailyInspectionForm.name) == -1) {
            return false
          }
        }
        if (this.dailyInspectionForm.floor.length != 0) {
          if (val.floor != this.dailyInspectionForm.floor) {
            return false
          }
        }
        if (this.dailyInspectionForm.roomNumber.length != 0) {
          if (val.roomNumber != this.dailyInspectionForm.roomNumber) {
            return false
          }
        }
        if (this.dailyInspectionForm.bedNumber.length != 0) {
          if (val.bedNumber!= this.dailyInspectionForm.bedNumber) {
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
        if (self.addDailyInspectionForm.name.length == 0) {
          self.$message({
            message: '必填字段为空',
            type: 'error',
          });
          return
        }
        var myDate = new Date()
        self.addDailyInspectionForm.latestTime = myDate.getFullYear()+"-"+String(myDate.getMonth()+1)+"-"+myDate.getDate()        
        //发送请求
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/create',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.addDailyInspectionForm),
          success: function(data) {
            //解析返回的data
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.addDailyInspectionFormVisible = false
              self.getAllInspectionInfo()
              self.addDailyInspectionForm = self.emptyForm
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
              this.updateDailyInspectionFormVisible = true
              this.updateDailyInspectionForm = this.permanentResults[i]
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
          data: JSON.stringify(self.updateDailyInspectionForm),
          success: function(data) {
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.updateDailyInspectionFormVisible = false
              self.getAllInspectionInfo()
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
      getAllInspectionInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/findAll',
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
              self.getAllInspectionInfo()
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
      this.getAllInspectionInfo()
    }
  }
</script>

<style scoped>
   
</style>
<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            沐浴记录
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="primary" plain size="small" @click="addTodayFormVisible = true">新增</el-button>
            <el-dialog title="添加今日沐浴记录" :visible.sync="addTodayFormVisible" width="80%" style="text-align: left">
              <el-form label-width="200px" v-model="addTodayForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="addTodayForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="addTodayForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input clearable v-model="addTodayForm.elderlyName" size="small" placeholder="输入姓名"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>                
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="沐浴记录：">
                      <el-checkbox-group v-model="todayBathing" @change="handleTodayBathingChange">
                        <el-checkbox v-for="h in bathingOptions" :label="h" :key="h">{{h}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="日期（不选则默认今天）">
                    <el-date-picker
                      v-model="date"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>                    
                  </el-form-item>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addTodayFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>              
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="success" plain size="small" @click="ableToAddToday">修改</el-button>
            <el-dialog title="修改今日沐浴记录" :visible.sync="modifyTodayFormVisible" width="80%" style="text-align: left">
              <el-form label-width="200px" v-model="addTodayForm">               
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="沐浴记录：">
                      <el-checkbox-group v-model="todayBathing" @change="handleTodayBathingChange">
                        <el-checkbox v-for="h in bathingOptions" :label="h" :key="h">{{h}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="日期（不选则默认今天）">
                    <el-date-picker
                      v-model="date"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd">
                    </el-date-picker>                    
                  </el-form-item>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modifyTodayFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleModifySubmit">提 交</el-button>
              </div>              
            </el-dialog>
          </el-col>          
          <el-col :span="1" :offset="1">
            <el-button type="info" plain size="small" @click="handlePrint">打印</el-button>
          </el-col> 
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <el-form :inline="true" label-position="left" :model="bathingForm" label-width="70px">
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="楼层">
                        <el-select v-model="bathingForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="房间号">
                        <el-select v-model="bathingForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="姓名">
                        <el-input clearable v-model="bathingForm.elderlyName" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="时间">
                        <el-date-picker
                          v-model="bathingForm.time"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM" format="yyyy-MM"
                          size="small">                
                        </el-date-picker>                         
                      </el-form-item>
                    </el-col> 
                    <el-col :span="4" :offset="2">
                      <el-form-item label="床号">
                        <el-input clearable v-model="bathingForm.bedNumber" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>                                       
                  </el-row>
                  <el-row>
                    <el-col :span="2" :offset="9">
                      <el-tooltip placement="top">
                        <div slot="content">
                          <h3>备注：</h3>
                          <p>沐浴: a</p>
                          <p>擦身：b</p>
                        </div>
                        <el-button size="small" type="primary" @click="onSearch">查询</el-button>
                      </el-tooltip>
                    </el-col>                                
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" highlight-current-row @current-change="handleSelection">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="elderlyName" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="dates0" label="1">
                  </el-table-column>
                  <el-table-column prop="dates1" label="2">
                  </el-table-column>
                  <el-table-column prop="dates2" label="3">
                  </el-table-column>
                  <el-table-column prop="dates3" label="4">
                  </el-table-column>
                  <el-table-column prop="dates4" label="5">
                  </el-table-column>
                  <el-table-column prop="dates5" label="6">
                  </el-table-column>
                  <el-table-column prop="dates6" label="7">
                  </el-table-column>
                  <el-table-column prop="dates7" label="8">
                  </el-table-column>
                  <el-table-column prop="dates8" label="9">
                  </el-table-column>
                  <el-table-column prop="dates9" label="10">
                  </el-table-column>
                  <el-table-column prop="dates10" label="11">
                  </el-table-column>
                  <el-table-column prop="dates11" label="12">
                  </el-table-column>
                  <el-table-column prop="dates12" label="13">
                  </el-table-column>
                  <el-table-column prop="dates13" label="14">
                  </el-table-column>
                  <el-table-column prop="dates14" label="15">
                  </el-table-column>
                  <el-table-column prop="dates15" label="16">
                  </el-table-column>
                  <el-table-column prop="dates16" label="17">
                  </el-table-column>
                  <el-table-column prop="dates17" label="18">
                  </el-table-column>
                  <el-table-column prop="dates18" label="19">
                  </el-table-column>
                  <el-table-column prop="dates19" label="20">
                  </el-table-column>
                  <el-table-column prop="dates20" label="21">
                  </el-table-column>
                  <el-table-column prop="dates21" label="22">
                  </el-table-column>
                  <el-table-column prop="dates22" label="23">
                  </el-table-column>
                  <el-table-column prop="dates23" label="24">
                  </el-table-column>
                  <el-table-column prop="dates24" label="25">
                  </el-table-column>
                  <el-table-column prop="dates25" label="26">
                  </el-table-column>
                  <el-table-column prop="dates26" label="27">
                  </el-table-column>
                  <el-table-column prop="dates27" label="28">
                  </el-table-column>
                  <el-table-column prop="dates28" label="29">
                  </el-table-column>
                  <el-table-column prop="dates29" label="30">
                  </el-table-column>
                  <el-table-column prop="dates30" label="31">
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
        bathingForm: {
          floor: "",
          roomNumber: "",
          elderlyName: "",
          time: "",
          bedNumber: ""
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
        middleUrl: "/bathingRecord",
        permanentResults: [],
        bathingOptions: ['沐浴: a', '擦身：b'],
        idSelection: "",
        addTodayFormVisible: false,
        addTodayForm: {
          elderlyName: "",
          completedDate: "",
          roomNumber: "",
          bedNumber: "",
          year: "",
          month: "",
          time: "",
        },
        modifyTodayFormVisible: false,
        modifyTodayForm: {
          elderlyName: "",
          completedDate: "",
          roomNumber: "",
          bedNumber: "",
          bathing: "",
          year: "",
          month: "",
          time: "",
        },
        emptyForm: {
          elderlyName: "",
          completedDate: "",
          roomNumber: "",
          bedNumber: "",
          bathing: "",
          year: "",
          month: "",
          time: "",
        },
        todayBathing: [],
        date: "",
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,        
      };
    },
    methods: {
      getAllBathingInfo: function() {
        let self = this;
        $.ajax({
          url: self.urlHeader + self.middleUrl + "/findAll",
          type: "post",
          contentType: "application/json;charset=UTF-8",
          data: JSON.stringify({
            id: "1"
          }),
          success: function(data) {
            if (data[200] == "操作成功") {
              self.searchResults = data.data;
              
              for (var i in self.searchResults) {
                let completedDate = self.searchResults[i].completedDate
                if (completedDate != null) {                                                     
                  self.searchResults[i].dates = completedDate.split(",")
                  for (var j=0; j<32; j++) {
                    if (self.searchResults[i].dates[j] == undefined) {
                      self.searchResults[i].dates[j] = ""
                    }
                  }                  
                  self.searchResults[i].dates0 = self.searchResults[i].dates[0]
                  self.searchResults[i].dates1 = self.searchResults[i].dates[1]
                  self.searchResults[i].dates2 = self.searchResults[i].dates[2]
                  self.searchResults[i].dates3 = self.searchResults[i].dates[3]
                  self.searchResults[i].dates4 = self.searchResults[i].dates[4]
                  self.searchResults[i].dates5 = self.searchResults[i].dates[5]
                  self.searchResults[i].dates6 = self.searchResults[i].dates[6]
                  self.searchResults[i].dates7 = self.searchResults[i].dates[7]
                  self.searchResults[i].dates8 = self.searchResults[i].dates[8]
                  self.searchResults[i].dates9 = self.searchResults[i].dates[9]
                  self.searchResults[i].dates10 = self.searchResults[i].dates[10]
                  self.searchResults[i].dates11 = self.searchResults[i].dates[11]
                  self.searchResults[i].dates12 = self.searchResults[i].dates[12]
                  self.searchResults[i].dates13 = self.searchResults[i].dates[13]
                  self.searchResults[i].dates14 = self.searchResults[i].dates[14]
                  self.searchResults[i].dates15 = self.searchResults[i].dates[15]
                  self.searchResults[i].dates16 = self.searchResults[i].dates[16]
                  self.searchResults[i].dates17 = self.searchResults[i].dates[17]
                  self.searchResults[i].dates18 = self.searchResults[i].dates[18]
                  self.searchResults[i].dates19 = self.searchResults[i].dates[19]
                  self.searchResults[i].dates20 = self.searchResults[i].dates[20]
                  self.searchResults[i].dates21 = self.searchResults[i].dates[21]
                  self.searchResults[i].dates22 = self.searchResults[i].dates[22]
                  self.searchResults[i].dates23 = self.searchResults[i].dates[23]
                  self.searchResults[i].dates24 = self.searchResults[i].dates[24]
                  self.searchResults[i].dates25 = self.searchResults[i].dates[25]
                  self.searchResults[i].dates26 = self.searchResults[i].dates[26]
                  self.searchResults[i].dates27 = self.searchResults[i].dates[27]
                  self.searchResults[i].dates28 = self.searchResults[i].dates[28]
                  self.searchResults[i].dates29 = self.searchResults[i].dates[29]
                  self.searchResults[i].dates30 = self.searchResults[i].dates[30]
                  self.searchResults[i].dates31 = self.searchResults[i].dates[31]
                }
                self.permanentResults = self.searchResults
              }
            } else {
              self.$message({
                message: "列表加载失败，请检查网络",
                type: "error"
              });
            }
          },
          error: function() {
            self.$message({
              message: "列表加载失败，请检查网络",
              type: "error"
            });
          }
        });
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
      onSearch: function() {
        if (
          this.bathingForm.elderlyName.length == 0 &&
          this.bathingForm.floor.length == 0 &&
          this.bathingForm.roomNumber.length == 0 &&
          this.bathingForm.bedNumber.length == 0 &&
          this.bathingForm.time.length == 0
        ) {
          this.$message({
            message: "查询关键词为空",
            type: "error"
          });
          this.searchResults = this.permanentResults;
        }
        var tempResults = [];
        for (var i in this.permanentResults) {
          if (this.checkValid(this.permanentResults[i])) {
            tempResults.push(this.permanentResults[i]);
          }
        }
        this.searchResults = tempResults;
      },
      checkValid: function(val) {
        if (this.bathingForm.elderlyName.length != 0) {
          if (val.elderlyName.search(this.bathingForm.elderlyName) == -1) {
            return false;
          }
        }
        if (this.bathingForm.floor.length != 0) {
          if (val.floor != this.bathingForm.floor) {
            return false;
          }
        }
        if (this.bathingForm.roomNumber.length != 0) {
          if (val.roomNumber != this.bathingForm.roomNumber) {
            return false;
          }
        }
        if (this.bathingForm.bedNumber.length != 0) {
          if (val.bedNumber != this.bathingForm.bedNumber) {
            return false;
          }
        }
        if (this.bathingForm.time.length != 0) {
          let date = this.bathingForm.time.split('-')
          if (date[0] != val.year) {
            return false;
          }
          if (date[1] != val.month) {
            return false;
          }
        }
        return true;
      },
      handleTodayBathingChange: function(val) {
        if (this.addTodayForm.bathing == undefined) {
          this.addTodayForm.bathing = ""
        }        
        let v = val[val.length-1]
        this.addTodayForm.bathing += String(v.charAt(v.length-1))
        console.log(this.addTodayForm.bathing);
        
      },
      handleSelection: function(val) {
        if (val != null) {
          this.idSelection = val
        }         
      },
      ableToAddToday: function() {
        if (this.idSelection != "") {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i] == this.idSelection) {
              var myDate = new Date()
              if (this.idSelection.dates.length < myDate.getDate()) {
                this.modifyTodayFormVisible = true;
              } else {
                this.$message({
                  message: '今日信息已添加！',
                  type: 'error',
                });                
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
      handleAddSubmit: function() {
        let self = this;
        if (this.date == 0) {
          var myDate = new Date();
          this.addTodayForm.year = myDate.getFullYear();
          let month = myDate.getMonth()+1
          if (String(month).length == 1) {
            var a = "0"
            this.addTodayForm.month = a + (month)
          } 
          this.addTodayForm.time = myDate.getDate();
        } else {
          let date = this.date.split("-");
          this.addTodayForm.year = date[0];
          this.addTodayForm.month = date[1];
          this.addTodayForm.time = date[2];
        }
        
  
        if (this.addTodayForm.elderlyName.length == 0) {
          this.$message({
            message: "输入关键词为空",
            type: "error"
          });
          return;
        } else {
          // console.log(this.addTodayForm.time)
          for (var i = 0; i < this.addTodayForm.time-1; i++) {
            self.addTodayForm.completedDate += " ,"
          }
          if (this.addTodayForm.bathing.length > 0) {
            self.addTodayForm.completedDate += this.addTodayForm.bathing
          } else {
             self.addTodayForm.completedDate += " "
          }
  
          $.ajax({
            url: self.urlHeader + self.middleUrl + '/create',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(self.addTodayForm),
            success: function(data) {
              if (data[200] == "操作成功") {
                self.$message({
                  message: '创建成功',
                  type: 'success',
                });
                self.todayBathing = []
                self.date = ""
                self.addTodayFormVisible = false
                self.addTodayForm = self.emptyForm
                self.getAllBathingInfo()
              } else {
                self.$message({
                  message: '创建失败，请检查网络',
                  type: 'error',
                });
              }
            },
            error: function() {
              self.$message({
                message: '列表加载失败，请检查网络',
                type: 'error',
              });
            }
          })
        }
      },
      handleModifySubmit: function() {
        let self = this;
        if (this.date == 0) {
          var myDate = new Date();
          this.addTodayForm.year = myDate.getFullYear();
          this.addTodayForm.month = myDate.getMonth();
          this.addTodayForm.time = myDate.getDate();
        } else {
          let date = this.date.split("-");
          this.addTodayForm.year = date[0];
          this.addTodayForm.month = date[1];
          this.addTodayForm.time = date[2];
        }        
        let modifyTodayForm = this.idSelection
        modifyTodayForm.completedDate += ("," + this.addTodayForm.bathing)
        $.ajax({
            url: self.urlHeader + self.middleUrl + '/change',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(modifyTodayForm),
            success: function(data) {
              if (data[200] == "操作成功") {
                self.$message({
                  message: '修改成功',
                  type: 'success',
                });
                self.date = ""
                self.modifyTodayFormVisible = false
                self.getAllBathingInfo()
              } else {
                self.$message({
                  message: '修改失败，请检查网络',
                  type: 'error',
                });
              }
            },
            error: function() {
              self.$message({
                message: '请检查网络！',
                type: 'error',
              });
            }
          })        
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      }, 
      handlePrint: function() {
        // this.createTable()
        var headstr = "<html><head><title></title></head><body>";
        var footstr = "</body>";
        // var newstr = document.all.item("print_table").innerHTML;
        var newstr = "<table border=1><tr><th>序号</th><th>姓名</th>"
        for (var i = 0; i<32; i++) {
          newstr += "<th>" + String(i) + "</th>"
        }
        newstr += "</tr>"
        for (var i in this.searchResults) {
          var str = "<tr><td>" + String(this.searchResults[i].id) + "</td>"
          str += "<td>" + String(this.searchResults[i].elderlyName) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates0) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates1) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates2) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates3) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates4) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates5) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates6) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates7) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates8) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates9) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates10) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates11) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates12) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates13) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates14) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates15) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates16) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates17) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates18) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates19) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates20) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates21) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates22) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates23) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates24) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates25) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates26) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates27) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates28) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates29) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates30) + "</td>"
          str += "<td>" + String(this.searchResults[i].dates31) + "</td>"
          newstr += str + "</tr>"         
        }
        newstr += "</table>"      
        var oldstr = document.body.innerHTML;
        document.body.innerHTML = headstr + newstr + footstr;
        window.print();
        window.location.reload()
    
      },                  
    },
    mounted: function() {
      this.getAllBathingInfo()
    }
  };
</script>

<style scoped>
  
</style>

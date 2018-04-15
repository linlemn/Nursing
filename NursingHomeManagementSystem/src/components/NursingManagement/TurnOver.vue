<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            翻身记录
          </el-col>
          <el-col :span="1" :offset="4">
            <el-button type="primary" plain size="small" @click="ableToAddToday">新增</el-button>
            <el-dialog title="添加今日翻身记录" :visible.sync="addTodayFormVisible" width="80%" style="text-align: left">
              <el-form label-width="200px" v-model="addTodayForm">
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="卧位：">
                      <el-radio-group v-model="addTodayForm.recumbentPosition">
                        <el-radio v-for="r in rollOps" :label="r" :key="r">{{r}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="皮肤状况：">
                      <el-radio-group v-model="addTodayForm.skinCondition">
                        <el-radio v-for="r in skinOps" :label="r" :key="r">{{r}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>                
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="日期（不选则默认今天）">
                      <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                      </el-date-picker>                    
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="时间（不选则默认当前时刻）">
                      <el-time-picker
                        arrow-control
                        v-model="addTodayForm.rollTime"
                        value-format="HH:mm">
                      </el-time-picker>                   
                    </el-form-item>
                  </el-col>                  
                </el-row>
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="签名：">
                      <el-input v-model="addTodayForm.signature" size="small"></el-input>                   
                    </el-form-item>
                  </el-col>                  
                </el-row>                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addTodayFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>              
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="success" plain size="small">打印</el-button>
          </el-col> 
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <el-form :inline="true" label-position="left" :model="turnOverForm" label-width="100px">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="楼层">
                        <el-select v-model="turnOverForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-form-item label="日期">
                      <el-col :span="6">
                        <el-date-picker
                          v-model="turnOverForm.date"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="时间">
                      <el-col :span="6">
                        <el-time-picker
                          arrow-control
                          v-model="addTodayForm.time"
                          value-format="HH:mm">
                        </el-time-picker> 
                      </el-col>                      
                    </el-form-item>
                    <el-form-item>
                      <el-col :span="3">
                        <el-button size="small" type="primary">查询</el-button>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="elderlyName" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="date" label="日期" fixed>
                  </el-table-column>
                  <el-table-column prop="rollTime" label="翻身时间" fixed>
                  </el-table-column>
                  <el-table-column label="卧位">
                    <el-table-column prop="leftPosition" label="左">
                    </el-table-column>
                    <el-table-column prop="rightPosition" label="右">
                    </el-table-column>
                    <el-table-column prop="lowPosition" label="平">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="皮肤状况">
                    <el-table-column prop="skinConditionN" label="正常"></el-table-column>
                    <el-table-column prop="skinConditionR" label="发红"></el-table-column>
                    <el-table-column prop="skinConditionD" label="表皮破损"></el-table-column>
                    <el-table-column prop="skinConditionF" label="溃烂"></el-table-column>
                  </el-table-column>
                  <el-table-column label="签名" prop="signature"></el-table-column>
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
        turnOverForm: {
          date: "",
          floor: "",
          time: "",
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
        permanentResults: [],
        middleUrl: "/rollRecord",
        addTodayFormVisible: false,
        date: "",
        addTodayForm: {
          year: "",
          month: "",
          day: "",
          rollTime: "",
          recumbentPosition: "",
          skinCondition: "",
          signature: ""          
        },
        rollOps: ["左", "右", "平"],
        skinOps: ["正常", "发红", "表皮破损", "溃烂"],
      };
    },
    methods: {
      getAllTurnInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            if (data[200] == "操作成功") {
              self.searchResults = data.data
              for (var i in self.searchResults) {
                switch(self.searchResults[i].recumbentPosition) {
                  case "左":
                    self.searchResults[i].leftPosition = "左"
                    break
                  case "右":
                    self.searchResults[i].rightPosition = "右"
                    break
                  case "平":
                    self.searchResults[i].lowPosition = "平"
                    break                                        
                }
                switch(self.searchResults[i].skinCondition) {
                  case "正常":
                    self.searchResults[i].skinConditionN = "正常"
                    break
                  case "发红":
                    self.searchResults[i].skinConditionR = "发红"
                    break
                  case "表皮破损":
                    self.searchResults[i].skinConditionD = "表皮破损"
                    break 
                  case "溃烂":
                    self.searchResults[i].skinConditionF = "溃烂"
                    break                                                            
                }                
              }              
              self.permanentResults = self.searchResults
            } else {
              self.$message({
                message: '列表加载失败，请检查网络',
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
      onSearch: function() {
        if (this.turnOverForm.floor.length == 0 && this.turnOverForm.startTime.length == 0 && this.turnOverForm.endTime.length == 0) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.searchResults = this.permanentResults
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
        if (this.turnOverForm.floor.length != 0) {
          if (val.floor.search(this.turnOverForm.floor) == -1) {
            return false
          }
        }
        if (this.turnOverForm.yime.length != 0) {
          if (val.time != this.turnOverForm.time) {
            return false
          }
        }
        if (this.turnOverForm.date.length != 0) {
          let d = val.year + "-"+ val.month + "-" + val.day
          if (d != this.turnOverForm.date) {
            return false
          }
        }
        return true
      },
      handleTodayRollChange: function(val) {
        let v = val[val.length-1]
        this.addTodayForm.bathing += String(v.charAt(v.length-1))
        console.log(this.addTodayForm.bathing);
        
      },
      ableToAddToday: function() { 
        // if (this.idSelection != "") {
        //   for (var i in this.permanentResults) {
        //     if (this.permanentResults[i].id == this.idSelection) {
              this.addTodayFormVisible = true

            // }
        //   }
        // } else {
        //   this.$message({
        //     message: '未选择修改对象！',
        //     type: 'error',
        //   });
        // }
      },
      handleAddSubmit: function() {    
        var myDate = new Date()    
        if(this.date == 0) {
          this.addTodayForm.year = myDate.getFullYear()
          this.addTodayForm.month = myDate.getMonth()
          this.addTodayForm.day = myDate.getDate()         
        }
        else {
          let date = this.date.split("-")
          this.addTodayForm.year = date[0]
          this.addTodayForm.month = date[1]
          this.addTodayForm.day = date[2]
        }
        if(this.addTodayForm.rollTime.length == 0) {
          var m = ""
          if (String(myDate.getMinutes()).length == 1) {
            m = "0" + myDate.getMinutes()   
          } else {
            m = myDate.getMinutes()
          }
          this.addTodayForm.rollTime = myDate.getHours() + ":" + m
        }
        
      },       
    },
    mounted: function() {
      this.getAllTurnInfo()
    }
  };
</script>

<style scoped>
  
</style>
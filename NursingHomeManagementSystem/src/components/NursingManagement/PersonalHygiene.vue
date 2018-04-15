<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            个人卫生
          </el-col>
          <el-col :span="1" :offset="4">
            <el-button type="primary" plain size="small" @click="ableToAddToday">新增</el-button>
            <el-dialog title="添加今日个人卫生状况" :visible.sync="addTodayFormVisible" width="80%" style="text-align: left">
              <el-form label-width="200px" v-model="addTodayForm">
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="当日卫生状况：">
                      <el-checkbox-group v-model="todayHygiene" @change="handleTodayHygieneChange">
                        <el-checkbox v-for="h in hygieneOptions" :label="h" :key="h">{{h}}</el-checkbox>
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
            <el-button type="success" plain size="small">打印</el-button>
          </el-col>          
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <el-form :inline="true" label-position="top" :model="personalHygieneForm" label-width="70px">
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="楼层">
                        <el-select v-model="personalHygieneForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="房间号">
                        <el-select v-model="personalHygieneForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="姓名">
                        <el-input v-model="personalHygieneForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="时间">
                        <el-input v-model="personalHygieneForm.date" size="small" placeholder="输入时间"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="床号">
                        <el-input v-model="personalHygieneForm.roomNo" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4" :offset="9">
                      <el-tooltip placement="top">
                        <div slot="content">
                          <h3>备注：</h3>
                          <p>剃胡须: a</p>
                          <p>剪指（趾）甲：b</p>
                          <p>口腔：c</p>
                          <p>时间查询格式：yyyy-mm, 不填写则默认为当前月份</p>
                        </div>
                        <el-button size="small" type="primary">查询</el-button>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" fixed>
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
        personalHygieneForm: {
          floor: "",
          roomNumber: "",
          name: "",
          date: "",
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
        middleUrl: "/hygiene",
        permanentResults: [],
        addTodayFormVisible: false,
        addTodayForm: {
          hygiene: "",
          year: "",
          month: "",
          day: "",
        },
        idSelection: "",
        hygieneOptions: ['剃胡须: a', '剪指（趾）甲：b', '口腔：c'],
        todayHygiene: [],
        date: "",

      };
    },
    methods: {
      getAllHygieneInfo: function() {
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
        if (this.personalHygieneForm.name.length == 0 && this.personalHygieneForm.floor.length == 0 && this.personalHygieneForm.roomNumber.length == 0 && this.personalHygieneForm.bedNumber.length == 0 && this.personalHygieneForm.bedNumber.length == 0) {
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
        if (this.personalHygieneForm.name.length != 0) {
          if (val.name.search(this.personalHygieneForm.name) == -1) {
            return false
          }
        }
        if (this.personalHygieneForm.floor.length != 0) {
          if (val.floor != this.personalHygieneForm.floor) {
            return false
          }
        }
        if (this.personalHygieneForm.roomNumber.length != 0) {
          if (val.roomNumber != this.personalHygieneForm.roomNumber) {
            return false
          }
        }
        if (this.personalHygieneForm.bedNo.length != 0) {
          if (val.bedNo!= this.personalHygieneForm.bedNo) {
            return false
          }
        }
        if (this.personalHygieneForm.date.length != 0) {
          if (val.date!= this.personalHygieneForm.date) {
            return false
          }
        }         
        return true                         
      }, 
      addToday: function() {

      },
      handleTodayHygieneChange: function(val) {
        let v = val[val.length-1]
        this.addTodayForm.hygiene += String(v.charAt(v.length-1))
        console.log(this.addTodayForm.hygiene);
        
      },
      ableToAddToday: function() {
        if (this.idSelection != "") {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i].id == this.idSelection) {
              this.addTodayFormVisible = true
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
        if(this.date == 0) {
          var myDate = new Date()
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
        
      },    
    },
    mounted: function() {
      this.getAllHygieneInfo()
    }
  };
</script>

<style scoped>
  
</style>
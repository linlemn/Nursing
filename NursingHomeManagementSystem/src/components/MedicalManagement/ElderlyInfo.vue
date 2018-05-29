<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            老人信息管理
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <el-form :inline="true" label-position="top" :model="elderlyInfoForm" label-width="70px">
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="楼层">
                        <el-select v-model="elderlyInfoForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="房间号">
                        <el-select v-model="elderlyInfoForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="姓名">
                        <el-input clearable v-model="elderlyInfoForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="床号">
                        <el-input clearable v-model="elderlyInfoForm.bedNumber" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-col :span="2">
                        <el-button size="small" type="primary">查询</el-button>
                      </el-col>
                    </el-form-item>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="floor" label="楼层">
                  </el-table-column>
                  <el-table-column prop="roomNumber" label="房间号">
                  </el-table-column>
                  <el-table-column prop="bedNumber" label="床号">
                  </el-table-column>
                  <el-table-column prop="name" label="姓名">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别">
                  </el-table-column>
                  <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                            <el-button
                              size="mini"
                              type="danger"
                              @click="showInfo(scope.row.id)">查看</el-button>
                    </template>
                  </el-table-column>                                                                                              
                </el-table>
                <el-pagination small layout="prev, pager, next" :total="searchResults.length" :page-size="pagesize" @current-change="handleCurrentChange" :current-page="currentPage">
                </el-pagination>                  
                <el-dialog title="老人信息" :visible.sync="elderlyInfoVisible" width="80%" style="text-align: left">
                          <el-form :model="searchResult" label-width="100px">
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="姓名：">
                                  {{searchResult.name}}
                                </el-form-item>
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="出生日期：">
                                 {{searchResult.birthDate}}
                                </el-form-item>
                              </el-col> 
                              <el-col :span="5">
                                <el-form-item label="性别：">
                                  {{searchResult.gender}}                   
                                </el-form-item>
                              </el-col>                               
                            </el-row>
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="楼层：">
                                 {{searchResult.floor}}
                                </el-form-item>
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="房间号：">
                                  {{searchResult.roomNumber}}
                                </el-form-item>
                              </el-col> 
                              <el-col :span="5">
                                <el-form-item label="床号：">
                                  {{searchResult.bedNumber}}                 
                                </el-form-item>
                              </el-col>                               
                            </el-row>                          
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="年龄：">
                                  {{searchResult.age}}
                                </el-form-item>
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="籍贯：">
                                  {{searchResult.origin}}
                                </el-form-item>
                              </el-col> 
                              <el-col :span="7">
                                <el-form-item label="户籍地：">
                                  {{searchResult.domicilePlace}}     
                                </el-form-item>
                              </el-col>                               
                            </el-row> 
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="身份证号：">
                                  {{searchResult.idNumber}}
                                </el-form-item>
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="政治面貌：">
                                  {{searchResult.politicalSide}}
                                </el-form-item>
                              </el-col>                
                              <el-col :span="8">
                                <el-form-item label="民族：">
                                  {{searchResult.national }}                 
                                </el-form-item>                  
                              </el-col>
                            </el-row> 
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="婚姻状况：">
                                  {{searchResult.maritalStatus }}                  
                                </el-form-item>                  
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="社保卡号：">  
                                  {{searchResult.ssCardNumber}}                                       
                                </el-form-item>                 
                              </el-col>  
                              <el-col :span="8">
                                <el-form-item label="教育程度：">  
                                  {{searchResult.educationLevel }}                                  
                                </el-form-item>                 
                              </el-col>                                           
                            </el-row> 
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="最高学历：">  
                                  {{searchResult.highestEducation }}                                  
                                </el-form-item> 
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="代理人：">  
                                  {{searchResult.agent }}                                  
                                </el-form-item> 
                              </el-col> 
                              <el-col :span="8">
                                <el-form-item label="与老人关系：">  
                                  {{searchResult.relationWithElderly }}                                  
                                </el-form-item> 
                              </el-col>                                                       
                            </el-row> 
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="代理人电话：">  
                                  {{searchResult.agentPhoneNumber }}                                  
                                </el-form-item> 
                              </el-col>
                              <el-col :span="16">
                                <el-form-item label="代理人地址：">  
                                  {{searchResult.agentAddress }}                                  
                                </el-form-item> 
                              </el-col>                            
                            </el-row> 
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="邮编：">
                                  {{searchResult.zipCode}}
                                </el-form-item>
                              </el-col>
                              <el-col :span="16" >
                                <el-form-item label="地址：">
                                  {{searchResult.address}}
                                </el-form-item>
                              </el-col>                               
                            </el-row>  
                            <el-row>
                              <el-col :span="8" >
                                <el-form-item label="电话：">
                                  {{searchResult.phoneNumber}}
                                </el-form-item>
                              </el-col> 
                              <el-col :span="16">
                                <el-form-item label="工作单位：">
                                  {{searchResult.workUnit}}
                                </el-form-item>
                              </el-col> 
                            </el-row>
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="职务：">
                                  {{searchResult.position}}
                                </el-form-item>
                              </el-col>
                              <el-col :span="16">
                                <el-form-item label="禁忌药物：">
                                  {{searchResult.tabooDrugs}}
                                </el-form-item>
                              </el-col>                                                         
                            </el-row> 
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="护理等级：">
                                  {{searchResult.nursingGrade}}
                                </el-form-item>
                              </el-col>
                              <el-col :span="16">
                                <el-form-item label="禁忌食物：">
                                  {{searchResult.tabooFood}}
                                </el-form-item>
                              </el-col> 
                            </el-row>
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="饮食类型：">
                                  {{searchResult.dietType}}
                                </el-form-item>      
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="老人生肖：">
                                  {{searchResult.zodiac}}
                                </el-form-item>      
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="住宅电话：">
                                  {{searchResult.homePhone}}
                                </el-form-item>      
                              </el-col>                              
                            </el-row>
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="是否本市人：">
                                  {{searchResult.sameCity}}
                                </el-form-item>      
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="是否外网预约：">
                                  {{searchResult.onlineAppointment}}
                                </el-form-item>        
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="预约时间：">
                                  {{searchResult.appointmentTime}}
                                </el-form-item>        
                              </el-col>                                
                            </el-row>
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="预约编号：">
                                  {{searchResult.appointmentNumber}}
                                </el-form-item>      
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="入院日期：">
                                  {{searchResult.admissionDate}}
                                </el-form-item>        
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="在院编号：">
                                  {{searchResult.courtNumber}}
                                </el-form-item>        
                              </el-col>                             
                            </el-row>  
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="与院状态：">
                                  {{searchResult.hospitalized}}
                                </el-form-item>      
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="养老补助：">
                                  {{searchResult.pensionBenefits}}
                                </el-form-item>        
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="养老金收入：">
                                  {{searchResult.pensionIncome}}
                                </el-form-item>        
                              </el-col>                             
                            </el-row>
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="老人类型：">
                                  {{searchResult.elderlyType}}
                                </el-form-item>      
                              </el-col>
                              <el-col :span="8">
                                <el-form-item label="老人头像">
                                  {{searchResult.elderlyHead}}
                                </el-form-item>        
                              </el-col>                            
                            </el-row>                                                                                        
                          </el-form>                          
                </el-dialog>                                  
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
        elderlyInfoForm: {
          floor: "",
          roomNumber: "",
          bedNumber: "",
          name: "",
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
        middleUrl: "/admissionApplication",
        elderlyInfoVisible: false,
        searchResult: {},
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,         
      };
    },
    methods: {
      getAllElderlyInfo: function() {
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
          var a = parseInt(i) + 1
          this.roomNos[i].label = val + "0" + a
        }
      },
      showInfo: function(val) {
        for (var i in this.permanentResults) {
          if (this.permanentResults[i].id == val) {
            this.searchResult = this.permanentResults[i]
            this.elderlyInfoVisible = true
          }
        }
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
    },
    mounted: function() {
      this.getAllElderlyInfo()
    }
  };
</script>

<style scoped>
  
</style>
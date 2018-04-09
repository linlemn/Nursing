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
                        <el-select v-model="elderlyInfoForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="房间号">
                        <el-select v-model="elderlyInfoForm.roomNo" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="姓名">
                        <el-input v-model="elderlyInfoForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="床号">
                        <el-input v-model="elderlyInfoForm.roomNo" size="small" placeholder="输入床号"></el-input>
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
                <el-table :data="searchResult" height="250" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="storeyNo" label="楼层">
                  </el-table-column>
                  <el-table-column prop="roomNo" label="房间号">
                  </el-table-column>
                  <el-table-column prop="bedNo" label="床号">
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
                        @click="showInfo(scope.$index, scope.row)">查看</el-button>
                      <el-dialog title="入院记录" :visible.sync="elderlyInfoVisible" width="80%" style="text-align: left">
                        <el-form :model="searchResult" label-width="100px">
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="姓名">
                                {{searchResult.name}}
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="出生日期">
                               {{searchResult.birth}}
                              </el-form-item>
                            </el-col> 
                            <el-col :span="5">
                              <el-form-item label="性别">
                                {{searchResult.gender}}                   
                              </el-form-item>
                            </el-col>                               
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="楼层">
                               {{searchResult.storeyNo}}
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="房间号">
                                {{searchResult.roomNo}}
                              </el-form-item>
                            </el-col> 
                            <el-col :span="5">
                              <el-form-item label="床号">
                                {{searchResult.bedNo}}                 
                              </el-form-item>
                            </el-col>                               
                          </el-row>                          
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="年龄">
                                {{searchResult.age}}
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="籍贯">
                                {{searchResult.hometown}}
                              </el-form-item>
                            </el-col> 
                            <el-col :span="7">
                              <el-form-item label="户籍地">
                                {{searchResult.residence}}     
                              </el-form-item>
                            </el-col>                               
                          </el-row> 
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="身份证号">
                                {{searchResult.identityCardNo}}
                              </el-form-item>
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="政治面貌">
                                <el-input  ></el-input>
                              </el-form-item>
                            </el-col>                
                            <el-col :span="8">
                              <el-form-item label="民族">
                                {{searchResult.nationality }}                 
                              </el-form-item>                  
                            </el-col>
                          </el-row> 
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="婚姻状况">
                                {{searchResult.marriageStatus }}                  
                              </el-form-item>                  
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="社保卡号">  
                                {{searchResult.socialSecurityNo}}                                       
                              </el-form-item>                 
                            </el-col>  
                            <el-col :span="8">
                              <el-form-item label="教育程度">  
                                {{searchResult.educationLevel }}                                  
                              </el-form-item>                 
                            </el-col>                                           
                          </el-row> 
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="最高学历">  
                                {{searchResult.highestEduBG }}                                  
                              </el-form-item> 
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="代理人">  
                                {{searchResult.agentName }}                                  
                              </el-form-item> 
                            </el-col> 
                            <el-col :span="8">
                              <el-form-item label="与老人关系">  
                                {{searchResult.relationship }}                                  
                              </el-form-item> 
                            </el-col>                                                       
                          </el-row> 
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="代理人电话">  
                                {{searchResult.agentTel }}                                  
                              </el-form-item> 
                            </el-col>
                            <el-col :span="16">
                              <el-form-item label="代理人地址">  
                                {{searchResult.agentAddress }}                                  
                              </el-form-item> 
                            </el-col>                            
                          </el-row> 
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="邮编">
                                {{searchResult.agentPostCode}}
                              </el-form-item>
                            </el-col>
                            <el-col :span="16" >
                              <el-form-item label="地址">
                                {{searchResult.presentAddress}}
                              </el-form-item>
                            </el-col>                               
                          </el-row>  
                          <el-row>
                            <el-col :span="8" >
                              <el-form-item label="电话">
                                {{searchResult.telephone}}
                              </el-form-item>
                            </el-col> 
                            <el-col :span="16">
                              <el-form-item label="工作单位">
                                {{searchResult.workAddress}}
                              </el-form-item>
                            </el-col> 
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="职务">
                                {{searchResult.workPosition}}
                              </el-form-item>
                            </el-col>
                            <el-col :span="16">
                              <el-form-item label="禁忌药物">
                                {{searchResult.tabooDrugs}}
                              </el-form-item>
                            </el-col>                                                         
                          </el-row> 
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="护理等级">
                                {{searchResult.caringLevel}}
                              </el-form-item>
                            </el-col>
                            <el-col :span="16">
                              <el-form-item label="禁忌食物">
                                {{searchResult.tabooFood}}
                              </el-form-item>
                            </el-col> 
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="饮食类型">
                                {{searchResult.dietType}}
                              </el-form-item>      
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="老人生肖">
                                {{searchResult.zodiac}}
                              </el-form-item>      
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="住宅电话">
                                {{searchResult.homePhone}}
                              </el-form-item>      
                            </el-col>                              
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="是否本市人">
                                {{searchResult.isLocal}}
                              </el-form-item>      
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="是否外网预约">
                                {{searchResult.isExtranetAppointment}}
                              </el-form-item>        
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="预约时间">
                                {{searchResult.appointmentTime}}
                              </el-form-item>        
                            </el-col>                                
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="预约编号">
                                {{searchResult.appointmentID}}
                              </el-form-item>      
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="入院日期">
                                {{searchResult.checkinDate}}
                              </el-form-item>        
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="在院编号">
                                {{searchResult.ID}}
                              </el-form-item>        
                            </el-col>                             
                          </el-row>  
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="与院状态">
                                {{searchResult.status}}
                              </el-form-item>      
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="养老补助">
                                {{searchResult.pensionBenefits}}
                              </el-form-item>        
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="养老金收入">
                                {{searchResult.pensionIncome}}
                              </el-form-item>        
                            </el-col>                             
                          </el-row>
                          <el-row>
                            <el-col :span="8">
                              <el-form-item label="老人类型">
                                {{searchResult.elderlyType}}
                              </el-form-item>      
                            </el-col>
                            <el-col :span="8">
                              <el-form-item label="老人头像">
                                {{searchResult.checkinDate}}
                              </el-form-item>        
                            </el-col>                            
                          </el-row>                                                                                        
                        </el-form>                          
                      </el-dialog>  
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
        elderlyInfoForm: {
          storeyNo: "",
          roomNo: "",
          bedNo: "",
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
        searchResult: [{
          age: "",
          name: "",
          birth: "",
          gender: "",
          storeyNo: "",
          roomNo: "",
          bedNo: "",
          hometown: "",
          nationality: "",
          identityCardNo: "",
          politicsStatus: "",
          socialSecurityNo: "",
          marriageStatus: "",
          educationLevel: "",
          highestEduBG: "",
          agentName: "",
          relationship: "",
          agentTel: "",
          agentAddress: "",
          agentPostCode: "",
          telephone: "",
          wrokAddress: "",
          workPostion: "",
          tabooDrugs: "",
          caringLevel: "",
          tabooFood: "",
          dietType: "",
          homePhone: "",
          isLocal: "",
          isExtranetAppointment: "",
          appointmentTime: "",
          appointmentID: "",
          checkinDate: "",
          ID: "",
          status: "",
          pensionBenefits: "",
          pensionIncome: "",
          elderlyType: "",
          elderlyAvatar: ""
        }],
        elderlyInfoVisible: false,
        roomNos: [
        {
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
      };
    },
    methods: {
      showInfo: function() {
        this.elderlyInfoVisible = true
      },
    }
  };
</script>

<style scoped>
  
</style>
<template>
  <div>
    <el-container>
      <el-main>
        <el-card>
          <div slot="header">
            <el-row>
              <el-col :span="6" :offset="9">
                入院登记
              </el-col>
              <el-col :span="1" :offset="5">
                <el-button type="success" plain size="small">提交</el-button>
              </el-col>
              <el-col :span="1" :offset="1">
                <el-button type="primary" plain size="small">返回</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-form :model="applicationForm" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名">
                    <el-input v-model="applicationForm.name" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期">
                    <el-input v-model="applicationForm.birth" size="small"></el-input>
                  </el-form-item>
                </el-col> 
                <el-col :span="5">
                  <el-form-item label="性别">
                    <el-radio-group v-model="applicationForm.gender">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>                    
                  </el-form-item>
                </el-col>                               
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="籍贯">
                    <el-input v-model="applicationForm.hometown" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="民族">
                    <el-input v-model="applicationForm.nationality" size="small"></el-input>
                  </el-form-item>
                </el-col> 
                <el-col :span="7">
                  <el-form-item label="身份证号">
                    <el-input v-model="applicationForm.identityCardNo" size="small"></el-input>                 
                  </el-form-item>
                </el-col>                               
              </el-row> 
              <el-row>
                <el-col :span="8">
                  <el-form-item label="政治面貌">
                    <el-input v-model="applicationForm.politicsStatus" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="社保卡号">
                    <el-input v-model="applicationForm.socialSecurityNo" size="small"></el-input>
                  </el-form-item>
                </el-col>                
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="婚姻状况">
                    <el-radio-group v-model="applicationForm.marriageStatus">
                      <el-radio label="已婚"></el-radio>
                      <el-radio label="离婚"></el-radio>
                      <el-radio label="丧偶"></el-radio>
                      <el-radio label="再婚"></el-radio>
                      <el-radio label="未婚"></el-radio>
                    </el-radio-group>                    
                  </el-form-item>                  
                </el-col>
              </el-row> 
              <el-row>
                <el-col :span="10">
                  <el-form-item label="教育程度">
                    <el-radio-group v-model="applicationForm.educationLevel">
                      <el-radio label="文盲"></el-radio>
                      <el-radio label="略识文字"></el-radio>
                      <el-radio label="能读写"></el-radio>
                    </el-radio-group>                    
                  </el-form-item>                  
                </el-col>
                <el-col :span="10" :offset="3">
                  <el-form-item label="最高学历">  
                    <div class="select-box">
                      <multiselect v-model="applicationForm.highestEduBG" :options="eduLevels" placeholder="请选择" ></multiselect>
                    </div>                                       
                  </el-form-item>                 
                </el-col>                
              </el-row> 
              <el-row>
                <el-col :span="23">
                  <el-form-item label="户口地址">
                    <el-input v-model="applicationForm.residence" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row> 
              <el-row>
                <el-col :span="23">
                  <el-form-item label="现居住地址">
                    <el-input v-model="applicationForm.currentResidence" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row> 
              <el-row>
                <el-col :span="8">
                  <el-form-item label="代理人姓名">
                    <el-input v-model="applicationForm.agentName" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="1">
                  <el-form-item label="与老人关系">
                    <div class="select-box">
                      <multiselect v-model="applicationForm.relationship" :options="relationship" placeholder="请选择" ></multiselect>
                    </div>
                  </el-form-item>
                </el-col> 
                <el-col :span="6" :offset="1">
                  <el-form-item label="代理人电话">
                    <el-input v-model="applicationForm.identityCardNo" size="small"></el-input>                 
                  </el-form-item>
                </el-col>                              
              </el-row>  
              <el-row>
                <el-col :span="14">
                  <el-form-item label="代理人地址">
                    <el-input v-model="applicationForm.agentAddress"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" :offset="2">
                  <el-form-item label="邮编">
                    <el-input v-model="applicationForm.agentPostCode" size="small"></el-input>
                  </el-form-item>
                </el-col> 
              </el-row>
              <el-row>
                <el-form-item label="病史介绍">
                  <el-checkbox-group v-model="applicationForm.historyData" size="small">
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
              </el-row> 
              <el-row>
                <el-col :span="23">
                  <el-form-item label="其他疾病">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 5}"
                      placeholder="请输入内容"
                      v-model="applicationForm.disease">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="申请入住原因">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 5, maxRows: 6}"
                      placeholder="请输入内容"
                      v-model="applicationForm.disease">
                    </el-input>
                  </el-form-item>      
                </el-col>
                <el-col :span="8">
                  <el-form-item label="申请人签名">
                    <el-input
                      v-model="applicationForm.applicantSig">
                    </el-input>
                  </el-form-item>      
                </el-col>
                <el-col :span="7">
                  <el-form-item label="申请时间">
                    <el-input
                      v-model="applicationForm.applicationDate">
                    </el-input>
                  </el-form-item>      
                </el-col>                                
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="院方意见">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 5, maxRows: 6}"
                      placeholder="请输入内容"
                      v-model="applicationForm.opinion">
                    </el-input>
                  </el-form-item>      
                </el-col>
                <el-col :span="8">
                  <el-form-item label="负责人签名">
                    <el-input
                      v-model="applicationForm.principleSig">
                    </el-input>
                  </el-form-item>      
                </el-col>
                <el-col :span="7">
                  <el-form-item label="时间">
                    <el-input
                      v-model="applicationForm.approvalDate">
                    </el-input>
                  </el-form-item>      
                </el-col>                                
              </el-row>                                                    
            </el-form>                      
          </div>
        </el-card>
      </el-main>
    </el-container>  
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        applicationForm: {
          name: "",
          birth: "",
          gender: "",
          hometown: "",
          nationality: "",
          identityCardNo: "",
          politicsStatus: "",
          socialSecurityNo: "",
          marriageStatus: "",
          educationLevel: "",
          highestEduBG: "",
          residence: "",
          currentResidence: "",
          accountAddress: "",
          presentResidence: "",
          agentName: "",
          relationship: "",
          agentTel: "",
          agentAddress: "",
          agentPostCode: "",
          history: "",
          disease: "",
          reason: "",
          applicantSig: "",
          applicationDate: "",          
          opinion: "",
          principleSig: "",
          approvalDate: ""
        },
        eduLevels: ["未接受教育", "小学", "初中", "中专", "大专", "高中", "本科", "硕士研究生", "博士研究生", "博士后"],
        relationship: ["子女", "孙辈", "配偶"],
        historyData: [],

      }
  
    },
  }
</script>

<style>
.select-box {
    line-height: 0;
}
</style>

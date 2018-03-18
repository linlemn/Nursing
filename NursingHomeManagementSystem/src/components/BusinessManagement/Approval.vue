<template>
 <div>
      <el-container>
        <el-header class="sub-header">
          <el-row>
            <el-col :span="6" :offset="9">
              入住审批
            </el-col>
            <el-col :span="1" :offset="3">
              <el-button type="success" plain size="small" @click="approvalFormVisible = true">新增</el-button>
              <el-dialog
                title="入住审批表"
                :visible.sync="approvalFormVisible"
                width="80%"
                style="text-align: left">                
                <el-form  label-width="160px" v-model="approvalForm">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="姓名">
                        <el-input v-model="approvalForm.name" size="small"></el-input>
                      </el-form-item> 
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="出生日期">
                        <el-input v-model="approvalForm.birth" size="small"></el-input>
                      </el-form-item>
                    </el-col> 
                    <el-col :span="6">
                      <el-form-item label="性别">
                        <el-radio-group v-model="approvalForm.gender">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                        </el-radio-group>                    
                      </el-form-item>
                    </el-col>                                            
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="退休金及收入">
                        <el-input v-model="approvalForm.income" size="small"></el-input>
                      </el-form-item> 
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="政治面貌">
                        <el-input v-model="approvalForm.politicsStatus" size="small"></el-input>
                      </el-form-item>
                    </el-col> 
                    <el-col :span="8" >
                      <el-form-item label="身份证号">  
                        <el-input v-model="approvalForm.identityCardNo" size="small"></el-input>                 
                      </el-form-item>
                    </el-col>                    
                  </el-row>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item label="家庭住址">
                        <el-input v-model="approvalForm.address" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="户籍所在地">
                        <el-input v-model="approvalForm.residence" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item label="户籍所在地居委会名称">
                        <el-input v-model="approvalForm.residenceNeighborhood" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="入住时间">
                        <el-input v-model="approvalForm.checkInDate" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第一担保人姓名">
                        <el-input v-model="approvalForm.firstGuarantorName" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="第一担保人关系">
                          <el-select v-model="approvalForm.firstGuarantorRel" placeholder="请选择">
                            <el-option
                              v-for="item in relationship"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第一担保人地址">
                        <el-input v-model="approvalForm.firstGuarantorAdr" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第一担保人地址邮编">
                        <el-input v-model="approvalForm.firstGuarantorPostCode" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第一担保人电话">
                        <el-input v-model="approvalForm.firstGuarantorTel" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第二担保人姓名">
                        <el-input v-model="approvalForm.secondGuarantorName" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="第二担保人关系">
                          <el-select v-model="approvalForm.secondGuarantorRel" placeholder="请选择">
                            <el-option
                              v-for="item in relationship"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第二担保人地址">
                        <el-input v-model="approvalForm.secondGuarantorAdr" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第二担保人地址邮编">
                        <el-input v-model="approvalForm.secondGuarantorPostCode" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第二担保人电话">
                        <el-input v-model="approvalForm.GuarantorTel" size="small"></el-input>
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
                          v-model="approvalForm.reason">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="申请人签名">
                        <el-input
                          v-model="approvalForm.applicantSig">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="申请时间">
                        <el-input
                          v-model="approvalForm.applicationDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>                                
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="体检及家访意见">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="approvalForm.opinion">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经办人签名">
                        <el-input
                          v-model="approvalForm.handlingSig">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="时间">
                        <el-input
                          v-model="approvalForm.handlingDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>                                
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="护理级别评估责任人">
                        <el-input
                          v-model="approvalForm.caringResponsible">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="日期">
                        <el-input
                          v-model="approvalForm.responsibleDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="审批">
                        <el-input
                          v-model="approvalForm.responsibleApproval">
                        </el-input>
                      </el-form-item>      
                    </el-col>                                
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="院长签名">
                        <el-input
                          v-model="approvalForm.deanSig">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="日期">
                        <el-input
                          v-model="approvalForm.deanDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                  </el-row>                                                                                          
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="approvalFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
                </div>                 
              </el-dialog>
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="primary" plain size="small" @click="searchFormVisible = true">修改</el-button>
              <el-dialog
                title="修改入住审批表"
                :visible.sync="searchFormVisible"
                width="80%"
                style="text-align: left">                
                <el-form  label-width="160px" v-model="searchResult">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="姓名">
                        <el-input v-model="searchResult.name" size="small"></el-input>
                      </el-form-item> 
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="出生日期">
                        <el-input v-model="searchResult.birth" size="small"></el-input>
                      </el-form-item>
                    </el-col> 
                    <el-col :span="6">
                      <el-form-item label="性别">
                        <el-radio-group v-model="searchResult.gender">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                        </el-radio-group>                    
                      </el-form-item>
                    </el-col>                                            
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="退休金及收入">
                        <el-input v-model="searchResult.income" size="small"></el-input>
                      </el-form-item> 
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="政治面貌">
                        <el-input v-model="searchResult.politicsStatus" size="small"></el-input>
                      </el-form-item>
                    </el-col> 
                    <el-col :span="8" >
                      <el-form-item label="身份证号">  
                        <el-input v-model="searchResult.identityCardNo" size="small"></el-input>                 
                      </el-form-item>
                    </el-col>                    
                  </el-row>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item label="家庭住址">
                        <el-input v-model="searchResult.address" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="户籍所在地">
                        <el-input v-model="searchResult.residence" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item label="户籍所在地居委会名称">
                        <el-input v-model="searchResult.residenceNeighborhood" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="入住时间">
                        <el-input v-model="searchResult.checkInDate" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第一担保人姓名">
                        <el-input v-model="searchResult.firstGuarantorName" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="第一担保人关系">
                          <el-select v-model="searchResult.firstGuarantorRel" placeholder="请选择">
                            <el-option
                              v-for="item in relationship"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第一担保人地址">
                        <el-input v-model="searchResult.firstGuarantorAdr" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第一担保人地址邮编">
                        <el-input v-model="searchResult.firstGuarantorPostCode" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第一担保人电话">
                        <el-input v-model="searchResult.firstGuarantorTel" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第二担保人姓名">
                        <el-input v-model="searchResult.secondGuarantorName" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="第二担保人关系">
                          <el-select v-model="searchResult.secondGuarantorRel" placeholder="请选择">
                            <el-option
                              v-for="item in relationship"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第二担保人地址">
                        <el-input v-model="searchResult.secondGuarantorAdr" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="第二担保人地址邮编">
                        <el-input v-model="searchResult.secondGuarantorPostCode" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="第二担保人电话">
                        <el-input v-model="searchResult.GuarantorTel" size="small"></el-input>
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
                          v-model="searchResult.reason">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="申请人签名">
                        <el-input
                          v-model="searchResult.applicantSig">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="申请时间">
                        <el-input
                          v-model="searchResult.applicationDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>                                
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="体检及家访意见">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="searchResult.opinion">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经办人签名">
                        <el-input
                          v-model="searchResult.handlingSig">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="时间">
                        <el-input
                          v-model="searchResult.handlingDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>                                
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="护理级别评估责任人">
                        <el-input
                          v-model="searchResult.caringResponsible">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="日期">
                        <el-input
                          v-model="searchResult.responsibleDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="审批">
                        <el-input
                          v-model="searchResult.responsibleApproval">
                        </el-input>
                      </el-form-item>      
                    </el-col>                                
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="院长签名">
                        <el-input
                          v-model="searchResult.deanSig">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="日期">
                        <el-input
                          v-model="searchResult.deanDate">
                        </el-input>
                      </el-form-item>      
                    </el-col>
                  </el-row>                                                                                          
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="searchFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdateSubmit">提 交</el-button>
                </div>                 
              </el-dialog>              
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="danger" plain size="small">删除</el-button>
            </el-col>
          </el-row>          
        </el-header>
        <el-main>
          <el-row class="header-row">
            <el-col :span="24">
              <el-card>
                <div slot="header">
                  <el-row>
                    <el-form :inline="true" :model="searchForm" label-width="70px">
                      <el-col :span="7">
                        <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]">
                          <el-input v-model="searchForm.name" placeholder="请输入姓名" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="流程状态">
                          <div class="select-box">
                            <multiselect v-model="searchForm.processState" :options="processStateOps" placeholder="请选择"></multiselect>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="状态" >
                          <div class="select-box">
                            <multiselect v-model="searchForm.state" :options="stateOps" placeholder="请选择" ></multiselect>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="3">
                        <el-form-item>
                          <el-button type="primary" @click="onSearch" size="small">查询</el-button>
                        </el-form-item>
                      </el-col>
                    </el-form>
                  </el-row>
                </div>
                <div>
                  <el-table
                    :data="searchResult"
                    height="250"
                    border
                    style="width: 100%"
                    @selection-change="handleSeclection()">
                    <el-table-column
                    type="selection"
                    fixed
                    ></el-table-column>
                    <el-table-column
                      prop="id"
                      label="序号"
                      fixed>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别">
                    </el-table-column>
                    <el-table-column
                      prop="birth"
                      label="出生日期">
                    </el-table-column>
                    <el-table-column
                      prop="hometown"
                      label="籍贯">
                    </el-table-column>
                    <el-table-column
                      prop="nationality"
                      label="民族">
                    </el-table-column>    
                    <el-table-column
                      prop="marriageStatus"
                      label="婚姻状态">
                    </el-table-column> 
                    <el-table-column
                      prop="politicsStatus"
                      label="政治面貌">
                    </el-table-column>   
                    <el-table-column
                      prop="processStatus"
                      label="流程状态">
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      fixed="right">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      searchForm: {
        name: "",
        processState: "",
        state: ""
      },
      processStateOps: ["全部", "入驻申请"],
      stateOps: ["全部", "正常", "删除"],
      searchFormVisible: false,
      searchResult: [
        {
          id: "",
          name: "",
          gender: "",
          birth: "",
          hometown: "",
          nationality: "",
          marriageStatus: "",
          politicsStatus: "",
          processStatus: "",
          income: "",
          politicsStatus: "",
          identityCardNo: "",
          address: "",
          residence: "",
          residenceNeighborhood: "",
          checkInDate: "",
          firstGuarantorName: "",
          firstGuarantorRel: "",
          firstGuarantorAdr: "",
          firstGuarantorPostCode: "",
          firstGuarantorTel: "",
          secondGuarantorName: "",
          secondGuarantorRel: "",
          secondGuarantorAdr: "",
          secondGuarantorPostCode: "",
          secondGuarantorTel: "",
          reason: "",
          applicantSig: "",
          applicationDate: "",
          opinion: "",
          handlingSig: "",
          handlingDate: "",
          caringResponsible: "",
          responsibleDate: "",
          responsibleApproval: "",
          deanSig: "",
          deanDate: "",
        }
      ],
      approvalFormVisible: false,
      approvalForm: {
        name: "",
        birth: "",
        gender: "",
        income: "",
        politicsStatus: "",
        identityCardNo: "",
        address: "",
        residence: "",
        residenceNeighborhood: "",
        checkInDate: "",
        firstGuarantorName: "",
        firstGuarantorRel: "",
        firstGuarantorAdr: "",
        firstGuarantorPostCode: "",
        firstGuarantorTel: "",
        secondGuarantorName: "",
        secondGuarantorRel: "",
        secondGuarantorAdr: "",
        secondGuarantorPostCode: "",
        secondGuarantorTel: "",
        reason: "",
        applicantSig: "",
        applicationDate: "",
        opinion: "",
        handlingSig: "",
        handlingDate: "",
        caringResponsible: "",
        responsibleDate: "",
        responsibleApproval: "",
        deanSig: "",
        deanDate: "",
      },
      relationship: [{
        value: "选项1",
        label: "子女"
      }, {
        value: "选项2",
        label: "孙辈"
      }, {
        value:"选项3",
        label: "配偶"
      }, {
        value: "选项4",
        label: "兄弟姐妹"
      }],
    };
  },
  methods: {
    onSearch: function() {},
    handleSelection: function() {},
    handleDelete: function() {},
    handleAddSubmit: function() {
      this.approvalFormVisible = false
    },
    handleUpdateSubmit: function() {
      this.searchFormVisible = false
    }

  }
};
</script>

<style scoped>

</style>

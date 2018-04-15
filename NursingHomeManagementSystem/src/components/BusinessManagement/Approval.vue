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
            <el-dialog title="入住审批表" :visible.sync="approvalFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="approvalForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input v-model="approvalForm.name" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="出生日期">
                      <el-input v-model="approvalForm.birthDate" size="small"></el-input>
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
                      <el-input v-model="approvalForm.pension" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="政治面貌">
                      <el-input v-model="approvalForm.politicalSide" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份证号">
                      <el-input v-model="approvalForm.idNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="家庭住址">
                      <el-input v-model="approvalForm.homeAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="户籍所在地">
                      <el-input v-model="approvalForm.domicileLocation" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="户籍所在地居委会名称">
                      <el-input v-model="approvalForm.residenceCommitteeName" size="small"></el-input>
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
                      <el-input v-model="approvalForm.guarantorName1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="第一担保人关系">
                      <el-select v-model="approvalForm.guarantorRelation1" placeholder="请选择">
                        <el-option v-for="item in relationship" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一担保人地址">
                      <el-input v-model="approvalForm.guarantorAddress1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第一担保人地址邮编">
                      <el-input v-model="approvalForm.guarantorZipCode1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一担保人电话">
                      <el-input v-model="approvalForm.guarantorPhoneNumber1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第二担保人姓名">
                      <el-input v-model="approvalForm.guarantorName2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="第二担保人关系">
                      <el-select v-model="approvalForm.guarantorRelation2" placeholder="请选择">
                        <el-option v-for="item in relationship" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第二担保人地址">
                      <el-input v-model="approvalForm.guarantorAddress2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第二担保人地址邮编">
                      <el-input v-model="approvalForm.guarantorZipCode2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第二担保人电话">
                      <el-input v-model="approvalForm.guarantorPhoneNumber2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="申请入住原因">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="approvalForm.applicationReason">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请人签名">
                      <el-input v-model="approvalForm.applicantSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="申请时间">
                      <el-input v-model="approvalForm.applicantDate">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="体检及家访意见">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="approvalForm.medicalSuggestion">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="经办人签名">
                      <el-input v-model="approvalForm.handlerSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="时间">
                      <el-input v-model="approvalForm.handlerDate">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="护理级别评估责任人">
                      <el-input v-model="approvalForm.levelAssessmentHadler">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="日期">
                      <el-input v-model="approvalForm.assessmentDate">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="审批">
                      <el-input v-model="approvalForm.approval">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="院长签名">
                      <el-input v-model="approvalForm.deanSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="日期">
                      <el-input v-model="approvalForm.deanSigDate">
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
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
            <el-dialog title="入住审批表" :visible.sync="updateApprovalFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="updateApprovalForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input v-model="updateApprovalForm.name" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="出生日期">
                      <el-input v-model="updateApprovalForm.birthDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="性别">
                      <el-radio-group v-model="updateApprovalForm.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="退休金及收入">
                      <el-input v-model="updateApprovalForm.pension" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="政治面貌">
                      <el-input v-model="updateApprovalForm.politicalSide" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="身份证号">
                      <el-input v-model="updateApprovalForm.idNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="家庭住址">
                      <el-input v-model="updateApprovalForm.homeAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="户籍所在地">
                      <el-input v-model="updateApprovalForm.domicileLocation" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="户籍所在地居委会名称">
                      <el-input v-model="updateApprovalForm.residenceCommitteeName" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入住时间">
                      <el-input v-model="updateApprovalForm.checkInDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第一担保人姓名">
                      <el-input v-model="updateApprovalForm.guarantorName1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="第一担保人关系">
                      <el-select v-model="updateApprovalForm.guarantorRelation1" placeholder="请选择">
                        <el-option v-for="item in relationship" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一担保人地址">
                      <el-input v-model="updateApprovalForm.guarantorAddress1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第一担保人地址邮编">
                      <el-input v-model="updateApprovalForm.guarantorZipCode1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第一担保人电话">
                      <el-input v-model="updateApprovalForm.guarantorPhoneNumber1" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第二担保人姓名">
                      <el-input v-model="updateApprovalForm.guarantorName2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="第二担保人关系">
                      <el-select v-model="updateApprovalForm.guarantorRelation2" placeholder="请选择">
                        <el-option v-for="item in relationship" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第二担保人地址">
                      <el-input v-model="updateApprovalForm.guarantorAddress2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="第二担保人地址邮编">
                      <el-input v-model="updateApprovalForm.guarantorZipCode2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="第二担保人电话">
                      <el-input v-model="updateApprovalForm.guarantorPhoneNumber2" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="申请入住原因">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateApprovalForm.applicationReason">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请人签名">
                      <el-input v-model="updateApprovalForm.applicantSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="申请时间">
                      <el-input v-model="updateApprovalForm.applicantDate">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="体检及家访意见">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateApprovalForm.medicalSuggestion">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="经办人签名">
                      <el-input v-model="updateApprovalForm.handlerSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="时间">
                      <el-input v-model="updateApprovalForm.handlerDate">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="护理级别评估责任人">
                      <el-input v-model="updateApprovalForm.levelAssessmentHadler">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="日期">
                      <el-input v-model="updateApprovalForm.assessmentDate">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="审批">
                      <el-input v-model="updateApprovalForm.approval">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="院长签名">
                      <el-input v-model="updateApprovalForm.deanSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="日期">
                      <el-input v-model="updateApprovalForm.deanSigDate">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateApprovalFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdateSubmit">提 交</el-button>
              </div>
            </el-dialog>            
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="handleDelection">删除</el-button>
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
                        <el-select v-model="searchForm.processState" placeholder="请选择" size="small">
                          <el-option v-for="item in processStateOps" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="状态">
                        <el-select v-model="searchForm.state" placeholder="请选择" size="small">
                          <el-option v-for="item in stateOps" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
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
                <el-table :data="results" border style="width: 100%" highlight-current-row @current-change="handleSelection">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别">
                  </el-table-column>
                  <el-table-column prop="birthDate" label="出生日期">
                  </el-table-column>
                  <el-table-column prop="origin" label="籍贯">
                  </el-table-column>
                  <el-table-column prop="national" label="民族">
                  </el-table-column>
                  <el-table-column prop="maritalStatus" label="婚姻状态">
                  </el-table-column>
                  <el-table-column prop="politicalSide" label="政治面貌">
                  </el-table-column>
                  <el-table-column prop="processStatus" label="流程状态">
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
        processStateOps: [{
          value: "选项1",
          label: "全部"
        }, {
          value: "选项2",
          label: "入住申请"
        }],
        stateOps: [{
          value: "选项1",
          label: "全部"
        }, {
          value: "选项2",
          label: "正常"
        }, {
          value: "选项3",
          label: "删除"
        }],
        updateApprovalFormVisible: false,
        updateApprovalForm: {
          name: "",
          birthDate: "",
          gender: "",
          pension: "",
          politicalSide: "",
          idNumber: "",
          homeAddress: "",
          domicileLocation: "",
          residenceCommitteeName: "",
          checkInDate: "",
          guarantorName1: "",
          firstGuarantorRel: "",
          guarantorAddress1: "",
          guarantorZipCode1: "",
          guarantorPhoneNumber1: "",
          guarantorName2: "",
          guarantorRelation2: "",
          guarantorAddress2: "",
          guarantorZipCode2: "",
          guarantorPhoneNumber2: "",
          applicationReason: "",
          applicantSignature: "",
          applicationDate: "",
          medicalSuggestion: "",
          handlerSignature: "",
          handlerDate: "",
          levelAssessmentHadler: "",
          assessmentDate: "",
          approval: "",
          deanSignature: "",
          deanSigDate: "",
        },
        approvalFormVisible: false,
        approvalForm: {
          name: "",
          birthDate: "",
          gender: "",
          pension: "",
          politicalSide: "",
          idNumber: "",
          homeAddress: "",
          domicileLocation: "",
          residenceCommitteeName: "",
          checkInDate: "",
          guarantorName1: "",
          firstGuarantorRel: "",
          guarantorAddress1: "",
          guarantorZipCode1: "",
          guarantorPhoneNumber1: "",
          guarantorName2: "",
          guarantorRelation2: "",
          guarantorAddress2: "",
          guarantorZipCode2: "",
          guarantorPhoneNumber2: "",
          applicationReason: "",
          applicantSignature: "",
          applicationDate: "",
          medicalSuggestion: "",
          handlerSignature: "",
          handlerDate: "",
          levelAssessmentHadler: "",
          assessmentDate: "",
          approval: "",
          deanSignature: "",
          deanSigDate: "",
        },
        relationship: [{
          value: "选项1",
          label: "子女"
        }, {
          value: "选项2",
          label: "孙辈"
        }, {
          value: "选项3",
          label: "配偶"
        }, {
          value: "选项4",
          label: "兄弟姐妹"
        }],
        results: [],
        permanentResults: [],
        middleUrl: "/admissionApproval",
        idSelcetion: "",
      };
    },
    methods: {
      onSearch: function() {
        if (this.searchForm.name.length == 0 ) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.results = this.permanentResults
          return
        }
        var tempResults = []
        for (var i in this.permanentResults) {   
             
          if (this.permanentResults[i].name.search(this.searchForm.name) != -1) {
            tempResults.push(this.permanentResults[i])
          }
        }
        this.results = tempResults
      },
      handleSelection: function(val) {
        this.idSelection = val.id
      },
      handleDelection: function() {
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
            if (data[200] == "操作成功") {
              self.$message({
                message: '删除成功',
                type: 'success',
              });
              self.getAllApprovalInfo()
            } 
            else {
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
      handleAddSubmit: function() {
        let self = this
        if (self.approvalForm.name.length == 0 || self.approvalForm.birthDate.length == 0 || self.approvalForm.gender.length == 0) {
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
          data: JSON.stringify(self.approvalForm),
          success: function(data) {
            //解析返回的data
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              data.data["processStatus"] = "入住申请"
              self.permanentResults.push(data.data)
              self.results = self.permanentResults
              self.approvalFormVisible = false
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
      ableToModify: function() {
        if (this.idSelection != "" ) {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i].id == this.idSelection) {             
              this.updateApprovalFormVisible = true
              this.updateApprovalForm = this.permanentResults[i]
            }
          }
        } else {
          this.$message({
            message: '未选择修改对象！',
            type: 'error',
          });
        }
      },      
      handleUpdateSubmit: function() {
        let self = this
        console.log(self.updateApprovalForm)
        var modifyAppForm = self.updateApprovalForm
        delete modifyAppForm["processStatus"]  
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(modifyAppForm),
          success: function(data) {
            console.log(data)
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.updateApprovalFormVisible = false
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
      getAllApprovalInfo: function() {       
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            self.permanentResults = data.data
            self.results = data.data
            for (var i in self.results) {
              self.results[i].processStatus = "入住申请"
            }
          },
          error: function() {
            self.$message({
              message: '申请列表加载失败，请检查网络',
              type: 'error',
            });
          }
        })
      },

    },
    mounted: function() {
      this.getAllApprovalInfo()
    }    
  };
</script>

<style scoped>
  
</style>

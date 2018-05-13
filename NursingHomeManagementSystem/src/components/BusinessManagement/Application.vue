<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            入住申请
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="applicationFormVisible = true">新增</el-button>
            <el-dialog title="新增入住申请表" :visible.sync="applicationFormVisible" width="80%" style="text-align: left">
              <el-form :model="applicationForm" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]">
                      <el-input v-model="applicationForm.name" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                      <el-date-picker v-model="applicationForm.birthDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="性别" :rules="[{ required: true, message: '性别不能为空', trigger: 'change'}]">
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
                      <el-input v-model="applicationForm.origin" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族">
                      <el-input v-model="applicationForm.national" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="身份证号">
                      <el-input v-model="applicationForm.idNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="政治面貌">
                      <el-select v-model="applicationForm.politicalSide" placeholder="请选择" size="small">
                        <el-option v-for="item in politicalSides" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="社保卡号">
                      <el-input v-model="applicationForm.ssCardNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="婚姻状况">
                      <el-radio-group v-model="applicationForm.maritalStatus">
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
                      <el-select v-model="applicationForm.highestEducation" placeholder="请选择" size="small">
                        <el-option v-for="item in eduLevels" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="户口地址">
                      <el-input v-model="applicationForm.domicilePlace" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="现居住地址">
                      <el-input v-model="applicationForm.address" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="代理人姓名">
                      <el-input v-model="applicationForm.agent" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="与老人关系">
                      <div class="select-box">
                        <multiselect v-model="applicationForm.relationWithElderly" :options="relationship" placeholder="请选择"></multiselect>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-form-item label="代理人电话">
                      <el-input v-model="applicationForm.agentPhoneNumber" size="small"></el-input>
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
                      <el-input v-model="applicationForm.zipCode" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="病史介绍">
                    <el-checkbox-group v-model="illnessHistory" size="small">
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
                      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="applicationForm.otherIllness">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="申请入住原因">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="applicationForm.applicationReason">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请人签名">
                      <el-input v-model="applicationForm.applicantSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="申请时间">
                      <el-date-picker v-model="applicationForm.applicantdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>                      
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="院方意见">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="applicationForm.opinionOfHospital">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="负责人签名">
                      <el-input v-model="applicationForm.handlerSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="时间">
                      <el-date-picker v-model="applicationForm.handlerDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="applicationFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleApplicationSubmit">提 交</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
            <el-dialog title="修改入住申请表" :visible.sync="modifyApplicationFormVisible" width="80%" style="text-align: left">
              <el-form :model="modifyApplicationForm" label-width="100px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]">
                      <el-input v-model="modifyApplicationForm.name" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                      <el-date-picker v-model="modifyApplicationForm.birthDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="性别" :rules="[{ required: true, message: '性别不能为空', trigger: 'change'}]">
                      <el-radio-group v-model="modifyApplicationForm.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="籍贯">
                      <el-input v-model="modifyApplicationForm.origin" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="民族">
                      <el-input v-model="modifyApplicationForm.national" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="身份证号">
                      <el-input v-model="modifyApplicationForm.idNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="政治面貌">
                      <el-select v-model="modifyApplicationForm.politicalSide" placeholder="请选择" size="small">
                        <el-option v-for="item in politicalSides" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="社保卡号">
                      <el-input v-model="modifyApplicationForm.ssCardNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="婚姻状况">
                      <el-radio-group v-model="modifyApplicationForm.maritalStatus">
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
                      <el-radio-group v-model="modifyApplicationForm.educationLevel">
                        <el-radio label="文盲"></el-radio>
                        <el-radio label="略识文字"></el-radio>
                        <el-radio label="能读写"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10" :offset="3">
                    <el-form-item label="最高学历">
                      <el-select v-model="modifyApplicationForm.highestEducation" placeholder="请选择" size="small">
                        <el-option v-for="item in eduLevels" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="户口地址">
                      <el-input v-model="modifyApplicationForm.domicilePlace" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="现居住地址">
                      <el-input v-model="modifyApplicationForm.address" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="代理人姓名">
                      <el-input v-model="modifyApplicationForm.agent" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="与老人关系">
                      <div class="select-box">
                        <multiselect v-model="modifyApplicationForm.relationWithElderly" :options="relationship" placeholder="请选择"></multiselect>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-form-item label="代理人电话">
                      <el-input v-model="modifyApplicationForm.agentPhoneNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="代理人地址">
                      <el-input v-model="modifyApplicationForm.agentAddress"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="2">
                    <el-form-item label="邮编">
                      <el-input v-model="modifyApplicationForm.zipCode" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="病史介绍">
                    <el-checkbox-group v-model="illnessHistory" size="small">
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
                      <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="modifyApplicationForm.otherIllness">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="申请入住原因">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="modifyApplicationForm.applicationReason">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="申请人签名">
                      <el-input v-model="modifyApplicationForm.applicantSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="申请时间">
                      <el-date-picker v-model="modifyApplicationForm.applicantdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>                       
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="院方意见">
                      <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="modifyApplicationForm.opinionOfHospital">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="负责人签名">
                      <el-input v-model="modifyApplicationForm.handlerSignature">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="时间">
                      <el-date-picker v-model="modifyApplicationForm.handlerdate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>                       
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="modifyApplicationFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleModifySubmit">提 交</el-button>
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
                <el-table :data="results.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" highlight-current-row @current-change="handleSelection">
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
                  <el-pagination small layout="prev, pager, next" :total="results.length" :page-size="pagesize" @current-change="handleCurrentChange" :current-page="currentPage">
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
    components: {
    },
    data() {
      return {
        applicationFormVisible: false,
        searchForm: {
          name: "",
          processState: "",
          state: ""
        },
        processStateOps: [{
          value: "选项1",
          label: "全部"
          }, 
          {
          value: "选项2",
          label: "入住申请"
        }],
        stateOps: [{
          value: "选项1",
          label: "全部"
          }, 
          {
          value: "选项2",
          label: "正常"
        }],
        searchResult: [{
          id: "",
          name: "",
          gender: "",
          birth: "",
          hometown: "",
          nationality: "",
          marriageStatus: "",
          politicsStatus: "",
          processStatus: ""
        }],
        results: [],
        applicationForm: {
          id: "",
          name: "",
          birthDate: "",
          gender: "",
          floor: "",
          roomNumber: "",
          age: "",
          orgin: "",
          domicilePlace: "",
          national: "",
          idNumber: "",
          politicalSide: "",
          ssCardNumber: "",
          maritalStatus: "",
          educationLevel: "",
          highestEducation: "",
          currentResidence: "",
          accountAddress: "",
          presentResidence: "",
          agent: "",
          relationWithElderly: "",
          agentPhoneNumber: "",
          agentAddress: "",
          zipCode: "",
          address: "",
          phoneNumber: "",
          workUnit: "",
          position: "",
          tabooDrugs: "",
          nursingGrade: "",
          tabooFood: "",
          dietType: "",
          zodiac: "",
          homePhone: "",
          sameCity: "",
          onlineAppointment: "",
          appointmentTime: "",
          appointNumber: "",
          admissionDate: "",
          courtNumber: "",
          hospitalized: "",
          pensionBenefits: "",
          pensionIncome: "",
          elderlyType: "",
          elderlyHead: "",
          illnessHistory: "",
          otherIllness: "",
          applicationReason: "",
          applicantSignature: "",
          applicantdate: "",
          opinionOfHospital: "",
          handlerSignature: "",
          handlerDate: ""
        },
        modifyApplicationForm: {
          id: "",
          name: "",
          birthDate: "",
          gender: "",
          floor: "",
          roomNumber: "",
          age: "",
          orgin: "",
          domicilePlace: "",
          national: "",
          idNumber: "",
          politicalSide: "",
          ssCardNumber: "",
          maritalStatus: "",
          educationLevel: "",
          highestEducation: "",
          currentResidence: "",
          accountAddress: "",
          presentResidence: "",
          agent: "",
          relationWithElderly: "",
          agentPhoneNumber: "",
          agentAddress: "",
          zipCode: "",
          address: "",
          phoneNumber: "",
          workUnit: "",
          position: "",
          tabooDrugs: "",
          nursingGrade: "",
          tabooFood: "",
          dietType: "",
          zodiac: "",
          homePhone: "",
          sameCity: "",
          onlineAppointment: "",
          appointmentTime: "",
          appointNumber: "",
          admissionDate: "",
          courtNumber: "",
          hospitalized: "",
          pensionBenefits: "",
          pensionIncome: "",
          elderlyType: "",
          elderlyHead: "",
          illnessHistory: "",
          otherIllness: "",
          applicationReason: "",
          applicantSignature: "",
          applicantdate: "",
          opinionOfHospital: "",
          handlerSignature: "",
          handlerDate: ""
        },
        eduLevels: [{
          value: "选项1",
          label: "未接受教育"
        }, {
          value: "选项2",
          label: "小学"
        }, {
          value: "选项3",
          label: "初中"
        }, {
          value: "选项4",
          label: "中专"
        }, {
          value: "选项5",
          label: "大专"
        }, {
          value: "选项6",
          label: "高中"
        }, {
          value: "选项7",
          label: "本科"
        }, {
          value: "选项8",
          label: "硕士研究生"
        }, {
          value: "选项9",
          label: "博士研究生"
        }, {
          value: "选项10",
          label: "博士后"
        }],
        relationship: ["子女", "孙辈", "配偶"],
        illnessHistory: [],
        permanentResults: [],
        idSelection: "",
        modifyApplicationFormVisible: false,
        middleUrl: "/admissionApplication",
        politicalSides: [{
            value: "选项1",
            label: "群众"
          },
          {
            value: "选项2",
            label: "少先队员"
          },
          {
            value: "选项3",
            label: "共青团员"
          },
          {
            value: "选项4",
            label: "中共党员"
          },
        ],
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,        
      }
    },
    methods: {
      onSearch: function() {
        if (this.searchForm.name.length == 0) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.results = this.permanentResults
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
            console.log(data)
            if (data.data != null) {
              self.$message({
                message: '删除成功',
                type: 'success',
              });
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
      handleApplicationSubmit: function() {
        let self = this
        for (var i in self.illnessHistory) {
          self.applicationForm.illnessHistory += " "
          self.applicationForm.illnessHistory += String(self.illnessHistory[i])
        }
        if (self.applicationForm.name.length == 0 || self.applicationForm.birthDate.length == 0 || self.applicationForm.gender.length == 0) {
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
          data: JSON.stringify(self.applicationForm),
          success: function(data) {
            //解析返回的data
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.applicationFormVisible = false
              self.illnessHistory = []
              self.getAllRegistrationInfo()
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
      getAllRegistrationInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            self.results = data.data
            self.permanentResults = data.data
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
      ableToModify: function() {
        if (this.idSelection != "") {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i].id == this.idSelection) {
              this.modifyApplicationFormVisible = true
              this.modifyApplicationForm = this.permanentResults[i]
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
        console.log(self.modifyApplicationForm)
        var modifyAppForm = self.modifyApplicationForm
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
              self.modifyApplicationFormVisible = false
              self.illnessHistory = []
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
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },      
      
  
    },
    mounted: function() {
      this.getAllRegistrationInfo()
    }
  }
</script>

<style>
  .header-row {
    margin-top: 0px;
  }
  
  .sub-header {
    background: white;
    padding: 20px;
  }
  
  .select-box {
    line-height: 0;
  }
</style>
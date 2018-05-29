<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            住院病案记录
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="addMedicalRecordFormVisible = true">新增</el-button>
            <el-dialog title="添加住院病案记录" :visible.sync="addMedicalRecordFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="addMedicalRecordForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input clearable v-model="addMedicalRecordForm.name" size="small" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期">
                      <el-date-picker v-model="addMedicalRecordForm.birthDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                      </el-date-picker>                    
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="性别">
                      <el-radio-group v-model="addMedicalRecordForm.gender" :rules="[{ required: true, message: '性别不能为空', trigger: 'change'}]">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="addMedicalRecordForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="addMedicalRecordForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="婚姻状况">
                      <el-radio-group v-model="addMedicalRecordForm.maritalStatus">
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
                  <el-col :span="8">
                    <el-form-item label="年龄">
                      <el-input clearable v-model="addMedicalRecordForm.age" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="国籍">
                      <el-input clearable v-model="addMedicalRecordForm.origin" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生地">
                      <el-input clearable v-model="addMedicalRecordForm.birthPlace" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="户口地址">
                      <el-input clearable v-model="addMedicalRecordForm.accountAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码">
                      <el-input clearable v-model="addMedicalRecordForm.zipCodeAccount" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="居住地址">
                      <el-input clearable v-model="addMedicalRecordForm.liveAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码">
                      <el-input clearable v-model="addMedicalRecordForm.zipCodeLive" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="工作单位">
                      <el-input clearable v-model="addMedicalRecordForm.workUnit" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人">
                      <el-input clearable v-model="addMedicalRecordForm.contact" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人电话">
                      <el-input clearable v-model="addMedicalRecordForm.contactNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="联系人地址">
                      <el-input clearable v-model="addMedicalRecordForm.contactAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院日期">
                      <el-date-picker v-model="addMedicalRecordForm.hospitalizationDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                      </el-date-picker>                       
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出院日期">
                      <el-date-picker v-model="addMedicalRecordForm.dischargeDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                      </el-date-picker>                      
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="实际住院天数">
                      <el-input clearable v-model="addMedicalRecordForm.numberOfDaysInHospital" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院原因">
                      <el-input clearable v-model="addMedicalRecordForm.hospitalizationReason" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院后确诊日期">
                      <el-date-picker v-model="addMedicalRecordForm.confirmedDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                      </el-date-picker>                       
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院时情况">
                      <el-radio-group v-model="addMedicalRecordForm.hospitalizationCondition">
                        <el-radio label="危"></el-radio>
                        <el-radio label="急"></el-radio>
                        <el-radio label="一般"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="出院时情况">
                      <el-radio-group v-model="addMedicalRecordForm.dischargeCondition">
                        <el-radio label="治愈"></el-radio>
                        <el-radio label="好转"></el-radio>
                        <el-radio label="未愈"></el-radio>
                        <el-radio label="死亡"></el-radio>
                        <el-radio label="其他"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院科别">
                      <el-input clearable v-model="addMedicalRecordForm.hospitalizationDepartment" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="病室">
                      <el-input clearable v-model="addMedicalRecordForm.hospitalizationSickroom" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="转科时间">
                      <el-date-picker v-model="addMedicalRecordForm.transformDepartDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                      </el-date-picker>                        
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="出院科别">
                      <el-input clearable v-model="addMedicalRecordForm.dischargeDepartment" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="病室">
                      <el-input clearable v-model="addMedicalRecordForm.dischargeSickroom" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="门（急）诊诊断">
                      <el-input clearable type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="addMedicalRecordForm.outpatientDiagnosis">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院诊断">
                      <el-input clearable type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="addMedicalRecordForm.hospitalizationDiagnosis">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="附件上传">
                      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="handleRemove" multiple :limit="1" :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addMedicalRecordFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
            <el-dialog title="添加住院病案记录" :visible.sync="updateMedicalRecordFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="updateMedicalRecordForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input clearable v-model="updateMedicalRecordForm.name" size="small" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期">
                      <el-input clearable v-model="updateMedicalRecordForm.birthDate" size="small" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="性别">
                      <el-radio-group v-model="updateMedicalRecordForm.gender" :rules="[{ required: true, message: '性别不能为空', trigger: 'change'}]">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="updateMedicalRecordForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="updateMedicalRecordForm.roomNumber" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>                
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="婚姻状况">
                      <el-radio-group v-model="updateMedicalRecordForm.maritalStatus">
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
                  <el-col :span="8">
                    <el-form-item label="年龄">
                      <el-input clearable v-model="updateMedicalRecordForm.age" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="国籍">
                      <el-input clearable v-model="updateMedicalRecordForm.origin" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生地">
                      <el-input clearable v-model="updateMedicalRecordForm.birthPlace" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="户口地址">
                      <el-input clearable v-model="updateMedicalRecordForm.accountAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码">
                      <el-input clearable v-model="updateMedicalRecordForm.zipCodeAccount" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="居住地址">
                      <el-input clearable v-model="updateMedicalRecordForm.liveAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码">
                      <el-input clearable v-model="updateMedicalRecordForm.zipCodeLive" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="工作单位">
                      <el-input clearable v-model="updateMedicalRecordForm.workUnit" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人">
                      <el-input clearable v-model="updateMedicalRecordForm.contact" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人电话">
                      <el-input clearable v-model="updateMedicalRecordForm.contactNumber" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="联系人地址">
                      <el-input clearable v-model="updateMedicalRecordForm.contactAddress" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院日期">
                      <el-input clearable v-model="updateMedicalRecordForm.hospitalizationDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出院日期">
                      <el-input clearable v-model="updateMedicalRecordForm.dischargeDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="实际住院天数">
                      <el-input clearable v-model="updateMedicalRecordForm.numberOfDaysInHospital" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院原因">
                      <el-input clearable v-model="updateMedicalRecordForm.hospitalizationReason" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院后确诊日期">
                      <el-input clearable v-model="updateMedicalRecordForm.confirmedDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院时情况">
                      <el-radio-group v-model="updateMedicalRecordForm.hospitalizationCondition">
                        <el-radio label="危"></el-radio>
                        <el-radio label="急"></el-radio>
                        <el-radio label="一般"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="出院时情况">
                      <el-radio-group v-model="updateMedicalRecordForm.dischargeCondition">
                        <el-radio label="治愈"></el-radio>
                        <el-radio label="好转"></el-radio>
                        <el-radio label="未愈"></el-radio>
                        <el-radio label="死亡"></el-radio>
                        <el-radio label="其他"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院科别">
                      <el-input clearable v-model="updateMedicalRecordForm.hospitalizationDepartment" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="病室">
                      <el-input clearable v-model="updateMedicalRecordForm.hospitalizationSickroom" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="转科时间">
                      <el-input clearable v-model="updateMedicalRecordForm.transformDepartDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="出院科别">
                      <el-input clearable v-model="updateMedicalRecordForm.dischargeDepartment" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="病室">
                      <el-input clearable v-model="updateMedicalRecordForm.dischargeSickroom" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="门（急）诊诊断">
                      <el-input clearable type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateMedicalRecordForm.outpatientDiagnosis">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院诊断">
                      <el-input clearable type="textarea" :autosize="{ minRows: 5, maxRows: 6}" placeholder="请输入内容" v-model="updateMedicalRecordForm.hospitalizationDiagnosis">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="附件上传">
                      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-remove="handleRemove" multiple :limit="1" :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateMedicalRecordFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdateSubmit">提 交</el-button>
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
                <el-form :inline="true" label-position="left" :model="medicalRecordForm" label-width="60px">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="楼层">
                        <el-select v-model="medicalRecordForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="medicalRecordForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="姓名">
                        <el-input clearable v-model="medicalRecordForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input clearable v-model="medicalRecordForm.bedNumber" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary" @click="onSearch">查询</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResult.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" highlight-current-row @current-change="handleSelection">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="floor" label="楼层" fixed>
                  </el-table-column>
                  <el-table-column prop="roomNumber" label="房间号" fixed>
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" fixed>
                  </el-table-column>
                  <el-table-column prop="hospitalizationCondition" label="入院时情况"></el-table-column>
                  <el-table-column prop="dischargeDate" label="出院时间">
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
                <el-pagination small layout="prev, pager, next" :total="searchResult.length" :page-size="pagesize" @current-change="handleCurrentChange" :current-page="currentPage">
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
        medicalRecordForm: {
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
        searchResult: [],
        permanentResults: [],
        chosenData: {
          name: "",
          birth: "",
          gender: "",
          marriageStatus: "",
          age: "",
          nationality: "",
          birthPlace: "",
          residence: "",
          currentResidence: "",
          postCode: "",
          currentPostCode: "",
          workAdr: "",
          linkman: "",
          linkmanTel: "",
          linkmanAdr: "",
          checkinDate: "",
          checkoutDate: "",
          stayTime: "",
          checkinReason: "",
          diagnoseDate: "",
          checkinStatus: "",
          checkoutStatus: "",
          checkinSubject: "",
          checkinWard: "",
          transferDate: "",
          checkoutWard: "",
          checkoutSubject: "",
          diagnose: "",
          checkoutDiagnose: ""
        },
        addMedicalRecordFormVisible: false,
        addMedicalRecordForm: {
          name: "",
          gender: "",
          floor: "",
          roomNumber: "",
          birthDate: "",
          maritalStatus: "",
          age: "",
          origin: "",
          birthPlace: "",
          accountAddress: "",
          zipCodeAccount: "",
          liveAddress: "",
          zipCodeLive: "",
          workUnit: "",
          contact: "",
          contactNumber: "",
          contactAddress: "",
          hospitalizationDate: "",
          dischargeDate: "",
          numberOfDaysInHospital: "",
          hospitalizationCondition: "",
          hospitalizationReason: "",
          confirmedDate: "",
          dischargeCondition: "",
          hospitalizationDepartment: "",
          hospitalizationSickroom: "",
          transformDepartDate: "",
          dischargeDepartment: "",
          dischargeSickroom: "",
          outpatientDiagnosis: "",
          hospitalizationDiagnosis: "",
        },
        emptyForm: {
          name: "",
          gender: "",
          birthDate: "",
          floor: "",
          roomNumber: "",          
          maritalStatus: "",
          age: "",
          origin: "",
          birthPlace: "",
          accountAddress: "",
          zipCodeAccount: "",
          liveAddress: "",
          zipCodeLive: "",
          workUnit: "",
          contact: "",
          contactNumber: "",
          contactAddress: "",
          hospitalizationDate: "",
          dischargeDate: "",
          numberOfDaysInHospital: "",
          hospitalizationCondition: "",
          hospitalizationReason: "",
          confirmedDate: "",
          dischargeCondition: "",
          hospitalizationDepartment: "",
          hospitalizationSickroom: "",
          transformDepartDate: "",
          dischargeDepartment: "",
          dischargeSickroom: "",
          outpatientDiagnosis: "",
          hospitalizationDiagnosis: "",
        },
        updateMedicalRecordFormVisible: false,
        updateMedicalRecordForm: {
          name: "",
          gender: "",
          birthDate: "",
          maritalStatus: "",
          floor: "",
          roomNumber: "",          
          age: "",
          origin: "",
          birthPlace: "",
          accountAddress: "",
          zipCodeAccount: "",
          liveAddress: "",
          zipCodeLive: "",
          workUnit: "",
          contact: "",
          contactNumber: "",
          contactAddress: "",
          hospitalizationDate: "",
          dischargeDate: "",
          numberOfDaysInHospital: "",
          hospitalizationCondition: "",
          hospitalizationReason: "",
          confirmedDate: "",
          dischargeCondition: "",
          hospitalizationDepartment: "",
          hospitalizationSickroom: "",
          transformDepartDate: "",
          dischargeDepartment: "",
          dischargeSickroom: "",
          outpatientDiagnosis: "",
          hospitalizationDiagnosis: "",
        },
        fileList: [],
        middleUrl: "/medicalRecord",
        idSelection: "",
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,        
      };
    },
    methods: {
      onSearch: function() {
        if (this.medicalRecordForm.bedNumber.length == 0 && this.medicalRecordForm.name.length == 0 && this.medicalRecordForm.floor.length == 0 && this.medicalRecordForm.roomNumber.length == 0) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.results = this.permanentResults
        }
        var tempResults = []
        for (var i in this.permanentResults) {
          console.log(this.checkValid(this.permanentResults[i]))
          if (this.checkValid(this.permanentResults[i])) {
            tempResults.push(this.permanentResults[i])
          }
        }
        this.searchResult = tempResults
  
      },
      checkValid: function(val) {
        if (this.medicalRecordForm.name.length != 0) {
          if (val.name.search(this.medicalRecordForm.name) == -1) {
            return false
          }
        }
        if (this.medicalRecordForm.roomNumber.length != 0) {
          if (val.roomNumber != this.medicalRecordForm.roomNumber) {
            return false
          }
        }
        if (this.medicalRecordForm.bedNumber.length != 0) {
          if (val.bedNumber != this.medicalRecordForm.bedNumber) {
            return false
          }
        }
        if (this.medicalRecordForm.floor.length != 0) {
          if (val.floor != this.medicalRecordForm.floor) {
            return false
          }
        }                             
        return true
      },
      handleSelection: function(val) {
        this.idSelection = val
      },
      ableToModify: function() {
        if (this.idSelection != "") {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i] == this.idSelection) {
              this.updateMedicalRecordFormVisible = true
              this.updateMedicalRecordForm = this.permanentResults[i]
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
        let self = this
        if (self.addMedicalRecordForm.name.length == 0 || self.addMedicalRecordForm.birthDate.length == 0 || self.addMedicalRecordForm.gender.length == 0 || self.addMedicalRecordForm.floor.length == 0 || self.addMedicalRecordForm.roomNumber.length == 0 ) {
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
          data: JSON.stringify(self.addMedicalRecordForm),
          success: function(data) {
            //解析返回的data
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.addMedicalRecordFormVisible = false
              self.addMedicalRecordForm = self.emptyForm
              self.getAllRecordInfo()
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
      handleUpdateSubmit: function() {
        let self = this
        if (self.updateMedicalRecordForm.name.length == 0 || self.updateMedicalRecordForm.birthDate.length == 0 || self.updateMedicalRecordForm.gender.length == 0) {
          self.$message({
            message: '必填字段为空',
            type: 'error',
          });
          return
        }
        //发送请求
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.updateMedicalRecordForm),
          success: function(data) {
            //解析返回的data
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.updateMedicalRecordFormVisible = false
              self.getAllRecordInfo()
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
      getAllRecordInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            self.searchResult = data.data
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
        this.handleDelete(this.idSelection.id)
      },
      handleDelete: function(id) {
        let self = this
        console.log(id)
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
              self.getAllRecordInfo()
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
      handleRemove: function() {

      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },      
    },
    mounted: function() {
      this.getAllRecordInfo()
    }
  };
</script>

<style scoped>
  
</style>
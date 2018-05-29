<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            入院登记
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="registrationFormVisible = true">新增</el-button>
              <el-dialog title="新增入院登记表" :visible.sync="registrationFormVisible" width="80%" style="text-align: left">
                <el-form :model="registrationForm" label-width="100px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]">
                        <el-input clearable v-model="registrationForm.name" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="出生日期" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                        <el-date-picker v-model="registrationForm.birthDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="性别" :rules="[{ required: true, message: '性别不能为空', trigger: 'change'}]">
                        <el-radio-group v-model="registrationForm.gender">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="楼层">
                        <el-select v-model="registrationForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="房间号">
                        <el-select v-model="registrationForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input clearable size="small" v-model="registrationForm.bedNumber" placeholder="未分配"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="年龄">
                        <el-input clearable size="small" v-model="registrationForm.age"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="籍贯">
                        <el-input clearable size="small" v-model="registrationForm.origin"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="户籍地">
                        <el-input clearable size="small" v-model="registrationForm.domicilePlace"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="身份证号">
                        <el-input clearable v-model="registrationForm.idNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="政治面貌">
                        <el-select v-model="registrationForm.politicalSide" placeholder="请选择" size="small">
                          <el-option v-for="item in politicalSides" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="民族">
                        <el-input clearable v-model="registrationForm.national" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item label="婚姻状况">
                        <el-radio-group v-model="registrationForm.maritalStatus">
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
                      <el-form-item label="社保卡号">
                        <el-input clearable v-model="registrationForm.ssCardNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="教育程度">
                        <el-radio-group v-model="registrationForm.educationLevel">
                          <el-radio label="文盲"></el-radio>
                          <el-radio label="略识文字"></el-radio>
                          <el-radio label="能读写"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="最高学历">
                        <el-select v-model="registrationForm.highestEducation" placeholder="请选择" size="small">
                          <el-option v-for="item in eduLevels" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="代理人">
                        <el-input clearable v-model="registrationForm.agent" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="与老人关系">
                        <el-select v-model="registrationForm.relationshipWithElderly" placeholder="请选择" size="small">
                          <el-option v-for="item in relationship" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="代理人电话">
                        <el-input clearable v-model="registrationForm.agentPhoneNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="代理人地址">
                        <el-input clearable v-model="registrationForm.agentAddress"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="邮编">
                        <el-input clearable v-model="registrationForm.zipCode" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="地址">
                        <el-input clearable v-model="registrationForm.address" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="电话">
                        <el-input clearable v-model="registrationForm.phoneNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="工作单位">
                        <el-input clearable v-model="registrationForm.workUnit" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="职务">
                        <el-input clearable v-model="registrationForm.position" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="禁忌药物">
                        <el-input clearable v-model="registrationForm.tabooDrugs" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="护理等级">
                        <el-select v-model="registrationForm.nursingGrade" placeholder="请选择" size="small">
                          <el-option v-for="item in nursingGrade" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="禁忌食物">
                        <el-input clearable v-model="registrationForm.tabooFood" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="饮食类型">
                        <el-input clearable v-model="registrationForm.dietType" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="老人生肖">
                        <el-select v-model="registrationForm.zodiac" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in zodiacs" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="住宅电话">
                        <el-input clearable v-model="registrationForm.homePhone" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="是否本市">
                        <el-radio-group v-model="registrationForm.sameCity">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="是否是外网预约">
                        <el-input clearable v-model="registrationForm.onlineAppointment" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="预约时间">
                         <el-date-picker v-model="registrationForm.appointmentTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>                       
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="预约编号">
                        <el-input clearable v-model="registrationForm.appointNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="入院日期">
                        <el-date-picker v-model="registrationForm.admissionDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="在院编号">
                        <el-input clearable v-model="registrationForm.courtNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="与院状态">
                        <el-input clearable v-model="registrationForm.hospitalized" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="养老补助">
                        <el-input clearable v-model="registrationForm.pensionBenefits" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="养老金收入">
                        <el-input clearable v-model="registrationForm.pensionIncome" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="老人类型">
                        <el-input clearable v-model="registrationForm.elderlyType" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="老人头像">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1" :file-list="fileList">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="registrationFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleSubmission">提 交</el-button>
                </div>                
              </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" plain size="small" @click="ableToModify">修改</el-button>
              <el-dialog title="新增入院登记表" :visible.sync="updateRegistrationFormVisible" width="80%" style="text-align: left">
                <el-form :model="updateRegistrationForm" label-width="100px">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]">
                        <el-input clearable v-model="updateRegistrationForm.name" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="出生日期" :rules="[{ required: true, message: '出生日期不能为空', trigger: 'change'}]">
                        <el-date-picker v-model="updateRegistrationForm.birthDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="性别" :rules="[{ required: true, message: '性别不能为空', trigger: 'change'}]">
                        <el-radio-group v-model="updateRegistrationForm.gender">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="楼层">
                        <el-select v-model="updateRegistrationForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="房间号">
                        <el-select v-model="updateRegistrationForm.roomNumber" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input clearable size="small" v-model="updateRegistrationForm.bedNumber" placeholder="未分配"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="年龄">
                        <el-input clearable size="small" v-model="updateRegistrationForm.age"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="籍贯">
                        <el-input clearable size="small" v-model="updateRegistrationForm.origin"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="户籍地">
                        <el-input clearable size="small" v-model="updateRegistrationForm.domicilePlace"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="身份证号">
                        <el-input clearable v-model="updateRegistrationForm.idNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="政治面貌">
                        <el-select v-model="updateRegistrationForm.politicalSide" placeholder="请选择" size="small">
                          <el-option v-for="item in politicalSides" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="民族">
                        <el-input clearable v-model="updateRegistrationForm.national" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="15">
                      <el-form-item label="婚姻状况">
                        <el-radio-group v-model="updateRegistrationForm.maritalStatus">
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
                      <el-form-item label="社保卡号">
                        <el-input clearable v-model="updateRegistrationForm.ssCardNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="教育程度">
                        <el-radio-group v-model="updateRegistrationForm.educationLevel">
                          <el-radio label="文盲"></el-radio>
                          <el-radio label="略识文字"></el-radio>
                          <el-radio label="能读写"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="最高学历">
                        <el-select v-model="updateRegistrationForm.highestEducation" placeholder="请选择" size="small">
                          <el-option v-for="item in eduLevels" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="代理人">
                        <el-input clearable v-model="updateRegistrationForm.agent" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="与老人关系">
                        <el-select v-model="updateRegistrationForm.relationshipWithElderly" placeholder="请选择" size="small">
                          <el-option v-for="item in relationship" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="代理人电话">
                        <el-input clearable v-model="updateRegistrationForm.agentPhoneNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="代理人地址">
                        <el-input clearable v-model="updateRegistrationForm.agentAddress"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="邮编">
                        <el-input clearable v-model="updateRegistrationForm.zipCode" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="地址">
                        <el-input clearable v-model="updateRegistrationForm.address" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="电话">
                        <el-input clearable v-model="updateRegistrationForm.phoneNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="工作单位">
                        <el-input clearable v-model="updateRegistrationForm.workUnit" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="职务">
                        <el-input clearable v-model="updateRegistrationForm.position" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="禁忌药物">
                        <el-input clearable v-model="updateRegistrationForm.tabooDrugs" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="护理等级">
                        <el-select v-model="updateRegistrationForm.nursingGrade" placeholder="请选择" size="small">
                          <el-option v-for="item in nursingGrade" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="13">
                      <el-form-item label="禁忌食物">
                        <el-input clearable v-model="updateRegistrationForm.tabooFood" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="饮食类型">
                        <el-input clearable v-model="updateRegistrationForm.dietType" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="老人生肖">
                        <el-select v-model="updateRegistrationForm.zodiac" placeholder="请选择" size="small" @change="storeyChange">
                          <el-option v-for="item in zodiacs" :key="item.value" :label="item.label" :value="item.label">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="住宅电话">
                        <el-input clearable v-model="updateRegistrationForm.homePhone" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="是否本市">
                        <el-radio-group v-model="updateRegistrationForm.sameCity">
                          <el-radio label="是"></el-radio>
                          <el-radio label="否"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="是否是外网预约">
                        <el-input clearable v-model="updateRegistrationForm.onlineAppointment" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="预约时间">
                         <el-date-picker v-model="updateRegistrationForm.appointmentTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>                         
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="预约编号">
                        <el-input clearable v-model="updateRegistrationForm.appointNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="入院日期">
                        <el-date-picker v-model="updateRegistrationForm.admissionDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="在院编号">
                        <el-input clearable v-model="updateRegistrationForm.courtNumber" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="与院状态">
                        <el-input clearable v-model="updateRegistrationForm.hospitalized" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="养老补助">
                        <el-input clearable v-model="updateRegistrationForm.pensionBenefits" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="养老金收入">
                        <el-input clearable v-model="updateRegistrationForm.pensionIncome" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="老人类型">
                        <el-input clearable v-model="updateRegistrationForm.elderlyType" size="small"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="老人头像">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1" :file-list="fileList">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="updateRegistrationFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleUpdateSubmission">提 交</el-button>
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
                  <el-form :inline="true" :model="searchForm" label-width="70px">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="姓名" :rules="[{ required: true, message: '姓名不能为空', trigger: 'change'}]">
                          <el-input clearable v-model="searchForm.name" placeholder="请输入姓名" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="楼层">
                          <el-select v-model="searchForm.floor" placeholder="请选择" size="small" @change="storeyChange">
                            <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="房间号">
                          <el-select v-model="searchForm.roomNumber" placeholder="请选择" size="small">
                            <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="状态">
                          <el-select v-model="searchForm.processStatus" placeholder="请选择" size="small">
                            <el-option v-for="item in stateOps" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3" :offset="10">
                        <el-form-item>
                          <el-button type="primary" @click="onSearch" size="small">查询</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                 </el-form>
              </div>
              <div>
                <el-table :data="results.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" highlight-current-row @current-change="handleSelection">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名">
                  </el-table-column>
                  <el-table-column prop="floor" label="楼层">
                  </el-table-column>
                  <el-table-column prop="roomNumber" label="房间号">
                  </el-table-column>
                  <el-table-column prop="gender" label="性别">
                  </el-table-column>
                  <el-table-column prop="bedNumber" label="床号">
                  </el-table-column>
                  <!-- <el-table-column prop="handlerDate" label="提交时间">
                  </el-table-column> -->
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
  import Multiselect from 'vue-multiselect'
  
  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        registrationForm: {
          id: "",
          name: "",
          birthDate: "",
          gender: "",
          floor: "",
          roomNumber: "",
          bedNumber: "",
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
        updateRegistrationForm: {
          id: "",
          name: "",
          birthDate: "",
          gender: "",
          floor: "",
          roomNumber: "",
          bedNumber: "",
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
        emptyForm: {
          id: "",
          name: "",
          birthDate: "",
          gender: "",
          floor: "",
          roomNumber: "",
          bedNumber: "",
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
          },
          {
            value: "选项2",
            label: "小学"
          },
          {
            value: "选项3",
            label: "初中"
          },
          {
            value: "选项4",
            label: "中专"
          },
          {
            value: "选项5",
            label: "大专"
          },
          {
            value: "选项6",
            label: "高中"
          },
          {
            value: "选项7",
            label: "本科"
          },
          {
            value: "选项8",
            label: "硕士研究生"
          },
          {
            value: "选项9",
            label: "博士研究生"
          },
          {
            value: "选项10",
            label: "博士后"
          }
        ],
        relationship: [{
          value: "选项1",
          label: "子女"
          }, 
          {
          value: "选项2",
          label: "孙辈"
          }, 
          {
            value: "选项3",
          label: "配偶"
        }],
        nursingGrade: [{
          value: "选项1",
          label: "0级"
          }, 
          {
          value: "选项2",
          label: "1级"
          }, 
          {
          value: "选项3",
          label: "2级"
          }, 
          {
          value: "选项4",
          label: "3级"
          }, 
          {
          value: "选项5",
          label: "4级"
          }, 
          {
          value: "选项6",
          label: "5级"
          }, 
          {
          value: "选项7",
          label: "6级"
          }, 
          {
          value: "选项8",
          label: "7级"
        }],
        illnessHistory: [],
        results: [],
        fileList: [],
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
        zodiacs: [{
            value: "选项1",
            label: "鼠"
          },
          {
            value: "选项2",
            label: "牛"
          },
          {
            value: "选项3",
            label: "虎"
          },
          {
            value: "选项4",
            label: "兔"
          },
          {
            value: "选项5",
            label: "龙"
          },
          {
            value: "选项6",
            label: "蛇"
          }, {
            value: "选项7",
            label: "马"
          },
          {
            value: "选项8",
            label: "羊"
          },
          {
            value: "选项9",
            label: "猴"
          },
          {
            value: "选项10",
            label: "鸡"
          },
          {
            value: "选项11",
            label: "狗"
          },
          {
            value: "选项12",
            label: "猪"
          }
        ],
        searchForm: {
          name: "",
          floor: "",
          roomNumber: "",
          processStatus: ""
        }, 
        stateOps: [{
          value: "选项1",
          label: "全部"
          }, 
          {
          value: "选项2",
          label: "入院"
          },
          {
          value: "选项3",
          label: "入住审批"
        }],                              
        middleUrl: '/admissionRecord',
        permanentResults: [],
        results: [],
        registrationResults: [],
        approvalResults: [],
        idSelection: "",        
        registrationFormVisible: false,
        updateRegistrationFormVisible: false,
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,         
      }
  
    },
    methods: {
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
        console.log(this.searchForm)
        if (this.searchForm.name.length == 0 && this.searchForm.floor.length == 0 && this.searchForm.roomNumber.length == 0 && this.searchForm.processStatus.length == 0) {
          this.$message({
            message: '查询关键词为空',
            type: 'error',
          });
          this.results = this.permanentResults
          return
        }
        if (this.searchForm.processStatus == "全部") {
          this.results = this.permanentResults
          return
        }
        var tempResults = []
        for (var i in this.permanentResults) {
          if (this.checkValid(this.permanentResults[i])) {
            tempResults.push(this.permanentResults[i])
          }
        }
        this.results = tempResults
      },
      checkValid: function(val) {
        if (this.searchForm.name.length != 0) {
          if (val.name.search(this.searchForm.name) == -1) {
            return false
          }
        }
        if (this.searchForm.floor.length != 0) {
          if (val.floor != this.searchForm.floor) {
            return false
          }
        }
        if (this.searchForm.roomNumber.length != 0) {
          if (val.roomNumber != this.searchForm.roomNumber) {
            return false
          }
        }
        if (this.searchForm.processStatus.length != 0) {
          if (val.processStatus != this.searchForm.processStatus) {
            return false
          }
        }
        return true
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
        for (var i in this.permanentResults) {
          if (id == this.permanentResults[i].id && this.permanentResults[i].processStatus == "入住审批") {
            this.$message({
              message: '请在入住审批页面删除该对象',
              type: 'error',
            }); 
            return         
          }
        }
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
            if (data[200] == "操作成功") {
              self.$message({
                message: '删除成功',
                type: 'success',
              });
              self.results = []
              self.permanentResults = []
              self.getAllInfo()
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
      handleSubmission: function() {
        let self = this
        if (self.registrationForm.name.length == 0 || self.registrationForm.birthDate.length == 0 || self.registrationForm.gender.length == 0) {
          self.$alert('必填字段为空', '失败', {
            confirmButtonText: '确定'
          });
          return
        }
        //发送请求
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/create',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.registrationForm),
          success: function(data) {
            //解析返回的data
            console.log(data)
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success'
              });
              self.registrationForm = self.emptyForm
              self.results = []
              self.permanentResults = []
              self.registrationFormVisible = false
              self.getAllInfo()
            } else {
              self.$alert('创建失败', '失败', {
                confirmButtonText: '确定'
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
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      }, 
      ableToModify: function() {
        if (this.idSelection != "") {
          for (var i in this.permanentResults) {
            if (this.permanentResults[i].id == this.idSelection) {
              this.updateRegistrationForm= this.permanentResults[i]
              if (this.updateRegistrationForm.processStatus == "入住审批") {
                this.$message({
                  message: '该对象需在入住审批页面修改！',
                  type: 'error',
                }); 
                return           
              }
              else {
                this.updateRegistrationFormVisible = true               
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
      handleUpdateSubmission: function() {
        let self = this
        console.log(self.updateRegistrationForm)
        var modifyAppForm = self.modifyApplicationForm
        delete modifyAppForm["processStatus"]
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(modifyAppForm),
          success: function(data) {
            if (data.data != null) {
              self.$message({
                message: '提交成功',
                type: 'success',
              });
              self.updateRegistrationFormVisible = false
              self.results = []
              self.permanentResults = []
              self.getAllInfo()
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
            if (data.data.length != 0) {
              self.registrationResults = data.data
              for (var i in self.registrationResults) {
                self.registrationResults[i].processStatus = "入院"                  
              }              
              if (self.results.length == 0) {
                self.results = self.registrationResults
              } else {
                for (var i = 0; i<self.registrationResults.length; i++) {
                  self.results.append(self.registrationResults[i])
                }
              }         
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
      getAllApprovalInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + '/admissionApproval/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {           
            if (data.data.length != 0) {
              self.approvalResults = data.data
              for (var i in self.approvalResults) {
                self.approvalResults[i].processStatus = "入住审批" 
              }         
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
      getAllInfo: function() {
        let self = this
        $.ajax({
          url: self.urlHeader + self.middleUrl + '/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            if (data.data.length != 0) {
              self.registrationResults = data.data
              for (var i in self.registrationResults) {
                self.registrationResults[i].processStatus = "入院"
                self.results.push(self.registrationResults[i])
                self.permanentResults.push(self.registrationResults[i])          
              }                    
            }
          },
          error: function() {
            self.$message({
              message: '申请列表加载失败，请检查网络',
              type: 'error',
            });
          }
        })
        $.ajax({
          url: self.urlHeader + '/admissionApproval/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {           
            if (data.data.length != 0) {
              self.approvalResults = data.data
              for (var i in self.approvalResults) {
                self.approvalResults[i].processStatus = "入住审批" 
                self.results.push(self.approvalResults[i])
                self.permanentResults.push(self.approvalResults[i])
              }                     
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
      this.getAllInfo()    
    }
  }
</script>

<style>
</style>

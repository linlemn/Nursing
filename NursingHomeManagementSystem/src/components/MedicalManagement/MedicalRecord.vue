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
                    <el-form-item label="楼层">
                      <el-input v-model="addMedicalRecordForm.name" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期">
                      <el-input v-model="addMedicalRecordForm.birth" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="性别">
                      <el-radio-group v-model="addMedicalRecordForm.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="婚姻状况">
                      <el-radio-group v-model="addMedicalRecordForm.marriageStatus">
                        <el-radio label="已婚"></el-radio>
                        <el-radio label="离婚"></el-radio>
                        <el-radio label="丧偶"></el-radio>
                        <el-radio label="再婚"></el-radio>
                        <el-radio label="未婚"></el-radio>
                      </el-radio-group>
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
            <el-button type="primary" plain size="small" @click="updateMedicalRecordFormVisible = true">修改</el-button>
            <el-dialog title="修改住院病案记录" :visible.sync="updateMedicalRecordFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="updateMedicalRecordForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input v-model="updateMedicalRecordForm.name" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出生日期">
                      <el-input v-model="updateMedicalRecordForm.birth" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="性别">
                      <el-radio-group v-model="updateMedicalRecordForm.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="婚姻状况">
                      <el-radio-group v-model="updateMedicalRecordForm.marriageStatus">
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
                      <el-input v-model="updateMedicalRecordForm.age" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="国籍">
                      <el-input v-model="updateMedicalRecordForm.nationality" size="small"></el-input>
                    </el-form-item>
                  </el-col>  
                  <el-col :span="8">
                    <el-form-item label="出生地">
                      <el-input v-model="updateMedicalRecordForm.birthPlace" size="small"></el-input>
                    </el-form-item>
                  </el-col>                
                </el-row> 
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="户口地址">
                      <el-input v-model="updateMedicalRecordForm.residence" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码">
                      <el-input v-model="updateMedicalRecordForm.postCode" size="small"></el-input>
                    </el-form-item>
                  </el-col>                  
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="居住地址">
                      <el-input v-model="updateMedicalRecordForm.currentResidence" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码">
                      <el-input v-model="updateMedicalRecordForm.currentPostCode" size="small"></el-input>
                    </el-form-item>
                  </el-col>                  
                </el-row>  
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="工作单位">
                      <el-input v-model="updateMedicalRecordForm.workAdr" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人">
                      <el-input v-model="updateMedicalRecordForm.linkman" size="small"></el-input>
                    </el-form-item>
                  </el-col>  
                  <el-col :span="8">
                    <el-form-item label="联系人电话">
                      <el-input v-model="updateMedicalRecordForm.linkmanTel" size="small"></el-input>
                    </el-form-item>
                  </el-col>               
                </el-row>  
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="联系人地址">
                      <el-input v-model="updateMedicalRecordForm.linkmanAdr" size="small"></el-input>
                     </el-form-item>
                  </el-col>                    
                </el-row> 
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院日期">
                      <el-input v-model="updateMedicalRecordForm.checkinDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出院日期">
                      <el-input v-model="updateMedicalRecordForm.checkoutDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>  
                  <el-col :span="8">
                    <el-form-item label="实际住院天数">
                      <el-input v-model="updateMedicalRecordForm.stayTime" size="small"></el-input>
                    </el-form-item>
                  </el-col>               
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="入院原因">
                      <el-input v-model="updateMedicalRecordForm.checkinReason" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院后确诊日期">
                      <el-input v-model="updateMedicalRecordForm.diagnoseDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院时情况">
                      <el-radio-group v-model="updateMedicalRecordForm.checkinStatus">
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
                      <el-radio-group v-model="updateMedicalRecordForm.checkoutStatus">
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
                      <el-input v-model="updateMedicalRecordForm.checkinSubject" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="病室">
                      <el-input v-model="updateMedicalRecordForm.checkinWard" size="small"></el-input>
                    </el-form-item>
                  </el-col>  
                  <el-col :span="8">
                    <el-form-item label="转科时间">
                      <el-input v-model="updateMedicalRecordForm.transferDate" size="small"></el-input>
                    </el-form-item>
                  </el-col>               
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="出院科别">
                      <el-input v-model="updateMedicalRecordForm.checkoutSubject" size="small"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="病室">
                      <el-input v-model="updateMedicalRecordForm.checkoutWard" size="small"></el-input>
                    </el-form-item>
                  </el-col>                
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="门（急）诊诊断">
                      <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="updateMedicalRecordForm.diagnose">
                        </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="入院诊断">
                      <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="updateMedicalRecordForm.checkinDiagnose">
                        </el-input>
                    </el-form-item>
                  </el-col>                
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="附件上传">
                      <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-remove="handleRemove"
                        multiple
                        :limit="1"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>  
                    </el-form-item>                  
                  </el-col>
                </el-row>                                                                                                                                                                              
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="updateMedicalRecordFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>              
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small">删除</el-button>
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
                        <el-select v-model="medicalRecordForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="medicalRecordForm.roomNo" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="姓名">
                        <el-input v-model="medicalRecordForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input v-model="medicalRecordForm.roomNo" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResult" height="250" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="storeyNo" label="楼层" fixed>
                  </el-table-column>
                  <el-table-column prop="roomNo" label="房间号" fixed>
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" fixed>
                  </el-table-column>
                  <el-table-column prop="checkinStatus" label="入院时情况"></el-table-column>
                  <el-table-column prop="checkoutDate" label="出院时间">
                  </el-table-column>
                  <el-table-column label="操作" fixed="right">
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
  export default {
    data() {
      return {
        medicalRecordForm: {
          storeyNo: "",
          roomNo: "",
          bedNo: "",
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
        searchResult: [{
          id: "",
          name: "",
          gender: "",
          storeyNo: "",
          roomNo: "",
          checkinStatus: "",
          checkoutDate: ""
        }],
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
        addMedicalRecordForm: [],
        updateMedicalRecordFormVisible: false,
        updateMedicalRecordForm: [],

      };
    },
    methods: {
      handleDeletion: function() {
  
      },
      handleRemove: function() {

      },
      handleSubmit: function() {

      }
    }
  };
</script>

<style scoped>
  
</style>
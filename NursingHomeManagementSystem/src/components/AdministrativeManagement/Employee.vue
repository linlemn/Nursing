<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            员工管理
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="handleNewEmployee()">新增</el-button>
            <el-dialog title="新增员工" :visible.sync="newEmployeeFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newEmployeeInfo" ref="newEmployee">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '员工姓名不能为空', trigger: 'change'}]">
                      <el-input v-model="newEmployeeInfo.name" placeholder="请输入员工姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户名" prop="usrName">
                      <el-input v-model="newEmployeeInfo.usrName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="newEmployeeInfo.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input v-model="newEmployeeInfo.checkPass" placeholder="确认密码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="角色" prop="role">
                  <el-row class="select-box">
                    <multiselect v-model="newEmployeeInfo.role" :options="roleOption" placeholder="请选择员工角色">
                    </multiselect>
                  </el-row>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                  <el-row class="select-box">
                    <multiselect v-model="newEmployeeInfo.department" :options="departmentOption" placeholder="请选择员工部门">
                    </multiselect>
                  </el-row>
                </el-form-item>
                <el-form-item label="IC卡号" prop="cardNum">
                  <el-input v-model="newEmployeeInfo.cardNum" placeholder="请输入IC卡号"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                  <el-input type="textarea" v-model="newEmployeeInfo.note" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <!-- <div slot="footer" class="dialog-footer"> -->
                    <el-button @click="newEmployeeFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitNewEmpForm('newEmployee')">确 定</el-button>
                  <!-- </div> -->
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small">删除</el-button>
          </el-col>
        </el-row class="header-row">
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <el-input v-model="usrName" placeholder="请输入用户名"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="name" placeholder="请输入姓名"></el-input>
          </el-col>
          <el-col :span="4">
            <multiselect v-model="role" :options="roleOption" placeholder="请选择角色">
            </multiselect>
          </el-col>
          <el-col :span="4">
            <multiselect v-model="department" :options="departmentOption" placeholder="请选择部门">
            </multiselect>
          </el-col>
          <el-col :span="2">
            <el-button>查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="employeeData" stripe style="width: 100%; text-align: left;" tooltip-effect="dark">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="usrName" label="用户名">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="role" label="角色">
          </el-table-column>
          <el-table-column prop="department" label="部门">
          </el-table-column>
          <el-table-column prop="cardNum" label="IC卡号">
          </el-table-column>
          <el-table-column prop="note" label="备注" width="220">
          </el-table-column>
          <el-table-column label="操作" width="220">
            <div slot-scope="scope">
              <el-button @click="handleInfoModified(scope.row)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="姓名">
                        <el-input v-model="modifiedInfo.name" :placeholder="modifiedInfo.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="用户名">
                        <el-input v-model="modifiedInfo.usrName" :placeholder="modifiedInfo.usrName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="IC卡号">
                    <el-input v-model="modifiedInfo.cardNum" :placeholder="modifiedInfo.cardNum"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="modifiedInfo.note" :placeholder="modifiedInfo.note"></el-input>
                  </el-form-item>
                  <el-form-item label="角色">
                    <el-row class="select-box">
                      <multiselect v-model="modifiedInfo.role" :options="roleOption">
                      </multiselect>
                    </el-row>
                  </el-form-item>
                  <el-form-item label="部门">
                    <el-row class="select-box">
                      <multiselect v-model="modifiedInfo.department" :options="departmentOption">
                      </multiselect>
                    </el-row>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="modifiedFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="modifiedFormVisible = false">确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="text" size="small">删除</el-button>
              <el-button type="text" size="small">重置密码</el-button>
              <el-button type="text" size="small">查看密码</el-button>
            </div>
          </el-table-column>
        </el-table>
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.newEmployeeInfo.checkPass !== '') {
            this.$refs.newEmployeeInfo.validateField('checkPass');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.newEmployeeInfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        roleOption: ['护工', '系统管理员', '职员', '负责人'],
        departmentOption: ['护工一楼', '护工二楼', '护工三楼', '行政'],
        role: '',
        usrName: '',
        name: '',
        department: '',
        employeeData: [{
          usrName: '2016-05-03',
          name: '王小虎',
          role: '系统管理员',
          department: '行政',
          note: '上海市普陀区金沙江路 1518 弄',
          cardNum: '111'
        }, {
          usrName: '2016-05-02',
          name: '王小虎',
          role: '护工',
          department: '护工二楼',
          note: '上海市普陀区金沙江路 1518 弄',
          cardNum: '112'
        }],
        //修改信息框
        modifiedFormVisible: false,
        //修改信息
        modifiedInfo: [{
          role: '',
          name: '',
          usrName: '',
          department: '',
          note: '',
          cardNum: ''
        }],
        //新建员工框
        newEmployeeFormVisible: false,
        //新建员工信息
        newEmployeeInfo: {
          role: '',
          name: '',
          usrName: '',
          department: '',
          note: '',
          password: '',
          cardNum: '',
          checkPass: ''
        },
        //新建员工验证规则
        newRules: {
          name: [{
            required: true,
            message: '请输入员工姓名',
            trigger: 'blur'
          }],
          usrName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'change'
          }],
          role: [{
            required: true,
            message: '请选择员工角色',
            trigger: 'change'
          }],
          department: [{
            required: true,
            message: '请选择员工部门',
            trigger: 'change'
          }],
          // password: [{
          //   validator: validatePass,
          //   trigger: 'blur',
          //   required: true,
          // }],
          note: [{
            required: false,
          }],
          cardNum: [{
            required: false,
          }],
          // checkPass: [{
          //   validator: validateCheckPass,
          //   trigger: 'blur',
          //   required: true,
          // }]
        }
      }
    },
    methods: {
      handleInfoModified: function(row) {
        this.modifiedFormVisible = true
        this.modifiedInfo = row
      },
      handleNewEmployee: function() {
        this.newEmployeeFormVisible = true
      },
      submitNewEmpForm: function(formName) {
        console.log(this.$refs)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("!")
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .header-row {
    margin-bottom: 20px;
    border-bottom: 1px;
  }
  .sub-title {
    font-size: 1em;
    color: #8492a6
  }
  .select-box {
    line-height: 0;
  }
</style>

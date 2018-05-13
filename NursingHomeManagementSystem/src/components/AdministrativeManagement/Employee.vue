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
              <el-form label-position="top" :model="newEmployeeInfo" ref="newEmployee">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '员工姓名不能为空', trigger: 'change'}]">
                      <el-input v-model="newEmployeeInfo.name" placeholder="请输入员工姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="IC卡号" prop="iCCard">
                      <el-input v-model="newEmployeeInfo.iCCard" placeholder="请输入IC卡号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="密码" type="password" prop="passWord" :rules="passWordRule">
                      <el-input type="password" v-model="newEmployeeInfo.passWord" placeholder="请输入密码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="确认密码" type="password" prop="checkPass" :rules="checkPassRule">
                      <el-input type="password" v-model="newEmployeeInfo.checkPass" placeholder="确认密码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="角色" prop="role" :rules="[{ required: true, message: '员工角色不能为空', trigger: 'change'}]">
                      <el-select class="widen" v-model="newEmployeeInfo.role" placeholder="请选择员工角色" clearable>
                        <el-option v-for="item in roleOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门" prop="department" :rules="[{ required: true, message: '员工部门不能为空', trigger: 'change'}]">
                      <el-select class="widen" v-model="newEmployeeInfo.department" placeholder="请选择员工角色" clearable>
                        <el-option v-for="item in departmentOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="用户类型" prop="userType" :rules="[{ required: true, message: '用户类型不能为空', trigger: 'change'}]">
                  <el-select class="widen" v-model="newEmployeeInfo.userType" placeholder="请选择用户类型" clearable>
                    <el-option v-for="item in userTypeOption" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input type="textarea" v-model="newEmployeeInfo.notes" placeholder="请输入备注"></el-input>
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
            <el-button type="danger" plain size="small" @click="handleEmpDelete()">删除</el-button>
          </el-col>
        </el-row class="header-row">
        <el-row type="flex" justify="space-around">
          <el-col :span="6">
            <el-input v-model="usrName" placeholder="请输入用户名" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="name" placeholder="请输入姓名" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <el-select class="widen" v-model="role" placeholder="请选择角色" clearable>
              <el-option v-for="item in roleOption" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select class="widen" v-model="department" placeholder="请选择部门" clearable>
              <el-option v-for="item in departmentOption" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button @click="query()">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table v-loading='loading' :data="curData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; text-align: left;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="55" label="序号">
          </el-table-column>
          <el-table-column prop="userName" label="用户名">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="role" label="角色">
          </el-table-column>
          <el-table-column prop="department" label="部门">
          </el-table-column>
          <el-table-column prop="iCCard" label="IC卡号">
          </el-table-column>
          <el-table-column prop="userType" label="用户类型">
          </el-table-column>
          <el-table-column prop="notes" label="备注">
          </el-table-column>
          <el-table-column label="操作" width="220">
            <div slot-scope="scope">
              <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="姓名">
                        <el-input v-model="modifiedInfo.name" :placeholder="modifiedInfo.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="IC卡号">
                        <el-input v-model="modifiedInfo.iCCard" :placeholder="modifiedInfo.iCCard"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="角色">
                    <el-select class="widen" v-model="modifiedInfo.role" placeholder="请选择角色">
                      <el-option v-for="item in roleOption" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="用户类型">
                    <el-select class="widen" v-model="modifiedInfo.userType" placeholder="请选择用户类型">
                      <el-option v-for="item in userTypeOption" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门">
                    <el-select class="widen" v-model="modifiedInfo.department" placeholder="请选择部门">
                      <el-option v-for="item in departmentOption" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="modifiedInfo.notes" :placeholder="modifiedInfo.notes"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="modifiedFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteAnEmp(scope.$index)">删除</el-button>
              <el-button type="text" size="small" @click="handleResetClick(scope.$index)">重置密码</el-button>
              <el-dialog title="重置密码" :visible.sync="resetFormVisible">
                <el-form :model="resetPasswordInfo" ref="resetPasswordInfo">
                  <el-form-item label="新的密码" type="password" prop="passWord" :rules="resetPasswordRule">
                    <el-input type="password" v-model="resetPasswordInfo.passWord" placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" type="password" prop="checkPass" :rules="resetCheckPassRule">
                    <el-input type="password" v-model="resetPasswordInfo.checkPass" placeholder="确认密码"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="resetFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleResetPass()">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="showPassword(scope.$index)">查看密码</el-button>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination small layout="prev, pager, next" :total="curData.length" :page-size="pagesize" @current-change="handleCurrentChange" :current-page="currentPage">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      //新建员工密码验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.newEmployeeInfo.checkPass !== '') {
            this.$refs.newEmployee.validateField('checkPass');
          }
          callback();
        }
      };
      var validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.newEmployeeInfo.passWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //重置密码验证
      var validateResetPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新的密码'));
        } else {
          if (this.resetPasswordInfo.checkPass !== '') {
            this.$refs.resetPasswordInfo.validateField('checkPass');
          }
          callback();
        }
      };
      var validateResetCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.resetPasswordInfo.passWord) {
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
        employeeData: [],
        //修改信息框
        modifiedFormVisible: false,
        //修改信息
        modifiedInfo: {},
        //新建员工框
        newEmployeeFormVisible: false,
        //新建员工信息
        newEmployeeInfo: {
          role: '',
          name: '',
          department: '',
          notes: '',
          passWord: '',
          iCCard: '',
          checkPass: '',
          userType: '',
        },
        //验证密码规则
        passWordRule: [{
          required: true,
          message: '密码不能为空',
          trigger: 'change',
          validator: validatePass
        }],
        checkPassRule: [{
          required: true,
          message: '与输入密码不同',
          validator: validateCheckPass,
          trigger: 'blur',
        }],
        //重置密码规则
        resetPasswordRule: [{
          required: true,
          // message: '密码不能为空',
          trigger: 'change',
          validator: validateResetPass
        }],
        resetCheckPassRule: [{
          required: true,
          // message: '与输入密码不同',
          validator: validateResetCheckPass,
          trigger: 'blur',
        }],
        //选中数据
        selection: [],
        //重置密码框是否可见
        resetFormVisible: false,
        resetPasswordInfo: {
          passWord: '',
          checkPass: ''
        },
        //用户类型
        userTypeOption: ['系统用户', '普通用户'],
        //图标是否在加载
        loading: true,
        //当前表格绑定data
        curData: [],
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      //修改信息按钮
      modifiedButtClick: function(index) {
        this.modifiedFormVisible = true
        this.modifiedInfo = this.curData[index]
        this.currentClick = index
      },
      //修改信息
      handleInfoModified: function() {
        var index = this.currentClick
        let self = this
        //发送修改请求
        $.ajax({
          url: self.urlHeader + '/employee/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.modifiedFormVisible = false
            //更新所有data
            self.getAllEmployeeInfo(false)
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改员工信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      handleNewEmployee: function() {
        this.newEmployeeFormVisible = true
      },
      //提交新建成员表单
      submitNewEmpForm: function(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            delete self.newEmployeeInfo['checkPass']
            console.log(self.newEmployeeInfo)
            //发送请求
            $.ajax({
              url: self.urlHeader + '/employee/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newEmployeeInfo),
              success: function(data) {
                //解析返回的data
                var newEmpInfo = data.data
                // self.employeeData.push(newEmpInfo)
                self.curData.push(newEmpInfo)
                self.getAllEmployeeInfo(false)
                self.newEmployeeFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增员工成功',
                  type: 'success'
                });
              },
              error: function() {
                self.$alert('创建新员工失败', '失败', {
                  confirmButtonText: '确定'
                });
              }
            })
          } else {
            self.$alert('新建员工失败', '失败', {
              confirmButtonText: '确定'
            });
            return false;
          }
        });
      },
      handleSelectionChange(val) {
        this.selection = val
      },
      //删除选中员工
      handleEmpDelete() {
        let self = this
        function deleteEmp(id) {
          $.ajax({
            url: self.urlHeader + '/employee/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteEmp(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllEmployeeInfo(true)
                self.$message({
                  message: '删除员工成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除员工失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些员工，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteEmp(self.selection.pop().id)
          }).catch((error) => {
            console.log(error)
            self.$message({
              type: 'info',
              message: '删除失败，请重试'
            });
          });
        } else {
          self.$message({
            type: 'info',
            message: '请选择员工进行删除'
          });
        }
      },
      //删除一名员工
      deleteAnEmp(index) {
        var self = this
        this.$confirm('此操作将删除该员工，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            url: self.urlHeader + '/employee/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              //更新所有data
              self.getAllEmployeeInfo(false)
              self.$message({
                message: '删除员工成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除员工失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }).catch((error) => {
          console.log(error)
          self.$message({
            type: 'info',
            message: '删除失败，请重试'
          });
        });
      },
      //重置密码被按下
      handleResetClick(index) {
        this.modifiedInfo = this.curData[index]
        this.resetFormVisible = true
      },
      //重置密码
      handleResetPass() {
        this.$refs['resetPasswordInfo'].validate((valid) => {
          if (valid) {
            //发送修改密码请求
            let self = this
            self.modifiedInfo.passWord = self.resetPasswordInfo.passWord
            //发送修改请求
            $.ajax({
              url: self.urlHeader + '/employee/change',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.modifiedInfo),
              success: function(data) {
                console.log(data.data)
                //解析返回的data
                self.resetFormVisible = false
                //更新所有data
                self.getAllEmployeeInfo(false)
                //更新curData
                for (var i = 0; i < self.curData.length; i++) {
                  if (self.curData[i].id == self.modifiedInfo.id) {
                    self.curData[i].passWord = self.modifiedInfo.passWord
                  }
                }
                self.modifiedInfo = {}
                self.$refs['resetPasswordInfo'].resetFields();
                self.$message({
                  message: '修改成功',
                  type: 'success'
                });
              },
              error: function() {
                self.$alert('修改员工信息失败', '失败', {
                  confirmButtonText: '确定'
                });
              },
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //展示密码
      showPassword(index) {
        let self = this
        this.$alert('该用户密码为' + self.curData[index].passWord, '查看密码', {
          confirmButtonText: '确定'
        });
      },
      //获取所有员工信息
      getAllEmployeeInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/employee/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            //解析返回的data
            self.employeeData = data.data
            self.loading = false
            if (flag) {
              self.curData = self.employeeData
            }
          },
          error: function() {
            self.$confirm('员工数据加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllEmployeeInfo(flag)
            }).catch(() => {
              self.loading = false
              self.$message({
                type: 'info',
                message: '取消加载'
              });
            });
          }
        })
      },
      query() {
        var resultName = []
        var resultUsrName = []
        var resultDep = []
        var resultRole = []
        var flags = [false, false, false, false]
        if (this.name.length != 0) {
          flags[0] = true
          for (var emp in this.employeeData) {
            if (this.employeeData[emp].name.indexOf(this.name) != -1) {
              resultName.push(this.employeeData[emp])
            }
          }
        }
        if (this.usrName.length != 0) {
          flags[1] = true
          for (var emp in this.employeeData) {
            if (this.employeeData[emp].userName.indexOf(this.usrName) != -1) {
              resultUsrName.push(this.employeeData[emp])
            }
          }
        }
        if (this.department.length != 0) {
          flags[2] = true
          for (var emp in this.employeeData) {
            if (this.employeeData[emp].department.indexOf(this.department) != -1) {
              resultDep.push(this.employeeData[emp])
            }
          }
        }
        if (this.role.length != 0) {
          flags[3] = true
          for (var emp in this.employeeData) {
            if (this.employeeData[emp].role.indexOf(this.role) != -1) {
              resultRole.push(this.employeeData[emp])
            }
          }
        }
        if (this.name.length == 0 && this.usrName.length == 0 && this.department.length == 0 && this.role.length == 0) {
          this.curData = this.employeeData
          return
        }
        //求四个集合的交集
        function intersection(obj1, obj2, index1, index2) {
          var result = []
          //单纯求交集
          if (index1 == index2) {
            var count = 0
            //统计true的个数，只有一个直接输出
            for (var i = 0; i < flags.length; i++) {
              if (flags[i]) {
                count++
              }
            }
            switch (count) {
              case 1:
                if (obj1.length > 0) {
                  return obj1
                } else if (obj2.length > 0) {
                  return obj2
                }
              case 2:
                //前连个相等并且都为true
                if (flags[0] == flags[1]) {
                  if (flags[0]) {
                    return obj1
                  } else {
                    return obj2
                  }
                } else {
                  for (var i = 0; i < obj1.length; i++) {
                    for (var j = 0; j < obj2.length; j++) {
                      if (obj1[i].id == obj2[j].id) {
                        result.push(obj1[i])
                      }
                    }
                  }
                  return result
                }
              default:
                for (var i = 0; i < obj1.length; i++) {
                  for (var j = 0; j < obj2.length; j++) {
                    if (obj1[i].id == obj2[j].id) {
                      result.push(obj1[i])
                    }
                  }
                }
                return result
            }
          }
          //obj1有输入
          if (flags[index1]) {
            //为空
            if (obj1.length == 0) {
              return []
            } else {
              //非空，判断obj2
              //obj2有输入
              if (flags[index2]) {
                //为空
                if (obj2.length == 0) {
                  return []
                } else {
                  //非空
                  for (var i = 0; i < obj1.length; i++) {
                    for (var j = 0; j < obj2.length; j++) {
                      if (obj1[i].id == obj2[j].id) {
                        result.push(obj1[i])
                      }
                    }
                  }
                  return result
                }
              } else {
                //obj2无输入
                return obj1
              }
            }
          } else {
            //obj1无输入
            //obj2有输入
            if (flags[index2]) {
              //为空
              if (obj2.length == 0) {
                return []
              } else {
                return obj2
              }
            } else {
              //obj2无输入
              return []
            }
          }
        }
        var result1 = intersection(resultName, resultUsrName, 0, 1)
        var result2 = intersection(resultDep, resultRole, 2, 3)
        var result = intersection(result1, result2, -1, -1)
        this.curData = result
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      }
    },
    mounted: function() {
      this.getAllEmployeeInfo(true)
    }
  }
</script>

<style>
  .widen {
    display: inline;
  }
  .header-row {
    margin-bottom: 20px;
    border-bottom: 1px;
  }
</style>

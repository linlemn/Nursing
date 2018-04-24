<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            部门管理
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newDepFormVisible = true">新增</el-button>
            <el-dialog title="新增部门" :visible.sync="newDepFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newDepInfo" ref="newDepInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="部门编号" prop="departmentNumber">
                      <el-input v-model="newDepInfo.departmentNumber" placeholder="请输入部门编号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门名称" prop="departmentName" :rules="[{ required: true, message: '部门名称不能为空', trigger: 'change'}]">
                      <el-input v-model="newDepInfo.departmentName" placeholder="请输入部门名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="状态" prop="state" :rules="[{ required: true, message: '状态不能为空', trigger: 'change'}]">
                  <el-select class="widen" v-model="newDepInfo.state" placeholder="请选择状态">
                    <el-option v-for="item in stateOption" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input type="textarea" v-model="newDepInfo.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newDepFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewDep('newDepInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteDeps">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="8">
            <el-input v-model="queryName" placeholder="请输入部门名称"></el-input>
          </el-col>
          <el-col :span="8">
            <el-select class="widen" v-model="queryState" placeholder="请选择状态">
              <el-option v-for="item in stateOption" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-button @click="query">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="curData" stripe style="width: 100%; text-align: left;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="55" label="序号">
          </el-table-column>
          <el-table-column prop="departmentNumber" label="部门编号">
          </el-table-column>
          <el-table-column prop="departmentName" label="部门名称">
          </el-table-column>
          <el-table-column prop="state" label="状态">
          </el-table-column>
          <el-table-column prop="notes" label="备注">
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="部门编号">
                        <el-input v-model="modifiedInfo.departmentNumber" :placeholder="modifiedInfo.departmentNumber"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="部门名称">
                        <el-input v-model="modifiedInfo.departmentName" :placeholder="modifiedInfo.departmentName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="状态">
                    <el-select class="widen" v-model="modifiedInfo.state" :placeholder="modifiedInfo.state">
                      <el-option v-for="item in stateOption" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="modifiedInfo.notes" :placeholder="modifiedInfo.notes"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="modifiedFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteADep(scope.$index)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newDepInfo: {
          departmentNumber: '',
          notes: '',
          departmentNumber: '',
          state: '',
        },
        newDepFormVisible: false,
        depData: [],
        modifiedInfo: {
          departmentNumber: '',
          notes: '',
          departmentNumber: '',
          state: '',
        },
        modifiedFormVisible: false,
        stateOption: ['有效', '失效'],
        queryState: '',
        queryName: '',
        loading: true,
        selection: [],
        curData: [],
        currentClick: -1,
      }
    },
    methods: {
      handleNewDep(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/department/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newDepInfo),
              success: function(data) {
                //解析返回的data
                var newDep = data.data
                self.curData.push(newDep)
                self.getAllDepInfo(false)
                self.newDepFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增部门成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('新增部门失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('新增部门失败', '失败', {
              confirmButtonText: '确定'
            });
            return false;
          }
        });
      },
      modifiedButtClick(index) {
        this.modifiedFormVisible = true
        this.modifiedInfo = this.curData[index]
        this.currentClick = index
      },
      handleInfoModified() {
        var index = this.currentClick
        //发送请求
        let self = this
        //发送修改请求
        $.ajax({
          url: self.urlHeader + '/department/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.getAllDepInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改部门信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      //删除单个差错记录
      deleteADep(index) {
        let self = this
        this.$confirm('此操作将删除该部门，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/department/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.$message({
                message: '删除部门成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除部门失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSelectionChange(val) {
        this.selection = val
      },
      //删除选中部门
      deleteDeps() {
        let self = this
        function deleteR(id) {
          $.ajax({
            url: self.urlHeader + '/department/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteR(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllDepInfo(true)
                self.$message({
                  message: '删除部门成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除部门失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些部门，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteR(self.selection.pop().id)
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
            message: '请选择部门进行删除'
          });
        }
      },
      //获取所有差错记录
      getAllDepInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://10.60.43.111:12222/department/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            //解析返回的data
            if (flag) {
              self.curData = data.data
            }
            self.depData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('部门加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllDepInfo(flag)
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
        var stateResult = []
        var nameResult = []
        var flags = [false, false]
        if (this.queryState) {
          flags[0] = true
          for (var err in this.depData) {
            if (this.depData[err].state == this.queryState) {
              stateResult.push(this.depData[err])
            }
          }
        }
        if (this.queryName) {
          console.log(this.queryName)
          flags[1] = true
          for (var err in this.depData) {
            if (this.depData[err].departmentName == this.queryName) {
              nameResult.push(this.depData[err])
            }
          }
        }
        if (!this.queryState && !this.queryName) {
          this.$message('查询条件不能为空');
          return
        }
        function intersection(obj1, obj2, index1, index2) {
          var result = []
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
        var result = intersection(stateResult, nameResult, 0, 1)
        this.curData = result
      },
    },
    mounted: function() {
      this.getAllDepInfo(true)
    }
  }
</script>

<style scoped>
  .widen {
    display: inline;
  }
  .header-row {
    margin-bottom: 20px;
    border-bottom: 1px;
  }
</style>
<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            角色管理
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newRoleFormVisible = true">新增</el-button>
            <el-dialog title="新增角色" :visible.sync="newRoleFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newRoleInfo" ref="newRoleInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="角色编号" prop="rollNumber">
                      <el-input clearable v-model="newRoleInfo.rollNumber" placeholder="请输入角色编号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="角色名称" prop="rollName" :rules="[{ required: true, message: '角色名称不能为空', trigger: 'change'}]">
                      <el-input clearable v-model="newRoleInfo.rollName" placeholder="请输入角色名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="状态" prop="state" :rules="[{ required: true, message: '状态不能为空', trigger: 'change'}]">
                  <el-select  clearable class="widen" v-model="newRoleInfo.state" placeholder="请选择状态">
                    <el-option v-for="item in stateOption" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input clearable type="textarea" v-model="newRoleInfo.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newRoleFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewRole('newRoleInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteRoles">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="8">
            <el-input clearable v-model="queryName" placeholder="请输入角色名称"></el-input>
          </el-col>
          <el-col :span="8">
            <el-select clearable class="widen" v-model="queryState" placeholder="请选择状态">
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
        <el-table :data="curData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; text-align: left;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="55" label="序号">
          </el-table-column>
          <el-table-column prop="rollNumber" label="角色编号">
          </el-table-column>
          <el-table-column prop="rollName" label="角色名称">
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
                      <el-form-item label="角色编号">
                        <el-input clearable v-model="modifiedInfo.rollNumber" :placeholder="modifiedInfo.rollNumber"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="角色名称">
                        <el-input clearable v-model="modifiedInfo.rollName" :placeholder="modifiedInfo.rollName"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="状态">
                    <el-select clearable class="widen" v-model="modifiedInfo.state" :placeholder="modifiedInfo.state">
                      <el-option v-for="item in stateOption" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input clearable type="textarea" v-model="modifiedInfo.notes" :placeholder="modifiedInfo.notes"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="modifiedFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteARole(scope.$index)">删除</el-button>
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
      return {
        newRoleInfo: {
          rollNumber: '',
          notes: '',
          rollNumber: '',
          state: '',
        },
        newRoleFormVisible: false,
        roleData: [],
        modifiedInfo: {
          rollNumber: '',
          notes: '',
          rollNumber: '',
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
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      handleNewRole(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/role/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newRoleInfo),
              success: function(data) {
                //解析返回的data
                var newRole = data.data
                self.curData.push(newRole)
                self.getAllRoleInfo(false)
                self.newRoleFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增角色成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('新增角色失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('新增角色失败', '失败', {
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
          url: self.urlHeader + '/role/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.getAllRoleInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改角色信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      //删除单个差错记录
      deleteARole(index) {
        let self = this
        this.$confirm('此操作将删除该角色，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/role/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.$message({
                message: '删除角色成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除角色失败，请检查网络', '失败', {
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
      //删除选中角色
      deleteRoles() {
        let self = this
        function deleteR(id) {
          $.ajax({
            url: self.urlHeader + '/role/delete',
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
                self.getAllRoleInfo(true)
                self.$message({
                  message: '删除角色成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除角色失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些角色，是否继续?', '提示', {
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
            message: '请选择角色进行删除'
          });
        }
      },
      //获取所有差错记录
      getAllRoleInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/role/findAll',
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
            self.roleData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('角色加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllRoleInfo(flag)
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
          for (var err in this.roleData) {
            if (this.roleData[err].state == this.queryState) {
              stateResult.push(this.roleData[err])
            }
          }
        }
        if (this.queryName) {
          console.log(this.queryName)
          flags[1] = true
          for (var err in this.roleData) {
            if (this.roleData[err].date.indexOf(this.queryName)) {
              nameResult.push(this.roleData[err])
            }
          }
        }
        if (!this.queryState && !this.queryName) {
          this.curData = this.roleData
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
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      }
    },
    mounted: function() {
      this.getAllRoleInfo(true)
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
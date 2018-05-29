<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            护工管理床位
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newNurseBedFormVisible = true">新增</el-button>
            <el-dialog title="新增记录" :visible.sync="newNurseBedFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newNurseBedInfo" ref="newNurseBedInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="护工名称" prop="nurseName" :rules="[{ required: true, message: '护工名称不能为空', trigger: 'change'}]">
                      <el-input clearable v-model="newNurseBedInfo.nurseName" placeholder="请输入护工名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="IC卡号" prop="iCNumber">
                      <el-input clearable v-model="newNurseBedInfo.iCNumber" placeholder="请输入IC卡号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="用户类型" prop="userType">
                      <el-select clearable class="widen" v-model="modifiedInfo.userType" placeholder="请选择用户类型">
                        <el-option v-for="item in userTypeOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="部门名称" prop="departmentName">
                      <el-select clearable class="widen" v-model="modifiedInfo.departmentName" placeholder="请选择部门名称">
                        <el-option v-for="item in departmentOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="床位号" prop="bedNumber">
                  <el-input clearable v-model="newNurseBedInfo.bedNumber" placeholder="请输入床位号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newNurseBedFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewNurseBed('newNurseBedInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteNurseBeds">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="5">
            <el-input clearable v-model="queryName" placeholder="请输入护工名称"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input clearable v-model="queryICCard" placeholder="请输入IC卡号"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select clearable class="widen" v-model="queryUserType" placeholder="请选择用户类型">
              <el-option v-for="item in userTypeOption" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input clearable v-model="queryBedNum" placeholder="请输入床位号"></el-input>
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
          <el-table-column prop="nurseName" label="护工名称">
          </el-table-column>
          <el-table-column prop="iCNumber" label="IC卡号">
          </el-table-column>
          <el-table-column prop="userType" label="用户类型">
          </el-table-column>
          <el-table-column prop="departmentName" label="部门名称">
          </el-table-column>
          <el-table-column prop="bedNumber" label="床位号">
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="护工名称">
                        <el-input clearable v-model="modifiedInfo.nurseName" :placeholder="modifiedInfo.nurseName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="IC卡号">
                        <el-input clearable v-model="modifiedInfo.iCNumber" :placeholder="modifiedInfo.iCNumber"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="用户类型" prop="userType">
                        <el-select clearable class="widen" v-model="modifiedInfo.userType" :placeholder="modifiedInfo.userType">
                          <el-option v-for="item in userTypeOption" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="部门名称" prop="departmentName">
                        <el-select clearable class="widen" v-model="modifiedInfo.departmentName" :placeholder="modifiedInfo.departmentName">
                          <el-option v-for="item in departmentOption" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="床位号" prop="bedNumber">
                    <el-input clearable v-model="modifiedInfo.bedNumber" :placeholder="modifiedInfo.bedNumber"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="modifiedFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteANurseBed(scope.$index)">删除</el-button>
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
        newNurseBedInfo: {
          userType: '',
          iCNumber: '',
          floor: '',
          isEmpty: '',
          bedNumber: '',
        },
        newNurseBedFormVisible: false,
        nurseBedData: [],
        modifiedInfo: {
          userType: '',
          iCNumber: '',
          floor: '',
          isEmpty: '',
          bedNumber: '',
        },
        modifiedFormVisible: false,
        queryName: '',
        queryICCard: '',
        queryUserType: '',
        queryBedNum: '',
        loading: true,
        selection: [],
        curData: [],
        currentClick: -1,
        userTypeOption: ['系统用户', '普通用户'],
        departmentOption: [],
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      handleNewNurseBed(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/nurseBed/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newNurseBedInfo),
              success: function(data) {
                //解析返回的data
                var newBed = data.data
                self.curData.push(newBed)
                self.getAllNurseBedInfo(false)
                self.newNurseBedFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增记录成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('新增记录失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('新增记录失败', '失败', {
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
          url: self.urlHeader + '/nurseBed/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.getAllNurseBedInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      //删除单个差错记录
      deleteANurseBed(index) {
        let self = this
        this.$confirm('此操作将删除该信息，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/bedInfo/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.$message({
                message: '删除成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除失败，请检查网络', '失败', {
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
      //删除选中床位
      deleteNurseBeds() {
        let self = this
        function deleteR(id) {
          $.ajax({
            url: self.urlHeader + '/bedInfo/delete',
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
                self.getAllNurseBedInfo(true)
                self.$message({
                  message: '删除床位成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除床位失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些床位，是否继续?', '提示', {
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
            message: '请选择床位进行删除'
          });
        }
      },
      //获取所有差错记录
      getAllNurseBedInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/nurseBed/findAll',
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
            self.nurseBedData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllNurseBedInfo(flag)
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
        var resultICCard = []
        var resultUserType = []
        var resultBedNum = []
        var flags = [false, false, false, false]
        if (this.queryName) {
          flags[0] = true
          for (var emp in this.nurseBedData) {
            if (this.nurseBedData[emp].nurseName.indexOf(this.queryName) != -1) {
              resultName.push(this.nurseBedData[emp])
            }
          }
        }
        if (this.queryICCard) {
          flags[1] = true
          for (var emp in this.nurseBedData) {
            if (this.nurseBedData[emp].iCNumber.indexOf(this.queryICCard) != -1) {
              resultICCard.push(this.nurseBedData[emp])
            }
          }
        }
        if (this.queryUserType) {
          flags[2] = true
          for (var emp in this.nurseBedData) {
            if (this.nurseBedData[emp].userType == this.queryUserType) {
              resultUserType.push(this.nurseBedData[emp])
            }
          }
        }
        if (this.queryBedNum) {
          flags[3] = true
          for (var emp in this.nurseBedData) {
            if (this.nurseBedData[emp].bedNumber.indexOf(this.queryBedNum) != -1) {
              resultBedNum.push(this.nurseBedData[emp])
            }
          }
        }
        if (!this.queryName && !this.queryICCard && !this.queryUserType && !this.queryBedNum) {
          this.curData = this.nurseBedData
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
        var result1 = intersection(resultName, resultICCard, 0, 1)
        var result2 = intersection(resultUserType, resultBedNum, 2, 3)
        var result = intersection(result1, result2, -1, -1)
        this.curData = result
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      getDep() {
        let self = this
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/department/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            //解析返回的data
            var depData = data.data
            for (let i = 0; i < depData.length; i++) {
              self.departmentOption.push(depData[i].departmentName)
            }
          },
          error: function() {
            self.$confirm('部门加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getDep()
            }).catch(() => {
              self.$message({
                type: 'info',
                message: '取消加载'
              });
            });
          }
        })
      }
    },
    mounted: function() {
      this.getAllNurseBedInfo(true)
      this.getDep()
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
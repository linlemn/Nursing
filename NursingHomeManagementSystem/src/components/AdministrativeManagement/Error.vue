<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            差错登记
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newErrorFormVisible = true">新增</el-button>
            <el-dialog title="新增差错记录" :visible.sync="newErrorFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newErrorInfo" ref="newErrorInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="差错情况" prop="errorSituation" :rules="[{ required: true, message: '差错情况不能为空', trigger: 'change'}]">
                      <el-input clearable v-model="newErrorInfo.errorSituation" placeholder="请输入差错情况"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="登记日期" prop="date" :rules="[{ required: true, message: '登记日期不能为空', trigger: 'change'}]">
                      <el-date-picker clearable class="date-widen" v-model="newErrorInfo.date" type="date" placeholder="选择登记日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="负责人" prop="handingPerson" :rules="[{ required: true, message: '负责人不能为空', trigger: 'change'}]">
                  <el-input clearable v-model="newErrorInfo.handingPerson" placeholder="请输入负责人姓名"></el-input>
                </el-form-item>
                <el-form-item label="整改措施" prop="correctiveAction" :rules="[{ required: true, message: '整改措施不能为空', trigger: 'change'}]">
                  <el-input clearable type="textarea" v-model="newErrorInfo.correctiveAction" placeholder="请输入整改措施"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input clearable type="textarea" v-model="newErrorInfo.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newErrorFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewError('newErrorInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteErrors">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="10">
            <el-date-picker unlink-panels type="daterange" clearable class="date-widen" v-model="queryDate" start-placeholder="请选择开始日期" end-placeholder="请选择结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
            </el-date-picker>
          </el-col>
          <el-col :span="10">
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
          <el-table-column prop="handingPerson" label="负责人">
          </el-table-column>
          <el-table-column prop="errorSituation" label="差错情况">
          </el-table-column>
          <el-table-column prop="correctiveAction" label="整改措施">
          </el-table-column>
          <el-table-column prop="date" label="登记日期">
          </el-table-column>
          <el-table-column prop="notes" label="备注">
          </el-table-column>
          <el-table-column prop="state" label="状态">
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="负责人">
                        <el-input clearable v-model="modifiedInfo.handingPerson" :placeholder="modifiedInfo.handingPerson"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="登记日期">
                        <el-date-picker clearable class="date-widen" v-model="modifiedInfo.date" type="date" :placeholder="modifiedInfo.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col>
                      <el-form-item label="状态">
                        <el-select clearable class="widen" v-model="modifiedInfo.state" :placeholder="modifiedInfo.state">
                          <el-option v-for="item in stateOption" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="差错情况">
                    <el-input clearable v-model="modifiedInfo.errorSituation" :placeholder="modifiedInfo.errorSituation"></el-input>
                  </el-form-item>
                  <el-form-item label="整改措施">
                    <el-input clearable type="textarea" v-model="modifiedInfo.correctiveAction" :placeholder="modifiedInfo.correctiveAction"></el-input>
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
              <el-button type="text" size="small" @click="deleteAnError(scope.$index)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination small layout="prev, pager, next" :total="curData.length" :page-size="pagesize" @current-change="handleCurrentChange" :current-page="currentPage">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        newErrorInfo: {
          handingPerson: '',
          notes: '',
          correctiveAction: '',
          date: '',
          errorSituation: '',
          state: '',
        },
        newErrorFormVisible: false,
        errorData: [],
        modifiedInfo: {
          handingPerson: '',
          notes: '',
          correctiveAction: '',
          date: '',
          errorSituation: '',
          state: '',
        },
        modifiedFormVisible: false,
        stateOption: ['有效', '失效'],
        queryState: '',
        queryDate: '',
        loading: true,
        selection: [],
        curData: [],
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      handleNewError(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求，将操作时间、状态加上
            self.newErrorInfo.state = '有效'
            //发送请求
            $.ajax({
              url: self.urlHeader + '/errorRegistration/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newErrorInfo),
              success: function(data) {
                //解析返回的data
                var newErrInfo = data.data
                self.curData.push(newErrInfo)
                self.getAllErrorInfo(false)
                self.newErrorFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '登记差错成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('登记差错失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('登记差错失败', '失败', {
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
          url: self.urlHeader + '/errorRegistration/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.getAllErrorInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改差错信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      //删除单个差错记录
      deleteAnError(index) {
        let self = this
        this.$confirm('此操作将删除该差错记录，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/errorRegistration/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.$message({
                message: '删除差错记录成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除差错记录失败，请检查网络', '失败', {
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
      //删除选中赠品
      deleteErrors() {
        let self = this
        function deleteErr(id) {
          $.ajax({
            url: self.urlHeader + '/errorRegistration/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteErr(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllErrorInfo(true)
                self.$message({
                  message: '删除记录成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除记录失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些差错记录，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteErr(self.selection.pop().id)
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
            message: '请选择差错记录进行删除'
          });
        }
      },
      //获取所有差错记录
      getAllErrorInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/errorRegistration/findAll',
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
            self.errorData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('差错记录加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllErrorInfo(flag)
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
        var dateResult = []
        var flags = [false, false]
        if (this.queryState) {
          flags[0] = true
          for (var err in this.errorData) {
            if (this.errorData[err].state.indexOf(this.queryState)) {
              stateResult.push(this.errorData[err])
            }
          }
        }
        if (this.queryDate) {
          console.log(this.queryDate)
          flags[1] = true
          for (var err in this.errorData) {
            if (this.errorData[err].date >= this.queryDate[0] && this.errorData[err].date <= this.queryDate[1]) {
              dateResult.push(this.errorData[err])
            }
          }
        }
        if (!this.queryState && !this.queryDate) {
           this.curData = this.errorData
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
        var result = intersection(stateResult, dateResult, 0, 1)
        this.curData = result
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      }
    },
    mounted: function() {
      this.getAllErrorInfo(true)
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
  .date-widen {
    width: -webkit-fill-available;
  }
</style>

<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            行政总值班记录
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newDutyFormVisible = true">新增</el-button>
            <el-dialog title="新增值班记录" :visible.sync="newDutyFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newDutyInfo" ref="newDutyInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="行政部门" prop="executiveDepatment" :rules="[{ required: true, message: '行政部门不能为空', trigger: 'change'}]">
                      <el-select class="widen" v-model="newDutyInfo.executiveDepatment" placeholder="请输入行政部门">
                        <el-option v-for="item in departments" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="医务部门" prop="medicalDepatment" :rules="[{ required: true, message: '医疗部门不能为空', trigger: 'change'}]">
                      <el-select class="widen" v-model="newDutyInfo.medicalDepatment" placeholder="请输入医疗部门">
                        <el-option v-for="item in departments" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="门卫" prop="guard" :rules="[{ required: true, message: '门卫不能为空', trigger: 'change'}]">
                      <el-input v-model="newDutyInfo.guard" placeholder="请输入门卫"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="天气" prop="weather">
                      <el-select class="widen" v-model="newDutyInfo.weather" placeholder="请选择天气">
                        <el-option v-for="item in weatherOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="值班日期" prop="date" :rules="[{ required: true, message: '值班日期不能为空', trigger: 'change'}]">
                  <el-date-picker class="date-widen" v-model="newDutyInfo.date" type="date" placeholder="选择值班日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>日班值班情况记录</el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="值班人" prop="dayShiftPerson">
                      <el-input v-model="newDutyInfo.dayShiftPerson" placeholder="请输入日班值班人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="值班情况" prop="dayShiftSituation">
                      <el-input v-model="newDutyInfo.dayShiftSituation" placeholder="请输入日班值班情况"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="处置意见" prop="dayHandleComments">
                  <el-input type="textarea" v-model="newDutyInfo.dayShiftSituation" placeholder="请输入日班值班处置意见"></el-input>
                </el-form-item>
                <el-form-item>夜班值班情况记录</el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="值班人" prop="nightShiftPerson">
                      <el-input v-model="newDutyInfo.nightShiftPerson" placeholder="请输入夜班值班人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="值班情况" prop="nightShiftSituation">
                      <el-input v-model="newDutyInfo.nightShiftSituation" placeholder="请输入夜班值班情况"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="处置意见" prop="nightHandleComments">
                  <el-input type="textarea" v-model="newDutyInfo.nightShiftSituation" placeholder="请输入夜班值班处置意见"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input type="textarea" v-model="newDutyInfo.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newDutyFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewDuty('newDutyInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteDuty">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="8">
            <el-input v-model="queryName" placeholder="请输入值班人"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="query">查询</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="curData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; text-align: left;" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="expand">
            <div slot-scope="props">
              <el-form label-position="left">
                <el-form-item label="行政部门：">
                  <span>{{ props.row.executiveDepatment }}</span>
                </el-form-item>
                <el-form-item label="医务部门：">
                  <span>{{ props.row.medicalDepatment }}</span>
                </el-form-item>
                <el-form-item label="门卫：">
                  <span>{{ props.row.guard }}</span>
                </el-form-item>
                <el-form-item label="天气：">
                  <span>{{ props.row.weather }}</span>
                </el-form-item>
                <el-form-item label="日期：">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item>日班值班情况记录</el-form-item>
                <el-form-item label="值班人：">
                  <span>{{ props.row.dayShiftPerson }}</span>
                </el-form-item>
                <el-form-item label="值班情况">
                  <span>{{ props.row.dayShiftSituation }}</span>
                </el-form-item>
                <el-form-item label="处置意见">
                  <span>{{ props.row.dayHandleComments }}</span>
                </el-form-item>
                <el-form-item>夜班值班情况记录</el-form-item>
                <el-form-item label="值班人：">
                  <span>{{ props.row.nightShiftPerson }}</span>
                </el-form-item>
                <el-form-item label="值班情况">
                  <span>{{ props.row.nightShiftSituation }}</span>
                </el-form-item>
                <el-form-item label="处置意见">
                  <span>{{ props.row.nightHandleComments }}</span>
                </el-form-item>
                <el-form-item label="备注：">
                  <span>{{ props.row.notes}}</span>
                </el-form-item>
              </el-form>
            </div>
          </el-table-column>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="executiveDepatment" label="行政部门">
          </el-table-column>
          <el-table-column prop="medicalDepatment" label="医疗部门">
          </el-table-column>
          <el-table-column prop="guard" label="门卫">
          </el-table-column>
          <el-table-column prop="weather" label="天气">
          </el-table-column>
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="行政部门" prop="executiveDepatment">
                        <el-select class="widen" v-model="modifiedInfo.executiveDepatment" :placeholder="modifiedInfo.executiveDepatment">
                          <el-option v-for="item in departments" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="医疗部门" prop="medicalDepatment">
                        <el-select class="widen" v-model="modifiedInfo.medicalDepatment" :placeholder="modifiedInfo.medicalDepatment">
                          <el-option v-for="item in departments" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="门卫" prop="guard">
                        <el-input v-model="modifiedInfo.guard" :placeholder="modifiedInfo.guard"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="天气" prop="weather">
                        <el-select class="widen" v-model="modifiedInfo.weather" :placeholder="modifiedInfo.weather">
                          <el-option v-for="item in weatherOption" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="值班日期" prop="date">
                    <el-date-picker class="date-widen" v-model="modifiedInfo.date" type="date" :placeholder="modifiedInfo.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>日班值班情况记录</el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="值班人" prop="dayShiftPerson">
                        <el-input v-model="modifiedInfo.dayShiftPerson" :placeholder="modifiedInfo.dayShiftPerson"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="值班情况" prop="dayShiftSituation">
                        <el-input v-model="modifiedInfo.dayShiftSituation" :placeholder="modifiedInfo.dayShiftSituation"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="处置意见" prop="dayHandleComments">
                    <el-input type="textarea" v-model="modifiedInfo.dayShiftSituation" :placeholder="modifiedInfo.dayHandleComments"></el-input>
                  </el-form-item>
                  <el-form-item>夜班值班情况记录</el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="值班人" prop="nightShiftPerson">
                        <el-input v-model="modifiedInfo.nightShiftPerson" :placeholder="modifiedInfo.nightShiftPerson"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="值班情况" prop="nightShiftSituation">
                        <el-input v-model="modifiedInfo.nightShiftSituation" :placeholder="modifiedInfo.nightShiftSituation"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="处置意见" prop="nightHandleComments">
                    <el-input type="textarea" v-model="modifiedInfo.nightHandleComments" :placeholder="modifiedInfo.nightHandleComments"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="notes">
                    <el-input type="textarea" v-model="modifiedInfo.notes" :placeholder="modifiedInfo.notes"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="newDutyFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteADuty(scope.$index)">删除</el-button>
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
        newDutyFormVisible: false,
        newDutyInfo: {
          executiveDepatment: '',
          medicalDepatment: '',
          weather: '',
          guard: '',
          date: '',
          dayHandleComments: '',
          dayShiftPerson: '',
          dayShiftSituation: '',
          notes: '',
          nightHandleComments: '',
          nightShiftPerson: '',
          nightShiftSituation: '',
        },
        weatherOption: ['晴', '雨', '多云', '阴'],
        dutyData: [],
        modifiedInfo: {},
        modifiedFormVisible: false,
        queryName: '',
        curData: [],
        selection: [],
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,
        departments: [],
      }
    },
    methods: {
      handleNewDuty(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/dutyRecord/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newDutyInfo),
              success: function(data) {
                //解析返回的data
                var newDutyInfo = data.data
                self.curData.push(newDutyInfo)
                self.getAllDutyInfo(false)
                self.newDutyFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增值班记录成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('创建值班记录失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('创建值班记录失败', '失败', {
              confirmButtonText: '确定'
            });
            return false;
          }
        });
      },
      modifiedButtClick(index) {
        this.modifiedFormVisible = true
        this.modifiedInfo = this.dutyData[index]
        this.currentClick = index
      },
      handleInfoModified() {
        let self = this
        var index = this.currentClick
        //发送修改请求
        $.ajax({
          url: self.urlHeader + '/dutyRecord/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.modifiedFormVisible = false
            self.getAllDutyInfo(false)
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改值班信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      deleteADuty(index) {
        let self = this
        this.$confirm('此操作将删除该值班记录，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/dutyRecord/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.getAllDutyInfo(false)
              self.$message({
                message: '删除值班记录成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除值班记录失败，请检查网络', '失败', {
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
      //删除选中值班记录
      deleteDuty() {
        let self = this
        function deleteD(id) {
          $.ajax({
            url: self.urlHeader + '/dutyRecord/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteD(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllDutyInfo(true)
                self.$message({
                  message: '删除值班记录成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除值班记录失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些值班记录，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteD(self.selection.pop().id)
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
      //获取所有值班信息
      getAllDutyInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/dutyRecord/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            if (flag) {
              self.curData = data.data
            }
            //解析返回的data
            self.dutyData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('值班数据加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllDutyInfo(flag)
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
        var nameResult = []
        if (this.queryName) {
          for (var duty in this.dutyData) {
            if (this.dutyData[duty].nightShiftPerson == this.queryName || this.dutyData[duty].dayShiftPerson == this.queryName) {
              nameResult.push(this.dutyData[duty])
            }
          }
        } else {
          this.curData = this.dutyData
          return
        }
        this.curData = nameResult
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
              self.departments.push(depData[i].departmentName)
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
      this.getAllDutyInfo(true)
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
  .date-widen {
    width: -webkit-fill-available;
  }
</style>

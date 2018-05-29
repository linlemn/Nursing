<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            行政查房记录
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newRoundsFormVisible = true">新增</el-button>
            <el-dialog title="新增查房记录" :visible.sync="newRoundsFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newRoundsInfo" ref="newRoundsInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="查房人" prop="checkPerson" :rules="[{ required: true, message: '查房人不能为空', trigger: 'change'}]">
                      <el-input clearable v-model="newRoundsInfo.checkPerson" placeholder="请输入查房人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="查房日期" prop="date" :rules="[{ required: true, message: '查房日期不能为空', trigger: 'change'}]">
                      <el-date-picker class="date-widen" v-model="newRoundsInfo.date" type="date" placeholder="选择查房日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>生活护理</el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="情况摘要" prop="lifeCareSituation" :rules="rule1">
                      <el-input clearable type="textarea" v-model="newRoundsInfo.lifeCareSituation" placeholder="请输入情况摘要"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处置意见" prop="lifeCareSuggestion" >
                      <el-input clearable type="textarea" v-model="newRoundsInfo.lifeCareSuggestion" placeholder="请输入处置意见"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>医疗护理</el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="情况摘要" prop="medicalCareSituation" :rules="rule1">
                      <el-input clearable type="textarea" v-model="newRoundsInfo.medicalCareSituation" placeholder="请输入情况摘要"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处置意见" prop="medicalCareSuggestion" >
                      <el-input clearable type="textarea" v-model="newRoundsInfo.medicalCareSuggestion" placeholder="请输入处置意见"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>后勤保障</el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="情况摘要" prop="logisticalSituation" :rules="rule1">
                      <el-input clearable type="textarea" v-model="newRoundsInfo.logisticalSituation" placeholder="请输入情况摘要"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处置意见" prop="logisticalSuggestion" >
                      <el-input clearable type="textarea" v-model="newRoundsInfo.logisticalSuggestion" placeholder="请输入处置意见"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>安全隐患</el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="情况摘要" prop="securitySituation" :rules="rule1">
                      <el-input clearable type="textarea" v-model="newRoundsInfo.securitySituation" placeholder="请输入情况摘要"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处置意见" prop="securitySuggestion">
                      <el-input clearable type="textarea" v-model="newRoundsInfo.securitySuggestion" placeholder="请输入处置意见"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>意见或建议</el-form-item>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="情况摘要" prop="situation" :rules="rule1">
                      <el-input clearable type="textarea" v-model="newRoundsInfo.situation" placeholder="请输入情况摘要"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处置意见" prop="suggestion">
                      <el-input clearable type="textarea" v-model="newRoundsInfo.suggestion" placeholder="请输入处置意见"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="备注" prop="notes">
                  <el-input clearable type="textarea" v-model="newRoundsInfo.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newRoundsFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewRounds('newRoundsInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteRounds">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="8">
            <el-input clearable v-model="queryName" placeholder="请输入查房人"></el-input>
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
                <el-form-item label="查房人：">
                  <span>{{ props.row.checkPerson }}</span>
                </el-form-item>
                <el-form-item label="日期：">
                  <span>{{ props.row.date }}</span>
                </el-form-item>
                <el-form-item>生活护理</el-form-item>
                <el-form-item label="情况摘要：">
                  <span>{{ props.row.lifeCareSituation }}</span>
                </el-form-item>
                <el-form-item label="处置意见：">
                  <span>{{ props.row.lifeCareSuggestion }}</span>
                </el-form-item>
                <el-form-item>医疗护理</el-form-item>
                <el-form-item label="情况摘要：">
                  <span>{{ props.row.medicalCareSituation }}</span>
                </el-form-item>
                <el-form-item label="处置意见：">
                  <span>{{ props.row.medicalCareSuggestion }}</span>
                </el-form-item>
                <el-form-item>后勤保障</el-form-item>
                <el-form-item label="情况摘要：">
                  <span>{{ props.row.logisticalSituation }}</span>
                </el-form-item>
                <el-form-item label="处置意见：">
                  <span>{{ props.row.logisticalSuggestion}}</span>
                </el-form-item>
                <el-form-item>安全隐患</el-form-item>
                <el-form-item label="情况摘要：">
                  <span>{{ props.row.securitySituation  }}</span>
                </el-form-item>
                <el-form-item label="处置意见：">
                  <span>{{ props.row.securitySuggestion}}</span>
                </el-form-item>
                <el-form-item class="title">意见或建议</el-form-item>
                <el-form-item label="情况摘要：">
                  <span>{{ props.row.situation  }}</span>
                </el-form-item>
                <el-form-item label="处置意见：">
                  <span>{{ props.row.suggestion}}</span>
                </el-form-item>
                <el-form-item label="备注：">
                  <span>{{ props.row.notes}}</span>
                </el-form-item>
              </el-form>
            </div>
          </el-table-column>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="checkPerson" label="负责人">
          </el-table-column>
          <el-table-column prop="date" label="登记日期">
          </el-table-column>
          <el-table-column prop="lifeCareSituation" label="生活护理">
          </el-table-column>
          <el-table-column prop="medicalCareSituation" label="医疗护理">
          </el-table-column>
          <el-table-column prop="logisticalSituation" label="后勤保障">
          </el-table-column>
          <el-table-column prop="securitySituation" label="安全隐患">
          </el-table-column>
          <el-table-column prop="situation" label="建议或意见">
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
                      <el-form-item label="查房人" prop="checkPerson">
                        <el-input clearable v-model="modifiedInfo.checkPerson" :placeholder="modifiedInfo.checkPerson"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="查房日期" prop="date">
                        <el-date-picker class="date-widen" v-model="modifiedInfo.date" type="date" :placeholder="modifiedInfo.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>生活护理</el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="情况摘要" prop="lifeCareSituation">
                        <el-input clearable type="textarea" v-model="modifiedInfo.lifeCareSituation" :placeholder="modifiedInfo.lifeCareSituation"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="处置意见" prop="lifeCareSuggestion">
                        <el-input clearable type="textarea" v-model="modifiedInfo.lifeCareSuggestion" :placeholder="modifiedInfo.lifeCareSuggestion"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>医疗护理</el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="情况摘要" prop="medicalCareSituation">
                        <el-input clearable type="textarea" v-model="modifiedInfo.medicalCareSituation" :placeholder="modifiedInfo.medicalCareSituation"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="处置意见" prop="medicalCareSuggestion">
                        <el-input clearable type="textarea" v-model="modifiedInfo.lifeCareSuggestion" :placeholder="modifiedInfo.lifeCareSuggestion"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>后勤保障</el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="情况摘要" prop="logisticalSituation">
                        <el-input clearable type="textarea" v-model="modifiedInfo.logisticalSituation" :placeholder="modifiedInfo.logisticalSituation"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="处置意见" prop="logisticalSuggestion">
                        <el-input clearable type="textarea" v-model="modifiedInfo.logisticalSuggestion" :placeholder="modifiedInfo.logisticalSuggestion"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>安全隐患</el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="情况摘要" prop="securitySituation">
                        <el-input clearable type="textarea" v-model="modifiedInfo.securitySituation" :placeholder="modifiedInfo.securitySituation"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="处置意见" prop="securitySuggestion">
                        <el-input clearable type="textarea" v-model="modifiedInfo.securitySuggestion" :placeholder="modifiedInfo.securitySuggestion"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item>意见或建议</el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="情况摘要" prop="situation">
                        <el-input clearable type="textarea" v-model="modifiedInfo.situation" :placeholder="modifiedInfo.situation"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="处置意见" prop="suggestion">
                        <el-input clearable type="textarea" v-model="modifiedInfo.suggestion" :modifiedInfo="newRoundsInfo.suggestion"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="备注" prop="notes">
                    <el-input clearable type="textarea" v-model="modifiedInfo.notes" :placeholder="modifiedInfo.notes"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="newRoundsFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteARound(scope.$index)">删除</el-button>
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
        newRoundsFormVisible: false,
        newRoundsInfo: {
          date: '',
          checkPerson: '',
          lifeCareSuggestion: '',
          lifeCareSituation: '',
          medicalCareSituation: '',
          medicalCareSuggestion: '',
          logisticalSituation: '',
          logisticalSuggestion: '',
          securitySituation: '',
          securitySuggestion: '',
          situation: '',
          suggestion: '',
          notes: '',
        },
        roundsData: [],
        queryName: '',
        modifiedInfo: {},
        modifiedFormVisible: false,
        curData: [],
        selection: [],
        rule1: [{
          required: true,
          message: '情况摘要不能为空',
          trigger: 'change'
        }],
        rule2: [{
          required: true,
          message: '处置建议不能为空',
          trigger: 'change'
        }],
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      handleNewRounds(formName) {
        let self = this
        if(self.newRoundsInfo.lifeCareSuggestion) {
          self.newRoundsInfo.lifeCareSuggestion = '无'
        }
        if(self.newRoundsInfo.medicalCareSuggestion) {
          self.newRoundsInfo.medicalCareSuggestion = '无'
        }
        if(self.newRoundsInfo.logisticalSuggestion) {
          self.newRoundsInfo.logisticalSuggestion = '无'
        }
        if(self.newRoundsInfo.securitySuggestion) {
          self.newRoundsInfo.securitySuggestion = '无'
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/checkRecord/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newRoundsInfo),
              success: function(data) {
                //解析返回的data
                var newRoundInfo = data.data
                self.curData.push(newRoundInfo)
                self.getAllRoundsInfo(false)
                self.newRoundsFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增查房记录成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('新增查房记录失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('新增查房记录失败', '失败', {
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
          url: self.urlHeader + '/checkRecord/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.getAllRoundsInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改查房信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      deleteARound(index) {
        let self = this
        this.$confirm('此操作将删除该查房记录，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/checkRecord/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.getAllRoundsInfo(false)
              self.$message({
                message: '删除记录成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除记录失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }).catch((err) => {
          console.log(err)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSelectionChange(val) {
        this.selection = val
      },
      //删除选中查房记录
      deleteRounds() {
        let self = this
        function deleteRo(id) {
          $.ajax({
            url: self.urlHeader + '/checkRecord/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteRo(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllRoundsInfo(true)
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
          this.$confirm('此操作将删除这些查房记录，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteRo(self.selection.pop().id)
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
            message: '请选择查房记录进行删除'
          });
        }
      },
      getAllRoundsInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/checkRecord/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            //解析返回的data
            self.roundsData = data.data
            self.loading = false
            if (flag) {
              self.curData = self.roundsData
            }
          },
          error: function() {
            self.$confirm('员工数据加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllRoundsInfo(flag)
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
          
          for (var round in this.roundsData) {
            if (this.roundsData[round].checkPerson == this.queryName) {
              nameResult.push(this.roundsData[round])
            }
          }
          console.log("!!")
        } else {
          this.curData = this.roundsData
          return
        }
        this.curData = nameResult
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      }
    },
    mounted: function() {
      this.getAllRoundsInfo(true)
    }
  }
</script>

<style scoped>
  .header-row {
    margin-bottom: 20px;
    border-bottom: 1px;
  }
  .date-widen {
    width: -webkit-fill-available;
  }
</style>

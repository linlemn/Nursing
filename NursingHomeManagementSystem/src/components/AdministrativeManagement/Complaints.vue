<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            服务投诉记录
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newComplaintsFormVisible = true">新增</el-button>
            <el-dialog title="新增服务投诉记录" :visible.sync="newComplaintsFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newComplaintsInfo" ref="newComplaintsInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="反馈送达人" prop="diliveredPerson" :rules="[{ required: true, message: '反馈送达人不能为空', trigger: 'change'}]">
                      <el-input v-model="newComplaintsInfo.diliveredPerson" placeholder="请输入反馈送达人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="送达日期" prop="diliveredDate" :rules="[{ required: true, message: '送达日期不能为空', trigger: 'change'}]">
                      <el-date-picker class="date-widen" v-model="newComplaintsInfo.diliveredDate" type="date" placeholder="选择送达日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="执行部门" prop="executiveDepartment" :rules="[{ required: true, message: '执行部门不能为空', trigger: 'change'}]">
                      <el-input v-model="newComplaintsInfo.executiveDepartment" placeholder="请输入执行部门"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="反馈接收人" prop="feedbackRecipient" :rules="[{ required: true, message: '反馈接收人不能为空', trigger: 'change'}]">
                      <el-input v-model="newComplaintsInfo.feedbackRecipient" placeholder="请输入反馈接收人"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="院长" prop="dean" :rules="[{ required: true, message: '院长不能为空', trigger: 'change'}]">
                      <el-input v-model="newComplaintsInfo.dean" placeholder="请输入院长"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="送达日期" prop="date" :rules="[{ required: true, message: '日期不能为空', trigger: 'change'}]">
                      <el-date-picker class="date-widen" v-model="newComplaintsInfo.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="所提意见或建议" prop="suggestion" :rules="[{ required: true, message: '意见或建议不能为空', trigger: 'change'}]">
                  <el-input type="textarea" v-model="newComplaintsInfo.suggestion" placeholder="请输入意见或建议"></el-input>
                </el-form-item>
                <el-form-item label="采取措施" prop="solution" :rules="[{ required: true, message: '采取措施不能为空', trigger: 'change'}]">
                  <el-input type="textarea" v-model="newComplaintsInfo.solution" placeholder="请输入采取措施"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input type="textarea" v-model="newComplaintsInfo.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newErrorFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewComplaints('newComplaintsInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteComplaints">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="8">
            <el-input v-model="queryName" placeholder="请输入反馈接收人"></el-input>
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
          <el-table-column width="55" type="index" label="序号">
          </el-table-column>
          <el-table-column prop="feedbackRecipient" label="接收人">
          </el-table-column>
          <el-table-column prop="diliveredPerson" label="送达人">
          </el-table-column>
          <el-table-column prop="diliveredDate" label="送达日期">
          </el-table-column>
          <el-table-column prop="suggestion" label="意见或建议">
          </el-table-column>
          <el-table-column prop="solution" label="措施">
          </el-table-column>
          <el-table-column prop="dean" label="院长">
          </el-table-column>
          <el-table-column prop="executiveDepartment" label="执行部门">
          </el-table-column>
          <el-table-column prop="date" label="日期">
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
                      <el-form-item label="反馈送达人">
                        <el-input v-model="modifiedInfo.diliveredPerson" :placeholder="modifiedInfo.diliveredPerson"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="送达日期">
                        <el-date-picker class="date-widen" v-model="modifiedInfo.diliveredDate" type="date" :placeholder="modifiedInfo.diliveredDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="所提意见或建议">
                    <el-input type="textarea" v-model="modifiedInfo.suggestion" :placeholder="modifiedInfo.suggestion"></el-input>
                  </el-form-item>
                  <el-form-item label="采取措施">
                    <el-input type="textarea" v-model="modifiedInfo.solution" :placeholder="modifiedInfo.solution"></el-input>
                  </el-form-item>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="执行部门">
                        <el-input v-model="modifiedInfo.executiveDepartment" :placeholder="modifiedInfo.executiveDepartment"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="反馈接收人">
                        <el-input v-model="modifiedInfo.feedbackRecipient" :placeholder="modifiedInfo.feedbackRecipient"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="院长">
                        <el-input v-model="modifiedInfo.dean" :placeholder="modifiedInfo.dean"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="日期">
                        <el-date-picker class="date-widen" v-model="modifiedInfo.date" type="date" :placeholder="modifiedInfo.date" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="modifiedInfo.notes" :placeholder="modifiedInfo.notes"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="modifiedFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteAComplaint(scope.$index)">删除</el-button>
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
        newComplaintsInfo: {
          notes: '',
          dadiliveredDate: '',
          dean: '',
          solution: '',
          executiveDepartment: '',
          diliveredPerson: '',
          receiver: '',
          suggestion: '',
          date: '',
        },
        newComplaintsFormVisible: false,
        queryName: '',
        modifiedFormVisible: false,
        complaintsData: [],
        modifiedInfo: {},
        selection: [],
        curData: [],
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      handleNewComplaints(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/serviceComplaint/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newComplaintsInfo),
              success: function(data) {
                //解析返回的data
                var newComplaintsInfo = data.data
                self.curData.push(newComplaintsInfo)
                self.getAllComplaintsInfo(false)
                self.newComplaintsFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增投诉成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('创建投诉失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('新建投诉失败', '失败', {
              confirmButtonText: '确定'
            });
            return false;
          }
        });
      },
      modifiedButtClick(index) {
        this.modifiedFormVisible = true
        this.modifiedInfo = this.complaintsData[index]
        this.currentClick = index
      },
      handleInfoModified() {
        var index = this.currentClick
        let self = this
        //发送修改请求
        $.ajax({
          url: self.urlHeader + '/serviceComplaint/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.getAllComplaintsInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改投诉失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      deleteAComplaint(index) {
        let self=  this
        this.$confirm('此操作将删除该投诉记录，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/serviceComplaint/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.getAllComplaintsInfo(false)
              self.$message({
                message: '删除投诉成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除投诉失败，请检查网络', '失败', {
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
      //删除选中建议
      deleteComplaints() {
        let self = this
        function deleteComp(id) {
          $.ajax({
            url: self.urlHeader + '/serviceComplaint/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteComp(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllComplaintsInfo(true)
                self.$message({
                  message: '删除投诉记录成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除投诉失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些投诉，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteComp(self.selection.pop().id)
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
            message: '请选择投诉记录进行删除'
          });
        }
      },
      //获取所有投诉信息
      getAllComplaintsInfo(flag) {
        let self = this
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/serviceComplaint/findAll',
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
            self.complaintsData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('投诉记录加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllComplaintsInfo(flag)
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
          for (var complaint in this.complaintsData) {
            if (this.complaintsData[complaint].feedbackRecipient == this.queryName) {
              nameResult.push(this.complaintsData[complaint])
            }
          }
        } else {
          this.curData = this.complaintsData
          return
        }
        this.curData = nameResult
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },      
    },
    mounted: function() {
      this.getAllComplaintsInfo(true)
      // console.log('good')
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

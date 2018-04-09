<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            意见箱开箱记录
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newSuggestionFormVisible = true">新增</el-button>
            <el-dialog title="新增意见记录" :visible.sync="newSuggestionFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newSuggestionInfo" ref="newSuggestionInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="开箱人" prop="unpackingPerson" :rules="[{ required: true, message: '开箱人不能为空', trigger: 'change'}]">
                      <el-input v-model="newSuggestionInfo.unpackingPerson" placeholder="请输入开箱人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开箱日期" prop="unpackingDate" :rules="[{ required: true, message: '开箱日期不能为空', trigger: 'change'}]">
                      <el-date-picker class="date-widen" v-model="newSuggestionInfo.unpackingDate" type="date" placeholder="选择开箱日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="意见数" prop="suggestionNum" :rules="[{ required: true, message: '意见数不能为空', trigger: 'change'}]">
                  <el-input v-model="newSuggestionInfo.suggestionNum" placeholder="请输入意见数"></el-input>
                </el-form-item>
                <el-form-item label="意见内容" prop="suggestionContent" :rules="[{ required: true, message: '意见内容不能为空', trigger: 'change'}]">
                  <el-input type="textarea" v-model="newSuggestionInfo.suggestionContent" placeholder="请输入意见内容"></el-input>
                </el-form-item>
                <el-form-item label="意见处理反馈" prop="processFeedback" :rules="[{ required: true, message: '意见处理反馈不能为空', trigger: 'change'}]">
                  <el-input type="textarea" v-model="newSuggestionInfo.processFeedback" placeholder="请输入意见处理反馈"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input type="textarea" v-model="newSuggestionInfo.notes" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newErrorFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewSuggestion('newSuggestionInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteSuggestions">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="8">
            <el-input v-model="queryName" placeholder="请输入开箱人"></el-input>
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
          <el-table-column width="55" type="index" label="序号">
          </el-table-column>
          <el-table-column prop="unpackingPerson" label="开箱人">
          </el-table-column>
          <el-table-column prop="suggestionContent" label="意见内容">
          </el-table-column>
          <el-table-column prop="suggestionNum" label="意见数">
          </el-table-column>
          <el-table-column prop="unpackingDate" label="开箱日期">
          </el-table-column>
          <el-table-column prop="notes" label="备注">
          </el-table-column>
          <el-table-column prop="processFeedback" label="反馈">
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="开箱人">
                        <el-input v-model="modifiedInfo.unpackingPerson" :placeholder="modifiedInfo.unpackingPerson"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="开箱日期">
                        <el-date-picker class="date-widen" v-model="modifiedInfo.unpackingDate" type="date" :placeholder="modifiedInfo.unpackingDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="意见内容">
                    <el-input v-model="modifiedInfo.suggestionContent" :placeholder="modifiedInfo.suggestionContent"></el-input>
                  </el-form-item>
                  <el-form-item label="反馈">
                    <el-input v-model="modifiedInfo.processFeedback" :placeholder="modifiedInfo.processFeedback"></el-input>
                  </el-form-item>
                  <el-form-item label="意见数">
                    <el-input v-model="modifiedInfo.suggestionNum" :placeholder="modifiedInfo.suggestionNum"></el-input>
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
              <el-button type="text" size="small" @click="deleteASuggestion(scope.$index)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        newSuggestionFormVisible: false,
        newSuggestionInfo: {
          notes: '',
          unpackingPerson: '',
          suggestionContent: '',
          processFeedback: '',
          unpackingDate: '',
          suggestionNum: '',
        },
        suggestionData: [],
        queryName: '',
        modifiedFormVisible: false,
        modifiedInfo: '',
        selection: [],
        curData: [],
      }
    },
    methods: {
      handleNewSuggestion(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/suggestionBox/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newSuggestionInfo),
              success: function(data) {
                //解析返回的data
                var newSuggestionInfo = data.data
                self.curData.push(newSuggestionInfo)
                self.getAllSuggestionInfo(false)
                self.newSuggestionFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增捐赠成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('创建捐赠失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('新建意见失败', '失败', {
              confirmButtonText: '确定'
            });
            return false;
          }
        });
      },
      modifiedButtClick(index) {
        this.modifiedFormVisible = true
        this.modifiedInfo = this.suggestionData[index]
      },
      handleInfoModified(index) {
        let self = this
        //发送修改请求
        $.ajax({
          url: self.urlHeader + '/suggestionBox/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index - 1] = self.modifiedInfo
            self.getAllSuggestionInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改意见失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      deleteASuggestion(index) {
        let self = this
        this.$confirm('此操作将删除该意见，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/suggestionBox/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.getAllSuggestionInfo(false)
              self.$message({
                message: '删除意见成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除意见失败，请检查网络', '失败', {
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
      deleteSuggestions() {
        let self = this
        function deleteSugg(id) {
          $.ajax({
            url: self.urlHeader + '/suggestionBox/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteSugg(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllSuggestionInfo(true)
                self.$message({
                  message: '删除意见成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除意见失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些意见，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteSugg(self.selection.pop().id)
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
            message: '请选择意见进行删除'
          });
        }
      },
      //获取所有建议信息
      getAllSuggestionInfo(flag) {
        let self = this
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://10.60.43.111:12222/suggestionBox/findAll',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify({
            id: '1'
          }),
          success: function(data) {
            if(flag) {
              self.curData = data.data
            }
            //解析返回的data
            self.suggestionData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('意见箱加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllSuggestionInfo(flag)
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
          for (var suggestion in this.suggestionData) {
            if (this.suggestionData[suggestion].unpackingPerson == this.queryName) {
              nameResult.push(this.suggestionData[suggestion])
            }
          }
        } else {
          this.$message('查询条件不能为空');
          return
        }
        this.curData = nameResult
      },
    },
    mounted: function() {
      this.getAllSuggestionInfo(true)
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

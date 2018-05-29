<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            捐赠物品明细
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newDonationFormVisible = true">新增</el-button>
            <el-dialog title="新增捐赠物品" :visible.sync="newDonationFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newDonationInfo" ref="newDonationInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="捐赠人" prop="donor" :rules="[{ required: true, message: '捐赠人不能为空', trigger: 'change'}]">
                      <el-input clearable v-model="newDonationInfo.donor" placeholder="请输入捐赠人姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="捐赠分类" prop="classification" :rules="[{ required: true, message: '捐赠分类不能为空', trigger: 'change'}]">
                      <el-select clearable class="widen" v-model="newDonationInfo.classification" placeholder="请选择捐赠分类">
                        <el-option v-for="item in sortOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="经办人" prop="handingPerson" :rules="[{ required: true, message: '经办人不能为空', trigger: 'change'}]">
                      <el-input clearable v-model="newDonationInfo.handingPerson" placeholder="请输入经办人姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="日期" prop="date" :rules="[{ required: true, message: '日期不能为空', trigger: 'change'}]">
                      <el-date-picker clearable class="date-widen" v-model="newDonationInfo.date" type="date" placeholder="请选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="捐赠内容" prop="content" :rules="[{required: true, message: '捐赠内容不能为空', trigger: 'change'}]">
                  <el-input clearable type="textarea" v-model="newDonationInfo.content" placeholder="请输入捐赠内容"></el-input>
                </el-form-item>
                <el-form-item label="处置意见" prop="dispositionOfOpinions" :rules="[{required: true, message: '捐赠内容不能为空', trigger: 'change'}]">
                  <el-input clearable type="textarea" v-model="newDonationInfo.dispositionOfOpinions" placeholder="请输入处置意见"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="notes">
                  <el-input clearable type="textarea" v-model="newDonationInfo.password" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newDonationFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewDonation('newDonationInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteDonations">删除</el-button>
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
          <el-table-column prop="donor" label="捐赠人">
          </el-table-column>
          <el-table-column prop="classification" label="捐赠分类">
          </el-table-column>
          <el-table-column prop="content" label="捐赠内容">
          </el-table-column>
          <el-table-column prop="dispositionOfOpinions" label="处置意见">
          </el-table-column>
          <el-table-column prop="handingPerson" label="经办人">
          </el-table-column>
          <el-table-column prop="date" label="日期">
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
                      <el-form-item label="捐赠人">
                        <el-input clearable v-model="modifiedInfo.donor" :placeholder="modifiedInfo.donor"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="状态">
                        <el-select clearable class="widen" v-model="modifiedInfo.state" :placeholder="modifiedInfo.state">
                          <el-option v-for="item in stateOption" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="经办人">
                        <el-input clearable v-model="modifiedInfo.handingPerson" :placeholder="modifiedInfo.handingPerson"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="捐赠分类">
                        <el-select clearable class="widen" v-model="modifiedInfo.classification" :placeholder="modifiedInfo.classification">
                          <el-option v-for="item in sortOption" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="捐赠内容">
                    <el-input clearable type="textarea" v-model="modifiedInfo.content" :placeholder="modifiedInfo.content"></el-input>
                  </el-form-item>
                  <el-form-item label="处置意见">
                    <el-input clearable type="textarea" v-model="modifiedInfo.dispositionOfOpinions" :placeholder="modifiedInfo.dispositionOfOpinions"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input clearable type="textarea" v-model="modifiedInfo.notes" :placeholder="modifiedInfo.notes"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="modifiedFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteADonation(scope.$index)">删除</el-button>
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
        stateOption: ['有效', '失效'],
        sortOption: ['钱款', '物品'],
        queryState: '',
        queryDate: '',
        newDonationFormVisible: false,
        newDonationInfo: {
          donor: '',
          classification: '',
          notes: '',
          date: '',
          content: '',
          dispositionOfOpinions: '',
          handingPerson: '',
          state: '',
        },
        donationData: [],
        modifiedFormVisible: false,
        modifiedInfo: {
          donor: '',
          classification: '',
          notes: '',
          date: '',
          content: '',
          dispositionOfOpinions: '',
          handingPerson: '',
          state: '',
        },
        selection: [],
        loading: true,
        curData: [],
        currentClick: -1,
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      //新建捐赠物品
      handleNewDonation(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求，将操作时间、状态加上
            this.newDonationInfo.state = '有效'
            //发送请求
            $.ajax({
              url: self.urlHeader + '/donation/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newDonationInfo),
              success: function(data) {
                //解析返回的data
                var newDonationInfo = data.data
                self.curData.push(newDonationInfo)
                self.getAllDonationInfo(false)
                self.newDonationFormVisible = false
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
            self.$alert('新建捐赠失败', '失败', {
              confirmButtonText: '确定'
            });
            return false;
          }
        });
      },
      //点击编辑按钮
      modifiedButtClick: function(index) {
        this.modifiedFormVisible = true
        this.modifiedInfo = this.curData[index]
        this.currentClick = index
      },
      //删除一件捐赠品
      deleteADonation() {
        var index = this.currentClick
        let self = this
        this.$confirm('此操作将删除该捐赠物，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求
          $.ajax({
            url: self.urlHeader + '/donation/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: self.curData[index].id
            }),
            success: function(data) {
              //解析返回的data
              self.curData.splice(index, 1)
              self.getAllDonationInfo(false)
              self.$message({
                message: '删除捐赠品成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除捐赠品失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }).catch((err) => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
          console.log(err)
        });
      },
      //修改捐赠物品
      handleInfoModified(index) {
        let self = this
        //发送修改请求
        $.ajax({
          url: self.urlHeader + '/donation/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.modifiedFormVisible = false
            self.getAllDonationInfo(false)
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改捐赠品信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      handleSelectionChange(val) {
        this.selection = val
      },
      //删除选中赠品
      deleteDonations() {
        let self = this
        function deleteDon(id) {
          $.ajax({
            url: self.urlHeader + '/donation/delete',
            type: 'post',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
              id: id
            }),
            success: function(data) {
              //如果没有删除完
              if (self.selection.length > 0) {
                deleteDon(self.selection.pop().id)
              } else {
                //如果删除完毕
                self.getAllDonationInfo(true)
                self.$message({
                  message: '删除赠品成功',
                  type: 'success'
                });
              }
            },
            error: function() {
              self.$alert('删除赠品失败，请检查网络', '失败', {
                confirmButtonText: '确定'
              });
            }
          })
        }
        if (self.selection.length > 0) {
          this.$confirm('此操作将删除这些赠品，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //递归删除
            deleteDon(self.selection.pop().id)
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
      //获取所有捐赠物品信息
      getAllDonationInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/donation/findAll',
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
            self.donationData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('捐赠数据加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllDonationInfo(flag)
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
          for (var don in this.donationData) {
            if (this.donationData[don].state.indexOf(this.queryState)) {
              stateResult.push(this.donationData[don])
            }
          }
        }
        if (this.queryDate) {
          flags[1] = true
          for (var don in this.donationData) {
            if (this.donationData[don].date >= this.queryDate[0] && this.donationData[don].date <= this.queryDate[1]) {
              dateResult.push(this.donationData[don])
            }
          }
        }
        if (!this.queryDate && !this.queryState) {
          this.curData = this.donationData
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
      },
    },
    mounted: function() {
      this.getAllDonationInfo(true)
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

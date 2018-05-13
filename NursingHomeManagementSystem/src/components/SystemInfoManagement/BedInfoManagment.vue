<template>
  <div class="page">
    <el-container>
      <el-header class="header-row">
        <el-row class="header-row">
          <el-col :span="6" :offset="9">
            床位信息管理
          </el-col>
          <el-col :span="1" :offset="5">
            <el-button type="success" plain size="small" @click="newBedFormVisible = true">新增</el-button>
            <el-dialog title="新增床位" :visible.sync="newBedFormVisible" style="text-align: left">
              <el-form label-position="top" label-width="120px" :model="newBedInfo" ref="newBedInfo">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="楼层" prop="floor" :rules="[{ required: true, message: '楼层不能为空', trigger: 'change'}]">
                      <el-select class="widen" v-model="newBedInfo.floor" placeholder="请选择楼层">
                        <el-option v-for="item in floorOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col v-if="whetherChooseFloor()" :span="12">
                    <el-form-item label="房间号" prop="roomNumber" :rules="[{ required: true, message: '房间号不能为空', trigger: 'change'}]">
                      <el-select class="widen" v-model="newBedInfo.roomNumber" placeholder="请选择房间号">
                        <el-option v-for="item in getRoomNumOption(true)" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-form-item label="床位编号" prop="bedNumber" :rules="[{ required: true, message: '床位编号不能为空', trigger: 'change'}]">
                      <el-input v-model="newBedInfo.bedNumber" placeholder="床位格式，如05-501-01"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="是否空置" prop="isEmpty">
                      <el-select class="widen" v-model="newBedInfo.isEmpty" placeholder="请选择空置状态" :rules="[{ required: true, message: '空置状态不能为空', trigger: 'change'}]">
                        <el-option v-for="item in emptyOption" :key="item" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="铃号" prop="ringNumber">
                  <el-input v-model="newBedInfo.ringNumber" placeholder="请输入铃号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="newBedFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="handleNewBed('newBedInfo')">确 定</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small" @click="deleteBeds">删除</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="start" :gutter="20">
          <el-col :span="8">
            <el-select class="widen" v-model="queryFloor" placeholder="请选择楼层">
              <el-option v-for="item in floorOption" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-select class="widen" v-model="queryRoomNum" placeholder="请选择房间号">
              <el-option v-for="item in getRoomNumOption(false)" :key="item" :label="item" :value="item">
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
          <el-table-column prop="floor" label="楼层">
          </el-table-column>
          <el-table-column prop="roomNumber" label="房间号">
          </el-table-column>
          <el-table-column prop="bedNumber" label="床位编号">
          </el-table-column>
          <el-table-column prop="ringNumber" label="铃号">
          </el-table-column>
          <el-table-column prop="isEmpty" label="是否空置">
          </el-table-column>
          <el-table-column label="操作">
            <div slot-scope="scope">
              <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
              <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="楼层">
                        <el-input v-model="modifiedInfo.floor" :placeholder="modifiedInfo.floor"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="房间号">
                        <el-input v-model="modifiedInfo.roomNumber" :placeholder="modifiedInfo.roomNumber"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="床位编号" prop="bedNumber">
                        <el-input v-model="modifiedInfo.bedNumber" :placeholder="modifiedInfo.bedNumber"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否空置" prop="isEmpty" :rules="[{ required: true, message: '空置状态不能为空', trigger: 'change'}]">
                        <el-select class="widen" v-model="modifiedInfo.isEmpty" :placeholder="modifiedInfo.isEmpty">
                          <el-option v-for="item in emptyOption" :key="item" :label="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="铃号" prop="ringNumber">
                    <el-input v-model="modifiedInfo.ringNumber" :placeholder="modifiedInfo.ringNumber"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="modifiedFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <el-button type="text" size="small" @click="deleteABed(scope.$index)">删除</el-button>
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
        newBedInfo: {
          bedNumber: '',
          roomNumber: '',
          floor: '',
          isEmpty: '',
          ringNumber: '',
        },
        newBedFormVisible: false,
        bedData: [],
        modifiedInfo: {
          bedNumber: '',
          roomNumber: '',
          floor: '',
          isEmpty: '',
          ringNumber: '',
        },
        modifiedFormVisible: false,
        floorOption: ['1楼', '2楼', '3楼', '4楼', '5楼'],
        queryFloor: '',
        queryRoomNum: '',
        loading: true,
        selection: [],
        curData: [],
        currentClick: -1,
        emptyOption: ['空置', '已住人'],
        currentPage: 1,
        pagesize: 20,
      }
    },
    methods: {
      handleNewBed(formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //发送请求
            $.ajax({
              url: self.urlHeader + '/bedInfo/create',
              type: 'post',
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify(self.newBedInfo),
              success: function(data) {
                //解析返回的data
                var newBed = data.data
                self.curData.push(newBed)
                self.getAllBedInfo(false)
                self.newBedFormVisible = false
                self.$refs[formName].resetFields();
                self.$message({
                  message: '新增床位成功',
                  type: 'success'
                });
              },
              error: function(err) {
                self.$alert('新增床位失败', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              }
            })
          } else {
            self.$alert('新增床位失败', '失败', {
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
          url: self.urlHeader + '/bedInfo/change',
          type: 'post',
          contentType: 'application/json;charset=UTF-8',
          data: JSON.stringify(self.modifiedInfo),
          success: function(data) {
            //解析返回的data
            self.curData[index] = self.modifiedInfo
            self.getAllBedInfo(false)
            self.modifiedFormVisible = false
            self.$message({
              message: '修改成功',
              type: 'success'
            });
          },
          error: function() {
            self.$alert('修改床位信息失败', '失败', {
              confirmButtonText: '确定'
            });
          },
        })
      },
      //删除单个差错记录
      deleteABed(index) {
        let self = this
        this.$confirm('此操作将删除该床位，是否继续?', '提示', {
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
                message: '删除床位成功',
                type: 'success'
              });
            },
            error: function() {
              self.$alert('删除床位失败，请检查网络', '失败', {
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
      deleteBeds() {
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
                self.getAllBedInfo(true)
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
      getAllBedInfo(flag) {
        let self = this
        //获取所有员工信息
        $.ajax({
          // url: self.urlHeader + '/employee/findAll',
          url: 'http://101.132.142.238:12222/bedInfo/findAll',
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
            self.bedData = data.data
            self.loading = false
          },
          error: function() {
            self.$confirm('床位加载失败，请检查网络', '失败', {
              confirmButtonText: '重新加载',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              self.getAllBedInfo(flag)
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
        var floorResult = []
        var roomNumResult = []
        var flags = [false, false]
        if (this.queryFloor) {
          flags[0] = true
          for (var err in this.bedData) {
            if (this.bedData[err].floor == this.queryFloor) {
              floorResult.push(this.bedData[err])
            }
          }
        }
        if (this.queryRoomNum) {
          console.log(this.queryRoomNum)
          flags[1] = true
          for (var err in this.bedData) {
            if (this.bedData[err].roomNumber == this.queryRoomNum) {
              roomNumResult.push(this.bedData[err])
            }
          }
        }
        if (!this.queryFloor && !this.queryRoomNum) {
          this.curData = this.bedData
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
        console.log(floorResult, roomNumResult)
        var result = intersection(floorResult, roomNumResult, 0, 1)
        this.curData = result
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
      },
      //获取房间号选项
      getRoomNumOption(flag) {
        var option = []
        if (flag) {
          for (var i = 1; i < 10; i++) {
            option.push(this.newBedInfo.floor[0] + '0' + i)
          }
        } else {
          for (var i = 1; i < 10; i++) {
            option.push(this.queryFloor[0] + '0' + i)
          }
        }
        return option
      },
      //是否选择房间号
      whetherChooseFloor() {
        if (!this.newBedInfo.floor) {
          return false
        } else {
          return true
        }
      }
    },
    mounted: function() {
      this.getAllBedInfo(true)
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
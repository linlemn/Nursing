<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            日常巡查
          </el-col>
          <el-col :span="1" :offset="3">
            <el-button type="success" plain size="small" @click="addTourRecordFormVisible = true">新增</el-button>
            <el-dialog title="添加病史记录" :visible.sync="addTourRecordFormVisible" width="80%" style="text-align: left">
              <el-form label-width="160px" v-model="addTourRecordForm">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="楼层">
                      <el-select v-model="addTourRecordForm.storeyNo" placeholder="请选择" size="small">
                        <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="房间号">
                      <el-select v-model="addTourRecordForm.roomNo" placeholder="请选择" size="small">
                        <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="姓名">
                      <el-input v-model="addTourRecordForm.name" size="small" placeholder="输入姓名">
                      </el-input>
                    </el-form-item>
                  </el-col>                                    
                </el-row>                 
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="护理级别">
                      <el-radio-group v-model="addTourRecordForm.caringLevel">
                        <el-radio label="一级"></el-radio>
                        <el-radio label="二级"></el-radio>
                        <el-radio label="三级"></el-radio>
                        <el-radio label="四级"></el-radio>
                        <el-radio label="五级"></el-radio>
                        <el-radio label="六级"></el-radio>
                        <el-radio label="七级"></el-radio>
                      </el-radio-group>                      
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="15">
                    <el-form-item label="禁忌">
                      <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 6}"
                          placeholder="请输入内容"
                          v-model="addTourRecordForm.taboos">
                        </el-input>
                    </el-form-item>                    
                  </el-col>
                </el-row>              
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="addTourRecordVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddSubmit">提 交</el-button>
              </div>              
            </el-dialog>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="primary" plain size="small">修改</el-button>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button type="danger" plain size="small">删除</el-button>
          </el-col>                    
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <el-form :inline="true" label-position="left" :model="tourRecordForm" label-width="60px">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="楼层">
                        <el-select v-model="tourRecordForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="房间号">
                        <el-select v-model="tourRecordForm.roomNo" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="姓名">
                        <el-input v-model="tourRecordForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="床号">
                        <el-input v-model="tourRecordForm.roomNo" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary">查询</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResults" height="250" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="storeyNo" label="楼层" fixed>
                  </el-table-column>
                  <el-table-column prop="roomNo" label="房间号" fixed>
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" >
                  </el-table-column>
                  <el-table-column prop="taboos" label="禁忌"></el-table-column>
                  <el-table-column prop="caringLevel" label="护理等级">
                  </el-table-column>
                  <el-table-column prop="physician" label="主治医师">
                  </el-table-column>
                  <el-table-column prop="latestTime" label="最近时间">
                  </el-table-column>
                  <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>                            
                </el-table>                
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>  
</template>

<script>
export default {
  data() {
    return {
        tourRecordForm: {
          storeyNo: "",
          roomNo: "",
          bedNo: "",
          name: ""
        },
        storeys: [{
            value: "选项1",
            label: "1楼"
          },
          {
            value: "选项2",
            label: "2楼"
          },
          {
            value: "选项3",
            label: "3楼"
          },
          {
            value: "选项4",
            label: "4楼"
          }
        ],
        roomNos: [],
        searchResults: [],
        addTourRecordFormVisible: false,
        addTourRecordForm: [],
        upadateTourRecordFormVisible: false,

    }
  },
  methods: {
    handleDeletion: function() {

    },
    handleAddSubmit: function() {

    },
  }
}
</script>

<style scoped> 

</style>

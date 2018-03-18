<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            翻身记录
          </el-col>
          <el-col :span="1" :offset="6">
            <el-button type="success" plain size="small">打印</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div slot="header">
                <el-form :inline="true" label-position="left" :model="turnOverForm" label-width="100px">
                  <el-row>
                    <el-col :span="9">
                      <el-form-item label="楼层">
                        <el-select v-model="turnOverForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-form-item label="日期">
                      <el-col :span="10">
                      <el-input v-model="turnOverForm.statrTime" size="small"></el-input>
                      </el-col>
                      <el-col :span="1"> - </el-col>
                      <el-col :span="10">
                        <el-input v-model="turnOverForm.endTime" size="small"></el-input>
                      </el-col>                      
                    </el-form-item> 
                    <el-form-item>
                      <el-col :span="3">
                        <el-tooltip placement="top">
                          <div slot="content">
                            <h3>备注：</h3>
                            <p>剃胡须: ★</p>
                            <p>剪指（趾）甲：▲</p>
                            <p>口腔：●</p>
                          </div>
                          <el-button size="small" type="primary">查询</el-button>
                        </el-tooltip>
                      </el-col>                     
                    </el-form-item>               
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResult" height="250" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="date" label="日期" fixed>
                  </el-table-column>
                  <el-table-column prop="time" label="翻身时间" fixed>
                  </el-table-column>  
                  <el-table-column label="卧位">
                    <el-table-column prop="position" label="左">
                    </el-table-column>
                    <el-table-column prop="position" label="右">
                    </el-table-column>
                    <el-table-column prop="position" label="平">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="皮肤状况">
                    <el-table-column prop="skinStatus" label="正常"></el-table-column>
                    <el-table-column prop="skinStatus" label="发红"></el-table-column>
                    <el-table-column prop="skinStatus" label="表皮破损"></el-table-column>
                    <el-table-column prop="skinStatus" label="溃烂"></el-table-column>
                  </el-table-column>                                                
                  <el-table-column label="签名" prop="sig"></el-table-column>                            
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
      turnOverForm: {
        storeyNo: "",
        startTime: "",
        endTime: "",
      },
      storeys: [
        {
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
      searchResult: [{
        id: "",
        name: "",
        date: "",
        time: "",
        position: "",
        skinStatus: "",
        sig: ""
      }]
    };
  },
  methods: {}
};
</script>

<style scoped>

</style>
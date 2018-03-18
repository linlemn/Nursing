<template>
  <div>
    <el-container>
      <el-header class="sub-header">
        <el-row>
          <el-col :span="6" :offset="9">
            个人卫生
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
                <el-form :inline="true" label-position="top" :model="personalHygieneForm" label-width="70px">
                  <el-row>
                    <el-col :span="4">
                      <el-form-item label="楼层">
                        <el-select v-model="personalHygieneForm.storeyNo" placeholder="请选择" size="small">
                          <el-option v-for="item in storeys" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="房间号">
                        <el-select v-model="personalHygieneForm.roomNo" placeholder="请选择" size="small">
                          <el-option v-for="item in roomNos" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="姓名">
                        <el-input v-model="personalHygieneForm.name" size="small" placeholder="输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="时间">
                        <el-input v-model="personalHygieneForm.date" size="small" placeholder="输入时间"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="床号">
                        <el-input v-model="personalHygieneForm.roomNo" size="small" placeholder="输入床号"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4" :offset="9">
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
                  </el-row>
                </el-form>
              </div>
              <div>
                <el-table :data="searchResult" height="250" border style="width: 100%">
                  <el-table-column prop="id" label="序号" fixed>
                  </el-table-column>
                  <el-table-column prop="name" label="姓名" fixed>
                  </el-table-column>
                  <el-table-column prop="gender" label="性别" fixed>
                  </el-table-column>
                  <el-table-column prop="dates0" label="1">
                  </el-table-column>
                  <el-table-column prop="dates1" label="2">
                  </el-table-column>
                  <el-table-column prop="dates2" label="3">
                  </el-table-column>
                  <el-table-column prop="dates3" label="4">
                  </el-table-column>
                  <el-table-column prop="dates4" label="5">
                  </el-table-column>
                  <el-table-column prop="dates5" label="6">
                  </el-table-column>
                  <el-table-column prop="dates6" label="7">
                  </el-table-column>
                  <el-table-column prop="dates7" label="8">
                  </el-table-column>
                  <el-table-column prop="dates8" label="9">
                  </el-table-column>
                  <el-table-column prop="dates9" label="10">
                  </el-table-column>
                  <el-table-column prop="dates10" label="11">
                  </el-table-column>
                  <el-table-column prop="dates11" label="12">
                  </el-table-column>
                  <el-table-column prop="dates12" label="13">
                  </el-table-column>
                  <el-table-column prop="dates13" label="14">
                  </el-table-column>
                  <el-table-column prop="dates14" label="15">
                  </el-table-column>
                  <el-table-column prop="dates15" label="16">
                  </el-table-column>
                  <el-table-column prop="dates16" label="17">
                  </el-table-column>
                  <el-table-column prop="dates17" label="18">
                  </el-table-column>
                  <el-table-column prop="dates18" label="19">
                  </el-table-column>
                  <el-table-column prop="dates19" label="20">
                  </el-table-column>
                  <el-table-column prop="dates20" label="21">
                  </el-table-column>
                  <el-table-column prop="dates21" label="22">
                  </el-table-column>
                  <el-table-column prop="dates22" label="23">
                  </el-table-column>
                  <el-table-column prop="dates23" label="24">
                  </el-table-column>
                  <el-table-column prop="dates24" label="25">
                  </el-table-column>
                  <el-table-column prop="dates25" label="26">
                  </el-table-column>
                  <el-table-column prop="dates26" label="27">
                  </el-table-column>
                  <el-table-column prop="dates27" label="28">
                  </el-table-column>
                  <el-table-column prop="dates28" label="29">
                  </el-table-column>
                  <el-table-column prop="dates29" label="30">
                  </el-table-column>
                  <el-table-column prop="dates30" label="31">
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
      personalHygieneForm: {
        storeyNo: "",
        roomNo: "",
        name: "",
        date: "",
        bedNo: ""
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
      roomNos: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "102"
        },
        {
          value: "选项3",
          label: "103"
        },
        {
          value: "选项4",
          label: "104"
        },
        {
          value: "选项5",
          label: "105"
        },
        {
          value: "选项6",
          label: "106"
        },
        {
          value: "选项7",
          label: "107"
        }
      ],
      searchResult: [{
        order: "",
        name: "",
        dates0: "",
        dates1: "",
        dates2: "",
        dates3: "",
        dates4: "",
        dates5: "",
        dates6: "",
        dates7: "",
        dates8: "",
        dates9: "",
        dates10: "",
        dates11: "",
        dates12: "",
        dates13: "",
        dates14: "",
        dates15: "",
        dates16: "",
        dates17: "",
        dates18: "",
        dates19: "",
        dates20: "",
        dates21: "",
        dates22: "",
        dates23: "",
        dates24: "",
        dates25: "",
        dates26: "",
        dates27: "",
        dates28: "",
        dates29: "",
        dates30: ""
      }]
    };
  },
  methods: {}
};
</script>

<style scoped>

</style>
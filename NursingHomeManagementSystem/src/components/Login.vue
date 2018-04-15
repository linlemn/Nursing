<template>
  <div>
    <el-row>
      <el-col :span="15" :offset="5">
        <el-card class="box-card">
          <div slot="header">
            <h1 class="login-header">陈娟英敬老院管理系统</h1>
            <h1 class="login-header" style="font-size: 36px; font-weight: 100; font-family: Helvetica Neue; margin-top:-10px; margin-bottom: 20px;">登录</h1>
          </div>
          <div style="margin-top:50px;margin-bottom:50px;">
            <el-form label-position="left" :model="loginForm" label-width="100px">
              <el-row>
                <el-col :span="12" :offset="5">
                  <el-form-item label="用户名：">
                    <el-input prefix-icon="el-icon-service" v-model="loginForm.username">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" :offset="5">
                  <el-form-item label="密码：">
                    <el-input prefix-icon="el-icon-view" v-model="loginForm.password" type="password">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5" :offset="10">
                  <el-button type="primary" @click="login">登录</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          username: "",
          password: ""
        },
        
      }
    },
    methods: {
      login: function() {
        this.$router.push("/UserAssesment")
      }
    }
  }
</script>

<style scoped>
  .login-header {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    color: #424242;
    text-align: center;
    font-size: 64px;
  }
  
</style>
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
            <el-form label-position="left" :model="loginForm" label-width="100px" ref="login">
              <el-row>
                <el-col :span="12" :offset="5">
                  <el-form-item label="用户名：" prop='username' :rules="[{ required: true, message: '用户名不能为空', trigger: 'change'}]">
                    <el-input prefix-icon="el-icon-service" v-model="loginForm.username">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" :offset="5">
                  <el-form-item label="密码：" prop='password' :rules="[{ required: true, message: '密码不能为空', trigger: 'change'}]">
                    <el-input prefix-icon="el-icon-view" v-model="loginForm.password" type="password" @keyup.enter.native="login">
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
  import {
    generateRoutes
  } from '../router'
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
        //删除之前的cookie
        var time = new Date()
        time.setTime(time.getTime() - 10000)
        document.cookie = "token=balabala; role=admin;expires=" + time.toGMTString();
        let self = this
        var url = this.urlHeader + '/statistics/login'
        this.$refs['login'].validate((valid) => {
          if (valid) {
            //发送修改请求
            $.ajax({
              url: url,
              type: 'post',
              crossDomain: true,
              contentType: 'application/json;charset=UTF-8',
              data: JSON.stringify({
                userName: self.loginForm.username,
                password: self.loginForm.password
              }),
              success: function(data) {
                //登录成功之后存储token和role到cookie中
                document.cookie = 'role=' + data.data.role
                //动态生成路由
                self.formRoute()
                console.log(data)
              },
              error: function(err) {
                self.$alert('请求数据失败，请检查网络', '失败', {
                  confirmButtonText: '确定'
                });
                console.log(err)
              },
            })
          } else {
            self.$alert('登录失败', '失败', {
              confirmButtonText: '确定'
            });
            return false;
          }
        });
      },
      formRoute() {
        if (document.cookie) { // 判断是否有token，有token就是登陆过了
          const arr = document.cookie.split(';')
          console.log(document.cookie)
          var roles = ''
          //找到role
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf('role') >= 0) {
              console.log(arr[i])
              roles = arr[i].split('=')[1]
              break
            }
          }
          generateRoutes([roles])
          this.$router.push('/UserAssesment')
        } else { //没有token需要登录
          this.$router.push('/')
          // next('/'); // 否则全部重定向到登录页
        }
      }
    },
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
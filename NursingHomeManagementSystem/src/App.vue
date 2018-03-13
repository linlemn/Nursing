<template>
  <div id="app">
    <el-container>
      <el-header id="header">陈娟英敬老院</el-header>
      <el-row class="tac">
        <el-container>
          <el-aside :span="8">
            <el-menu default-active="1" style="text-align:left" unique-opened router>
              <el-menu-item :index="getRoutes(0)">
                <i class="el-icon-location"></i>
                <span slot="title">综合信息</span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>行政管理</span>
                 </template>
                <el-menu-item :index="getRoutes(1)">员工管理</el-menu-item>
                <el-menu-item :index="getRoutes(2)">捐赠管理</el-menu-item>
                <el-menu-item :index="getRoutes(3)">差错登记</el-menu-item>
                <el-menu-item :index="getRoutes(4)">行政查房记录</el-menu-item>
                <el-menu-item :index="getRoutes(5)">行政总值班记录</el-menu-item>
                <el-menu-item :index="getRoutes(6)">意见箱开箱记录</el-menu-item>
                <el-menu-item :index="getRoutes(7)">服务投诉记录</el-menu-item>
              </el-submenu >
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>业务管理</span>
                </template>
                <el-menu-item :index="getRoutes(8)">入院登记</el-menu-item>
                <el-menu-item :index="getRoutes(9)">入住申请</el-menu-item>
                <el-menu-item :index="getRoutes(10)">入住审批</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>护理管理</span>
                </template>
                <el-menu-item :index="getRoutes(11)">个人卫生</el-menu-item>
                <el-menu-item :index="getRoutes(12)">沐浴记录</el-menu-item>
                <el-menu-item :index="getRoutes(13)">翻身记录</el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>医务管理</span>
                </template>
                <el-menu-item :index="getRoutes(14)">老人信息管理</el-menu-item>
                <el-menu-item :index="getRoutes(15)">住院病案管理</el-menu-item>
                <el-menu-item :index="getRoutes(16)">病史记录管理</el-menu-item>
                <el-menu-item :index="getRoutes(17)">日常检查管理</el-menu-item>
                <el-menu-item :index="getRoutes(18)">日常巡查管理</el-menu-item>
                <el-menu-item :index="getRoutes(19)">巡房记录</el-menu-item>
                <el-menu-item :index="getRoutes(20)">药品出入管理</el-menu-item>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>后勤管理</span>
                </template>
                <!-- <el-menu-item :index="getRoutes()">健康证及每日晨检</el-menu-item>
                <el-menu-item :index="getRoutes()">食品留样记录</el-menu-item>
                <el-menu-item :index="getRoutes()">食品质量验收</el-menu-item>
                <el-menu-item :index="getRoutes()">食堂安全自检</el-menu-item>
                <el-menu-item :index="getRoutes()">楼面餐具消毒记录</el-menu-item>
                <el-menu-item :index="getRoutes()">食堂餐具消毒记录</el-menu-item>
                <el-menu-item :index="getRoutes()">食品验收管理</el-menu-item> -->
              </el-submenu>
              <el-submenu index="7">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>系统信息管理</span>
                </template>
                <el-menu-item :index="getRoutes(21)">角色管理</el-menu-item>
                <el-menu-item :index="getRoutes(22)">部门管理</el-menu-item>
                <el-menu-item :index="getRoutes(23)">床位信息管理</el-menu-item>
                <el-menu-item :index="getRoutes(24)">护工管理床位</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main :span="16">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import router from './router'
export default {
    data: function() {
      return {
        
      }
    },
    methods: {
      //获取路径名称
      getRoutes(index) {
        return router.options.routes[index].path
      }
    },
    mounted: function() {

    }
};
</script>

<style>
  #app {
    font-family: Helvetica, sans-serif;
    text-align: center;
  }
  #header {
    color: #616161;
    font-size: 24px;
    font-family: Helvetica Neue, sans-serif;
    font-weight: 900;
    text-align: left;
  }
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>

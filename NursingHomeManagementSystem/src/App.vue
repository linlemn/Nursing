<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import router from './router'
  export default {
    data: function() {
      return {}
    },
    methods: {
      //获取路径名称
      getRoutes(index) {
        return router.options.routes[index].path
      }
    },
  };
</script>

<style scoped>
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

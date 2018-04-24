<template>
    <div>
        <el-container>
            <el-header id="header">陈娟英敬老院
            </el-header>
            <el-container>
                <el-aside :span="8">
                    <el-menu :default-active="$route.path" style="text-align:left" unique-opened router>
                        <el-menu-item  index="/Overview" v-if="menuItem['Overview']">
                            <i class="el-icon-view"></i>
                            <span slot="title">综合信息</span>
                        </el-menu-item>
                        <el-submenu index="2" v-if="menuItem['AdministrativeManagement']">
                            <div slot="title">
                                <i class="el-icon-document"></i>
                                <span>行政管理</span>
                            </div>
                            <el-menu-item  index="/AdministrativeManagement/Employee">员工管理</el-menu-item>
                            <el-menu-item  index="/AdministrativeManagement/Donation">捐赠管理</el-menu-item>
                            <el-menu-item  index="/AdministrativeManagement/Error" >差错登记</el-menu-item>
                            <el-menu-item  index="/AdministrativeManagement/Rounds" >行政查房记录</el-menu-item>
                            <el-menu-item  index="/AdministrativeManagement/Duty" >行政总值班记录</el-menu-item>
                            <el-menu-item  index="/AdministrativeManagement/Suggestion" >意见箱开箱记录</el-menu-item>
                            <el-menu-item  index="/AdministrativeManagement/Complaints" >服务投诉记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3" v-if="menuItem['BusinessManagement']">
                            <div slot="title">
                                <i class="el-icon-edit-outline"></i>
                                <span>业务管理</span>
                            </div>
                            <el-menu-item  index="/BusinessManagement/Registration" >入院登记</el-menu-item>
                            <el-menu-item  index="/BusinessManagement/Application">入住申请</el-menu-item>
                            <el-menu-item  index="/BusinessManagement/Approval" >入住审批</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4" v-if="menuItem['NursingManagement']">
                            <div slot="title">
                                <i class="el-icon-bell"></i>
                                <span>护理管理</span>
                            </div>
                            <el-menu-item  index="/NursingManagement/Bathing" >个人卫生</el-menu-item>
                            <el-menu-item  index="/NursingManagement/PersonalHygiene" >沐浴记录</el-menu-item>
                            <el-menu-item  index="/NursingManagement/TurnOver" >翻身记录</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5" v-if="menuItem['MedicalManagement']">
                            <div slot="title">
                                <i class="el-icon-date"></i>
                                <span>医务管理</span>
                            </div>
                            <el-menu-item  index="/MedicalManagement/ElderlyInfo" >老人信息管理</el-menu-item>
                            <el-menu-item  index="/MedicalManagement/MedicalRecord" >住院病案管理</el-menu-item>
                            <el-menu-item  index="/MedicalManagement/MedicalHistory" >病史记录管理</el-menu-item>
                            <el-menu-item  index="/MedicalManagement/DailyCheck">日常检查管理</el-menu-item>
                            <el-menu-item  index="/MedicalManagement/DailyInspection" >日常巡查管理</el-menu-item>
                            <el-menu-item  index="/MedicalManagement/TourRecord" >巡房记录</el-menu-item>
                            <el-menu-item  index="/MedicalManagement/MedicineRecord" >药品出入管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6" v-if="menuItem['LogisiticsManagement']">
                            <div slot="title">
                                <i class="el-icon-news"></i>
                                <span>后勤管理</span>
                            </div>
                            <!-- <el-menu-item  index= >健康证及每日晨检</el-menu-item>
                                                <el-menu-item  index= >食品留样记录</el-menu-item>
                                                <el-menu-item  index= >食品质量验收</el-menu-item>
                                                <el-menu-item  index= >食堂安全自检</el-menu-item>
                                                <el-menu-item  index= >楼面餐具消毒记录</el-menu-item>
                                                <el-menu-item  index= >食堂餐具消毒记录</el-menu-item>
                                                <el-menu-item  index= >食品验收管理</el-menu-item> -->
                        </el-submenu>
                        <el-submenu index="7" v-if="menuItem['SystemInfo']">
                            <div slot="title">
                                <i class="el-icon-edit"></i>
                                <span>系统信息管理</span>
                            </div>
                            <el-menu-item  index="/SystemInfo/Role" >角色管理</el-menu-item>
                            <el-menu-item  index="/SystemInfo/Department" >部门管理</el-menu-item>
                            <el-menu-item  index="/SystemInfo/BedInfoManagment" >床位信息管理</el-menu-item>
                            <el-menu-item  index="/SystemInfo/CarerOfBedManagement" >护工管理床位</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main :span="16">
                    <router-view name="main"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import router from '../router'
    const adminRoute = "/AdministrativeManagement"
    const businessRoute = "/BusinessManagement"
    const medicalRoute = "/MedicalManagement"
    const nursingRoute = "/NursingManagement"
    const systemInfoRoute = "/SystemInfo"
    export default {
        data() {
            return {
                menuItem: {},
                index: 0,
            }
        },
        methods: {
            //获取路径名称
            getRoutes() {
                console.log(this.index)
                var child = this.$router.options.routes[2].children[this.index]
                if (child) {
                    var path = child.path
                    this.index += 1
                    return path
                }
                // console.log(this.index, this.$router.options.routes[2].children[this.index].path)
            }
        },
        created() {
            console.log(this.$router)
            var items = this.$router.options.routes[2].children
            //生成menuitem
            for (var item in items) {
                var arr = items[item].path.split('/')
                if (!this.menuItem[arr[1]]) {
                    this.menuItem[arr[1]] = true
                }
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

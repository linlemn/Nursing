import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
//行政管理组件
import complaints from "./components/AdministrativeManagement/Complaints.vue";
import donation from "./components/AdministrativeManagement/Donation.vue";
import duty from "./components/AdministrativeManagement/Duty.vue";
import employee from "./components/AdministrativeManagement/Employee.vue";
import error from "./components/AdministrativeManagement/Error.vue";
import rounds from "./components/AdministrativeManagement/Rounds.vue";
import suggestion from "./components/AdministrativeManagement/Suggestion.vue";
//业务管理组件
import application from "./components/BusinessManagement/Application.vue";
import approval from "./components/BusinessManagement/Approval.vue";
import registration from "./components/BusinessManagement/Registration.vue";
//医务管理组件
import dailyCheck from "./components/MedicalManagement/DailyCheck.vue";
import dailyInspection from "./components/MedicalManagement/DailyInspection.vue";
import elderlyInfo from "./components/MedicalManagement/ElderlyInfo.vue";
import medicalHistory from "./components/MedicalManagement/MedicalHistory.vue";
import medicalRecord from "./components/MedicalManagement/MedicalRecord.vue";
import medicineRecord from "./components/MedicalManagement/MedicineRecord.vue";
import tourRecord from "./components/MedicalManagement/TourRecord.vue";
//护理管理组件
import bathing from "./components/NursingManagement/Bathing.vue";
import personalHygiene from "./components/NursingManagement/PersonalHygiene.vue";
import turnOver from "./components/NursingManagement/TurnOver.vue";
//总览组件
import overview from "./components/Overview.vue";
//系统信息管理组件
import bedInfoManagment from "./components/SystemInfoManagement/BedInfoManagment.vue";
import carerOfBedManagement from "./components/SystemInfoManagement/CarerOfBedManagement.vue";
import department from "./components/SystemInfoManagement/Department.vue";
import role from "./components/SystemInfoManagement/role.vue";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const adminRoute = "/AdministrativeManagement"
const businessRoute = "/BusinessManagement"
const medicalRoute = "/MedicalManagement"
const nursingRoute = "/NursingManagement"
const systemInfoRoute = "/SystemInfo"

//按app.vue中顺序排列
const routes = [{
        path: "/Overview",
        component: overview
    },
    {
        path: adminRoute + "/Employee",
        component: employee
    },
    {
        path: adminRoute + "/Donation",
        component: donation
    },
    {
        path: adminRoute + "/Error",
        component: error
    },
    {
        path: adminRoute + "/Rounds",
        component: rounds
    },
    {
        path: adminRoute + "/Duty",
        component: duty
    },
    {
        path: adminRoute + "/Suggestion",
        component: suggestion
    },
    {
        path: adminRoute + "/Complaints",
        component: complaints
    },
    {
        path: businessRoute + "/Registration",
        component: registration
    },
    {
        path: businessRoute + "/Application",
        component: application
    },
    {
        path: businessRoute + "/Approval",
        component: approval
    },
    {
        path: nursingRoute + "/Bathing",
        component: bathing
    },
    {
        path: nursingRoute + "/PersonalHygiene",
        component: personalHygiene
    },
    {
        path: nursingRoute + "/TurnOver",
        component: turnOver
    },
    {
        path: medicalRoute + "/ElderlyInfo",
        component: elderlyInfo
    },
    {
        path: medicalRoute + "/MedicineRecord",
        component: medicalRecord
    },
    {
        path: medicalRoute + "/MedicalHistory",
        component: medicalHistory
    },
    {
        path: medicalRoute + "/DailyCheck",
        component: dailyCheck
    },
    {
        path: medicalRoute + "/DailyInspection",
        component: dailyInspection
    },
    {
        path: medicalRoute + "/TourRecord",
        component: tourRecord
    },
    {
        path: medicalRoute + "/MedicineRecord",
        component: medicineRecord
    },
    {
        path: systemInfoRoute + "/Role",
        component: role
    },
    {
        path: systemInfoRoute + "/Department",
        component: department
    },
    {
        path: systemInfoRoute + "/BedInfoManagment",
        component: bedInfoManagment
    },
    {
        path: systemInfoRoute + "/CarerOfBedManagement",
        component: carerOfBedManagement
    },
    // 重定向
    {
        path: '/',
        redirect: '/Overview'
    }
]

var router = new VueRouter({
    routes
})

export default router;
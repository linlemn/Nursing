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
import login from "./components/Login.vue";
import userAssesment from './components/UserAssesment.vue';
//系统信息管理组件
import bedInfoManagment from "./components/SystemInfoManagement/BedInfoManagment.vue";
import carerOfBedManagement from "./components/SystemInfoManagement/CarerOfBedManagement.vue";
import department from "./components/SystemInfoManagement/Department.vue";
import role from "./components/SystemInfoManagement/role.vue";
import floorManagement from './components/SystemInfoManagement/FloorAndRoomNoManagement.vue'


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const firstRoute = "/UserAssesment"

const adminRoute = "/AdministrativeManagement"
const businessRoute = "/BusinessManagement"
const medicalRoute = "/MedicalManagement"
const nursingRoute = "/NursingManagement"
const systemInfoRoute = "/SystemInfo"

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
const constantRouterMap = [
    // 重定向
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/Login',
        component: login,
    },
]

//异步挂载的路由
//动态需要根据权限加载的路由表 
// export const asyncRouterMap = [{
const asyncRouterMap = [
    // // 重定向
    // {
    //     path: '/UserAssesment',
    //     redirect: '/UserAssesment/Overview'
    // }, 
    {
        path: '/UserAssesment',
        component: userAssesment,
        children: [
            //总览
            {
                path: "/Overview",
                components: { main: overview },
                // meta: { role: ['admin', 'leader', 'staff'] }, //页面需要的权限
            },
            //行政管理
            {
                path: adminRoute + "/Employee",
                components: { main: employee },
                meta: { role: ['系统管理员', '负责人'] }, //页面需要的权限
            },
            {
                path: adminRoute + "/Donation",
                components: { main: donation },
                meta: { role: ['系统管理员', '负责人'] }, //页面需要的权限
            },
            {
                path: adminRoute + "/Error",
                components: { main: error },
                meta: { role: ['系统管理员', '负责人'] }, //页面需要的权限
            },
            {
                path: adminRoute + "/Rounds",
                components: { main: rounds },
                meta: { role: ['系统管理员', '负责人'] }, //页面需要的权限
            },
            {
                path: adminRoute + "/Duty",
                components: { main: duty },
                meta: { role: ['系统管理员', '负责人'] }, //页面需要的权限
            },
            {
                path: adminRoute + "/Suggestion",
                components: { main: suggestion },
                meta: { role: ['系统管理员', '负责人'] }, //页面需要的权限
            },
            {
                path: adminRoute + "/Complaints",
                components: { main: complaints },
                meta: { role: ['系统管理员', '负责人'] }, //页面需要的权限
            },
            //业务管理
            {
                path: businessRoute + "/Registration",
                components: { main: registration },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: businessRoute + "/Application",
                components: { main: application },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: businessRoute + "/Approval",
                components: { main: approval },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            //护理管理
            {
                path: nursingRoute + "/Bathing",
                components: { main: bathing },
                // meta: { role: ['admin', 'leader', 'staff'] }, //页面需要的权限
            },
            {
                path: nursingRoute + "/PersonalHygiene",
                components: { main: personalHygiene },
                // meta: { role: ['admin', 'leader', 'staff'] }, //页面需要的权限
            },
            {
                path: nursingRoute + "/TurnOver",
                components: { main: turnOver },
                // meta: { role: ['admin', 'leader', 'staff'] }, //页面需要的权限
            },
            //医务管理
            {
                path: medicalRoute + "/ElderlyInfo",
                components: { main: elderlyInfo },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: medicalRoute + "/MedicalRecord",
                components: { main: medicalRecord },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: medicalRoute + "/MedicalHistory",
                components: { main: medicalHistory },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: medicalRoute + "/DailyCheck",
                components: { main: dailyCheck },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: medicalRoute + "/DailyInspection",
                components: { main: dailyInspection },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: medicalRoute + "/TourRecord",
                components: { main: tourRecord },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: medicalRoute + "/MedicineRecord",
                components: { main: medicineRecord },
                meta: { role: ['系统管理员', '负责人', '职员'] }, //页面需要的权限
            },
            {
                path: systemInfoRoute + "/Role",
                components: { main: role },
                meta: { role: ['系统管理员'] }, //页面需要的权限
            },
            {
                path: systemInfoRoute + "/Department",
                components: { main: department },
                meta: { role: ['系统管理员'] }, //页面需要的权限
            },
            {
                path: systemInfoRoute + "/BedInfoManagment",
                components: { main: bedInfoManagment },
                meta: { role: ['系统管理员'] }, //页面需要的权限
            },
            {
                path: systemInfoRoute + "/CarerOfBedManagement",
                components: { main: carerOfBedManagement },
                meta: { role: ['系统管理员'] }, //页面需要的权限
            },
            {
                path: systemInfoRoute + "/FloorAndRoomNoManagement",
                components: { main: floorManagement },
                meta: { role: ['系统管理员'] }, //页面需要的权限
            },
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

//按app.vue中顺序排列
const routes = [
    // 重定向
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/Login',
        component: login
    },
    {
        path: '/UserAssesment',
        component: userAssesment,
        children: [{
                path: "/Overview",
                components: { main: overview }
            },
            {
                path: adminRoute + "/Employee",
                components: { main: employee }
            },
            {
                path: adminRoute + "/Donation",
                components: { main: donation }
            },
            {
                path: adminRoute + "/Error",
                components: { main: error }
            },
            {
                path: adminRoute + "/Rounds",
                components: { main: rounds }
            },
            {
                path: adminRoute + "/Duty",
                components: { main: duty }
            },
            {
                path: adminRoute + "/Suggestion",
                components: { main: suggestion }
            },
            {
                path: adminRoute + "/Complaints",
                components: { main: complaints }
            },
            {
                path: businessRoute + "/Registration",
                components: { main: registration }
            },
            {
                path: businessRoute + "/Application",
                components: { main: application }
            },
            {
                path: businessRoute + "/Approval",
                components: { main: approval }
            },
            {
                path: nursingRoute + "/Bathing",
                components: { main: bathing }
            },
            {
                path: nursingRoute + "/PersonalHygiene",
                components: { main: personalHygiene }
            },
            {
                path: nursingRoute + "/TurnOver",
                components: { main: turnOver }
            },
            {
                path: medicalRoute + "/ElderlyInfo",
                components: { main: elderlyInfo }
            },
            {
                path: medicalRoute + "/MedicalRecord",
                components: { main: medicalRecord }
            },
            {
                path: medicalRoute + "/MedicalHistory",
                components: { main: medicalHistory }
            },
            {
                path: medicalRoute + "/DailyCheck",
                components: { main: dailyCheck }
            },
            {
                path: medicalRoute + "/DailyInspection",
                components: { main: dailyInspection }
            },
            {
                path: medicalRoute + "/TourRecord",
                components: { main: tourRecord }
            },
            {
                path: medicalRoute + "/MedicineRecord",
                components: { main: medicineRecord }
            },
            {
                path: systemInfoRoute + "/Role",
                components: { main: role }
            },
            {
                path: systemInfoRoute + "/Department",
                components: { main: department }
            },
            {
                path: systemInfoRoute + "/BedInfoManagment",
                components: { main: bedInfoManagment }
            },
            {
                path: systemInfoRoute + "/CarerOfBedManagement",
                components: { main: carerOfBedManagement }
            },
            {
                path: systemInfoRoute + "/FloorAndRoomNoManagement",
                components: { main: floorManagement }
            },
        ],
    },
]

var router = new VueRouter({
    routes: constantRouterMap,
})

// //路由钩子函数
// router.beforeEach((to, from, next) => {
//     if (document.cookie) { // 判断是否有token，有token就是登陆过了
//         if (from.path == '/Login') { //从登录来
//             console.log("!")
//             const arr = document.cookie.split(';')
//             var roles = ''
//                 //找到role
//             for (var i = 0; i < arr.length; i++) {
//                 if (arr[i].indexOf('role') >= 0) {
//                     roles = arr[i].split('=')[1]
//                     break
//                 }
//             }
//             generateRoutes([roles], next, to)
//                 // next(false)
//                 // console.log(router)
//                 // next({...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//         } else {
//             next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
//         }

//     } else { //没有token需要登录
//         console.log("!!!")
//         next('/'); // 否则全部重定向到登录页
//     }
// });

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.join('').indexOf(role) >= 0)
    } else {
        return true
    }
}

export function generateRoutes(data, next, to) {
    const roles = data;
    const accessedRouters = asyncRouterMap.filter(v => {
        if (roles.join('').indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
                v.children = v.children.filter(child => {
                    if (hasPermission(roles, child)) {
                        return child
                    }
                    return false;
                });
                return v
            } else {
                return v
            }
        }
        return false;
    });

    router.options.routes = router.options.routes.concat(accessedRouters)
    router.addRoutes(accessedRouters)
}



export default router;
<template>
    <div class="page">
        <el-container>
            <el-header>
                <el-row class="header-row">综合信息</el-row>
                <el-row :gutter=10 type="flex" justify="start" class="header-row">
                    <el-col :span="4">
                        <el-tag :key="totalBed"> 床位总数：{{totalBed}}</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <el-tag :key="totalElder">老人总数：{{totalElder}}</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <el-tag :key="elderFocusing">重点照料老人：{{elderFocusing}}</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <el-tag :key="elderLeaving">老人请假数：{{elderLeaving}}</el-tag>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row>
                    <el-col :span="12">
                        <div class="chart">
                            <i-echarts :option="careTypeOptions" :loading="careTypeLoading"></i-echarts>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chart">
                            <i-echarts :option="dietTypeOptions" :loading="dietTypeLoading"></i-echarts>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="chart">
                            <i-echarts :option="monthlyCareOptions" :loading="monthlyCareLoading"></i-echarts>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="chart">
                            <i-echarts :option="yearCareOptions" :loading="yearCareLoading"></i-echarts>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="chart">
                            <i-echarts :option="monthlyElderOptions" :loading="monthlyElderLoading"></i-echarts>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="chart">
                            <i-echarts :option="monthlyCarerOptions" :loading="monthlyCarerLoading"></i-echarts>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                totalBed: 0,
                totalElder: 0,
                elderFocusing: 0,
                elderLeaving: 0,
                careTypeOptions: {
                    title: {
                        text: '护理类型',
                        top: 'bottom',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} 人"
                    },
                    series: [{
                        name: '人数',
                        type: 'pie',
                        radius: '55%',
                        data: [{
                                value: 235,
                                name: '0级'
                            },
                            {
                                value: 274,
                                name: '1级'
                            },
                            {
                                value: 310,
                                name: '2级'
                            },
                            {
                                value: 335,
                                name: '3级'
                            },
                            {
                                value: 335,
                                name: '4级'
                            },
                            {
                                value: 335,
                                name: '5级'
                            },
                            {
                                value: 400,
                                name: '6级'
                            }
                        ]
                    }]
                },
                monthlyCareLoading: false,
                dietTypeOptions: {
                    title: {
                        text: '用餐类型',
                        top: 'bottom',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} 人"
                    },
                    series: [{
                        name: '人数',
                        type: 'pie',
                        radius: '55%',
                        data: [{
                                value: 235,
                                name: '普食'
                            },
                            {
                                value: 274,
                                name: '半流'
                            },
                            {
                                value: 310,
                                name: '流质'
                            },
                            {
                                value: 335,
                                name: '低糖低脂'
                            },
                            {
                                value: 335,
                                name: '营养餐'
                            },
                            {
                                value: 335,
                                name: '未选择'
                            }
                        ],
                    }],
                    color: ['rgb(224,128,49)', 'rgb(199,206,178)', 'rgb(25,148,117)', 'rgb(11,110,72)', 'rgb(4,77,34)', 'rgb(126,136,79)'],
                },
                dietTypeLoading: false,
                monthlyCareOptions: {
                    title: {
                        text: '本月护理情况',
                        top: 'bottom',
                        left: 'center',
                    },
                    xAxis: {
                        data: ['个人清洁', '擦洗沐浴', '排泄护理', '进食', '环境整洁', '翻身']
                    },
                    yAxis: {
                        axisLabel: {
                            formatter: '{value} 次'
                        }
                    },
                    series: [{
                        name: '次数',
                        type: 'bar',
                        // data: [5, 20, 36, 10, 10, 20, 15, 21, 13],
                        data: [{
                            name: '个人清洁',
                            value: 0
                        }, {
                            name: '擦洗沐浴',
                            value: 0
                        }, {
                            name: '排泄护理',
                            value: 0
                        }, {
                            name: '进食',
                            value: 0
                        }, {
                            name: '环境整洁',
                            value: 0
                        }, {
                            name: '翻身',
                            value: 0
                        }],
                        itemStyle: {
                            normal: {　　　　　　　　　　　　　　 //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                　　　　　　　　　　　　　　 //以下为是否显示，显示位置和显示格式的设置了
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}{c}次'
                                }
                            }
                        },
                    }],
                    tooltip: {
                        trigger: 'item',
                        formatter: '本月 {b} 共 {c} 次'
                    },
                    color: ['rgb(224,128,49)', 'rgb(199,206,178)', 'rgb(25,148,117)', 'rgb(11,110,72)', 'rgb(4,77,34)', 'rgb(126,136,79)'],
                },
                careTypeLoading: false,
                monthlyCarerOptions: {
                    title: {
                        text: '本月护工护理量Top10',
                        top: 'bottom',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "本月{b}共护理老人{c}次"
                    },
                    series: [{
                        name: '次数',
                        type: 'funnel',
                        data: [{
                            name: 'aa',
                            value: 10
                        }, {
                            name: 'bb',
                            value: 13
                        }, {
                            name: 'cc',
                            value: 22
                        }, {
                            name: 'dd',
                            value: 33
                        }, {
                            name: 'ee',
                            value: 55
                        }, ],
                    }],
                },
                monthlyElderLoading: false,
                yearCareLoading: false,
                yearCareOptions: {
                    title: {
                        text: '月度护理情况',
                        top: 'bottom',
                        left: 'center',
                    },
                    xAxis: {
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: {
                        axisLabel: {
                            formatter: '{value} 次'
                        }
                    },
                    series: [{
                        name: '次数',
                        type: 'line',
                        // data: [5, 20, 36, 10, 10, 20, 15, 21, 13, 15, 34, 44],
                        data: [{
                            name: '1月',
                            value: 0
                        }, {
                            name: '2月',
                            value: 0
                        }, {
                            name: '3月',
                            value: 0
                        }, {
                            name: '4月',
                            value: 0
                        }, {
                            name: '5月',
                            value: 0
                        }, {
                            name: '6月',
                            value: 0
                        }, {
                            name: '7月',
                            value: 0
                        }, {
                            name: '8月',
                            value: 0
                        }, {
                            name: '9月',
                            value: 0
                        }, {
                            name: '10月',
                            value: 0
                        }, {
                            name: '11月',
                            value: 0
                        }, {
                            name: '12月',
                            value: 0
                        }],
                        symbolSize: 15,
                    }],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}共护理老人{c}次'
                    },
                },
                monthlyElderOptions: {
                    title: {
                        text: '本月老人护理量Top10',
                        top: 'bottom',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "本月{b}老人共被护理{c}次"
                    },
                    series: [{
                        name: '次数',
                        type: 'funnel',
                        data: [{
                            name: 'aa',
                            value: 22
                        }, {
                            name: 'bb',
                            value: 14
                        }, {
                            name: 'cc',
                            value: 33
                        }, {
                            name: 'dd',
                            value: 24
                        }, {
                            name: 'ee',
                            value: 32
                        }, ],
                    }],
                },
                monthlyCarerLoading: false,
                test: '',
            }
        },
        methods: {
            sendFormalRequest(param, dataParam) {
                let self = this
                var url = 'http://101.132.142.238:12222/statistics/' + param
                //发送修改请求
                $.ajax({
                    url: url,
                    type: 'post',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        id: 1
                    }),
                    success: function(data) {
                        //解析返回的data
                        self[dataParam] = data.data.result
                        console.log(data)
                    },
                    error: function(err) {
                        self.$alert('请求数据失败，请检查网络', '失败', {
                            confirmButtonText: '确定'
                        });
                        console.log(err)
                    },
                })
            },
            sendSpecialRequest(param, dataParam) {
                let self = this
                var url = 'http://101.132.142.238:12222/statistics/' + param
                //发送修改请求
                $.ajax({
                    url: url,
                    type: 'post',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        id: 1
                    }),
                    success: function(data) {
                        //解析返回的data
                        var dict = data.data
                        var count = 0
                        for (var key in dict) {
                            self[dataParam].series[0].data[count].value = dict[key]
                            self[dataParam].series[0].data[count].name = key
                            count++
                        }
                        // console.log(self[dataParam].series[0].data)
                    },
                    error: function(err) {
                        self.$alert('请求数据失败，请检查网络', '失败', {
                            confirmButtonText: '确定'
                        });
                        console.log(err)
                    },
                })
            }
        },
        mounted: function() {
            //请求总的数据
            this.sendFormalRequest('bedSum', 'totalBed')
            this.sendFormalRequest('elderlySum', 'totalElder')
            this.sendFormalRequest('IntensiveCareSum', 'elderFocusing')
            this.sendFormalRequest('dayOffSum', 'elderLeaving')
            // 请求图表数据
            this.sendSpecialRequest('nurseType', 'careTypeOptions')
            this.sendSpecialRequest('foodType', 'dietTypeOptions')
            this.sendSpecialRequest('nurseCondition', 'monthlyCareOptions')
            this.sendSpecialRequest('elderlyNurseNum', 'monthlyElderOptions')
            this.sendSpecialRequest('monthNurseSum', 'test')
            this.sendSpecialRequest('nurserNurseNum', 'monthlyCarerOptions')
        }
    }
</script>

<style scoped>
    .header-row {
        margin-bottom: 20px;
    }
    .chart {
        height: 500px;
    }
</style>

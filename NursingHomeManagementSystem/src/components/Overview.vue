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
                        data: ['个人清洁', '擦洗沐浴', '排泄护理', '进食', '环境整洁', '翻身', '医务', '巡护', '其他']
                    },
                    yAxis: {
                        axisLabel: {
                            formatter: '{value} 次'
                        }
                    },
                    series: [{
                        name: '次数',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20, 15, 21, 13],
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
                        data: [5, 20, 36, 10, 10, 20, 15, 21, 13, 15, 34, 44],
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
            }
        },
        methods: {},
        mounted: function() {
            //请求总的数据
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

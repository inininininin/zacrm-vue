<template>
    <div class="groupLeaderIndex">
        组长页面
        <div id="main" style="width: 600px;height:400px;"></div>
        <div id="main2" style="width: 600px;height:400px;"></div>
        <div id="main3" style="width: 600px;height:400px;"></div>
        <div id="main4" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
export default {
    name:'groupLeaderIndex',
    data(){
        return{
            myChart:'',
            // line（折线图）、bar（柱状图）、pie（饼图）、scatter（散点图）、graph（关系图）、tree（树图）
        }
    },
    activated(){
        console.dir(this.$echarts)
        this.$echarts.init(document.getElementById('main')).setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                color: ['#37A2DA','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83'],
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["组员1","组员2","组员3","组员4","组员5","组员6"]
                },
                yAxis: {
                },
                label: {
                    show: true,
                    // 标签的文字。
                    formatter: ["组员1","组员2","组员3","组员4","组员5","组员6"]
                },
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        color: ['#c5cdd2'],
                        data: [1, 20, 136, 10, 10, 20]
                    },
                    {
                        type:'pie',
                        center:['80%',80],
                        radius:35,
                        data: [
                            {name:'组员1',value:1,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员2',value:20,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员3',value:136,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员4',value:10,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员5',value:10,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员6',value:20,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }}
                        ],
                        
                    }
                ]
            },);
        this.$echarts.init(document.getElementById('main2')).setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["组员1","组员2","组员3","组员4","组员5","组员6"]
                },
                yAxis: {
                },
                label: {
                    show: true,
                    // 标签的文字。
                    formatter: ["组员1","组员2","组员3","组员4","组员5","组员6"]
                },
                series: [
                    {
                        name: '销量',
                        type: 'line',
                        color: ['#37A2DA'],
                        data: [1, 20, 136, 10, 10, 20]
                    },
                    {
                        type:'pie',
                        center:['80%',80],
                        radius:35,
                        data: [
                            {name:'组员1',value:1,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员2',value:20,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员3',value:136,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员4',value:10,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员5',value:10,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }},
                            {name:'组员6',value:20,itemStyle: {
                                // 阴影的大小
                                shadowBlur: 200,
                                // 阴影水平方向上的偏移
                                shadowOffsetX: 0,
                                // 阴影垂直方向上的偏移
                                shadowOffsetY: 0,
                                // 阴影颜色
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                color: '#37A2DA'
                            }}
                        ],
                        
                    }
                ]
            },);

    },
    methods(){

    }
}
</script>>

<style scoped>

</style>
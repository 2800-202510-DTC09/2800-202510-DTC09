
// The code exmples on the Echart websites were used as reference to create these charts.
// Link: https://echarts.apache.org/examples/en/index.html

document.addEventListener('DOMContentLoaded', function() {
    const energyChart = echarts.init(document.getElementById('energyChart'));
    energyChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        yAxis: {
            type: 'value',
            name: 'kWh'
        },
        series: [{
            data: [320, 290, 280, 250, 240, 220, 210],
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#4F46E5',
                width: 3
            },
            itemStyle: {
                color: '#4F46E5'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(79, 70, 229, 0.3)' },
                    { offset: 1, color: 'rgba(79, 70, 229, 0.1)' }
                ])
            }
        }]
    });

    const waterChart = echarts.init(document.getElementById('waterChart'));
    waterChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            name: 'Liters'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            itemStyle: {
                color: function(params) {
                    const colorList = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
                    return colorList[params.dataIndex % colorList.length];
                }
            }
        }]
    });

    const carbonChart = echarts.init(document.getElementById('carbonChart'));
    carbonChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yAxis: {
            type: 'value',
            name: 'kg CO₂'
        },
        series: [{
            data: [12, 10, 9, 8],
            type: 'line',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                color: '#F59E0B',
                width: 3
            },
            itemStyle: {
                color: '#F59E0B',
                borderColor: '#fff',
                borderWidth: 2
            }
        }]
    });

    const pieChart = echarts.init(document.getElementById('pieChart'));
    pieChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['Energy', 'Water', 'Waste', 'Transport', 'Food']
        },
        series: [
            {
                name: 'Sustainability Breakdown',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 35, name: 'Energy', itemStyle: { color: '#4F46E5' } },
                    { value: 25, name: 'Water', itemStyle: { color: '#10B981' } },
                    { value: 20, name: 'Waste', itemStyle: { color: '#F59E0B' } },
                    { value: 15, name: 'Transport', itemStyle: { color: '#EF4444' } },
                    { value: 5, name: 'Food', itemStyle: { color: '#8B5CF6' } }
                ]
            }
        ]
    });

    window.addEventListener('resize', function() {
        energyChart.resize();
        waterChart.resize();
        carbonChart.resize();
        pieChart.resize();
    });
});

// The code exmples on the Echart websites were used as reference to create these charts.
// Link: https://echarts.apache.org/examples/en/index.html

document.addEventListener('DOMContentLoaded', function() {
    const monthlyChart = echarts.init(document.getElementById('monthlyChart'));
    monthlyChart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yAxis: {
            type: 'value',
            name: 'Points'
        },
        series: [{
            data: [280, 320, 400, 240],
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

    const categoryChart = echarts.init(document.getElementById('categoryChart'));
    categoryChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                name: 'Impact Areas',
                type: 'pie',
                radius: '70%',
                itemStyle: {
                    borderRadius: 5,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}: {d}%'
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
        monthlyChart.resize();
        categoryChart.resize();
    });
});
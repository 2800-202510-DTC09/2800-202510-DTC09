/*
 * The code exmples on the Echart websites were used as reference to create these charts.
 * Link: https://echarts.apache.org/examples/en/index.html
 */

async function fetchUsers() {
    let response;

    try {
        response = await fetch('/users');
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}

async function getUserRecord(data) {
    try {
        const response = await fetch(`/api/record?id=${data.user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const record = await response.json();
        console.log("Record:", record);
        return record;
    } catch (error) {
        console.error("Error fetching record:", error);
        return null;
    }
}




async function getData() {
    const data = await fetchUsers();
    return data;
}

function getMonthlyChartOption() {
    const option = {
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        },
        yAxis: {
            type: 'value',
            name: 'Points',
        },
        series: [
            {
                data: [280, 320, 400, 240],
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: '#4F46E5',
                    width: 3,
                },
                itemStyle: {
                    color: '#4F46E5',
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: 'rgba(79, 70, 229, 0.3)'},
                        {offset: 1, color: 'rgba(79, 70, 229, 0.1)'},
                    ]),
                },
            },
        ],
    };

    return option;
}

function getPieChartOption() {
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        series: [
            {
                name: 'Impact Areas',
                type: 'pie',
                radius: '70%',
                itemStyle: {
                    borderRadius: 5,
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    formatter: '{b}: {d}%',
                },
                data: [
                    {value: 35, name: 'Energy', itemStyle: {color: '#4F46E5'}},
                    {value: 25, name: 'Water', itemStyle: {color: '#10B981'}},
                    {value: 20, name: 'Waste', itemStyle: {color: '#F59E0B'}},
                    {
                        value: 15,
                        name: 'Transport',
                        itemStyle: {color: '#EF4444'},
                    },
                    {value: 5, name: 'Food', itemStyle: {color: '#8B5CF6'}},
                ],
            },
        ],
    };

    return option;
}

function loadGraphs() {
    const monthlyChart = echarts.init(document.getElementById('monthlyChart'));
    const categoryChart = echarts.init(document.getElementById('categoryChart'));
    categoryChart.setOption(getPieChartOption());
    monthlyChart.setOption(getMonthlyChartOption());
    
    window.addEventListener('resize', () => {
    monthlyChart.resize();
    categoryChart.resize();
    });
}

async function main() {
    document.addEventListener('DOMContentLoaded', () => {
        loadGraphs();
    });
    const data = await getData();
    const record = await getUserRecord(data);
    console.log(data);
    console.log(data.user.id);
    console.log(record);
};


main();
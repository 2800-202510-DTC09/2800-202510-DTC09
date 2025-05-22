/*
 * The code exmples on the Echart websites were used as reference to create these charts.
 * Link: https://echarts.apache.org/examples/en/index.html
 */
import {
    getDietEmissions,
    getElectricityEmissions,
    getHousingEmissions,
    getLifestyleEmissions,
    getVehicleEmissions,
    getWaterEmissions,
} from './calculateEmissions.js';

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
        console.error('Error fetching users:', error);
        return null;
    }
}

async function getData() {
    const data = await fetchUsers();
    return data;
}

async function getUserRecord() {
    const data = await getData();
    console.log(data.user.id)
    try {
        const response = await fetch(`/api/record/${data.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let record = await response.json();
        console.log("record", record)
        return record;
    } catch (error) {
        console.error('Error fetching record:', error);
        return null;
    }
}

async function getMonthlyChartData() {
    const data = await getData();
    const response = await fetch(`/api/monthly-data/?user=${data.user.id}`);
    let monthlyDataObject = await response.json();
    monthlyDataObject = monthlyDataObject[0]
    const monthlyData = monthlyDataObject.data.filter(e=>e.label === "Score").sort((a,b)=> new Date(b.date) -  new Date(a.date));
    console.log("Monthly Data", monthlyData);
    const dataPoints = [];
    
    if (monthlyData.length < 7) {
        return monthlyData;
    }
    
    for (let i = 0; i < 7; i++) {
        dataPoints.push(monthlyData[i]);
    }

    console.log(dataPoints);
    return dataPoints;
}

async function getPieChartData() {
    const userRecord = await getUserRecord();
    console.log("User record", userRecord)
    const chartData = {
        housingEmissions: Number(getHousingEmissions(userRecord)),
        vehicleEmissions: Number(getVehicleEmissions(userRecord)),
        waterEmissions: Number(getWaterEmissions(userRecord)),
        electricityEmissions: Number(getElectricityEmissions(userRecord)),
        dietEmissions: Number(getDietEmissions(userRecord)),
        lifestyleEmissions: Number(getLifestyleEmissions(userRecord)),
    };

        console.log(JSON.stringify(chartData));
    return chartData;
}

async function getMonthlyChartOption() {
    const monthlyDataPoints = await getMonthlyChartData();

    //Process Data Points
    const monthlyData = [];
    const months = [];
    monthlyDataPoints.forEach((e)=>{
        const eDate = new Date(e.date);
        monthlyData.push(e.value);
        months.push(eDate.toLocaleString('default', {month: 'short'}));
    })

    const option = {
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: months,
        },
        yAxis: {
            type: 'value',
            name: 'Points',
        },
        series: [
            {
                data: monthlyData,
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

async function getPieChartOption() {
    const chartData = await getPieChartData();
    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            show: false,
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: chartData.housingEmissions, name: 'Housing'},
                    {value: chartData.vehicleEmissions, name: 'Vehicle'},
                    {value: chartData.electricityEmissions, name: 'Electricity'},
                    {value: chartData.dietEmissions, name: 'Diet'},
                    {value: chartData.lifestyleEmissions, name: 'Lifestyle'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return option;
}

async function loadGraphs() {
    const monthlyChart = echarts.init(document.getElementById('monthlyChart'));
    const categoryChart = echarts.init(document.getElementById('categoryChart'));
    categoryChart.setOption(await getPieChartOption());
    monthlyChart.setOption(await getMonthlyChartOption());

    window.addEventListener('resize', () => {
        monthlyChart.resize();
        categoryChart.resize();
    });
}

function main() {
    document.addEventListener('DOMContentLoaded', () => {
        loadGraphs();
    });
}

main();

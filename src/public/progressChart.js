/*
 * The code examples on the Echart websites were used as reference to create these charts.
 * Link: https://echarts.apache.org/examples/en/index.html
 */

import {
    getAllEmissions,
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

        const record = await response.json();
        return record;
    } catch (error) {
        console.error('Error fetching record:', error);
        return null;
    }
}

async function getEnergyChartData() {
    const data = await getData();
    const response = await fetch(`/api/monthly-data/?user=${data.user.id}`);
    let monthlyDataObject = await response.json();
    monthlyDataObject = monthlyDataObject[0]
    const monthlyData = monthlyDataObject.data.filter(e=>e.label === "Electricity").sort((a,b)=> new Date(b.date) -  new Date(a.date));
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

async function getWaterChartData() {
    const data = await getData();
    const response = await fetch(`/api/monthly-data/?user=${data.user.id}`);
    let monthlyDataObject = await response.json();
    monthlyDataObject = monthlyDataObject[0]
    const monthlyData = monthlyDataObject.data.filter(e=>e.label === "Water").sort((a,b)=> new Date(b.date) -  new Date(a.date));
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

async function getCarbonFootprintChartData() {
    const data = await getData();
    const response = await fetch(`/api/monthly-data/?user=${data.user.id}`);
    let monthlyDataObject = await response.json();
    monthlyDataObject = monthlyDataObject[0]
    const monthlyData = monthlyDataObject.data.filter(e=>e.label === "Emissions").sort((a,b)=> new Date(b.date) -  new Date(a.date));
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

async function getEmissionsChartData() {
    const userRecord = await getUserRecord();
    const chartData = {
        housingEmissions: Number(getHousingEmissions(userRecord)),
        vehicleEmissions: Number(getVehicleEmissions(userRecord)),
        waterEmissions: Number(getWaterEmissions(userRecord)),
        electricityEmissions: Number(getElectricityEmissions(userRecord)),
        dietEmissions: Number(getDietEmissions(userRecord)),
        lifestyleEmissions: Number(getLifestyleEmissions(userRecord)),
        totalEmissions: Number(getAllEmissions(userRecord)),
    };

    return chartData;
}

async function getEnergyChartOption() {
    const energyChartData = await getEnergyChartData();

    //Process Data Points
    const monthlyData = [];
    const months = [];
    energyChartData.forEach((e)=>{
        const eDate = new Date(e.date);
        monthlyData.push(e.value);
        months.push(eDate.toLocaleString('default', {month: 'short'}));
    });
    months.reverse();
    monthlyData.reverse();
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
            name: 'kWh',
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

async function getWaterChartOption() {
    const waterChartData = await getWaterChartData();

    //Process Data Points
    const monthlyData = [];
    const months = [];
    waterChartData.forEach((e)=>{
        const eDate = new Date(e.date);
        monthlyData.push(e.value);
        months.push(eDate.toLocaleString('default', {month: 'short'}));
    });
    months.reverse();
    monthlyData.reverse();
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            data: months,
        },
        yAxis: {
            type: 'value',
            name: 'Liters',
        },
        series: [
            {
                data: monthlyData,
                type: 'bar',
                itemStyle: {
                    color(params) {
                        const colorList = [
                            '#10B981',
                            '#34D399',
                            '#6EE7B7',
                            '#A7F3D0',
                        ];
                        return colorList[params.dataIndex % colorList.length];
                    },
                },
            },
        ],
    };

    return option;
}

async function getCarbonFootprintChartOption() {
    const carbonFootprintChartData = await getCarbonFootprintChartData();

    //Process Data Points
    const monthlyData = [];
    const months = [];
    carbonFootprintChartData.forEach((e)=>{
        const eDate = new Date(e.date);
        monthlyData.push(e.value);
        months.push(eDate.toLocaleString('default', {month: 'short'}));
    });
    months.reverse();
    monthlyData.reverse();
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
            name: 'kg CO₂',
        },
        series: [
            {
                data: monthlyData,
                type: 'line',
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    color: '#F59E0B',
                    width: 3,
                },
                itemStyle: {
                    color: '#F59E0B',
                    borderColor: '#fff',
                    borderWidth: 2,
                },
            },
        ],
    };

    return option;
}

async function getEmissionsChartOption() {
    const emissionsChartData = await getEmissionsChartData();
    console.log("Emission chart data:", emissionsChartData);
    const option = {
        dataset: {
            source: [
                ['emissions', 'kgCO2', 'category'],
                [emissionsChartData.housingEmissions, emissionsChartData.housingEmissions, 'Housing'],
                [emissionsChartData.vehicleEmissions, emissionsChartData.vehicleEmissions, 'Vehicles'],
                [emissionsChartData.electricityEmissions, emissionsChartData.electricityEmissions, 'Electricity'],
                [emissionsChartData.dietEmissions, emissionsChartData.dietEmissions, 'Diet'],
                [emissionsChartData.lifestyleEmissions, emissionsChartData.lifestyleEmissions, 'Lifestyle'],
            ],
        },
        grid: {containLabel: true},
        xAxis: {name: 'kgCO2'},
        yAxis: {type: 'category'},
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 0,
            max: emissionsChartData.totalEmissions,
            text: ['High Contribution', 'Low Contribution'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#00A32E', '#FFC400', '#E60026'],
            },
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'category',
                },
            },
        ],
    };

    return option;
}

async function main() {
    document.addEventListener('DOMContentLoaded', async () => {
        const energyChart = echarts.init(
            document.getElementById('energyChart'),
        );
        energyChart.setOption(await getEnergyChartOption());

        const waterChart = echarts.init(document.getElementById('waterChart'));
        waterChart.setOption(await getWaterChartOption());

        const carbonChart = echarts.init(
            document.getElementById('carbonChart'),
        );
        carbonChart.setOption(await getCarbonFootprintChartOption());

        const pieChart = echarts.init(document.getElementById('emissionChart'));
        pieChart.setOption(await getEmissionsChartOption());

        window.addEventListener('resize', () => {
            energyChart.resize();
            waterChart.resize();
            carbonChart.resize();
            pieChart.resize();
        });
    });
}

main();

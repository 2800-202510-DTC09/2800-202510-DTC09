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

function getEnergyChartData() {
    const data = [700, 600, 500, 400, 300, 200, 100];
    return data;
}

function getWaterChartData() {
    const data = [700, 600, 500, 400, 300, 200, 100];
    return data;
}

function getCarbonFootprintChartData() {
    const data = [1000, 500, 250, 125];
    return data;
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

function getEnergyChartOption() {
    const energyChartData = getEnergyChartData();
    const option = {
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        yAxis: {
            type: 'value',
            name: 'kWh',
        },
        series: [
            {
                data: energyChartData,
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

function getWaterChartOption() {
    const waterChartData = getWaterChartData();
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
            name: 'Liters',
        },
        series: [
            {
                data: waterChartData,
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

function getCarbonFootprintChartOption() {
    const carbonFootprintChartData = getCarbonFootprintChartData();
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
            name: 'kg CO₂',
        },
        series: [
            {
                data: carbonFootprintChartData,
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
    console.log("Emission chart data:", emissionsChartData)
    const option = {
        dataset: {
            source: [
                ['emissions', 'amount', 'category'],
                [emissionsChartData.housingEmissions, emissionsChartData.housingEmissions, 'Housing'],
                [emissionsChartData.vehicleEmissions, emissionsChartData.vehicleEmissions, 'Vehicles'],
                [emissionsChartData.electricityEmissions, emissionsChartData.electricityEmissions, 'Electricity'],
                [emissionsChartData.dietEmissions, emissionsChartData.dietEmissions, 'Diet'],
                [emissionsChartData.lifestyleEmissions, emissionsChartData.lifestyleEmissions, 'Lifestyle'],
            ],
        },
        grid: {containLabel: true},
        xAxis: {name: 'amount'},
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

function main() {
    document.addEventListener('DOMContentLoaded', async () => {
        const energyChart = echarts.init(
            document.getElementById('energyChart'),
        );
        energyChart.setOption(getEnergyChartOption());

        const waterChart = echarts.init(document.getElementById('waterChart'));
        waterChart.setOption(getWaterChartOption());

        const carbonChart = echarts.init(
            document.getElementById('carbonChart'),
        );
        carbonChart.setOption(getCarbonFootprintChartOption());

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

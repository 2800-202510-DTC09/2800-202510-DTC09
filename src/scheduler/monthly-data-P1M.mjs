/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
/* eslint-disable import-x/no-anonymous-default-export */
import {MonthlyData} from '../model/monthly-data.mjs';
import {Record} from '../model/record.mjs';
import {User} from '../model/user.mjs';
import {getAllEmissions} from '../public/js/calculateEmissions.js';

export default async () => {
    const users = await User.find();
    users.forEach(async (user) => {
        try {
            const record = await Record.findOne({user: user.id});
            if (record) {
                const monthlyEmissions = getAllEmissions(record);
                const monthlyScore = user.score;
                const monthlyElectricity = record.electricity_amount;
                const monthlyWater = record.water_amount;

                let userMonthlyData = await MonthlyData.findOne({
                    user: user.id,
                });
                if (!userMonthlyData) {
                    userMonthlyData = await new MonthlyData({
                        user: user.id,
                    }).save();
                }

                const mostRecentMonth = new Date(
                    userMonthlyData.data.sort(
                        (a, b) => new Date(b.date) - new Date(a.date),
                    )[0].date,
                ).getMonth();

                if (mostRecentMonth !== new Date().getMonth()) {
                    userMonthlyData.data.push({
                        label: 'Emissions',
                        value: monthlyEmissions,
                        date: new Date(),
                    });
                    userMonthlyData.data.push({
                        label: 'Water',
                        value: monthlyWater,
                        date: new Date(),
                    });
                    userMonthlyData.data.push({
                        label: 'Electricity',
                        value: monthlyElectricity,
                        date: new Date(),
                    });
                    userMonthlyData.data.push({
                        label: 'Score',
                        value: monthlyScore,
                        date: new Date(),
                    });
                    await userMonthlyData.save();
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
};

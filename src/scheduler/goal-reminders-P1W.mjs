/*
 * Schedules goal reminder emails.
 */

import mongoose from 'mongoose';
import { sendGoalReminders, daysBeforeGoalDeadline } from '../mailer/mail.mjs';

export default async () => {
    console.log('SCHEDULER: Goal Reminder Job (PT5M) - Starting...');
    
    if (mongoose.connection.readyState < 1) {
        console.error('MongoDB not connected. Exiting email reminders job.');
        return;
    }

    try {
        await sendGoalReminders(daysBeforeGoalDeadline);
    } catch (error) {
        console.error('Error during job execution:', error);
    }
};

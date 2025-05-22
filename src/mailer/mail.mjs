import nodemailer from 'nodemailer';
import { Goal } from '../model/goal.mjs';
import { User } from '../model/user.mjs';

const daysBeforeGoalDeadline = 9;

const sustainMeEmailAddress = process.env.SUSTAIN_ME_EMAIL_ADDRESS;
const mailjetApiKey = process.env.MAILJET_USER;
const mailjetSecretKey = process.env.MAILJET_PASSWORD;

// Exit early if environmental variables aren't set.
if (!sustainMeEmailAddress || !mailjetApiKey || !mailjetSecretKey) {
	console.error("MAILER FATAL: One or more required environment variables are not set.");
	console.error("Please ensure SUSTAIN_ME_EMAIL_ADDRESS, MAILJET_USER (Mailjet API Key), and MAILJET_PASSWORD (Mailjet Secret Key) are defined.");
	process.exit(1);
}

const createEmailObject = (userEmailAddress, emailMessage, emailSubject) => ({
	from: `"sustainme app" <${sustainMeEmailAddress}>`,
	to: userEmailAddress,
	subject: emailSubject,
	text: emailMessage,
});

const generateEmailMessage = (userName, goalName, daysLeft) => {
	return `hi ${userName}! just a friendly reminder: you have ${daysLeft} day(s) left to achieve your goal: "${goalName}". keep up the great work, you can do it!`;
};

const generateEmailSubject = (daysLeft) => {
	return `reminder: ${daysLeft} day(s) left for your sustainme goal!`;
};

const sendEmailMessage = async (userEmail, emailMessage, emailSubject) => {
	const transporter = nodemailer.createTransport({
		host: 'in-v3.mailjet.com',
		port: 587,
		secure: false,
		auth: {
			user: mailjetApiKey,
			pass: mailjetSecretKey,
		},
	});

	const mailOptions = createEmailObject(userEmail, emailMessage, emailSubject);

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log(`mailer: email sent to ${userEmail} successfully. response:`, info.response);
	} catch (err) {
		console.error(`mailer: error sending email to ${userEmail}:`, err);
	}
};

const getGoalsExpiringSoon = async (daysUntilExpiry) => {
	const today = new Date();
	const targetDate = new Date(today);
	targetDate.setDate(today.getDate() + daysUntilExpiry);

	const targetDateStart = new Date(new Date(targetDate).setHours(0, 0, 0, 0));
	const targetDateEnd = new Date(new Date(targetDate).setHours(23, 59, 59, 999));

	try {
		const goals = await Goal.find({
			// We want all goals that expire in the required time interval...
			emissionDiffEnd: {
				$gte: targetDateStart,
				$lte: targetDateEnd,
			},
			// ... and have not been deleted.
			$or: [
				{ deletedAt: { $exists: false } },
				{ deletedAt: null },
			],
		}).populate('user');

		return goals;
	} catch (error) {
		console.error('mailer: error fetching goals expiring soon:', error);
		return [];
	}
};

const sendGoalReminders = async (effectiveDaysBeforeDeadline) => {
	const goals = await getGoalsExpiringSoon(effectiveDaysBeforeDeadline);

	let emailsAttempted = 0;
	for (const goal of goals) {
		if (goal.user && goal.user.email) {
			const userName = goal.user.username;
			const userEmail = goal.user.email;
			const goalName = goal.name;

			const emailMessage = generateEmailMessage(userName, goalName, effectiveDaysBeforeDeadline);
			const emailSubject = generateEmailSubject(effectiveDaysBeforeDeadline);

			await sendEmailMessage(userEmail, emailMessage, emailSubject);
			emailsAttempted++;

			if (goals.length > 1 && emailsAttempted < goals.length) {
				await new Promise(resolve => setTimeout(resolve, 1000 * 60));
			}
		}
	}
};

export {
	daysBeforeGoalDeadline,
	sendGoalReminders,
	getGoalsExpiringSoon,
	sendEmailMessage,
	createEmailObject,
	generateEmailMessage,
	generateEmailSubject
};

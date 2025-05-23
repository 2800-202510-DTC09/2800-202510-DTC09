import {status} from 'http-status';

export function handleChatbotGet(req, res) {
	req.session.destroy((err) => {
		if (err) {
			console.error('Logout error:', err);
			return res
				.status(status.INTERNAL_SERVER_ERROR)
				.send('Error logging out');
		}
		return res.sendFile('/chatbot.html', (err) => {
			if (err) {
				console.log('Error sending file:', err);
				res.status(500).send('File not found');
			}
		});
	});
}

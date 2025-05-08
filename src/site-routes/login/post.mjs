import {mockUsers} from '../../mock/users.mjs';

export function handleLoginPost(req, res) {
	const { username, password } = req.body;
	const user = mockUsers.find(u => u.username === username);
	if (!user || user.password !== password) {
		return res.status(401).json({ success: false, error: 'Invalid username or password' });
	}
	req.session.user = { id: user.id, username: user.username, role: user.role };
	res.json({ success: true });
};


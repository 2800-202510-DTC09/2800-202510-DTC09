import bcrypt from 'bcryptjs';
import { mockUsers } from '../../mock/users.mjs';

// Super basic signup route. I'll add nuance/security later.
export async function handleSignupPost(req, res) {
	const { username, email, password } = req.body;

	// Basic input check
	if (!username || !password || !email ) {
		return res.redirect('/signup.html?error=values_missing');
	}

	// mocking for DB interactions
	const existingUser = mockUsers.find(u => u.username === username);
    	if (existingUser) {
		return res.redirect('/signup.html?error=username_taken');
	}
	const existingEmail = mockUsers.find(u => u.email === email);
    	if (existingEmail) {
		return res.redirect('/signup.html?error=email_taken');
	}
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);


		const newUser = {
			id: "mockID", // To be replaced with Mongo ObjectId later
			username: username,
			password: hashedPassword,
		};

		// TODO: Add user to the real DB. Then redirect to /home.

		// Ensure we've got session cookies so user can be logged in.
		req.session.user = {
			id: newUser.id,
			username: newUser.username,
			email: newUser.email,
			};

		// For testing.
		return res.json(newUser);

	} catch (error) {
		return res.redirect('signup.html?error=user_creation_error');
	}
};


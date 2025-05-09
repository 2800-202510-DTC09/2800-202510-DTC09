import bcrypt from 'bcryptjs';
import { User } from '../../model/user.mjs'; 
import { Error } from 'mongoose'; // 

export async function handleSignupPost(req, res) {
	const { username, email, password } = req.body;

	// Basic input check
	if (!username || !password || !email ) {
		return res.redirect('/signup.html?error=values_missing');
	}

	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword,
		});

		await newUser.save();

		req.session.user = {
			id: newUser._id, 
			username: newUser.username,
			email: newUser.email,
		};


		res.redirect('/main.html'); 

	} catch (error) {
		console.error('Signup error:', error);
		return res.redirect('/signup.html?error=validation_failed');
        }
}

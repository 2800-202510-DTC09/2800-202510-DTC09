import { User } from "../../model/user.mjs";
import bcrypt from "bcryptjs";

export async function handleLoginPost(req, res) {
   try {
	  const { username, password } = req.body;
	  const user = await User.findOne({ username });

	  if (!user) {
		 return res.status(401).json({ success: false, error: 'Invalid username or password' });
	  }

	  const passwordMatch = await bcrypt.compare(password, user.password);
	  if (!passwordMatch) {
		 return res.status(401).json({ success: false, error: 'Invalid username or password' });
	  }
	  req.session.user = { id: user.id, username: user.username };
	  console.log("Login successful for:", username);
	  res.json({ success: true });
   } catch (error) {
	  console.error('Login error:', error);
	  res.status(500).json({ success: false, error: 'Internal server error' });
   }
};

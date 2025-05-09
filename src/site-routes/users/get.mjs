export function handleUsersGet(req, res) {
   if (!req.session.user) return res.status(401).json({error: 'Not logged in'});
   res.json({user: req.session.user});
}

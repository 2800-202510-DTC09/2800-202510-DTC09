export default function isAuthenticated(req, res, next) {
    if (!req.session?.user?._id && !req.session?.user?.id) {
        return res.status(401).json({error: 'Not logged in'});
    }

    req.user = {
        _id: req.session.user._id || req.session.user.id,
        username: req.session.user.username,
        email: req.session.user.email,
    };

    next();
}

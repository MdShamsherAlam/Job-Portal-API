import JWT from 'jsonwebtoken'

const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization; 

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(400).send({ status: false, message: "Auth failed" });
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (err) {
        next(err);
    }
};

export default userAuth;

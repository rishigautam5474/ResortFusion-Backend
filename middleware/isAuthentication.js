import jwt from "jsonwebtoken"

const IsAuthentication = (req, res, next) => {
    const headers = req?.headers['authorization'];
    const token = headers?.split(' ')[1]
    if(!token) {
        return res.status(403).json({status: "Error", message: "Unauthorized"})
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decode.id);
    req.user = decode.id;

    if(decode.role !== "ADMIN") {
        return res.status(403).json({status: "Error", message: "Unauthorized"})
    }

    if(!decode.id) {
        return res.status(400).json({status: 'error', message: "user id is not valid"})
    }
    next()
}

export default IsAuthentication;
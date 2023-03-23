const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    if (req.cookies.token) {
        const token = req.cookies.token;
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if(!err){
                req.isLogin = true;
                req.user = user;
            }else{
                req.isLogin = false;
            }
        });
    } else {
        req.isLogin = false;
    }
    next()
} 

module.exports = auth;
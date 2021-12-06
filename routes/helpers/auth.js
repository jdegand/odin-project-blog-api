const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

module.exports = function auth(req,res,next){
    
    /*
    const token = req.header('authtoken');

    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err){
        res.status(400).send('Invalid Token')
    }
    */
    
    /*
        const { authorization } = req.headers;
        const token = authorization && authorization.split(" ")[1];
        if (token == null) return res.sendStatus(401);
        try{
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
                });
        } catch(err){
            res.status(400).send('Invalid Token');
        }
    */
       
        const token = req.cookies.authtoken;
        if (!token) {
          return res.sendStatus(403);
        }
        try {
          const data = jwt.verify(token, process.env.TOKEN_SECRET);
          req.user = data;
          next();
        } catch {
          return res.sendStatus(403);
        }
    

}
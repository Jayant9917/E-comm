const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to protect the routes

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.user.id).select("-password"); //Exclude password from response
            next();



        }catch(err){
            console.log("Token Verification Failed:", err);
            res.status(401).json({message: "Token Verification Failed"});
        }
    }else{
        res.status(401).json({message: "No Token Provided"});
    }
}

module.exports = protect;
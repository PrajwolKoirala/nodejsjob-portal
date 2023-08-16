
const User = require("../model/User");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');


const signup = async (req,res,next) => {
    try{
        const hash_pw = await bcrypt.hash(req.body.password,10);
        const user = await User.create({
            ...req.body,
            password:hash_pw
        });
        res.send(user);


    }catch (err) { 
        next(err);
    }
};

const login = async (req,res,next) => {
    let user = await User.findOne({email:req.body.email})
    if(user){
        let status = await bcrypt.compare(req.body.password, user.password);
        if(status){
            let obj = {...user.toObject()}
            var token = jwt.sign(obj, process.env.JWT_SECRET);
            delete obj.password
            
            return res.send({data:obj,token})
        }
    }
    return res.status(401).send({msg:"umauthenticated"})
};

module.exports = {
    signup,
    login
}
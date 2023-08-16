const jwt = require("jsonwebtoken");
const { JOB_SEEKER, EMPLOYEE } = require("../constants/role");


const checkAuthentication = (req,res,next) => {
    if(req.headers.authorization){
        let token = req.headers.authorization.split(" ")[1]

        if(token){
            try{
                var decoded_user_info = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded_user_info
                req.user_id = decoded_user_info._id;
                return next()
            }catch(err){

            }
        }
    }
    res.status(401).send({msg:"unauthenticated"})
};

const isEmployee = (req,res,next) => {
    if(req.user.role === EMPLOYEE){
        next()
    }else{
        return res.status(403).send({msg:"access denied -only for EMPLOYEE"})
    }
  };


  const isJobSeeker = (req,res,next) => {
    if(req.user.role ===JOB_SEEKER ){
        next()
    }else{
        return res.status(403).send({msg:"access denied -only for JOB_SEEKER"})
    }
  }

  module.exports = {
    checkAuthentication,
    isEmployee,
    isJobSeeker
  }
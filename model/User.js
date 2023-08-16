const mongoose = require("mongoose")
const{EMPLOYEE,JOB_SEEKER} = require("../constants/role");
const { exists } = require("./todos");
// const { string } = require("joi");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const signupSchema = new Schema({
    name :{
        type : String,
        maxlength : 300,
        required : true
    },
    email :  {
        type : String,
        required : true,
        validate: {
            async validator(value) {
                const exists = await mongoose.models.User.findOne({ email: value });
                return !exists;
            },
            message: "Email already exists",
        },
    },
    password : {
        type : String,
        required:true,
    },
    role:{
        type : String,
        enum : [EMPLOYEE, JOB_SEEKER],
        set : function(value){
            return value.toLowerCase()
        }
    }
})


module.exports = mongoose.model("User",signupSchema)
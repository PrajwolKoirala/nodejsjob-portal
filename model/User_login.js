const mongoose = require("mongoose")
const{EMPLOYEE,JOB_SEEKER} = require("../constants/role");
const { exists } = require("./todos");
// const { string } = require("joi");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const loginSchema = new Schema({

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
    }

})

module.exports = mongoose.model("User1",loginSchema)
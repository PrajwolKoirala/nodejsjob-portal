const mongoose = require("mongoose")
const { exists } = require("./todos");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const applySchema = new Schema({

 jobs : [
    {
        company_name:{
            type:String,
            required:true,
        },
      
        application_date:{
            type : Date,
            default : Date.now,
            required: true,
        },
        status:{
            type:String,
            enum : ["pending" , "rejected" , "hired"],
            default : "pending",
        },
        job_id :{
            type : ObjectId,
            ref : "jobs",
            required : true,
        }
    }
    
],
applied_by :{
    type : ObjectId,
    ref : "user",
    requires : true
},



});



module.exports = mongoose.model("Apply_Job",applySchema)
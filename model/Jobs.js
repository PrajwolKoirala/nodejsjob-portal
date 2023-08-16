const mongoose = require("mongoose")
const{FRESHER,JUNIOR,MID,SENIOR} =require("../constants/joblevel") 
const{FRONTEND, BACKEND} = require("../constants/category");

// const { exists } = require("./todos");
// // const { string } = require("joi");
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;


/*
 jobs = [
    {
        name,
        category : enum [frontend,backend,],
        job level : enum [fresher, junior, mid, senior]
        number of vacancy : number
        location: string
        offered-salary : number
        deadline : date
        type: enum [top, hot,featured, normal]
        created_at: date,
        created_by : employer_id
        description:  rich text editor
	  image: “path_of_image”
	  . . . 
    },


*/
// const jobSchema = new Schema({
    // name :{
    //     type : String,
    //     maxlength : 300,
    //     required : true
    // },
    // category: {
    //      type : String,
    //      enum : [FRONTEND, BACKEND],
    //      set : function(value) {
    //         return value.toLowerCase()
    //     }
    // },
    // job_level:{
    //     type : String,
    //     enum : [FRESHER, JUNIOR, MID, SENIOR],
    //     set : function(value) {
    //         return value.toLowerCase()
    //     }
    // },
    // vacency : {
    //     type : Number,
    //     required : true,
    // },
    // location : {
    //     type : String,
    //     required: true,
    // },
    // created_by : {
    //     type : ObjectId,
    //     required : true,
    //     ref:"user"
    // },
    // description:{
    //     type : String,
    // },
    // images:{
    //     type: [String]
    // },
// })

// const mongoose = require("mongoose")
// const{SELLER,BUYER} = require("../constsnts/role");
const { ObjectId } = mongoose.Schema;


const jobSchema = new mongoose.Schema({

    name :{
        type : String,
        maxlength : 300,
        required : true
    },
    category: {
         type : String,
         enum : [FRONTEND, BACKEND],
         set : function(value) {
            return value.toLowerCase()
        }
    },
    job_level:{
        type : String,
        enum : [FRESHER, JUNIOR, MID, SENIOR],
        set : function(value) {
            return value.toLowerCase()
        }
    },
    date_created : {
        type : Date,
        default : Date.now,
        required: true,
    },
    end_date : {
        type : Date,
        required : true,
    },
    vacency : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required: true,
    },
    created_by : {
        type : ObjectId,
        required : true,
        ref:"user"
    },
    description:{
        type : String,
    },
    images: {
    type: [String], // Array of strings
  },


});
module.exports = mongoose.model("Jobs",jobSchema)
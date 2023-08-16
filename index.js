const express = require("express");
require('dotenv').config();
const fileUpload = require("express-fileupload");

require("./config/database");
const user_route = require("./route/user");
const jobs_route = require("./route/jobs");
const apply_route = require("./route/applied_job");


const app =  express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

app.use("/api",user_route);
app.use("/api",jobs_route);
app.use("/api",apply_route);




app.use((req,res)=>{
    res.status(404).send({
        msg:"resource not found"
    })
})


app.use((err,req,res,next) => {
    let status = 500;
    let msg = "SERVER error";
    let errors = [];
    if (err.name === "ValidationError"){
      status = 400;
      msg = "bad request"
      
      let error_arr = Object.entries(err.errors)
      let temp = []
      error_arr.forEach(el => {
          let obj = {}
          obj.params = el[0]
          obj.msg = el[1].message
          temp.push(obj)
      }); 
      errors = temp;
  }
  res.status(status).send({msg: msg , errors,error:err.message})
  return;
  })


app.listen(8080, () => {
    console.log("server created");
})
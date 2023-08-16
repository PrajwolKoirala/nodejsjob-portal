const Apply_Job = require("../model/Applied_jobs");
const Jobs = require("../model/Jobs")

const applyForJob =async (req,res,next) => {
    //   console.log("job applied");

    console.log('Request body:', req.body);
    let request_job = req.body.jobs;
    console.log('Request job:', request_job);

    try { 
        let request_job = req.body.jobs

        let jobs = [];

        for (let index = 0; index < request_job.length; index++) {

            console.log('request_job length:', request_job.length);

            let job = await Jobs.findById(request_job[index].job_id)
            if(job) { 
                jobs.push({
                    company_name:job.name,
                    status:"pending",
                    application_date:new Date(),
                    job_id: job._id
                });
            }            
        }
        let apply = await Apply_Job.create({
            jobs,
            applied_by : req.user._id
        });
        res.status(201).send({msg : "your application has been submitted successfully",apply});


    }catch(err){
        next(err);
    }
}

module.exports = {
    applyForJob
 }
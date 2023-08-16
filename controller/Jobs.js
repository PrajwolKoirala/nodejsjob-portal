const Jobs = require("../model/Jobs");


const fetchJob = async (req, res, next) => {
  try {
    const search_term = req.query.search_term || "";
  let per_page = parseInt(req.query.per_page) || 25 
  let page = parseInt(req.query.page) || 1 
    

    const pipeline = [
      {
        $match: {
          $or: [
            { name: RegExp(search_term, "i") },
            { category: RegExp(search_term, "i") },
            { job_level: RegExp(search_term, "i") },
          ],
        },
      },
      {
        $sort:{name : 1} //ascending order by name
    },
    {
      $skip : ((page - 1) * per_page)
    },
    {
      $limit : (per_page)
    }
    ];

    

    const jobs = await Jobs.aggregate(pipeline);

    res.send({ data: jobs });
  } catch (err) {
    next(err);
  }
};


// const fetchJob = async (req,res,next) => {

// // let jobs1 = await Jobs.find({})
// // res.send({
// //     data:jobs1
// // })


// //     return;
//  let search_term = req.query.search_term||""

//   let per_page = parseInt(req.query.per_page) || 25 
//   let page = parseInt(req.query.page) || 1 

// // let price_from = parseFloat(req.query.price_from) || 0
// // let price_to = parseFloat(req.query.price_to) || 999999999999999

// let jobs = await Jobs.aggregate({
    
//         $match: {
//           $or: [
//             {name:RegExp(search_term, "i")},
//             {category:RegExp(search_term, "i")},
//             {job_level:RegExp(search_term, "i")} 
//           ],
//         }
      
    
// })
// res.send({data : jobs})
//     // try { 
//     //     res.send({data:Jobs})
//     // }catch (err){
//     //     next(err)
//     // }
// }





const path = require("path");

const postJob = async (req, res, next) => {
    try {
      let uploadedImagePaths = [];
  
      if (req.files) {
        let imageFiles = req.files.images || [];
        if (!Array.isArray(imageFiles)) {
          imageFiles = [imageFiles];
        }
  
        const uploadPromises = []; // Initialize an array to hold upload promises
  
        for (const imageFile of imageFiles) {
          const file_name =
            Date.now() + "-" + Math.round(Math.random() * 1E9) + path.extname(imageFile.name);
  
          const uploadPromise = new Promise((resolve, reject) => {
            imageFile.mv(
              path.join(__dirname, "../", "uploads/", file_name),
              (err) => {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  uploadedImagePaths.push(file_name);
                  console.log("Added image path:", file_name);
                  resolve();
                }
              }
            );
          });
  
          uploadPromises.push(uploadPromise);
        }
  
        // Wait for all upload promises to resolve before proceeding
        await Promise.all(uploadPromises);
      }
  
      console.log("req.user", req.user);
      console.log("Uploaded image paths:", uploadedImagePaths);
  
      const jobData = {
        ...req.body,
        created_by: req.user_id,
        images: uploadedImagePaths, // Use the correct field name
        date_created: new Date(),
        end_date: req.body.end_date,
      };
  
      const job = await Jobs.create(jobData);
  
      res.status(201).json(job);
    } catch (err) {
      next(err);
    }
  };
  





    const update = async (req,res,next) => {
        const jobId = await req.params.id;
        const updateData = req.body;

        console.log("updating job",jobId);

        try { 
            const updateJob = await Jobs.findByIdAndUpdate(jobId, updateData, { new : true});

            if (!updateJob) { 
                return res.status(404).send({msg:"Job not found"});

            }
            res.send({job: updateJob});
        }catch(er) { 
            next(err);
        }

    }
    

    
    const remove = async (req,res,next) => {
        let job = await Jobs.findById(req.params.id);
        if (job) {
            await Jobs.findByIdAndDelete(req.params.id)
            return res.status(204).send({msg:"deleted successfully"})
        }
        res.status(404).send({msg:"resource not found"})
    }
    


    
    module.exports = {
        postJob,
        fetchJob,
        update,
        remove
    }
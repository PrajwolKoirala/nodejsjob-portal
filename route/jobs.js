
const express = require("express");
const router = express.Router()
const {postJob,fetchJob,update,remove} = require("../controller/Jobs");
const{checkAuthentication,isEmployee} = require("../middleware/checkAuthentication")


router.post("/postjob",checkAuthentication,isEmployee,postJob);
router.get("/fetchjob",fetchJob);
router.put("/update/:id",checkAuthentication,isEmployee,update);
router.delete("/delete/:id",checkAuthentication,isEmployee,remove);


// router.post("/login",login);

module.exports = router;
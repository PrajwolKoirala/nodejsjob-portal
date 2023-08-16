
const express = require("express");
const{checkAuthentication,isJobSeeker} = require("../middleware/checkAuthentication")
const{applyForJob} = require("../controller/applied_job");
const router = express.Router();



router.post("/applyjob",checkAuthentication,isJobSeeker,applyForJob);

module.exports = router;
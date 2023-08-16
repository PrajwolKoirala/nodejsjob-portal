const Joi = require('joi');
const express = require("express");
const {signup, login} = require("../controller/user")
const validateSchema = require("../middleware/validateSchema")

const router = express.Router()


const loginSchema = Joi.object({
   
    email:Joi.string()
        . email()
        .required(),
   password: Joi.string()
    .required(),

});
router.post("/signup",signup);
router.post("/login",validateSchema(loginSchema),login);

module.exports = router;
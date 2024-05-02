
const express=require('express');
const router=express.Router()
const contactuscontroller=require("../controller/contact");


router.get('/contactus', contactuscontroller.contactcontroller);


module.exports=router;
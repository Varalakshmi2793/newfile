const express=require('express');
const controller=require('../controller/controller');
const router=express.Router();

router.get("/", controller.showTable);

router.post("/create-table", controller.createTable);



module.exports=router;
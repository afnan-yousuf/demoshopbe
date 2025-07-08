const express = require("express");
const router = express.Router();
const Category = require('../models/category')


router.get('/', async (req,res)=>{
    const category = await Category.find()
    res.send({data: category, success: true})
})

router.post('/', async (req,res)=>{
    const newCat = new Category(req.body)
    newCat.save().then(()=>{
    res.send({data: "New Category Saved", success: true})
    })
})

module.exports = router;
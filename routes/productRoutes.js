const express = require("express");
const router = express.Router();
const Product = require('../models/product')


router.get('/', async (req,res)=>{
    const category = await Product.find()
    res.send({data: category, success: true})
})

router.post('/', async (req,res)=>{
    const newCat = new Product(req.body)
    newCat.save().then(()=>{
    res.send({data: "New Product Saved", success: true})
    })
})

module.exports = router;
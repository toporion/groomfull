 const ProductModel = require("../models/ProductModel");

const createProduct = async(req,res)=>{
    try{
        const productdata = req.body;
        const profileImage =req.file ? req.file.path : null;
        const newproduct =new ProductModel(
            {
                ...productdata,
                profileImage,
                createdBy:req.user._id

            }
        )
        await newproduct.save();
        res.status(201).json({message:"Product Created Successfully",product:newproduct});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}
const getAllProducts = async(req,res)=>{
    try{
        const products = await ProductModel.find();
        res.status(200).json({message:"All Products",products});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}
const getProductById =async(req,res)=>{
    try{
        const {id}= req.params;
        const product=await ProductModel.findById(id);
        if(!product){
            return res.status(404).json({message:"Product Not Found"});
        }
        res.status(200).json({message:"Product Found",product});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}
const updateProduct = async(req,res)=>{
    try{
        const {id}= req.params;
        const productdata = req.body;
        if(req.file){
            productdata.profileImage = req.file.path;
        }
        const updatedproduct = await ProductModel.findByIdAndUpdate(id,{
            ...productdata,
            profileImage
        },{new:true});
        if(!updatedproduct){
            return res.status(404).json({message:"Product Not Found"});
        }
        res.status(200).json({message:"Product Updated Successfully",product:updatedproduct});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}
const deleteProduct=async(req,res)=>{
    try{
        const {id}=req.parama;
        const deletedproduct = await ProductModel.findByIdAndDelete(id);
        if(!deletedproduct){
            return res.status(404).json({message:"Product Not Found"});
        }
        res.status(200).json({message:"Product Deleted Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
}
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}

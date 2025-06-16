const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

async function hashPassword(password) {
   const saltRounds = 10;
   return await bcrypt.hash(password, saltRounds);
}


async function signupHandler(req,res)
{
   try {
      const{name,email,password,role}=req.body;
      console.log("Received signup request:", req.body);
      if(!name || !email ||!password)
      {
         res.status(500).json({message:"Please provide all the fields",success:false});
      }
      const passwords= await hashPassword(password);
      await User.create({
          name,
          email,
          password:passwords,
          role
      })
      
      res.status(201).json({message:"User created successfully",success:true,user:{name,email,role}});
   } catch (error) {
       res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});

    
   }
}


async function loginHandler(req,res)
{
   try {
      const {email,password}=req.body;
      if(!email || !password)
      {
         res.status(500).json({message:"Please provide all the fields",success:false});
      }
      const user=await User.findOne({email});
      if(!user)
      {
         res.status(404).json({message:"User not found",success:false});
      }
      const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch)
      {
         res.status(401).json({message:"Invalid credentials",success:false});
      }

      // generate jwt
      const token = jwt.sign({ id: user._id, role: user.role }, 'omkar@123', { expiresIn: '5h' });
      
      res.cookie('token', token, {
         httpOnly: true,
        //  secure: process.env.NODE_ENV === 'production', // Set to true in production
         sameSite: 'Strict', // Adjust as needed
         maxAge: 5 * 60 * 60 * 1000 // 5 hours in milliseconds
      });
      console.log("Token generated:", token);
      console.log("User logged in:", user); 
      console.log("User role:", user.role);
      res.status(200).json({message:"Login successful",success:true,user:{name:user.name,email:user.email,role:user.role},'token' : token});
   } catch (error) {
       res.status(500).json({message:"Internal Server Error",success:false,error:error.message});
   }
}

async function profileHandle(req,res)
{
   try {
      const userId = req.user.id; 
      console.log("User ID from request:", userId);
      if(!userId)
      {
         return res.status(401).json({message:"Unauthorized",success:false});
      }
      const user=await User.findById(userId);
      if(!user)
      {
         return res.status(404).json({message:"User not found",success:false});
      }
      res.status(200).json({message:"User profile fetched successfully",success:true,user,url:req.url,requestMethod:req.method});
   } catch (error) {
       res.status(500).json({message:"Internal Server Error",success:false,error:error.message});
    
   }
}
module.exports={
    signupHandler,
    loginHandler,
    profileHandle
};
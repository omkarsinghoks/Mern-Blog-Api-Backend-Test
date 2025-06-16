const Blog=require('../models/postModel');
const User=require('../models/userModel');

async function createPostHandler(req,res)
{
   try {
      const{title,description,tags,createdAt}=req.body;
      const userId=req.user.id;
      // const user=User.findById(userId);
      
      // if(!user)
      // {
      //    return res.status(404).json({message:"User not found",success:false});
      // } 
      if(req.user.role=='Admin' || req.user.role=='Author')
      {
         if(!title || !description)
         {
            return res.status(400).json({message:"Please provide all the fields",success:false});
         }
         const post=await Blog.create({
            title,
            description,
            tags,
            createdAt,
            Author:userId
         });
         console.log("Post created successfully:" ,post);
         res.status(201).json({message:"Post created successfully",success:true,post});


   } 
  }catch (error) {  
       res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});
    
   }
  }
async function getAllPostHandler(req,res)
{
    try {
      const posts=await Blog.find();
      res.status(200).json({message:"Posts fetched successfully",success:true,posts});
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});
      
    }
}

async function updatePostHandler(req,res)
{
   try {
      const {id}=req.params;
      const {title,description,tags,createdAt}=req.body;
      const userId=req.user.id;
      
      if(req.user.role=='Admin' || req.user.role=='Author')
      {
         if(!title || !description )
         {
            return res.status(400).json({message:"Please provide all the fields",success:false});
         }
         const post=await Blog.findByIdAndUpdate(id,{
            title,
            description,
            tags,
            createdAt
         },{new:true});
         console.log("Post updated successfully:");
         res.status(200).json({message:"Post updated successfully",success:true,post}); 

      }
   } catch (error) {
       res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});
    
   } 
  } 

async function deletePostHandler(req,res)
{
   try {
      const {id}=req.params;
      const userId=req.user.id;
      
      if(req.user.role=='Admin' || req.user.role=='Author')
      {
         const post=await Blog.findByIdAndDelete(id);
         if(!post)
         {
            return res.status(404).json({message:"Post not found",success:false});
         }
         console.log("Post deleted successfully:");
         res.status(200).json({message:"Post deleted successfully",success:true,post}); 

      }
   } catch (error) {
       res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});
    
   } 
} 

async function addCommentHandler(req,res)
{
  try {
     const id=req.params.id;
     const{text}=req.body;
     console.log("text",text)
     const userId=req.user.id;
     const user=await User.findById(userId);
     console.log("User found:", user);
     if(!user)
     {
        return res.status(404).json({message:"User not found",success:false});
     }
    if(!text)
      {
          return res.status(400).json({message:"Please provide a comment",success:false});
      }
      const post=await Blog.findById(id);
      console.log("Post found:", post);
      if(!post)
      {
         return res.status(404).json({message:"Post not found",success:false});
      }
     await post.comments.push({
         text,
         user: {
            userId: user._id,
            name: user.name
         },
         createdAt: new Date()
      }); 
      await post.save();
      res.status(200).json({message:"Comment added successfully",success:true,post});


  } catch (error) {
    res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});
    
  }
}

module.exports={
  createPostHandler,
  getAllPostHandler,
  updatePostHandler,
  deletePostHandler,
  addCommentHandler
};
const User=require('../models/userModel');
const Blog=require('../models/postModel');

// async function deleteCommentHandler(req,res)
// {

// try {
//     const commentId=req.params.id;
//     const userId=req.user.id;
//     // const user=await User.findById(userId);
//  const blog=await Blog.findOne({
//   "comments._id": commentId
// })
// if(!blog)
//   {
//     return res.status(404).json({message:"Blog not found",success:false});
//   }

//     const comment = blog.comments.id(commentId);
//     if (!comment) {
//         return res.status(404).json({message:"Comment not found",success:false});
//     }
//     console.log("Comment found:", comment);
    
//     if (comment.user.userId.toString() !== userId && req.user.role !== 'Admin') {
//         return res.status(403).json({message:"You are not authorized to delete this comment",success:false});
//     }
    
//    await Blog.findByIdAndUpdate(
//   blogId,
//   { $pull: { comments: { _id: commentId } } },
//   { new: true }
// );
    
//     res.status(200).json({message:"Comment deleted successfully",success:true});



  
// } catch (error) {
//     res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});
//   } 
  
// }

async function deleteCommentHandler(req, res) 
  {
  try {
     const commentId = req.params.id;

  // Find the blog post containing the comment and remove the comment
  const blog = await Blog.findOneAndUpdate(
    { "comments._id": commentId },
    { $pull: { comments: { _id: commentId } } },
    { new: true }
  );

  if (!blog) {
    return res.status(404).json({ message: "Comment or blog not found" });
  }

  res.json({ message: "Comment deleted", blog });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
    
  }
};


module.exports={deleteCommentHandler};
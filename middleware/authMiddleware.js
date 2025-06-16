const jwt=require('jsonwebtoken');
function  authMiddleware(req,res,next)
{
  try {
      console.log(req.headers);
      const token=req.headers.authorization;
      // console.log("Token received:", token);
      if(token && token.startsWith('Bearer '))
      {
          
          const authToken = token.split(' ')[1];
          console.log("Extracted token:", authToken);
          req.token=authToken;
          const decoded = jwt.verify(authToken, 'omkar@123');
          // console.log("Decoded token:", decoded); 
          req.user = decoded; // Attach user info to request object 
           if(req.user.role==='Reader')    req.user.role='Author';
          console.log("User info attached to request:", req.user);
          next(); // Call next middleware or route handler

      } 
      else
      {
          return res.status(401).json({message:"Unauthorized, No token provided",success:false});
      }
      
      
  } catch (error) {
    res.status(500).json({message:"Internal Server Error",success:false,'error':error.message});
    
  }
} 
module.exports={authMiddleware};
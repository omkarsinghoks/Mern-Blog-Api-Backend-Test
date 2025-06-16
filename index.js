const express=require('express');
const userRouter=require('./Routers/userRouter');
const postRouter=require('./Routers/postRouter');
const commentRouter=require('./Routers/commentRouter')
const{ authMiddleware } = require('./middleware/authMiddleware');
// const commentRouter=require('./routes/commentRoutes');
const {connectDB}=require('./configure/connectDB');
const app=express();

app.use(express.json());
connectDB();

app.use('/api/auth',userRouter)
app.use('/api/posts',postRouter);
app.use(authMiddleware)
app.use('/api/comments',commentRouter);
app.listen(8000,(req,res)=>
{
    console.log("Server is running on port 8000");
})
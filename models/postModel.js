const mongoose=require('mongoose');
const User=require('./userModel');
const blog=new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags:{
        tags: { type: [String] },
        // required: true
    },
    comments: [{
  text: String,
  user: { 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    name: String 
  },
  createdAt: { type: Date, default: Date.now }
}]
    ,
    createdAt: {
            type: Date,
            default: Date.now
        }
    ,
    Author:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    }

},{timestamps: true});
const Blog=mongoose.model('Blog',blog); 
module.exports=Blog;
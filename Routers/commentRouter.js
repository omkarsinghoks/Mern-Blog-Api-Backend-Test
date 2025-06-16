const{deleteCommentHandler}=require('../controllers/commentController')
const router =require('express').Router();
router.delete('/:id',deleteCommentHandler)
module.exports=router;

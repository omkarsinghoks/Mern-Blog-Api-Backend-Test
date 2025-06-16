const router=require('express').Router();

const { authMiddleware } = require('../middleware/authMiddleware');
const { createPostHandler ,getAllPostHandler,updatePostHandler,deletePostHandler,addCommentHandler} = require('../controllers/postController');

router.get('/',getAllPostHandler);
router.use(authMiddleware);
router.post('/', createPostHandler);
router.put('/:id', updatePostHandler);
router.delete('/:id', deletePostHandler);
router.post('/:id/comments',addCommentHandler)
module.exports=router;

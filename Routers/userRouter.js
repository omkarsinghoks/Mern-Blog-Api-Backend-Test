const{ signupHandler, loginHandler ,profileHandle} = require('../controllers/userController');
const{authMiddleware}=require('../middleware/authMiddleware');
const router=require('express').Router();
router.post('/signup',signupHandler);
router.post('/login',loginHandler);
router.use(authMiddleware);
router.get('/me', profileHandle)

module.exports=router;
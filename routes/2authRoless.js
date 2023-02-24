const {Router}=require('express')
const authController=require('../controllers/authController')
const { requireAuth } = require('../middleware/authMiddleware')

const router=Router()

router.get('/',authController.home)

router.get('/register',authController.signup_get)
router.post('/register',authController.signup_post)
router.get('/login',authController.login_get)
router.post('/login',authController.login_post)
// router.get('/logout',()=>{})
// router.get('/languages',requireAuth,(req,res)=>{res.render('pages/languages')})
module.exports=router
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var jwt = require('jsonwebtoken');
const verifyToken=(req,res,next)=>{
    const token=req.headers["x-access-token"]
    console.log(token)
    if(!token){
      res.send("We need a token")
    }else{
      jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
                console.log("you failed authenticate")
                res.json({auth:false, message:"you failed authenticate" })
        }else{
          req.userId=decoded.id;
          console.log("you authenticated")
          next()
        }
      })
    }
  }
        
//Route for sending registration OTP
router.post('/sendotp', userController.sendOtp)
//Route for verifying registration OTP
router.post('/confirmotp', userController.confirmOtp)
//Route for registering after verification
router.post('/', userController.createUser)
//Route for registering after verification
router.post('/login', userController.login)
//Route for getting forget password otp on email
router.post('/forgetpassword', userController.forgetPassword)
//Route for verifying forget password otp
router.post('/verifyotp', userController.verifyOTP)
//Route for getting forget password otp on email
router.post('/resetpassword', userController.resetPassword)
router.get('/roles', userController.getRoles)
module.exports = router;

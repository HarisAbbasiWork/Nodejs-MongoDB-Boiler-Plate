var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/usercontroller');
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
        
router.post('/', user_controller.createuser)
router.get('/',verifyToken, user_controller.getusers)
router.get('/:name',verifyToken, user_controller.getuserbyname)
router.post('/login', user_controller.login)
module.exports = router;

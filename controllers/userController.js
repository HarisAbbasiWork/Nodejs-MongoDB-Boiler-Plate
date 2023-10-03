var userModel = require('../models/userModel')
const bcrypt = require("bcrypt")
var ObjectId = require('mongodb').ObjectID;
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const createuser = async(req,res)=>{ 
  console.log("req.body is", req.body);
  const ifuser=await userModel.findOne({ username: req.body.username })
  if(ifuser){
    res.send({
      success: false,
      message:"User Already Exists with this Username"
    });
  } 
  const encryptedPassword =await bcrypt.hash(req.body.password, saltRounds)
    const newUser = await new userModel({
      username: req.body.username,
      gender: req.body.gender,
      password: encryptedPassword
    }).save();
    if(newUser){
      console.log("You are now user")
      res.status(200).send({
        success: true,
        message:"You are now user"
      });
    }else{
      console.log("Request Failed")
      res.status(404).send({
        success: false,
        message:"Request Failed"
      });
    }

    
}
const getusers=async(req,res)=>{ 
  const filter = {};
  const all = await userModel.find(filter);
  res.status(200).json(all)    
}
const getuserbyname=async(req,res)=>{ 
  console.log(req.params.name)  
  const user=await userModel.findOne({"username": req.params.name})
  if(user){
    return res.status(200).send({
      success: true,
      user: user
    });
  }else{
    console.log("User not found")
    return res.status(404).send({
      success: false,
      message: 'User not found'
    });
  }
}
const login=async(req,res)=>{ 
  console.log("Body ", req.body);
  const user=await userModel.findOne({ username: req.body.username })
  if(user){
    if(await bcrypt.compare(req.body.password, user.password)){
      const id=user._id
      const token = jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:3000000
      });
      console.log(token)
      return res.status(200).send({
        success: true,
        accessToken: token,
        message: 'Correct Details',
        user: user
      });


    }else{
      return res.status(404).send({
        success: false,
        message: 'Error: Email and Pass Dont Match'
      });
    }

    
  }else{
    console.log("Invalid User");
        return res.status(404).send({
          success: false,
          message: 'User not exists'
        });

  }
}
module.exports = {
  createuser,
  getusers,
  getuserbyname,
  login
};

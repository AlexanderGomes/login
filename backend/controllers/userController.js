const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/usermodel')

//@desc Register new user
//@router POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
     const {name, email, password} = req.body
     if(!name || !email || !password) {
        res.status(400).json({message: 'fill all fields'})
     }
     
     const userExists = await User.findOne({email})
     if(userExists) {
        res.status(400).json('user already exists')
     }

     //hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)


     //create user
     const user = await User.create({
        name, email, password:hashedPassword
     })

     if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
     } else {
        res.status(400).json('invalid user data')
     }
})

//@desc Authenticate a user
//@router POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
     const {email, password} = req.body
     const user = await User.findOne({email})

     if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
     } else {
        res.status(400).json('invalid credentials')
     }

})


//geretate token
 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
 }


//@desc get user data
//@router GET /api/me
//@access private
const getMe = asyncHandler (async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)


    res.status(200).json({id:_id, name, email})
})

const all = asyncHandler(async(req, res) => {
   const user = await User.find({})
   res.json(user)
})


const followUser = asyncHandler(async(req, res) => {
   if( req.body.userId !== req.params.id) {
     try {
 
       const user = await User.findById(req.params.id)
       const currentUser = await User.findById(req.body.userId)
 
      if(!user.followers.includes(req.body.userId)) {
       await user.updateOne({$push: {followers: req.body.userId}})
       await currentUser.updateOne({$push: {followings: req.params.id}})
       res.status(200).json("user has been followed")
      } else {
       res.status(403).json('you already follow this person')
      }
     } catch (error) {
       res.status(500).json(error)
     }
   } else {
     res.status(400).json('cannot follow yourself')
   }
 });


const unfollowUser = asyncHandler(async(req, res) => {
   if(req.body.userId !== req.params.id) {
     try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
 
      if(user.followers.includes(req.body.userId)) {
       await user.updateOne({$pull: {followers: req.body.userId}})
       await currentUser.updateOne({$pull: {followings: req.params.id}})
       res.status(200).json("user has been unfollowed")
      } else {
       res.status(403).json('you are not following this person')
      }
     } catch (error) {
      res.status(500).json(error)
      
     }
  } else {
      res.status(400).json('cannot unfollow yourself')
  }
 });
 

const updateUser = asyncHandler(async(req, res) => {

   if(req.body.userId === req.params.id) {
     if(req.body.password) {
       try {
         const salt = await bcrypt.genSalt(10)
         req.body.password = await bcrypt.hash(req.body.password, salt)
       } catch (error) {
         return res.status(400).json(error)
       }
     }
     try {
       const user = await User.findByIdAndUpdate(req.params.id, {
         $set: req.body,
         $set: req.file,
       });
         res.status(200).json('account updated')
     } catch (error) {
         return res.status(400).json(error)
     }
     } else {
         return res.status(400).json('get out')
     }
 
 });

 const getUser = asyncHandler(async (req, res) => {
   try {
     const user = await User.findById(req.params.id)
     res.status(200).json(user)

 } catch (error) {
     res.status(400).json(error)
 }
 });
 

module.exports = {
    registerUser,
    loginUser,
    getMe,
    all,
    followUser,
    unfollowUser,
    updateUser,
    getUser
}
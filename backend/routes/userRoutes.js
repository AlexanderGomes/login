const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, all, followUser, unfollowUser, updateUser, getUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')   


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/all',all )
router.get('/me', protect, getMe)


module.exports = router
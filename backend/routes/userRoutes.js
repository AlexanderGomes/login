const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, all, followUser, unfollowUser, updateUser, getUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')   


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/all',all )
router.get('/me', protect, getMe)
router.route('/:id/follow').put(followUser)
router.route('/:id/unfollow').put(unfollowUser)
router.route('/:id/update').put(updateUser)
router.get('/:id/single', getUser)


module.exports = router
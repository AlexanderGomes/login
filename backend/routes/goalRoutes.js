const express = require('express')
const router = express.Router()

const {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
    like__deslike__post,
    getTimelinePosts,
    getAllGoals
  } = require('../controllers/goalController')


  const { protect } = require('../middleware/authMiddleware')
router.route('/:id/like').put(like__deslike__post)
router.route('/timeline/all').get(getTimelinePosts)
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)
router.get('/all', getAllGoals)


module.exports = router
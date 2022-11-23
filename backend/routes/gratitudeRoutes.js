const express = require('express')
const router = express.Router()
const { getGratitude, setGratitude, updateGratitude, deleteGratitude } = require('../controllers/gratitudeController')

const {protect} = require('../middleware/authMiddleware')

// cleaned routes into one-liners
router.route('/').get(protect, getGratitude).post(protect, setGratitude)

router.route('/:id').put(protect, updateGratitude).delete(protect, deleteGratitude)


module.exports = router
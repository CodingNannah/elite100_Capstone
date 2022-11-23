const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    getMe,
    editUser,
    deleteUser
} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

// register - post
router.post('/', registerUser)
// log in - post
router.post('/login', loginUser)
// get - get
router.get('/me', protect, getMe)
// // edit/update - put
router.put('/me', protect, editUser)
// // delete
router.delete('/me', protect, deleteUser)

// // log out
// router.get('/', logoutUser)


module.exports = router
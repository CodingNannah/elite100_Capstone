const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register a new user
// @route POST /api/users
// @access Public
// Wrap the entire async with asyncHandler
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields.')
    }

    // Check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists. Try logging in.')
    }

    // Hash password - default 10
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword 
    })

    // Check
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data. Guest Not Registered.')
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for User email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials. No permission granted.')
    }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById()
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// @desc Edit/update a user
// @route PUT /api/users/:id
// @access Private
const editUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found!')
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedUser)
})

// @desc Delete User
// @route DELETE /api/user/:id
// @access Private (after auth)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found!')
    }
    // no need to save it to a variable!
    await User.deleteOne()

    res.status(200).json({id: req.params.id})
})


// @desc Log out a user
// @route GET /api/users
// @access Private
// const logoutUser = asyncHandler(async(req, res) => {
//     res.json({message: 'Log Out User'}) 
//  })


// Generate a JWT (Token)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '14d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe,
    editUser,
    deleteUser
}
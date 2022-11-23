// Mongoose uses async/await
const asyncHandler = require('express-async-handler')

const Goal = require('../models/gratitudeModel')
const User = require('../models/userModel')

// @desc Get Gratitude 
// @route GET /api/gratitude
// @access Private (after auth)
const getGratitude = asyncHandler(async (req, res) => {
    const thanks = await Gratitude.find({user: req.user.id})

    res.status(200).json(thanks)
})

// @desc Set Gratitude
// @route POST /api/thanks
// @access Private (after auth)
// check setGratitude
const setGratitude = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add something you are grateful for.')
    }
    const gratitude = await Gratitude.create({
        text: req.body.text
    })
    res.status(200).json(gratitude)
})

// @desc Update Thanks
// which?
    // @route PUT /api/thanks/:id
    // @route PUT /api/gratitude/:id
// @access Private (after auth)
const updateGratitude = asyncHandler(async (req, res) => {
    const gratitude = await Gratitude.findById(req.params.id)
    if(!gratitude){
        res.status(400)
        throw new Error('Gratitude not found!')
    }
    const user = await User.findById(req.user.id)
    // Check for User
    if(!user) {
        res.status(401)
        throw new Error('Gratitude not found.')
    }
    // Check matching ids for changing the goal
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }

    const updatedGratitude = await Gratitude.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedGratitude)
})

// @desc Delete Thanks
// @route DELETE /api/thanks/:id
// @access Private (after auth)
const deleteGratitude = asyncHandler(async (req, res) => {
    const gratitude = await Gratitude.findById(req.params.id)
    if(!gratitude){
        res.status(400)
        throw new Error('Gratitude not found!')
    }
    // no need to save it to a variable!
    await Gratitude.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGratitude,
    setGratitude,
    updateGratitude,
    deleteGratitude
}
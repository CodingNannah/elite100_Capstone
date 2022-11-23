// Mongoose uses async/await
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc Get Goals
// @route GET /api/goals
// @access Private (after auth)
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc Set Goal
// @route POST /api/goals
// @access Private (after auth)
// check setGoal
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a goal.')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private (after auth)
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found!')
    }
    const user = await User.findById(req.user.id)
    // Check for User
    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }
    // Check matching ids for changing the goal
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }


    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedGoal)
})

// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private (after auth)
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found!')
    }
    const user = await User.findById(req.user.id)
    // Check for User
    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }
    // Check matching ids for changing the goal
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized.')
    }
    // no need to save it to a variable!
    await Goal.deleteOne()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
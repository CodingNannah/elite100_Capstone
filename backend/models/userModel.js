const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, ("Please add your name.")]
    },
    email: {
        type: String, 
        required: [true, ("Please use a valid email.")],
        unique: true
    },
    password: {
        type: String, 
        required: [true, ("Please create your password.")]
    },
    // guest: {
    //     type: String, 
    //     required: [true, ("Please add your name.")]
    // },
    // admin: {
    //     type: String, 
    //     required: [true, ("Please add your name.")]
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
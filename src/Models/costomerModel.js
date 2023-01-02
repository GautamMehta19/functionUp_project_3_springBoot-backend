const mongoose = require('mongoose')


const costomerSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true
    },

    lname: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        enum: ['regular', 'gold', 'platinum'],
        default: 'regular',
        lowercase: true
    },

    totalOrder: {
        type: Number,
        default: 0
    }

}, { timestamp: true })

module.exports = mongoose.model('costomer', costomerSchema)
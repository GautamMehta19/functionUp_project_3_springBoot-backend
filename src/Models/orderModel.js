const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    order: {
        type: Boolean,
        require: true
    }

}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)
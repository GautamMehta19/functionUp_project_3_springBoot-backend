const orderModel = require('../Models/orderModel')
const customerModel = require('../Models/customerModel')
const valid = require('../validation/valid')


const createOrder = async function (req, res) {
    try {

        let data = req.body
        let customerId = req.params.customerId

        if (!valid.isValidObjectId(customerId)) {
            return res.status(400).send({
                status: false,
                message: "the given customerId is invalid"
            })
        }
        const { productId, order } = data

        if(Object.keys(data).length == 0){
            return res.status(400).send({
                status: false,
                message: 'body should not be empty'
            })
        }

        if (!productId) {
            return res.status(400).send({
                status: false,
                message: "productId must be present"
            })
        }

        if (!valid.isValid(order)) {
            return res.status(400).send({
                status: false,
                message: "order must be present and it could be only true value "
            })
        }

        if (order != true && order != "true") {
            return res.status(400).send({
                status: false,
                message: "order must be present and it could be only true value "
            })
        }

        let customer = await customerModel.findOne({ _id: customerId })

        if (!customer) {
            return res.status(404).send({
                status: false,
                message: "this customer id have not any order",
            })
        }

        if (customer.totalOrder == 8 || customer.totalOrder == "8") {
            let update = await customerModel.findByIdAndUpdate({ _id: customerId }, { $inc: { totalOrder: +1 } }, { new: true, upsert: true })
            return res.status(201).send({
                status: true,
                message: "You have placed 9 orders with us. Buy one more stuff and you will be promoted to Gold customer and enjoy 10% discounts!",
                data: update
            })
        }

        if (customer.totalOrder >= 9 && customer.totalOrder < 19) {
            let updatedData = await customerModel.findByIdAndUpdate({ _id: customerId }, { category: 'gold', $inc: { totalOrder: +1 } }, { new: true })
            return res.status(201).send({
                status: true,
                message: " You are promoted to gold category and also have 10% discount on each product's price",
                data: updatedData
            })
        }

        if (customer.totalOrder >= 19) {
            let updatedData = await customerModel.findByIdAndUpdate({ _id: customerId }, { category: 'platinum', $inc: { totalOrder: +1 } }, { new: true })
            return res.status(201).send({
                status: true,
                message: "You are promoted to platinum category also have 20% discount on each product's price ",
                data: updatedData
            })
        }

        let createdOrder = await orderModel.create(data)

        let update = await customerModel.findByIdAndUpdate({ _id: customerId }, { $inc: { totalOrder: +1 } }, { new: true, upsert: true })
        return res.status(201).send({
            status: true,
            message: "order successfully created",
            data: update
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = { createOrder }
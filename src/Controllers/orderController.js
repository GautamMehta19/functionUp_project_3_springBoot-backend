const orderModel = require('../Models/orderModel')
const costomerModel = require('../Models/costomerModel')
const valid = require('../validation/valid')


const createOrder = async function (req, res) {
    try {

        let data = req.body
        let costomerId = req.params.costomerId

        if (!valid.isValidObjectId(costomerId)) {
            return res.status(400).send({
                status: false,
                message: "the given costomerId is invalid"
            })
        }
        const { productId, order } = data

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

        let costomer = await costomerModel.findOne({ _id: costomerId })

        if (!costomer) {
            return res.status(404).send({
                status: false,
                message: "this costomer id have not any order",
            })
        }

        if (costomer.totalOrder == 8 || costomer.totalOrder == "8") {
            let update = await costomerModel.findByIdAndUpdate({ _id: costomerId }, { $inc: { totalOrder: +1 } }, { new: true, upsert: true })
            return res.status(201).send({
                status: true,
                message: "You have placed 9 orders with us. Buy one more stuff and you will be promoted to Gold customer and enjoy 10% discounts!",
                data: update
            })
        }

        if (costomer.totalOrder >= 9 && costomer.totalOrder < 19) {
            let updatedData = await costomerModel.findByIdAndUpdate({ _id: costomerId }, { category: 'gold', $inc: { totalOrder: +1 } }, { new: true })
            return res.status(201).send({
                status: true,
                message: " You are promoted to gold category and also have 10% discount on each product's price",
                data: updatedData
            })
        }

        if (costomer.totalOrder >= 19) {
            let updatedData = await costomerModel.findByIdAndUpdate({ _id: costomerId }, { category: 'platinum', $inc: { totalOrder: +1 } }, { new: true })
            return res.status(201).send({
                status: true,
                message: "You are promoted to platinum category also have 20% discount on each product's price ",
                data: updatedData
            })
        }

        let createdOrder = await orderModel.create(data)

        let update = await costomerModel.findByIdAndUpdate({ _id: costomerId }, { $inc: { totalOrder: +1 } }, { new: true, upsert: true })
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
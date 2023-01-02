const productModel = require('../Models/productModel')
const valid = require('../validation/valid.js')

const createProduct = async function (req, res) {
    try {

        let data = req.body
        let costomerId = req.params.costomerId

        if (!valid.isValidObjectId(costomerId)) {
            return res.status(400).send({
                status: false,
                message: "the given costomerId is invalid"
            })
        }

        const { name, price } = data

        if (!valid.isValid(name)) {
            return res.status(400).send({
                status: false,
                message: "name is required"
            })
        }

        if (!valid.isValid(price)) {
            return res.status(400).send({
                status: false,
                message: "price is required"
            })
        }

        if (!valid.priceValidationRegex(price)) {
            return res.status(400).send({
                status: false,
                message: "please enter a valid price"
            })
        }


        let createdProduct = await productModel.create(data)
        return res.status(201).send({
            status: true,
            message: "product sucessfully created",
            data: createdProduct
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = { createProduct }
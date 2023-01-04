const costomerModel = require('../Models/costomerModel')
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

        if(Object.keys(data).length == 0){
            return res.status(400).send({
                status: false,
                message: 'body should not be empty'
            })
        }

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

        let discount 

        let costomer = await costomerModel.findById({_id : costomerId})

        if(!costomer){
            return res.status(404).send({
                status: false,
                message: "costomer not exists in the database",
            })
        }
        if(costomer.category == 'gold'){
            discount = (price*10)/100
            data.discount = discount
        }

        if(costomer.category == 'platinum'){
            discount = (price*20)/100
            data.discount = discount
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
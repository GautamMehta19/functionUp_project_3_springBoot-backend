const express = require("express")
const Router = express.Router()
const costomerController = require('../Controllers/costomerController')
const productController = require('../Controllers/productController')
const orderController = require('../Controllers/orderController')


Router.post('/createCostomer', costomerController.createCostomer)
Router.post('/createProduct/:costomerId', productController.createProduct)
Router.post('/createOrder/:costomerId', orderController.createOrder)

Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router
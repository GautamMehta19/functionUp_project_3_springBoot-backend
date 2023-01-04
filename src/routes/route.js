const express = require("express")
const Router = express.Router()
const customerController = require('../Controllers/customerController')
const productController = require('../Controllers/productController')
const orderController = require('../Controllers/orderController')


Router.post('/createCustomer', customerController.createCustomer)
Router.get('/getCustomer/:customerId', customerController.getCustomer)

Router.post('/createProduct/:customerId', productController.createProduct)
Router.post('/createOrder/:customerId', orderController.createOrder)

Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router
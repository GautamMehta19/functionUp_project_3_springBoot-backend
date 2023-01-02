const costomertModel = require('../Models/costomerModel.js')
const valid = require('../validation/valid.js')


const createCostomer = async function (req, res) {
    try {

        let data = req.body

        const { fname, lname, category, totalOrder } = data

        if (!valid.isValid(fname)) {
            return res.status(400).send({
                status: false,
                message: 'fname is required'
            })
        }

        if (!valid.nameValidationRegex(fname)) {
            return res.status(400).send({
                status: false,
                message: 'fname contain only alphabets'
            })
        }

        if (!valid.isValid(lname)) {
            return res.status(400).send({
                status: false,
                message: 'lname is required'
            })
        }

        if (!valid.nameValidationRegex(lname)) {
            return res.status(400).send({
                status: false,
                message: 'lname contain only alphabets'
            })
        }


        if (category) {
            if (category != 'regular' && category != 'gold' && category != 'platinum') {
                return res.status(400).send({
                    status: false,
                    message: 'category should be only regular, gold, platinum'
                })
            }
        }

        if (totalOrder) {
            return res.status(400).send({
                status: false,
                message: "You cant give totalOrder You can create without using totalOrder key"
            })
        }

        let createdCostomer = await costomertModel.create(data)
        return res.status(201).send({
            status: true,
            message: 'costomer suceesfully created',
            data: createdCostomer
        })

    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

module.exports = { createCostomer }
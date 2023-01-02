const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof (value) == "undefined" || typeof (value) == null) {
        return false
    }

    if (typeof (value) == "string" && (value).trim().length == 0) {
        return false
    }

    return true
}

const isValidObjectId = function (value) {
    return mongoose.Types.ObjectId.isValid(value)

}


const nameValidationRegex = function (value) {
    return /^[a-zA-Z -._\s]*$/.test(value)
}

const priceValidationRegex = function (value) {
    return /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(value)
}



module.exports = { isValid, nameValidationRegex, isValidObjectId, priceValidationRegex }

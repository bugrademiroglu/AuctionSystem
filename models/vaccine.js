const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vaccineSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: int,
        required = true
    }


}, {timestamps: true})

const Vaccine = mongoose.model('Vaccine',vaccineSchema)

module.exports = Vaccine
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema({

    username: {
        type: String
    },
    vaccinename: {
        type: String,
        required :true
    },
    price: {
        type: String,
        required: true
    },
  
    expire_at: {type: Date, default: Date.now, expires: 150}

}, {timestamps: true})

const Auction = mongoose.model('Auction',auctionSchema)

module.exports = Auction
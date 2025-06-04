const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    // basic info
    name: {
        type: String, required: true,
    },
    description: String,

    // images
    mainImage: {
        type: String, required: true
    },
    otherImages: [String],

    // additional info
    color: [String],
    brand: String,
    material: [String],
    care: String,

    // purchase info
    purchasePrice: Number,
    purchaseDate: Date,
    origin: {
        type: {
            originType: { type: String, required: true }, // new or secondhand
            store: String
        },
        required: false
    },

    // metadata
    category: {
        type: String, required: true
    },
    categoryTags: {
        type: [String], default: [], required: true
    },
    archived: {
        type: Boolean, default: false, required: true
    }
})

const Items = mongoose.model('Item', ItemSchema)

module.exports = Items
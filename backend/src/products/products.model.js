const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
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
        type: [String], required: true
    },
    archived: {
        type: Boolean, default: false, required: true
    }
})

const Products = mongoose.model('Product', ProductSchema)

module.exports = Products
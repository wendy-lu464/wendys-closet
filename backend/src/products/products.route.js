const express = require('express')
const Products = require('./products.model')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const router = express.Router()

// create product
router.post('/create-product', async (req, res) => {
    try {
        const newProduct = new Products({
            ...req.body
        })
        const savedProduct = await newProduct.save()
        res.status(201).send(savedProduct)
    } catch (error) {
        msg = 'Error creating new product'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// get all products
router.get('/', async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query

        let filter = {}
        if (category && category !== 'all') {
            filter.category = category
        }
        if (color && color !== 'all') {
            filter.color = color
        }
        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice)
            const max = parseFloat(maxPrice)
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max }
            }
        }
        const skip = (parseInt(page) - 1) * parseInt(limit)
        const totalProducts = await Products.countDocuments(filter)
        const totalPages = Math.ceil(totalProducts / parseInt(limit))
        const products = await Products
            .find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('author', 'email')
            .sort({ createAt: -1 })

        res.status(200).send({ products, totalPages, totalProducts })
    } catch (error) {
        msg = 'Error fetching products'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// get single product
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Products.findById(productId).populate('author', 'email username')
        if (!product) {
            return res.status(404).send({ message: 'Product not found' })
        }
        res.status(200).send({ product })
    } catch (error) {
        msg = 'Error fetching product'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// update a product
router.patch('/update-product/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id
        const updatedProduct = await Products.findByIdAndUpdate(productId, { ...req.body }, { new: true })

        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' })
        }

        res.status(200).send({
            message: 'Product updated successfully',
            product: updatedProduct
        })
    } catch (error) {
        msg = 'Error updating product'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// delete a product
router.delete('/:id', async (req, res) => { // TODO: add verifyToken?
    try {
        const productId = req.params.id
        const deletedProduct = await Products.findByIdAndDelete(productId)

        if (!deletedProduct) {
            return res.status(404).send({ message: 'Product not found' })
        }

        res.status(200).send({ message: 'Product deleted successfully' })
    } catch (error) {
        msg = 'Error deleting product'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// get related products
router.get('/related/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ message: 'Product ID required' })
        }
        const product = await Products.findById(id)
        if (!product) {
            return res.status(404).send({ message: 'Product not found' })
        }

        const titleRegex = new RegExp(
            product.name.split(' ')
                .filter((word) => word.length > 1)
                .join('|')
            , 'i'
        )

        const relatedProducts = await Products.find({
            _id: { $ne: id }, // exclude current product
            $or: [
                { name: { $regex: titleRegex } }, // match similar names
                { category: product.category } // match category
            ]
        })

        res.status(200).send(relatedProducts)
    } catch (error) {
        msg = 'Error fetching related products'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

module.exports = router
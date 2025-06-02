const express = require('express')
const Items = require('./items.model')
const verifyToken = require('../middleware/verifyToken')
const verifyAdmin = require('../middleware/verifyAdmin')
const router = express.Router()

// create item
router.post('/create-item', async (req, res) => {
    try {
        const newItem = new Items({
            ...req.body
        })
        const savedItem = await newItem.save()
        res.status(201).send(savedItem)
    } catch (error) {
        msg = 'Error creating new item'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// get all items
router.get('/', async (req, res) => {
    try {
        const { category, color, minPurchasePrice, maxPurchasePrice, archived, page = 1, limit = 10 } = req.query

        let filter = {}
        if (category && category !== 'all') {
            filter.category = category
        }
        if (color && color !== 'all') {
            filter.color = color
        }
        if (archived && archived !== '') {
            filter.archived = (archived === 'true') // string to bool
        }

        const skip = (parseInt(page) - 1) * parseInt(limit)
        const totalItems = await Items.countDocuments(filter)
        const totalPages = Math.ceil(totalItems / parseInt(limit))
        const items = await Items
            .find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createAt: -1 })

        res.status(200).send({ items, totalPages, totalItems })
    } catch (error) {
        msg = 'Error fetching items'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// get single item
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id
        const item = await Items.findById(itemId)
        if (!item) {
            return res.status(404).send({ message: 'Item not found' })
        }
        res.status(200).send({ item })
    } catch (error) {
        msg = 'Error fetching item'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// update a item
router.patch('/update-item/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const itemId = req.params.id
        const updatedItem = await Items.findByIdAndUpdate(itemId, { ...req.body }, { new: true })

        if (!updatedItem) {
            return res.status(404).send({ message: 'Item not found' })
        }

        res.status(200).send({
            message: 'Item updated successfully',
            item: updatedItem
        })
    } catch (error) {
        msg = 'Error updating item'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// delete a item
router.delete('/:id', async (req, res) => { // TODO: add verifyToken?
    try {
        const itemId = req.params.id
        const deletedItem = await Items.findByIdAndDelete(itemId)

        if (!deletedItem) {
            return res.status(404).send({ message: 'Item not found' })
        }

        res.status(200).send({ message: 'Item deleted successfully' })
    } catch (error) {
        msg = 'Error deleting item'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

// get related items
router.get('/related/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ message: 'Item ID required' })
        }
        const item = await Items.findById(id)
        if (!item) {
            return res.status(404).send({ message: 'Item not found' })
        }

        const titleRegex = new RegExp(
            item.name.split(' ')
                .filter((word) => word.length > 1)
                .join('|')
            , 'i'
        )

        const relatedItems = await Items.find({
            _id: { $ne: id }, // exclude current item
            $or: [
                { name: { $regex: titleRegex } }, // match similar names
                { category: item.category } // match category
            ]
        })

        res.status(200).send(relatedItems)
    } catch (error) {
        msg = 'Error fetching related items'
        console.error(msg, error)
        res.status(500).send({ message: msg })
    }
})

module.exports = router
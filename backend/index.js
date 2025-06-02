const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 5000

// Middleware setup
app.use(express.json({ limit: '25mb' }))
app.use((express.urlencoded({
  limit: '25mb',
  extended: true
})))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// Routes
const authRoutes = require('./src/users/user.route')
const itemRoutes = require('./src/items/items.route')

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)

main()
  .then(() => console.log("mongodb is connected"))
  .catch(err => console.log(err))

async function main() {
  await mongoose.connect(process.env.DB_URL)
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

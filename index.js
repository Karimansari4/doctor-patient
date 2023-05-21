const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./config.js/db')
const docRouter = require('./routes/Doctor')
const patRouter = require('./routes/Patient')
dotenv.config()
const port = process.env.PORT

db()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/doctors', docRouter)
app.use('/patients', patRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
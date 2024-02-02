const express = require('express')
const app = express()
const cors = require('cors')
const proxy = require('express-http-proxy')

app.use(cors())
app.use(express.json())

// redirecting to the specific services via proxy
app.use('/customer', proxy('https://micro-customer.onrender.com'))
app.use('/shopping', proxy('https://micro-shopping.onrender.com'))
app.use('/',proxy('https://micro-product.onrender.com'))

app.listen(8000, () => {
    console.log('gateway on port 8000')
})
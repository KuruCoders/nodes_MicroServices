const express = require('express')
const app = express()
const cors = require('cors')
const proxy = require('express-http-proxy')

app.use(cors())
app.use(express.json())

// redirecting to the specific services via proxy
app.use('/customer', proxy('http://localhost:8001'))
app.use('/shopping', proxy('http://localhost:8003'))
app.use('/',proxy('http://localhost:8002'))

app.listen(8000, () => {
    console.log('gateway on port 8000')
})
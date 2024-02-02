const express = require('express')
const app = express()
app.use(express.json())

app.use('/', (req, res, next) => {
    return res.json({
        'msg':'gateway online'
    })
})
app.listen(8002, () => {
    console.log('product on port 8002')
})
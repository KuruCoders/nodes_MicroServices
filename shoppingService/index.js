const express = require('express')
const app = express()
app.use(express.json())

app.use('/', (req, res, next) => {
    return res.json({
        'msg':'on shopping service'
    })
})
app.listen(8003, () => {
    console.log('shopping on port 8003')
})
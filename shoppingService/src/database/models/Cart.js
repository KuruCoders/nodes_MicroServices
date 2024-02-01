const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema =new Schema({
    customerID: { type: String },
    items: [
        {
            product: {
                _id: { type:String,require:true},
                name: { type:String,require:true},
                desc: { type:String,require:true},
                banner: { type:String,require:true},
                type: { type:String,require:true},
                unit: { type:Number,require:true},
                price: { type:Number,require:true},
                supplier: { type:String,require:true},
            },
            unit:{type:Number,require:true}
        }
    ]
})

module.exports = mongoose.model('cart',CartSchema)
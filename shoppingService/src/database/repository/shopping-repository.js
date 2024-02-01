const { CustomerModel, ProductModel, OrderModel, CartModel } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { APIError, BadRequestError } = require('../../utils/app-errors')


//Dealing with data base operations
class ShoppingRepository {

    // payment

    async Orders(customerId) {
        try {
            const orders = await OrderModel.find({ customerId }).populate('items.product');
            return orders;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Orders')
        }
    }

    async CreateNewOrder(customerId, txnId) {

        //check transaction for payment Status

        try {
            const cart = await CartModel.findById({ customerId }).populate('cart.product');

            if (cart) {

                let amount = 0;

                let cartItems = profile.cart;

                if (cartItems.length > 0) {
                    //process Order
                    cartItems.map(item => {
                        amount += parseInt(item.product.price) * parseInt(item.unit);
                    });

                    const orderId = uuidv4();

                    const order = new OrderModel({
                        orderId,
                        customerId,
                        amount,
                        txnId,
                        status: 'received',
                        items: cartItems
                    })

                    cart.items = [];

                    const orderResult = await order.save();
                    await cart.save();

                    return orderResult;
                }
            }

            return {}

        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category')
        }


    }

    async Cart(customerId) {
        try {
            const cartItems = await CartModel.find({ customerID })
            if (cartItems) return cartItems
            throw new Error('Data not Found')
        } catch (err) {
            throw err
        }
    }

    async AddCartItem(customerId, item, qty, isRemove) {
        try {
            const cart = await CartModel.findOne({ customerId })
            const { _id } = item
            if (cart) {
                let isExist = false
                let cartItems = cart.items

                if (cartItems.length > 0) {
                    cartItems.map((item) => {
                        if (item.product._id.toString() === product._id.toString()) {
                            if (isRemove) {
                                cartItems.splice(cartItems.indexOf(item), 1);
                            } else {
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });


                }
                if (!isExist && !isRemove) {
                    cartItems.push({ product: { ...item }, unit: qty });
                }
                cart.items = cartItems
                return await cart.save();
            } else {
                return await CartModel.create({
                    customerID,
                    items: [{ product: { ...item }, unit: qty }]
                })
            }
        } catch (err) {
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Create Customer"
            );
        }
    }
}

module.exports = ShoppingRepository;
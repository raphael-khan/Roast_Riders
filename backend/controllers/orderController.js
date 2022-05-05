import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

//@desc   Create new order
//@route  POST /api/orders
//@access  Private
//@asyncHandler helps catch errors without the Try block.

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    addOrderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
    return
  } else {
    const order = new Order({
      addOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

export { addOrderItems }
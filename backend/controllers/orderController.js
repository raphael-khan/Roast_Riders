import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

//@desc   Create new order
//@route  POST /api/orders
//@access  Private
//@asyncHandler helps catch errors without the Try block.

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
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
      orderItems,
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

//@desc   Get order by ID.
//@route  GET /api/orders/:id
//@access  Private
//@asyncHandler helps catch errors without the Try block.

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

//@desc   Update order to paid.
//@route  PUT /api/orders/:id/pay
//@access  Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_Time: req.body.updateTime,
      email_address: req.body.payer.emailAddress,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export { addOrderItems, getOrderById, updateOrderToPaid }

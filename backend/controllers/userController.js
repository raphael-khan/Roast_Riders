import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

//@desc   Auth user & get token
//@route  POST /api/users/login
//@access  Public.
//@asyncHandler helps catch errors without the Try block.

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

//@desc   GET user profile.
//@route  GET /api/users/profile.
//@access  Private.

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) //current logged in user.

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export { authUser, getUserProfile }

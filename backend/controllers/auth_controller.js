import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const registerUser = async (req, res) => {
  const { email, password, name } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ message: 'User already exists' })

  const user = await User.create({ email, password, name })
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json({ _id: user._id, email: user.email, name: user.name })
}

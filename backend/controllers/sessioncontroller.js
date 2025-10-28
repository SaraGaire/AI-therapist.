import Session from '../models/Session.js'
import Message from '../models/Message.js'

export const createSession = async (req, res) => {
  const session = await Session.create({ userId: req.user._id })
  res.status(201).json(session)
}

export const getUserSessions = async (req, res) => {
  const sessions = await Session.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
  res.json(sessions)
}

export const getSessionById = async (req, res) => {
  const { id } = req.params
  const session = await Session.findById(id).populate('messages')
  if (!session) return res.status(404).json({ message: 'Session not found' })
  res.json(session)
}

export const deleteSession = async (req, res) => {
  const { id } = req.params
  await Message.deleteMany({ sessionId: id })
  await Session.findByIdAndDelete(id)
  res.json({ message: 'Session deleted successfully' })
}

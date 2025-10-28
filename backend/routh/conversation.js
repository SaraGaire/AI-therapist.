import express from 'express'
import { sendMessage } from '../controllers/conversationController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, sendMessage)

export default router

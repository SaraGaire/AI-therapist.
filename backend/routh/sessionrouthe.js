import express from 'express'
import {
  createSession,
  getUserSessions,
  getSessionById,
  deleteSession,
} from '../controllers/sessionController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(protect, getUserSessions)
  .post(protect, createSession)

router.route('/:id')
  .get(protect, getSessionById)
  .delete(protect, deleteSession)

export default router

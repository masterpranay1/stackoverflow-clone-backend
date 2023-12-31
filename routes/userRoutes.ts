import express from 'express'
const router = express.Router()
import { registerUser, loginUser, getMe } from '../controller/userController'
import { protect } from '../middleware/authMiddleware'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

export default router

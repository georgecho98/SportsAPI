import express from 'express';
const router = express.Router();
import {
  saveTeam,
  deleteTeam
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../services/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').put(authenticateToken, saveTeam);

// router.route('/login').post(login);

// router.route('/me').get(authenticateToken, getSingleUser);

router.route('/Team/:teamId').delete(authenticateToken, deleteTeam);

export default router;

import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { 
    getNotifications,
    deleteNotifications, 
    // deletOneNotif 
} from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotifications);
// router.delete('/:id', protectRoute, deletOneNotif);
export default router;
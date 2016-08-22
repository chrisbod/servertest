import express from 'express';
import userRoutes from './user';
import shoutRoutes from './shout';
import activityRoutes from './activity';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/shouts', shoutRoutes);
router.use('/activities', activityRoutes);

export default router;

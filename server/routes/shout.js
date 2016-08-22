import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import shoutCtrl from '../controllers/shout';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
  /** GET /api/shouts - Get list of shouts */
  .get(shoutCtrl.list)

  /** POST /api/shouts - Create new shout */
  .post(validate(paramValidation.createShout), shoutCtrl.create);

router.route('/:shoutId')
  /** GET /api/shouts/:shoutId - Get shout */
  .get(shoutCtrl.get)

  /** PUT /api/shouts/:shoutId - Update shout */
  .put(validate(paramValidation.updateShout), shoutCtrl.update)

  /** DELETE /api/shouts/:shoutId - Delete shout */
  .delete(shoutCtrl.remove);

/** Load shout when API with shoutId route parameter is hit */
router.param('shoutId', shoutCtrl.load);

export default router;

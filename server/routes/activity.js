import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import activityCtrl from '../controllers/activity';

const router = express.Router();  // eslint-disable-line new-cap

router.route('/')
  /** GET /api/activities - Get list of activities */
  .get(activityCtrl.list)

  /** POST /api/activities - Create new activity */
  .post(validate(paramValidation.createActivity), activityCtrl.create);

router.route('/:activityId')
  /** GET /api/activities/:activityId - Get activity */
  .get(activityCtrl.get)

  /** PUT /api/activities/:activityId - Update activity */
  .put(validate(paramValidation.updateActivity), activityCtrl.update)

  /** DELETE /api/activities/:activityId - Delete activity */
  .delete(activityCtrl.remove);

/** Load activity when API with activityId route parameter is hit */
router.param('activityId', activityCtrl.load);

export default router;

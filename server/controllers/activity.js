import Activity from '../models/activity';

/**
 * Load activity and append to req.
 */
function load(req, res, next, id) {
  Activity.get(id).then((activity) => {
    req.activity = activity;    // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get activity
 * @returns {Activity}
 */
function get(req, res) {
  return res.json(req.activity);
}

/**
 * Create new activity
 * @property {string} req.body.username - The username of activity.
 * @property {string} req.body.mobileNumber - The mobileNumber of activity.
 * @returns {Activity}
 */
function create(req, res, next) {
  const activity = new Activity({
    name: req.body.name,
    icon: req.body.icon
  });

  activity.saveAsync()
    .then((savedActivity) => res.json(savedActivity))
    .error((e) => next(e));
}

/**
 * Update existing activity
 * @property {string} req.body.username - The username of activity.
 * @property {string} req.body.mobileNumber - The mobileNumber of activity.
 * @returns {Activity}
 */
function update(req, res, next) {
  const activity = req.activity;
  activity.name = req.body.name;
  activity.icon = req.body.icon;

  activity.saveAsync()
    .then((savedActivity) => res.json(savedActivity))
    .error((e) => next(e));
}

/**
 * Get activity list.
 * @property {number} req.query.skip - Number of activities to be skipped.
 * @property {number} req.query.limit - Limit number of activities to be returned.
 * @returns {Activity[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Activity.list({ limit, skip }).then((activities) => res.json(activities))
    .error((e) => next(e));
}

/**
 * Delete activity.
 * @returns {Activity}
 */
function remove(req, res, next) {
  const activity = req.activity;
  activity.removeAsync()
    .then((deletedActivity) => res.json(deletedActivity))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };

import Shout from '../models/shout';

/**
 * Load shout and append to req.
 */
function load(req, res, next, id) {
  Shout.get(id).then((shout) => {
    req.shout = shout;		// eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get shout
 * @returns {Shout}
 */
function get(req, res) {
  return res.json(req.shout);
}

/**
 * Create new shout
 * @property {string} req.body.shoutname - The shoutname of shout.
 * @property {string} req.body.mobileNumber - The mobileNumber of shout.
 * @returns {Shout}
 */
function create(req, res, next) {
  const shout = new Shout({
    user_id: req.body.user_id,
    tagline: req.body.tagline
  });
  shout.saveAsync()
    .then((savedShout) => res.json(savedShout))
    .error((e) => next(e));
}

/**
 * Update existing shout
 * @property {string} req.body.shoutname - The shoutname of shout.
 * @property {string} req.body.mobileNumber - The mobileNumber of shout.
 * @returns {Shout}
 */
function update(req, res, next) {
  const shout = req.shout;
  shout.user_id = req.body.user_id;
  shout.tagline = req.body.tagline;
  shout.saveAsync()
    .then((savedShout) => res.json(savedShout))
    .error((e) => next(e));
}

/**
 * Get shout list.
 * @property {number} req.query.skip - Number of shouts to be skipped.
 * @property {number} req.query.limit - Limit number of shouts to be returned.
 * @returns {Shout[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Shout.list({ limit, skip }).then((shouts) =>	res.json(shouts))
    .error((e) => next(e));
}

/**
 * Delete shout.
 * @returns {Shout}
 */
function remove(req, res, next) {
  const shout = req.shout;
  shout.removeAsync()
    .then((deletedShout) => res.json(deletedShout))
    .error((e) => next(e));
}

export default { load, get, create, update, list, remove };

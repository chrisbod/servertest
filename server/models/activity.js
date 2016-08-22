import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Activity Schema
 */


const ActivitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: String,
  icon: String,
  parent_ids: [String]
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ActivitySchema.method({
});

/**
 * Statics
 */
ActivitySchema.statics = {
  /**
   * Get activity
   * @param {ObjectId} id - The objectId of activity.
   * @returns {Promise<Activity, APIError>}
   */
  get(id) {
    return this.findById(id)
      .execAsync().then((activity) => {
        if (activity) {
          return activity;
        }
        const err = new APIError('No such activity exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List activitys in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of activitys to be skipped.
   * @param {number} limit - Limit number of activitys to be returned.
   * @returns {Promise<Activity[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .execAsync();
  }
};

/**
 * @typedef Activity
 */
export default mongoose.model('Activity', ActivitySchema);

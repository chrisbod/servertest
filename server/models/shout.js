import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Shout Schema
 */

const ShoutPlaceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
const ShoutWeatherConditionSchema = new mongoose.Schema({
  condition_id: String,
  text: String,
  icon: String,
  emoji: String
});
const ShoutSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    place: ShoutPlaceSchema,
    date: {
      type: Date,
      default: Date.now
    },
    coords: {
      type: [Number],
      index: '2dsphere'
    },
    weather_condition: ShoutWeatherConditionSchema,
    activity_id: String,
    tagline: String,
    description: String,
    photo_ids: [String],
    video_ids: [String],
    audio_ids: [String],
    shouted: {
      share_ids: [String]
    },
    saved: Boolean
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
ShoutSchema.method({});

/**
 * Statics
 */
ShoutSchema.statics = {
    /**
     * Get Shout
     * @param {ObjectId} id - The objectId of Shout.
     * @returns {Promise<Shout, APIError>}
     */
  get(id) {
    return this.findById(id)
            .execAsync().then((Shout) => {
              if (Shout) {
                return Shout;
              }
              const err = new APIError('No such Shout exists!', httpStatus.NOT_FOUND);
              return Promise.reject(err);
            });
  },

    /**
     * List Shouts in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of Shouts to be skipped.
     * @param {number} limit - Limit number of Shouts to be returned.
     * @returns {Promise<Shout[]>}
     */
  list({
        skip = 0, limit = 50
    } = {}) {
    return this.find()
            .sort({
              date: -1
            })
            .skip(skip)
            .limit(limit)
            .execAsync();
  }
};

/**
 * @typedef Shout
 */
export
default mongoose.model('Shout', ShoutSchema);

import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },
  // POST /api/activities
  createActivity: {
    body: {
      name: Joi.string().required(),
      icon: Joi.string().required()
    }
  },

  // UPDATE /api/activities/:activityId
  updateActivity: {
    body: {
      name: Joi.string().required(),
      icon: Joi.string().required(),
    },
    params: {
      activityId: Joi.string().hex().required()
    }
  },
  // POST /api/shouts
  createShout: {
    body: {
      tagline: Joi.string().required(),
      user_id: Joi.string().required()
    }
  },

  // UPDATE /api/shout/:shoutId
  updateShout: {
    body: {
      tagline: Joi.string().required(),
      user_id: Joi.string().required(),
    },
    params: {
      shoutId: Joi.string().hex().required()
    }
  }
};

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import __modelName from './__modelName';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  
});

// DDP rate limiter
rateLimit({
  methods: [],
  limit: 5,
  timeRange: 1000,
});

import { Meteor } from 'meteor/meteor';
import __modelName from './__modelName';
import rateLimit from '../../modules/rate-limit';

// DDP rate limiter
rateLimit({
  methods: [],
  limit: 5,
  timeRange: 1000,
});
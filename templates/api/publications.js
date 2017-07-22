import { Meteor } from 'meteor/meteor';
import __modelName from '../model';

Meteor.publish('__name', function() {
  return __modelName.find({});
})

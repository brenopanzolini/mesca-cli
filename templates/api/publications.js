import { Meteor } from 'meteor/meteor';
import __modelName from '../__modelName';

Meteor.publish('__name', () => __modelName.find({}, { fields: __modelName.publicFields }));

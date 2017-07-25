import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const __modelName = new Mongo.Collection('__name');

// Schema
__modelName.schema = new SimpleSchema({

});

__modelName.attachSchema(__modelName.schema);

// Deny all client-side updates since we will be using methods to manage this collection
__modelName.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

// Public fields
__modelName.publicFields = {
  
}

export default __modelName;

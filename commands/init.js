const fs = require('fs')
    , pwd = process.cwd()
    , util = require('../utils/util');

const action = function(args, callback) {
  if(!util.isMeteorProject) {
    this.log("Run 'init' within your Meteor project!");
  } else {
    callback();
  }
}

// Export command
module.exports = (vorpal) => {
  vorpal
  .command('init', 'Initialize project for scaffolding (execute from within the project).')
  .action(action);
}

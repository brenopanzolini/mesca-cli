const fs = require('fs')
    , pwd = process.cwd();

const action = function(args, callback) {
  if(!fs.existsSync(pwd + '/.meteor')) {
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

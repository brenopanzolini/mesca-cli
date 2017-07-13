const fs = require('fs-extra')
    , path = require('path')
    , util = require('../utils/util')
    , pwd = process.cwd();

const generateDirStructure = (cmd) => {
  cmd.log("Creating base directory structure...");

  util.configs.baseDirStructure.map((dir) => {
    fs.ensureDirSync(path.resolve(pwd, dir));
    cmd.log(dir);
  });
}

const copyTemplates = (cmd) => {
  cmd.log("Copying templates to private folder...");

  fs.ensureDirSync(path.resolve(pwd, 'private/mesca/templates'));
  fs.copySync(path.resolve(__dirname, '../templates'), pwd + '/private/mesca/templates');
}

// Command action
const action = function(args, callback) {
  if(!util.isMeteorProject) {
    this.log("Run 'init' within your Meteor project!");
  } else {
    generateDirStructure(this);
    copyTemplates(this);

    this.log('Initialized and scaffolding templates under private/mesca');
    callback();
  }
}

// Export command
module.exports = (vorpal) => {
  vorpal
    .command('init', 'Initialize project for scaffolding (execute from within the project).')
    .action(action);
}

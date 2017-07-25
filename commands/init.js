const fs = require('fs-extra')
    , path = require('path')
    , util = require('../utils/util')
    , pwd = process.cwd();

const generateDirStructure = (cmd) => {
  cmd.log("Creating base directory structure");
  cmd.log('');

  util.configs.baseDirStructure.forEach((dir) => {
    fs.ensureDirSync(path.resolve(pwd, dir));
    cmd.log('     ' + dir);
  });
}

// Export command
module.exports = (vorpal) => {
  vorpal
    .command('init', 'Initialize project for scaffolding (execute from within the project).')
    .alias('i')
    .validate(function (args) {
      if(!util.isMeteorProject) {
        this.log("Run 'init' within your Meteor project");
        return false;
      }

      return true;
    })
    .action(function (args, callback) {
      generateDirStructure(this);

      this.log('');
      this.log('Successfully initialized scaffolding templates');
      callback();
    });
}

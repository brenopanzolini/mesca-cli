const fs = require('fs-extra')
    , path = require('path')
    , util = require('../utils/util')
    , pwd = process.cwd();

const generateDirStructure = (cmd) => {
  cmd.log("Creating base directory structure");
  cmd.log('');

  util.configs.baseDirStructure.map((dir) => {
    fs.ensureDirSync(path.resolve(pwd, dir));
    cmd.log('     ' + dir);
  });
}

const copyTemplates = (cmd) => {
  cmd.log('');
  cmd.log("Copying templates to private folder");

  fs.ensureDirSync(path.resolve(pwd, 'private/mesca/templates'));
  fs.copySync(path.resolve(__dirname, '../templates'), pwd + '/private/mesca/templates');
}

const removeDefaultFiles = (cmd) => {
  cmd.log('');
  cmd.log("Removing default files");
  cmd.log('');

  util.configs.deleteDefaultFiles.map((file) => {
    fs.removeSync(path.resolve(pwd, file));
    cmd.log('    ' + file);
  });
}

// Export command
module.exports = (vorpal) => {
  vorpal
    .command('init', 'Initialize project for scaffolding (execute from within the project).')
    .alias('i')
    .option('-r, --remove', 'remove all default files')
    .validate(function (args) {
      if(!util.isMeteorProject) {
        this.log("Run 'init' within your Meteor project");
        return false;
      }

      return true;
    })
    .action(function (args, callback) {
      generateDirStructure(this);
      copyTemplates(this);

      if(args.options.remove){
        removeDefaultFiles(this);
      }

      this.log('');
      this.log('Successfully initialized scaffolding templates');
      callback();
    });
}

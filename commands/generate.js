const fs = require('fs-extra')
    , path = require('path')
    , util = require('../utils/util')
    , pwd = process.cwd()
    , FileManager = require('../libs/fileManager');

const generateApi = (cmd, name) => {
  const destination = path.resolve(pwd, `imports/api/${name}`);

  if(!fs.existsSync(destination)) {
    cmd.log(`Generating Api ${name}`)
    fs.mkdirpSync(destination);

    // Generate all files
    const replaces = [{ what: '__name', for: name },
                      { what: '__modelName', for: name.charAt(0).toUpperCase() + name.slice(1) }];

    FileManager.generate(path.resolve(util.templatesFolder, 'api'), util.configs.generate.api, replaces);

    // Add publications and methods to api.js
    const apiJs = path.resolve(pwd, 'imports/api/api.js');
    fs.appendFileSync(apiJs, `import './${name}/methods.js';\n`);
    fs.appendFileSync(apiJs, `import './${name}/server/publications.js';\n\n`);
  } else {
    cmd.log(`Api ${name} already exists.`);
  }
}

// Export command
module.exports = (vorpal) => {
  vorpal
    .command('generate [what] [name]', 'Generate templates.')
    .alias('g')
    .validate(function (args) {
      if(!util.isMeteorProject) {
        this.log("Run 'generate' within your Meteor project");
        return false;
      } else if(args.what === undefined) {
        this.log("Need to inform [what] wants to generate");
        return false;
      } else if(args.name === undefined) {
        this.log("Need to inform the [name]");
        return false;
      }

      return true;
    })
    .action(function (args, callback) {
      const name = args.name.toLowerCase();

      switch(args.what.toLowerCase()) {
        case 'api':
          generateApi(this, name);
          break
      }

      callback();
    });
}

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

    // Add model, publications and methods to startup api.js file
    const apiJs = path.resolve(pwd, 'imports/startup/server/api.js');
    fs.appendFileSync(apiJs, `// ${name}\n`);
    fs.appendFileSync(apiJs, `import '../../api/${name}/methods.js';\n`);
    fs.appendFileSync(apiJs, `import '../../api/${name}/server/publications.js';\n\n`);
  } else {
    cmd.log(`Api ${name} already exists.`);
  }
}

const generateChimp = (cmd, name) => {
  const destination = path.resolve(pwd, 'tests', `${name}.js`);

  if(!fs.existsSync(destination)) {
    cmd.log(`Generating Chimp Test ${name}`);

    // Generate test file
    const replaces = [{ what: '__name', for: name },
                      { what: '__testName', for: name.charAt(0).toUpperCase() + name.slice(1) }];

    FileManager.generate(path.resolve(util.templatesFolder, 'chimp'), util.configs.generate.chimp, replaces);
  } else {
    cmd.log(`Chimp test ${name} already exists.`);    
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
          break;
        case 'chimp':
          generateChimp(this, name);
          break;
      }

      callback();
    });
}

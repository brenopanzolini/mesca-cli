const fs = require('fs-extra')
    , path = require('path')
    , util = require('../utils/util')
    , pwd = process.cwd()
    , github = require('transfer-github');

const downloadGitProject = (cmd, projectName, projectPath) => {
  let i = 0;
  const interval = setInterval(() => {
    const dots = new Array(i + 1).join(".");

    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);  // move cursor to beginning of line
    i = (i + 1) % 4;

    process.stdout.write("Downloading" + dots);
  }, 300);

  // Download GitHub project
  github.get(util.configs.gitBoilerplate, projectPath, function (err) {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (err) {
      cmd.log('Error downloading GitHub project: ' + err);
    } else {
      adjustProjectFiles(projectName, projectPath);

      cmd.log('Successfully created your project');
      cmd.log('');
      cmd.log('     cd ' + projectName);
      cmd.log('     mesca init');
      cmd.log('     meteor update');
      cmd.log('     meteor npm install');
    }
  });
}

const adjustProjectFiles = (projectName, projectPath) => {
  // Remove LICENSE and README files
  fs.removeSync(path.resolve(projectPath, 'README.md'));
  fs.removeSync(path.resolve(projectPath, 'LICENSE'));

  // Change "name" in package.json file
  const packageJsonPath = path.resolve(projectPath, "package.json");
  let packageJson = fs.readJsonSync(packageJsonPath);

  packageJson.name = projectName;
  fs.writeJsonSync(packageJsonPath, packageJson, { spaces: '\t' });
}

// Export command
module.exports = (vorpal) => {
  vorpal
    .command('create [projectName]', 'Creates a new project with the Meteor Boilerplate.')
    .alias('c')
    .validate(function (args) {
      if(args.projectName === undefined) {
        this.log('Need to inform the project [projectName]');
        return false;
      } else if(fs.existsSync(path.resolve(pwd, args.name))) {
        this.log('Directory already exists. Remove it or change the [projectName]');
        return false;
      }

      return true;
    })
    .action(function (args, callback) {
      const projectPath = path.resolve(pwd, args.projectName);
      fs.mkdirSync(projectPath);

      downloadGitProject(this, args.projectName, projectPath);
    });
}

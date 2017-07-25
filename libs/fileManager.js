const fs = require('fs-extra')
    , path = require('path')
    , util = require('../utils/util')
    , pwd = process.cwd();

const FileManager = {
  generate(templatesFolder, files, replaces) {
    console.log('');

    files.forEach((f) => {
      // Make replaces in path
      replaces.forEach((r) => { f.dest = f.dest.replace(r.what, r.for);  })
      fs.ensureDirSync(path.resolve(pwd, path.dirname(f.dest)));

      // Get template file
      let templateContent = fs.readFileSync(path.resolve(templatesFolder, f.source), { encoding: 'utf-8' });

      // Make replaces in template content
      replaces.forEach((r) => { templateContent = templateContent.replace(new RegExp(r.what, 'g'), r.for); })

      // Save file
      fs.writeFileSync(f.dest, templateContent, { encoding: 'utf-8' });
      console.log('     ' + f.dest);
    });
  }
};

module.exports = FileManager;

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
      fs.ensureDirSync(path.resolve(pwd, f.dest));

      // Get template file
      let templateContent = fs.readFileSync(path.resolve(templatesFolder, f.source), { encoding: 'utf-8' });

      // Make replaces in template content
      replaces.forEach((r) => { templateContent = templateContent.replace(new RegExp(r.what, 'g'), r.for); })

      // Save file
      const finalPath = path.resolve(f.dest, f.source);
      fs.writeFileSync(finalPath, templateContent, { encoding: 'utf-8' });
      console.log('     ' + finalPath);
    });
  }
};

module.exports = FileManager;

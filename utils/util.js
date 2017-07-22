const fs = require('fs-extra')
    , path = require('path')
    , pwd = process.cwd();

exports.isMeteorProject = fs.existsSync(pwd + '/.meteor');

exports.templatesFolder = path.resolve(__dirname, '../templates');

exports.configs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../utils/config.json')));

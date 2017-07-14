const fs = require('fs-extra')
    , path = require('path')
    , pwd = process.cwd();

exports.isMeteorProject = fs.existsSync(pwd + '/.meteor');

exports.alreadyInit = fs.existsSync(pwd + '/private/mesca/templates');

exports.configs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../utils/config.json')));

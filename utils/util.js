const fs = require('fs')
, pwd = process.cwd();

exports.isMeteorProject = fs.existsSync(pwd + '/.meteor');

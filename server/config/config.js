var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    development: {
        rootPath: rootPath,
        db: 'postgres://renzxl:password@localhost/renzxl',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'postgres://renzxl:password@localhost/PieSafe',
        port: process.env.PORT || 80
    }
};
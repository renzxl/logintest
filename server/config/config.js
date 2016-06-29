var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    development: {
        rootPath: rootPath,
        db: process.env.DATABASE_URL || 'postgres://localhost:5432/renzxl',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: process.env.DATABASE_URL || 'postgres://localhost:5432/renzxl',
        port: process.env.PORT || 80
    }
};


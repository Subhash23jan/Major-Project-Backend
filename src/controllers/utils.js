const userController = require('./userController');
const lostItemController = require('./lostItemController');
const foundItemController = require('./foundItemController');
const apiController = require('./apiController');
const dbController = require('./dbController');
const authController = require('./authController');

module.exports = {
    userController,
    lostItemController,
    foundItemController,
    apiController,
    dbController,
    authController
};

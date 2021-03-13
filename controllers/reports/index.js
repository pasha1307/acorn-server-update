const GetAll = require('./reports.get.controller');
const GetOne = require('./reports.getOne.controller');
const PostOne = require('./reports.post.controller');
const DelOne = require('./reports.delete.controller');
const UpdateOne = require('./reports.update.controller');
module.exports = {
    GetAll,
    GetOne,
    PostOne,
    DelOne,
    UpdateOne
};

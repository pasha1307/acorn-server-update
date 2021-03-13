const GetAll = require('./projects.getAll.controller');
const GetActive = require('./projects.get.controller');
const PostOne = require('./projects.post.controller');
const UpdateOne = require('./projects.update.controller');
const DelOne = require('./projects.delete.controller');
module.exports = {
    GetAll,
    GetActive,
    PostOne,
    UpdateOne,
    DelOne
};

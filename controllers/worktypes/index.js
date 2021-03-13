const GetAll = require('./worktypes.get.controller');
const GetActive = require('./worktypes.getActive.controller');
const PostOne = require('./worktypes.post.controller');
const UpdateOne = require('./worktypes.update.controller');
const DelOne = require('./worktypes.delete.controller');
module.exports = {
    GetActive,
    GetAll,
    PostOne,
    UpdateOne,
    DelOne
};

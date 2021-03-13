const DelOne = require('./locations.deleteOne.controller');
const GetAll = require('./locations.get.controller');
const GetActive = require('./locations.getActive.controller');
const GetOne = require('./locations.getOne.controller');
const PostOne = require('./locations.post.controller');
const UpdateOne = require('./locations.updateOne.controller');
const GetRepos = require('./locations-repos.get.controller');

module.exports = {
    DelOne,
    GetAll,
    GetActive,
    GetOne,
    PostOne,
    UpdateOne,
    GetRepos
};

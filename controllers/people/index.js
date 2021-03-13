const DelOne = require('./people.delete.controller');
const GetAll = require('./people.get.controller');
const GetOne = require('./people.getOne.controller');
const PostOne = require('./people.post.controller');
const UpdateOne = require('./people.update.controller');
const GetNames = require('./people.getNames.controller');

module.exports = {
    DelOne,
    GetOne,
    GetAll,
    PostOne,
    UpdateOne,
    GetNames
};


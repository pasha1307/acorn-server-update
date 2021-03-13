const GetAll = require('./proposals.get.controller');
const GetOne = require('./proposals.getOne.controller');
const PostOne = require('./proposals.post.controller');
const DelOne = require('./proposals.delete.controller');
const UpdateOne = require('./proposals.update.controller');
const SubmitOne = require('./proposals.submit-email.controller');
const ApproveDenyOne = require('./proposals.approve-email.controller');
module.exports = {
    GetAll,
    GetOne,
    PostOne,
    DelOne,
    UpdateOne,
    SubmitOne,
    ApproveDenyOne
};

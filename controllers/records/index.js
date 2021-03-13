const GetAll = require('./records.get.controller');
const GetOne = require('./records.getOne.controller');
const PostRecord = require('./records-item.post.controller');
const UpdateRecord = require('./records.updateOne.controller');
const GetOswAll = require('./osw.get.controller');
const PostOSW = require('./records-osw.post.controller');
const UpdateOsw = require('./record-osw.update.controller');
const DeleteOne = require('./records.destroy.controller');
const GetByPage = require('./records-pages.controller');
const GetByCoordinator = require('./records.getByCoordinator.controller');
module.exports = {
    GetAll,
    GetOne,
    UpdateOsw,
    UpdateRecord,
    PostRecord,
    PostOSW,
    GetOswAll,
    DeleteOne,
    GetByPage,
    GetByCoordinator
};


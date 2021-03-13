const GetOne = require('./groups.getOne.controller');
const GetOneWithRecords = require('./groups.getOneWithRecords.controller');
const UpdateOneWithRecords = require('./groups.updateOneWithRecords.controller');
const GetRecords = require('./groups.getRecords.controller');
const PostRecords = require('./groups.postRecords.controller');
const GetProjects = require('./groups.getProjects.controller');
const UpdateStatus = require('./groups.updateStatus.controller');
module.exports = {
    GetOne,
    GetOneWithRecords,
    UpdateOneWithRecords,
    GetRecords,
    PostRecords,
    GetProjects,
    UpdateStatus
};


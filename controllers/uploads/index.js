const UploadFile = require('./upload.create.conroller');
const DelFile = require('./uploads.delete.controller');
const SaveFileData = require('./file.create.controller');
const GetByPerson = require('./file.getByPerson.controller');
const DelFileData = require('./file.delete.controller');
module.exports = {
    UploadFile,
    DelFile,
    DelFileData,
    SaveFileData,
    GetByPerson
};

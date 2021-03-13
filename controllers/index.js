const GetItemPKID = require('./itemIdentification.getPKID.controller');
const AutotextGetAll = require('./autotext.getAll.controller');
const RecordsByUser = require('./user.getRecords.controller');
const RepoDepartments = require('./locations/locations-repos.get.controller');
// people
const GetRoles = require('./roles.getPeople.controller');

const ProjectsGetActive = require('./projects/projects.get.controller');
const ProjectsGetAll = require('./projects/projects.getAll.controller');
const ProjectsPostOne = require('./projects/projects.post.controller');
const ProjectsUpdateOne = require('./projects/projects.update.controller');
const ProjectsDeleteOne = require('./projects/projects.delete.controller');

const GetPurposes = require('./purposes/purposes.get.controller');
const PurposesPostOne = require('./purposes/purposes.post.controller');
const PurposesUpdateOne = require('./purposes/purposes.updateOne.controller');
const PurposesDeleteOne = require('./purposes/purposes.deleteOne.controller');
const GetWorkTypes = require('./worktypes/worktypes.get.controller');
const WorkTypesGetActive = require('./worktypes/worktypes.getActive.controller');
const WorkTypesPost = require('./worktypes/worktypes.post.controller');
const WorkTypesUpdate = require('./worktypes/worktypes.update.controller');
const WorkTypesDelete = require('./worktypes/worktypes.delete.controller');
// tests
const WorkDoneByGetAll = require('./workDoneBy.get.controller');
// misc

const GetCoordinators = require('./coordinators.get.controller');
const ChargeToGetAll = require('./chargeto.get.controller');
const GetStorage = require('./storage.get.controller');
const TestCtrl = require('./test.ItemPerson.controller');
const GetAllItems = require('./items.getAll.controller');

const OSWGetAll = require('./records/osw.get.controller');
const RecordOswUpdate = require('./records/record-osw.update.controller');
const UtilsGet = require('./utils.get.controller');
const records = require('./records');
const groups = require('./groups');
const departments = require('./departments');
const formats = require('./formats');
const importance = require('./importance');
const locations = require('./locations');
const people = require('./people');
const projects = require('./projects');
const proposals = require('./proposals');
const purposes = require('./purposes');
const reports = require('./reports');
const uploads = require('./uploads');
const worktypes = require('./worktypes');
const userch = require('./user-check');

module.exports = {
    GetItemPKID,
    AutotextGetAll,
    RepoDepartments,
    RecordsByUser,
    GetWorkTypes,
    WorkTypesGetActive,
    WorkTypesPost,
    WorkTypesUpdate,
    WorkTypesDelete,
    WorkDoneByGetAll,

    GetCoordinators,
    ChargeToGetAll,
    GetRoles,

    GetStorage,
    TestCtrl,
    GetAllItems,

    OSWGetAll,
    RecordOswUpdate,
    UtilsGet,
    records,
    groups,
    departments,
    formats,
    importance,
    locations,
    people,
    projects,
    proposals,
    purposes,
    reports,
    uploads,
    userch,
    worktypes
};

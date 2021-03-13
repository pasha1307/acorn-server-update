const Router = require('koa-router');
const router = new Router();
const isAuth = require('../policies/isAuthorized');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
// const jwt = require('koa-jwt');

const {
    GetItemPKID,
    AutotextGetAll,
    RecordsByUser,
    RepoDepartments,
    WorkDoneByGetAll,
    GetCoordinators,
    ChargeToGetAll,
    GetRoles,
    GetStorage,
    TestCtrl,
    GetAllItems,
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
} = require('../controllers');
// autotext
router.get('/api/autotext', AutotextGetAll.find);
// util routes
router.get('/api/utils', UtilsGet.find);
router.get('/api/groups', groups.GetProjects.find);
router.get('/api/coordinators', GetCoordinators.find);
router.get('/api/repos', RepoDepartments.find);

// Departments
router.get('/api/departments', departments.GetAll.find);
router.post('/api/departments', departments.PostOne.create);
router.delete('/api/departments/:id', departments.DeleteOne.destroy);
router.put('/api/departments/:id', departments.UpdateOne.update);
router.get('/api/departments/:id', departments.GetOne.findOne);
//Formats
router.get('/api/formats', formats.GetAll.find);
router.get('/api/formats-active', formats.GetActive.find);
router.post('/api/formats', formats.PostOne.create);
router.get('/api/formats/:id', formats.GetOne.findOne);
router.put('/api/formats/:id', formats.UpdateOne.update);
router.delete('/api/formats/:id', formats.DeleteOne.destroy);
// Groups
router.get('/api/groups-records', groups.GetRecords.find);
router.post('/api/groups-records', groups.PostRecords.create);
router.get('/api/groups-records/:id', groups.GetOne.findOne);
router.put('/api/groups-records/:id', groups.UpdateStatus.update);
router.get('/api/groups/:id', groups.GetOneWithRecords.findOne);
router.put('/api/groups/:id', groups.UpdateOneWithRecords.update);
// Importance
router.get('/api/importance', importance.GetAll.find);
router.post('/api/importance', importance.PostOne.create);
router.put('/api/importance/:id', importance.UpdateOne.update);
router.delete('/api/importance/:id', importance.DelOne.destroy);
// Locations
router.get('/api/locations', locations.GetAll.find);
router.get('/api/locations-active', locations.GetActive.find);
router.post('/api/locations', locations.PostOne.create);
router.get('/api/locations/:id',locations.GetOne.findOne);
router.delete('/api/locations/:id', locations.DelOne.destroy);
router.put('/api/locations/:id', locations.UpdateOne.update);
// People
router.get('/api/people', people.GetAll.find);
router.get('/api/people-names', people.GetNames.find);
router.post('/api/people', people.PostOne.create);
router.get('/api/people/:id', people.GetOne.findOne);
router.put('/api/people/:id', people. UpdateOne.update);
router.delete('/api/people/:id', people.DelOne.destroy);
// Projects
router.get('/api/projects-active', projects.GetActive.find);
router.get('/api/projects', projects.GetAll.find);
router.post('/api/projects', projects.PostOne.create);
router.put('/api/projects/:id', projects.UpdateOne.update);
router.delete('/api/projects/:id', projects.DelOne.destroy);
// Proposals
router.get('/api/proposals', proposals.GetAll.find);
router.post('/api/proposals', proposals.PostOne.create);
router.get('/api/proposals/:id', proposals.GetOne.findOne);
router.delete('/api/proposals/:id', proposals.DelOne.destroy);
router.put('/api/proposals/:id', proposals.UpdateOne.update);
router.post('/api/proposals-email', proposals.SubmitOne.create);
router.post('/api/proposals-status', proposals.ApproveDenyOne.create);
// Purposes
router.get('/api/purposes', purposes.GetAll.find);
router.post('/api/purposes', purposes.PostOne.create);
router.put('/api/purposes/:id', purposes.UpdateOne.update);
router.delete('/api/purposes/:id', purposes.DelOne.destroy);
// Records
router.post('/records', records.PostRecord.create);
router.post('/osw',records.PostOSW.create);
router.get('/osw', records.GetOswAll.find);
router.get('/records', records.GetAll.find);
router.get('/records/:id',records.GetOne.findOne);
router.delete('/records/:id', records.DeleteOne.destroy);
router.put('/records/:id', records.UpdateRecord.update);
router.put('/oswrecords/:id', records.UpdateOsw.update);
router.get('/data/:page', records.GetByPage.find);
router.get('/api/records/:id', records.GetByCoordinator.find);
// Reports
router.get('/api/reports', reports.GetAll.find);
router.post('/api/reports', reports.PostOne.create);
router.get('/api/reports/:id', reports.GetOne.findOne);
router.delete('/api/reports/:id', reports.DelOne.destroy);
router.put('/api/reports/:id', reports.UpdateOne.update);
// Uploads
router.post('/uploader', uploads.UploadFile.create);
router.delete('/uploads/:id', uploads.DelFile.destroy);
router.post('/api/files', uploads.SaveFileData.create);
router.get('/api/files/:personId', uploads.GetByPerson.find);
router.delete('/api/files/:fileId', uploads.DelFileData.destroy);
// Work Types
router.get('/api/worktypes', worktypes.GetAll.find);
router.get('/api/worktypes-active', worktypes.GetActive.find);
router.post('/api/worktypes', worktypes.PostOne.create);
router.put('/api/worktypes/:id',  worktypes.UpdateOne.update);
router.delete('/api/worktypes/:id', worktypes.DelOne.destroy);
// workDoneBy
router.get('/api/workdoneby', WorkDoneByGetAll.find);
// Single Routes
router.get('/api/chargeto', ChargeToGetAll.find);
router.get('/api/roles', GetRoles.find);
router.get('/api/storage', GetStorage.find);
// SignUp, SignIn, SignOut
router.post('/api/signup', userch.SignUp.signup);
router.post('/api/login', userch.SignIn.login);
// ________________MISC_______________
//items
router.get('/itemsall', GetAllItems.find);
router.get('/api/pkid', GetItemPKID.find);
// users
router.get('/selected/:username', RecordsByUser.find );
router.get('/api/tests', TestCtrl.find);

module.exports = router;

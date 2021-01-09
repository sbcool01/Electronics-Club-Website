const {app} = require('./util/ExpressMongooseSetup');

const {
    getUserActiveProjects,
    getUserCompletedProjects,
    createUser,
    joinProject,
    leaveProject,
} = require('./APIs/Users');

app.get('/user/:userId/getUserActiveProjects', getUserActiveProjects);
app.get('/user/:userId/getUserCompletedProjects', getUserCompletedProjects);
app.post('/createUser', createUser);
app.post('/editProject/:projectId/joinProject', joinProject);
app.post('/editProject/:projectId/leaveProject', leaveProject);

const {
    getAllCompletedProjects,
    getAllActiveProjects,
    addNewProject,
    deleteProject,
    editProject,
} = require('./APIs/Projects');

app.get("/getAllCompletedProjects", getAllCompletedProjects);
app.get('/getAllActiveProjects', getAllActiveProjects);
app.post('/addNewProject', addNewProject);
app.delete('/deleteProject/:projectId', deleteProject);
app.post('/editProject/:projectId', editProject);

const {
    sendDataToEmail,
} = require('./APIs/Contact');

app.post('/sendDataToEmail',  sendDataToEmail); 

app.listen(process.env.PORT || 4000, () => {
    console.log("server started successfully");
});
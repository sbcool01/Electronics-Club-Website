const {app} = require('../util/ExpressMongooseSetup');
const {User, Project} = require('../util/MongooseModel');
const lodash = require('lodash');

async function getUserActiveProjects(request, response) {
    let userActiveProjectIds = [];
    let userActiveProjects = [];
    await User.findById(request.params.userId)
    .then(async (user) => {
        userActiveProjectIds = user.ongoingProjects;
        for(let projectId of userActiveProjectIds) {
            await Project.findById(projectId)
            .then((response) => {
                console.log("response: ", response);
                userActiveProjects.push(response);
            })
            .catch(error => {
              console.log(error)
            })
        }
        return response.json({"projects": userActiveProjects});
    })
    .catch((error) => {
        console.log(error);
    })   
}

async function getUserCompletedProjects(request, response) {
    let userCompletedProjectIds = [];
    let userCompletedProjects = [];
    await User.findById(request.params.userId)
    .then(async (user) => {
        userCompletedProjectIds = user.completedProjects;
        for(let projectId of userCompletedProjectIds) {
            await Project.findById(projectId)
            .then((response) => {
              userCompletedProjects.push(response);
            })
            .catch(error => {
              console.log(error)
            })
        }
        return response.json({"projects": userCompletedProjects});
    })
    .catch((error) => {
        console.log(error);
    })
}

async function createUser(request, response) {
  console.log("body: ", request.body);
  let userId="";
  await User.findOne({ 'email': request.body.email, 'name': request.body.name}, function (err, user) {
      if(err){
          console.log("error: ", error);
      }
      if(user===null){
          const newUser=new User({
            'email' : request.body.email,
            'name' : request.body.name,
            'completedProjects': [],
            'ongoingProjects': []
          });
          newUser.save((err, user) => {
            if(err){
              return err;
            } else {
              userId=user._id.toString();
              console.log("Added User to Database successfully");
            }
          })
      }
      else {
          userId=user._id.toString();
      }
    });
    return response.json({status: "Added User Successfully", userId: userId});
}

function joinProject(request, response) {
    console.log("request body: ", request.body);
    let projectId = request.params.projectId;
    Project.findById(projectId)
    .then(async (project) => {
        let newMember = request.body.user;
        await User.findOneAndUpdate({email: newMember}, { $addToSet: { ongoingProjects: projectId } }, null, function(err, response){
            console.log("updated User: ", response);
        });
        project['teamMembersWithEmail'].push(newMember);
        project.save((error) => {
            console.log(error);
        })
    })
    return response.json({status: "Added You To Project Successfully"});
}

function leaveProject(request, response) {
    console.log("request body: ", request.body);
    let projectId = request.params.projectId;
    Project.findById(projectId)
    .then(async (project) => {
        let memberToBeRemoved = request.body.user;
        await User.findOneAndUpdate({email: memberToBeRemoved}, { $pull: { ongoingProjects: projectId } }, null, function(err, response){
            console.log("updated User: ", response);
        });
        for(let i in project.mentors) {
            if(project.mentors[i] === memberToBeRemoved){
                project.mentors.splice(i, 1);
            }
        }
        for(let i in project.teamMembersWithEmail) {
            if(project.teamMembersWithEmail[i] === memberToBeRemoved){
                project.teamMembersWithEmail.splice(i, 1);
            }
        }
        project.save((error) => {
            console.log(error);
        })
    })
    return response.json({status: "Added You To Project Successfully"});
}

module.exports = {getUserActiveProjects, getUserCompletedProjects, createUser, joinProject, leaveProject};
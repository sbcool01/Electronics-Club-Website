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
  let userId="";
  await User.findOne({ 'email': request.body.email, 'name': request.body.name}, function (error, user) {
      if(error){
          console.log(error);
      }
      if(user===null){
          const newUser=new User({
            'email' : request.body.email,
            'name' : request.body.name,
            'completedProjects': [],
            'ongoingProjects': []
          });
          newUser.save((error, user) => {
            if(error){
              return error;
            } else {
              userId=user._id.toString();
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
    let projectId = request.params.projectId;
    Project.findById(projectId)
    .then(async (project) => {
        let newMember = request.body.user;
        await User.findOneAndUpdate({email: newMember}, { $addToSet: { ongoingProjects: projectId } }, null, function(error, response){
            if(error){
                console.log(error);
            }
        });
        project['teamMembersWithEmail'].push(newMember);
        project.save((error) => {
            console.log(error);
        })
    })
    return response.json({status: "Added You To Project Successfully"});
}

function leaveProject(request, response) {
    let projectId = request.params.projectId;
    Project.findById(projectId)
    .then(async (project) => {
        let memberToBeRemoved = request.body.user;
        await User.findOneAndUpdate({email: memberToBeRemoved}, { $pull: { ongoingProjects: projectId } }, null, function(error, response){
            if(error){
                console.log(error);
            }
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
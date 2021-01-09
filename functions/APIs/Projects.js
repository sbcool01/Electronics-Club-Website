const {app} = require('../util/ExpressMongooseSetup');
const {User, Project} = require('../util/MongooseModel');
const lodash = require('lodash');

function getAllCompletedProjects(request, response){
    Project.find({status: 'Completed'}, function(err, projects){
        return response.json({"projects": projects});
    });
};

function getAllActiveProjects(request, response){
    Project.find({status: 'Active'}, function(err, projects){
        return response.json({"projects": projects});
    });
};

async function addNewProject(request, response){
    let projectId="";
    const newProject=new Project(request.body);
    const mentors=request.body.mentors;
    await newProject.save(async (err, project) => {
        if(err){
          return err;
        } else {
          projectId = project._id.toString();
          for(let mentor of mentors){
              if(request.body.status==='Active'){
                  await User.findOneAndUpdate({email: mentor}, { $addToSet: { ongoingProjects: projectId } }, null, function(error, response){
                    if(error){
                        console.log(error);
                    }
                  });
              }
              if(request.body.status==='Completed'){
                await User.findOneAndUpdate({email: mentor}, { $addToSet: { completedProjects: projectId } }, null, function(error, response){
                    if(error){
                        console.log(error);
                    }
                });
              }
          }
        }
    });
    
    return response.json({"status": "Added Successfully"});
}

function deleteProject(request, response) {
    let projectId = request.params.projectId;
    Project.findById(projectId)
    .then(async (project) => {
        let status=project.status;
        let members = [...project.teamMembersWithEmail, ...project.mentors];
        for(let member of members) {
            if(status==='Active'){
                await User.findOneAndUpdate({email: member}, { $pull: { ongoingProjects: projectId } }, null, function(error, response){
                    if(error){
                        console.log(error);
                    }
                });
            }
            if(status==='Completed'){
              await User.findOneAndUpdate({email: member}, { $pull: { completedProjects: projectId } }, null, function(error, response){
                    if(error){
                        console.log(error);
                    }
              });
            }
        }
        Project.deleteOne({_id: projectId}, (error) => {
            if (error) {
                console.log(error);
            }
        });
    })
    return response.json({status: "Project Deleted Successfully"});
}

async function editProject(request, response){
    let projectId = request.params.projectId;
    await Project.findById(projectId)
    .then(async(project) => {
        let finalTeam = [...request.body.mentors, ...request.body.teamMembersWithEmail];
        let initialTeam = [...project.mentors, ...project.teamMembersWithEmail];
        //checking if status changed //only case is it changing from active to complete
        if(project.Status !== request.body.Status) {
            for(let member in initialTeam) {
                await User.findOneAndUpdate({email: member}, {$pull: {ongoingProjects: projectId}, $addToSet: {completedProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }
                })
            }
        }
        let addedMembers = lodash.cloneDeep(finalTeam);
        let removedMembers = lodash.cloneDeep(initialTeam);
        let removedCount = 0;
        for(let i in finalTeam){
            var index = initialTeam.map((it) => { return it }).indexOf(finalTeam[i]);
            if(index >= 0) {
                addedMembers.splice(index-removedCount, 1);
                removedCount+=1;
            }
        }
        removedCount=0;
        for(let i in initialTeam){
            var index = finalTeam.map((it) => { return it }).indexOf(initialTeam[i]);
            if(index >= 0) {
              removedMembers.splice(index-removedCount, 1);
              removedCount+=1;
          }
        }
        let status = request.body.Status;
        for(let member in addedMembers) {
            if(status === "Active"){
                await User.findOneAndUpdate({email: member}, {$addToset: {ongoingProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }
                });
            } else {
                await User.findOneAndUpdate({email: member}, {$addToset: {completedProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }
                });
            }   
        }

        for(let member in removedMembers) {
            if(status === "Active"){
                await User.findOneAndUpdate({email: member}, {$pull: {ongoingProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }
                })
            } else {
                await User.findOneAndUpdate({email: member}, {$pull: {completedProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }
                })
            }   
        }
        let doc = await Project.findOne({_id: projectId});
        for (var id in request.body ){
            doc[id]= request.body[id];
        }
        doc.save( (error) => {
            console.log(error);
        })
    })
    .catch(error => {
      console.log(error);
    })
  
    return response.json({"status": "Updated Successfully"});
}

module.exports = {getAllCompletedProjects, getAllActiveProjects, addNewProject, deleteProject, editProject};
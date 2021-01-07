require('dotenv/config');
const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const ejs=require('ejs');
const lodash = require('lodash');
const PORT=4000;
const app = express();
app.set('view engine', 'ejs'); 
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/electronics-club-test', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('useFindAndModify', false);
const projectSchema = mongoose.Schema({
    name: String,
    domain: String,
    desc: String,
    tags: Array,
    url: String,
    AddedBy: String,
    status: String,
    mentors: Array,
    teamMembersWithEmail: Array,
    teamMembersWithName: Array
});

const userSchema= new mongoose.Schema({
    email: String,
    name: String,
    completedProjects: Array,
    ongoingProjects: Array
});

const User = new mongoose.model("User", userSchema);

const Project = new mongoose.model('Project', projectSchema);

app.post('/addNewProject', async function(request, response){
    console.log("body: ", request.body);
    let projectId="";
    const newProject=new Project(request.body);
    const mentors=request.body.mentors;
    console.log("mentors: ", mentors);
    await newProject.save(async (err, project) => {
        if(err){
          return err;
        } else {
          projectId = project._id.toString();
          for(let mentor of mentors){
              if(request.body.status==='Active'){
                  await User.findOneAndUpdate({email: mentor}, { $addToSet: { ongoingProjects: projectId } }, null, function(err, response){
                    console.log("updated User: ", response);
                  });
              }
              if(request.body.status==='Completed'){
                await User.findOneAndUpdate({email: mentor}, { $addToSet: { completedProjects: projectId } }, null, function(err, response){
                  console.log("updated User: ", response);
                });
              }
          }
          console.log("Added to Database successfully");
        }
    });
    
    return response.json({"status": "Added Successfully"});
});

app.post('/editProject/:projectId', async function(request, response){
    console.log("body: ", request.body);
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
                    }else {
                        console.log(response);
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
                    }else {
                        console.log(response);
                    }
                });
            } else {
                await User.findOneAndUpdate({email: member}, {$addToset: {completedProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }else {
                        console.log(response);
                    }
                });
            }   
        }

        for(let member in removedMembers) {
            if(status === "Active"){
                await User.findOneAndUpdate({email: member}, {$pull: {ongoingProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }else {
                        console.log(response);
                    }
                })
            } else {
                await User.findOneAndUpdate({email: member}, {$pull: {completedProjects: projectId}}, null, (error, response) => {
                    if(error) {
                        console.log(error);
                    }else {
                        console.log(response);
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
});

app.get("/getAllCompletedProjects", function(request, response){
    Project.find({status: 'Completed'}, function(err, projects){
        return response.json({"projects": projects});
    });
});

app.get('/getAllActiveProjects', function(request, response){
    Project.find({status: 'Active'}, function(err, projects){
        return response.json({"projects": projects});
    });
});

app.get('/user/:userId/getUserActiveProjects', async function(request, response){
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
});

app.get('/user/:userId/getUserCompletedProjects', async function(request, response){
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
});

app.post('/createUser', async function(request, response){
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
})

app.post('/editProject/:projectId/joinProject', function(request, response) {
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
})

app.post('/editProject/:projectId/leaveProject', function(request, response) {
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
})

app.delete('/deleteProject/:projectId', function(request, response) {
    console.log("in delete Project");
    let projectId = request.params.projectId;
    Project.findById(projectId)
    .then(async (project) => {
        let status=project.status;
        let members = [...project.teamMembersWithEmail, ...project.mentors];
        for(let member of members) {
            if(status==='Active'){
                await User.findOneAndUpdate({email: member}, { $pull: { ongoingProjects: projectId } }, null, function(err, response){
                    console.log("updated User: ", response);
                });
            }
            if(status==='Completed'){
              await User.findOneAndUpdate({email: member}, { $pull: { completedProjects: projectId } }, null, function(err, response){
                console.log("updated User: ", response);
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
});

app.listen(PORT, () => {
    console.log("server started on port 4000")
});
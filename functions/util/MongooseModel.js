const {mongoose} = require('./ExpressMongooseSetup');

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

module.exports = {User, Project};
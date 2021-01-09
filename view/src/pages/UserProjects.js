import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid} from '@material-ui/core';
import ProjectAppBar from "../components/ProjectAppBar";
import AddProjectDialog from "../components/AddProjectDialog";
import axios from "axios";
import ProjectCard from '../components/ProjectCard';

const useStyles = makeStyles((theme) => ({
    status: {
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '30px',
        marginBottom: '50px',
    },
    main: {
        width: '90%',
    },
}));

function UserProjects() {
    const classes = useStyles();
    let [projects, setProjects] = useState([]);
    let [status, setStatus] = useState("");
    let [addProjectDialog, setAddProjectDialog] = useState(false);
    let [editProject, setEditProject] = useState({});
    let [isNewProject, setIsNewProject] = useState(true);
    let [isAllActiveProjects, setIsAllActiveProjects] = useState(true);

    useEffect(() => {
        axios.get('/getAllActiveProjects')
            .then(response => {            
                setProjects(response.data.projects);
                setStatus("All Active Club Projects");
            });
    }, []);

    function handleEdit(project) {
        setEditProject(project);
        setAddProjectDialog(true);
        setIsNewProject(false);    
    }

    return (
        <div>
            <ProjectAppBar setProjects={setProjects} setStatus={setStatus} setAddProjectDialog={setAddProjectDialog} addProjectDialog={addProjectDialog} setIsNewProject={setIsNewProject} setIsAllActiveProjects={setIsAllActiveProjects}/>
            {status? <Typography variant="h4" className={classes.status}>{status}</Typography> :null}
            <center>
                <Grid container spacing={5} className={classes.main}>
                    {
                        projects? projects.map(project => {
                            return (
                                <ProjectCard project={project} handleEdit={handleEdit} isAllActiveProjects={isAllActiveProjects} />
                            )                 
                        })
                        :null
                    }
                </Grid>
            </center>
            {
                (addProjectDialog)? 
                <AddProjectDialog setAddProjectDialog={setAddProjectDialog} addProjectDialog={addProjectDialog} project={editProject} isNewProject={isNewProject}/>
                :null
            }
        </div>
    )
}

export default UserProjects;
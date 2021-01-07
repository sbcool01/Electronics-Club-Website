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
    alignLeft: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    accordionContainer: {
        margin: '10px',
    },
    desc: {
        textAlign: 'left',
        margin: '10px',
    },
    main: {
        width: '90%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    root: {
        maxWidth: 345,
    },
}));

function UserProjects() {
    const classes = useStyles();
    let [projects, setProjects] = useState([]);
    let [status, setStatus] = useState("");
    let [addProjectDialog, setAddProjectDialog] = useState(false);
    let [editProject, setEditProject] = useState({});

    useEffect(() => {
        axios.get('http://localhost:4000/getAllActiveProjects')
            .then(response => {            
                setProjects(response.data.projects);
                setStatus("All Active Club Projects");
            });
    }, []);

    function handleEdit(project) {
        console.log("in handle edit project", project);
        setEditProject(project);
        setAddProjectDialog(true);    
    }

    return (
        <div>
            <ProjectAppBar setProjects={setProjects} setStatus={setStatus} setAddProjectDialog={setAddProjectDialog} addProjectDialog={addProjectDialog} />
            {status? <Typography variant="h4" className={classes.status}>{status}</Typography> :null}
            <center>
                <Grid container spacing={5} className={classes.main}>
                    {
                        projects? projects.map(project => {
                            console.log(project);
                            return (
                                <ProjectCard project={project} handleEdit={handleEdit} />
                            )                 
                        })
                        :null
                    }
                </Grid>
            </center>
            {
                (addProjectDialog)? 
                <AddProjectDialog setAddProjectDialog={setAddProjectDialog} addProjectDialog={addProjectDialog} project={editProject}/>
                :null
            }
        </div>
    )
}

export default UserProjects;
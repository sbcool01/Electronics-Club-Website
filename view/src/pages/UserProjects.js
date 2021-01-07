import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Container, Hidden, Grid, Chip} from '@material-ui/core';
import ProjectAppBar from "../components/ProjectAppBar";
import AddProjectDialog from "../components/AddProjectDialog";
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
import clsx from  'clsx';

const useStyles = makeStyles((theme) => ({
    status: {
        paddingLeft: '5%',
        paddingRight: '5%',
        marginTop: '30px',
    },
    container: {
        width: '70%',
        [theme.breakpoints.down('xs')]: {
			width: '100%'
		},
    },
    border: {
        border: '2px solid grey',
        borderRadius: '5px',
    }
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
        setAddProjectDialog(true);
        setEditProject(project);
    }

    return (
        <div>
            <ProjectAppBar setProjects={setProjects} setStatus={setStatus} setAddProjectDialog={setAddProjectDialog} addProjectDialog={addProjectDialog} />
            {status? <Typography variant="h4" className={classes.status}>{status}</Typography> :null}
            <Container maxWidth="sm">
            {(projects)? projects.map(project => {
                return (                   
                    <Grid container style={{marginTop: '30px'}} className={ clsx(classes.border)}>
                        <Hidden xsDown>
                            <Grid item xs={5}>
                                <img src={project.url} alt="" style={{width: '100%', height: '250px'}}/>
                            </Grid>                          
                        </Hidden>
                        <Grid item xs={12} sm={7} style={{paddingLeft: '20px'}}>
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <Typography variant="h6">{project.name}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Domain: {project.domain}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Description:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">{project.desc}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Tags:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        project.tags.map(tag => {
                                            return (<Chip size="small" label={tag} style={{margin: '2px'}}/>)
                                        })
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <EditIcon onClick = {() => handleEdit(project)}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>                    
                )          
            })
            :null}
            </Container>
            {
                (addProjectDialog)? 
                <AddProjectDialog setAddProjectDialog={setAddProjectDialog} addProjectDialog={addProjectDialog} project={editProject}/>
                :null
            }
        </div>
    )
}

export default UserProjects;
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid} from "@material-ui/core";
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const useStyles = makeStyles((theme) => ({   
    main: {
        width: '90%',
    },
}));

function Projects(){
    const classes=useStyles();
    let [projects, setProjects] = useState([]);
    
    useEffect(() => {
        axios.get('/getAllCompletedProjects')
        .then(response => {
            setProjects(response.data.projects);
        })
    }, []);

    return (
        <div>
        <center>
            <Grid container spacing={5} className={classes.main}>
                {
                    projects? projects.map(project => {
                        return (
                            <ProjectCard project={project} />
                        )                 
                    })
                    :null
                }
            </Grid>
        </center>
        </div>
    )
}

export default Projects;
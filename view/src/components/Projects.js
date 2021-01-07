import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid} from "@material-ui/core";
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';

const useStyles = makeStyles((theme) => ({   
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

function Projects(){
    const classes=useStyles();
    let [projects, setProjects] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:4000/getAllCompletedProjects')
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
                        console.log(project);
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
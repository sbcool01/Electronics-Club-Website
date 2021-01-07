import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Accordion, AccordionDetails, AccordionSummary, Chip} from "@material-ui/core";
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '70%',
        [theme.breakpoints.down('md')]: {
			width: '80%'
		},
        [theme.breakpoints.down('sm')]: {
			width: '60%'
        },
        [theme.breakpoints.down('xs')]: {
			width: '100% !important'
        },
        marginTop: '50px',
    },
    text: {
        textAlign: 'center',
    },
    desc: {
        textAlign: 'left',
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignLeft: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    img: {
        width: '80%',
        '@media (max-width:400px)': {
            width: '100%',
        }, 
        '@media (min-width:600px)': {
            width: '100%',
        }, 
        height: '300px',
    },
    accordionContainer: {
        margin: '10px',
    }
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
                            <Grid item xs={12} md={6} className={classes.eachProject}>
                                <Grid container spacing={2} justify="center" alignItems="center" >
                                    <Grid item xs={12} className={classes.alignCenter}>
                                        <img src={project.url} alt="" className={classes.img}/>
                                    </Grid>
                                    <Grid item xs={12} className={classes.alignCenter}>
                                        <Typography variant="h5" className={classes.text} color="inherit">{project.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{padding: '5px !important'}} className={classes.alignLeft}>
                                        <Typography variant="body1" className={classes.text} color="inherit">Domain: {project.domain}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>Details</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container>
                                                    <Grid container className={classes.accordionContainer}>
                                                        <Grid item xs={12} style={{margin: '5px'}}>
                                                            <Typography className={classes.desc}>
                                                                Description:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} style={{margin: '5px'}}>
                                                            <Typography className={classes.desc}>
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                                                sit amet blandit leo lobortis eget.
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.accordionContainer}>
                                                        <Grid item xs={12} style={{margin: '5px'}}>
                                                            <Typography className={classes.desc}>
                                                                Tags:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} style={{margin: '5px'}} className={classes.alignLeft}>
                                                            {
                                                                project.tags.map(tag => {
                                                                    return (<Chip size="small" label={tag} style={{margin: '2px'}}/>)
                                                                })
                                                            }                                              
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container className={classes.accordionContainer}>
                                                        <Grid item xs={12} style={{margin: '5px'}}>
                                                            <Typography className={classes.desc}>
                                                                Mentors:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} style={{margin: '5px'}} className={classes.alignLeft}>                                                           
                                                             <Chip size="small" label={"xyz"} style={{margin: '2px'}}/>                                                                                                         
                                                        </Grid>
                                                    </Grid>                                                                                                     
                                                </Grid>                                               
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                            </Grid>
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
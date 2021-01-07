import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Accordion, AccordionDetails, AccordionSummary, Chip, Card, CardHeader, CardMedia, CardContent, Hidden} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';

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

function Projects(props){
    const classes=useStyles();

    function checkIfMentorOrCreator(project) {
        const currentUserEmail = JSON.parse(localStorage.getItem('user')).email;
        let isEditEnabled = false;
        for(let mentor in project.mentors) {
            if(mentor === currentUserEmail){
                isEditEnabled = true;
                break;
            }
        }
        if(currentUserEmail === project.AddedBy) {
            isEditEnabled = true;
        }
        return isEditEnabled;
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.root}>
                <CardHeader      
                    action={                       
                        (props.handleEdit && checkIfMentorOrCreator(props.project))? <EditIcon onClick={() => props.handleEdit(props.project)} />: null                                      
                    }
                    title={props.project.name}
                    subheader={props.project.domain}
                />
                <Hidden xsDown>
                    <CardMedia
                        className={classes.media}
                        image= {props.project.url}
                        title="Project pic"
                    />
                </Hidden>
                <CardContent>
                    <Typography style={{marginBottom: '10px'}} className={classes.desc}>
                        10 Dec 2020
                    </Typography>   
                    <Typography style={{marginBottom: '10px'}} className={classes.desc}>
                        Tags:
                    </Typography>
                    <Typography style={{marginBottom: '10px'}} className={classes.desc}>
                    {
                        
                        props.project.tags.map(tag => {
                            return (<Chip size="small" label={tag} style={{margin: '2px'}} className={classes.desc}/>)
                        })
                    }  
                    </Typography>                     
                </CardContent>                                    
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails style = {{padding: 0}}>
                        <Grid container>
                            <Grid container className={classes.accordionContainer}>
                                <Grid item xs={12} style={{margin: '5px'}}>
                                    <Typography className={classes.desc}>
                                        Description:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{margin: '5px'}}>
                                    <Typography className={classes.desc}>
                                        {props.project.desc}
                                    </Typography>
                                </Grid>
                            </Grid>                                             
                            <Grid container className={classes.accordionContainer}>
                                <Grid item xs={12} style={{margin: '5px'}}>
                                    <Typography className={classes.desc}>
                                        Mentors:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{margin: '5px'}} className={classes.alignLeft}>                                                   
                                        {                                        
                                            props.project.mentors.map(mentor => {
                                                return (<Chip size="small" label={mentor} style={{margin: '2px'}}/>)
                                            })
                                        }                                                                                                       
                                </Grid>            
                            </Grid>  
                            <Grid container className={classes.accordionContainer}>
                                <Grid item xs={12} style={{margin: '5px'}}>
                                    <Typography className={classes.desc}>
                                        Team Members:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{margin: '5px'}} className={classes.alignLeft}>                                                   
                                    {                                        
                                        props.project.teamMembersWithEmail.map(member => {
                                            return (<Chip size="small" label={member} style={{margin: '2px'}}/>)
                                        })
                                    }                                                                                                       
                                </Grid>            
                            </Grid>   
                            <Grid container className={classes.accordionContainer}>
                                <Grid item xs={12} style={{margin: '5px'}}>
                                    <Typography className={classes.desc}>
                                        Other Team Members:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{margin: '5px'}} className={classes.alignLeft}>                                                   
                                    {                                        
                                        props.project.teamMembersWithName.map(member => {
                                            return (<Chip size="small" label={member} style={{margin: '2px'}}/>)
                                        })
                                    }                                                                                                       
                                </Grid>            
                            </Grid>                                                                                                  
                        </Grid>                                               
                    </AccordionDetails>
                </Accordion>
            </Card>   
        </Grid>
    );
}

export default Projects;
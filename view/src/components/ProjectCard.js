import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Accordion, AccordionDetails, AccordionSummary, Chip, Card, CardHeader, CardContent, Hidden, IconButton, Avatar} from "@material-ui/core";
import ConfirmationDialog from '../components/ConfirmationDialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({   
    avatar: {
		height: 'inherit',
		width: '100%',
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
    joinLeaveButton: {
        display: 'flex',
        alignItems: 'center',
    },
    deleteIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}));

function Projects(props){
    const classes=useStyles();
    const [openDeleteDialog, setOpenDeleteDialog]=useState(false);
    function checkIfMentorOrCreator() {
        const currentUserEmail = JSON.parse(localStorage.getItem('user')).email;
        let isEditEnabled = false;
        for(let mentor of props.project.mentors) {
            if(mentor === currentUserEmail){
                isEditEnabled = true;
                break;
            }
        }
        if(currentUserEmail === props.project.AddedBy) {
            isEditEnabled = true;
        }
        return isEditEnabled;
    }

    function checkIfInTeam() {
        const currentUserEmail = JSON.parse(localStorage.getItem('user')).email;
        let inTeam = false;
        for(let member of props.project.mentors) {
            if(member === currentUserEmail){
                inTeam = true;
                break;
            }
        }
        for(let member of props.project.teamMembersWithEmail) {
            if(member === currentUserEmail){
                inTeam = true;
                break;
            }
        }
        return inTeam;
    }

    function handleJoinProject() {
        const currentUserEmail = JSON.parse(localStorage.getItem('user')).email;
        axios.post('/editProject/' + props.project._id.toString() + '/joinProject', {user: currentUserEmail})
        .then((response) => {
            console.log("response: ", response);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function handleLeaveProject() {
        const currentUserEmail = JSON.parse(localStorage.getItem('user')).email;
        axios.post('/editProject/' + props.project._id.toString() + '/leaveProject', {user: currentUserEmail})
        .then((response) => {
            console.log("response: ", response);
            window.location.reload();          
        })
        .catch((error) => {
            console.log(error);
        })
    }

    function checkIfAdmin() {
        return localStorage.getItem('isAdmin');
    }

    function handleDialogOpen(){
        setOpenDeleteDialog(!openDeleteDialog);
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.root}>
                <CardHeader      
                    action={                       
                        (props.handleEdit && checkIfMentorOrCreator())? <EditIcon onClick={() => props.handleEdit(props.project)} />: null                                      
                    }
                    title={props.project.name}
                    subheader={props.project.domain}
                />
                <Hidden xsDown>
                    {/* <CardMedia
                        className={classes.media}
                        image= {props.project.url}
                        title="Project pic"
                    /> */}
                    <Avatar variant="square" className={classes.avatar} src={props.project.url} />
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
                    <Grid container>
                        <Grid item xs={checkIfAdmin()? 8: 12} className={classes.joinLeaveButton}>
                            {
                                ((props.isAllActiveProjects)&&(!checkIfInTeam()))? <Button variant="contained" color="secondary" onClick={handleJoinProject}>Join The Team</Button>: null
                            }
                            {
                                ((props.isAllActiveProjects)&&(checkIfInTeam()))? <Button variant="contained" color="secondary" onClick={handleLeaveProject}>Leave The Project</Button>: null
                            }
                        </Grid>
                        {
                            checkIfAdmin()? (
                                <Grid item xs = {4} className={classes.deleteIcon}>
                                    <IconButton onClick={handleDialogOpen}>
                                        <DeleteIcon color="secondary" fontSize="large" />
                                    </IconButton>
                                </Grid>
                            ):null
                        }
                    </Grid> 
                    {
                        openDeleteDialog ? <ConfirmationDialog project={props.project} dialogTitle="Are you sure you want to delete this project" dialogContent="This Project will be deleted permanently and can't be restored." openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog}/>: null
                    }
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
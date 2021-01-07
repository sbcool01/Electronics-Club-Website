//eslint-disable-next-line react-hooks/exhaustive-deps
import React, {useState} from "react";
import {microsoftLogOut} from '../components/firebase/firebaseAuth';
import { Redirect } from 'react-router';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Button, IconButton, Hidden, List, ListItem, ListItemText, SwipeableDrawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        fontSize: 22,
        [theme.breakpoints.down('xs')]: {
			fontSize: 15
		},
    },
    appBar: {
        background: '#000'
    },
    drawerPaper: {
        color: theme.palette.common.white,
        backgroundColor: '#000',
    },
    toolbar: {
        paddingRight: '2px',
    },
    menu: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
    }
}));

function ProjectAppBar(props) {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user'));

    let [isLogOut, setLogOutStatus] = useState(false);
    let [open, setOpen] = useState(false);

    function toggleDrawer () {
        setOpen(!open);
    }

    async function handleLogOut() {
        const response = await microsoftLogOut();
        console.log("response: ", response);
        if(response.isLogOut){
            localStorage.removeItem('user');
            localStorage.removeItem('isAdmin');
            window.history.replaceState(null, null, "/");
            setLogOutStatus(true);
        }
    }

    function loadAllActiveProjects() {
        console.log("loadAllprojects");
        axios.get('http://localhost:4000/getAllActiveProjects')
            .then(response => {  
                console.log("response: ", response);           
                props.setProjects(response.data.projects);
                props.setStatus("All Active Club Projects");
                props.setIsAllActiveProjects(true);
            });
    }

    function loadOngoingProjects() {
        console.log("loadOngoingprojects");
        axios.get('http://localhost:4000/user/'+ user.userId +'/getUserActiveProjects')
        .then(response => { 
            console.log("response: ", response);            
            props.setProjects(response.data.projects);
            props.setStatus("Your Ongoing Projects");
            props.setIsAllActiveProjects(false);
        });
    }

    function loadCompletedProjects() {
        console.log("loadCompletedprojects");
        axios.get('http://localhost:4000/user/'+ user.userId +'/getUserCompletedProjects')
        .then(response => {
            console.log("response: ", response);            
            props.setProjects(response.data.projects);
            props.setStatus("Your Completed Projects");
            props.setIsAllActiveProjects(false);
        });
    }

    function addNewProject() {
        props.setAddProjectDialog(!props.addProjectDialog);
        props.setIsNewProject(true);
    }

    const menuItemList=[['All Active Projects', loadAllActiveProjects], ['Ongoing', loadOngoingProjects], ['Completed', loadCompletedProjects], ['Add Project', addNewProject]];

    return (
        <div>
            {
                isLogOut? <Redirect to="/login" /> : 
                (
                    <div className={classes.root}>
                        <AppBar position="static" className={classes.appBar}>
                            <Toolbar className={classes.toolbar}>
                                <Button color="primary" href="/" className={classes.title}>
                                    Projects
                                </Button>
                                <div className={classes.menu}>
                                    <Hidden smDown>
                                        {menuItemList.map((listItem) => {
                                            return <Button color="primary" onClick={listItem[1]}>{listItem[0]}</Button> 
                                        })}
                                        <Button color="primary" onClick={handleLogOut}href='/login'>Log Out</Button>
                                    </Hidden>                                   
                                    <Hidden mdUp>
                                        <IconButton 
                                            edge="end" 
                                            className={classes.menuButton} 
                                            color="primary" 
                                            aria-label="menu" 
                                            onClick={toggleDrawer}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                        <SwipeableDrawer
                                            anchor='right'
                                            open={open}
                                            onClose={toggleDrawer}
                                            onOpen={toggleDrawer}
                                            className={classes.drawer}
                                            classes = {{
                                                paper: classes.drawerPaper,
                                            }}
                                        >
                                            <List>
                                                {menuItemList.map((item) => (
                                                <ListItem button key={item[0]} onClick={item[1]}>
                                                    <ListItemText primary={item[0]} />
                                                </ListItem>
                                                ))}
                                                <ListItem button key='LogOut' onClick={handleLogOut}>
                                                    <ListItemText primary='Log Out' />
                                                </ListItem>
                                            </List>
                                        </SwipeableDrawer>
                                    </Hidden>
                                </div>                   
                            </Toolbar>              
                        </AppBar>
                    </div>
                )
            }
        </div>
    )
}

export default ProjectAppBar;
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton, Hidden, List, ListItem, ListItemText, SwipeableDrawer} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
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
}));

function AppHeader(props) {
    const classes = useStyles();
    let [open, setOpen] = useState(false);

    function toggleDrawer () {
        setOpen(!open);
    }

    const menuItemList=['About Us', 'Gallery', 'Contact Us'];

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>               
                    <Typography className={classes.title} noWrap>
                        {props.appBarTitle}
                    </Typography>
                    <Hidden smDown>
                        <Button color="inherit" href="/about">About Us</Button>
                        <Button color="inherit" href="/about">Gallery</Button>
                        <Button color="inherit" href="/about">Contact Us</Button>
                    </Hidden>
                    
                    <Hidden mdUp>
                        <IconButton 
                            edge="end" 
                            className={classes.menuButton} 
                            color="inherit" 
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
                                {menuItemList.map((text) => (
                                <ListItem button key={text} href="/about">
                                    <ListItemText primary={text} />
                                </ListItem>
                                ))}
                            </List>
                        </SwipeableDrawer>
                    </Hidden>
                </Toolbar>
                
            </AppBar>
        </div>
    );
}

export default AppHeader;
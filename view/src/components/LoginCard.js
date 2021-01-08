import React from "react";
import {Button, Grid, Typography, Avatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clubLogo from "../resources/icons/elecClubLogo.png"

const useStyles = makeStyles((theme) => ({
    avatar: {
		height: '128px',
		width: '128px',
	},
    main: {
        backgroundColor: '#bdbdbd',
        paddingLeft: '10px',
        paddingRight: '10px',
        maxWidth: 400,
    },
    title: {
        paddingTop: '60px',      
    },
    body: {
        paddingTop: '20px',
    },
    signInButton: {
        paddingTop: '40px',
        paddingBottom: '20px',
    },
}));

function LoginCard(props) {

    const classes = useStyles();

    return (
        <Grid container className={classes.main}>
            <Grid item xs={12} className={classes.title}>
                <Avatar className={classes.avatar} src={clubLogo} />
                <Typography variant="h5">ELECTRONICS CLUB</Typography>
            </Grid>
            <Grid item xs={12} className={classes.body}>
                <Typography variant="h5">Login and Apply for Projects</Typography>
            </Grid>
            <Grid item xs={12} className={classes.signInButton}>
                <Button variant="contained" size="large" color="secondary" onClick={props.handleLogin}>Sign In IITG Outlook Id</Button>
            </Grid>
        </Grid>
    )
}

export default LoginCard;
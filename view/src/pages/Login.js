import React from "react";
import {Grid, Typography, Hidden} from '@material-ui/core';
import backgroundImage from '../resources/images/background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import LoginCard from "../components/LoginCard";

const useStyles = makeStyles((theme) => ({
    backgroundDiv: {
        height: "650px",
        [theme.breakpoints.down('xs')]: {
			height: '700px',
		},
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100%",
        backgroundColor: '#141415',
		backgroundPosition: 'center',
        marginBottom: '40px',
        position: "relative"
    },
    container: {
        margin: 'auto',
        marginTop: '200px',
        [theme.breakpoints.down('sm')]: {
			marginTop: '100px',
		},
    },
    loginCard: {
        margin: 'auto',
        marginTop: '100px',
        [theme.breakpoints.down('sm')]: {
			marginTop: '50px',
        },
    },
    main: {
        width: '90%',
    },
}));

function Login(props) {
    const classes = useStyles();

    return (
        <div>
            <AppHeader appBarTitle="ELECTRONICS CLUB IIT GUWAHATI"/>
            <div className={classes.backgroundDiv}>
                <center>
                <Grid container className={classes.main}>
                    <Grid item xs = {12} md={7}>
                        <Grid container spacing={2} className={classes.container}>
                            <Grid item xs={12}>
                                <Typography variant="h3" color="primary" style={{textAlign: 'center'}}>Welcome To The Community</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5"  color="primary" style={{textAlign: 'center'}}>WE BELIEVE IN EXCELLENCE</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Hidden only={['xs', 'md', 'lg']}>
                        <Grid item sm={3}></Grid>
                    </Hidden>
                    <Grid item xs={12} sm={6} md={5}>
                        <Grid container spacing={2} className={classes.loginCard}>
                            <Grid item xs={12}>
                                <LoginCard />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Hidden only={['xs', 'md', 'lg']}>
                        <Grid item sm={3}></Grid>
                    </Hidden>
                </Grid>
                </center>
            </div>
            <AppFooter />
        </div>
    )
}

export default Login;
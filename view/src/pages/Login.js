import React from "react";
import {Grid, Typography, Hidden} from '@material-ui/core';
import backgroundImage from '../resources/images/background.jpg';
import { makeStyles } from '@material-ui/core/styles';
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import LoginCard from "../components/LoginCard";
import teamDetails from '../content/TeamDetails';
import {microsoftAuth} from '../components/firebase/firebaseAuth';
import axios from "axios";
require('dotenv').config();

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

    let user={};
    async function handleLogin() {
        console.log("process.env: ", process.env.REACT_APP_firebaseapiKey);
        const response = await microsoftAuth();
        if(response.isLoginSuccessful){
            user = {
                email : response.result.user.email,
                name : response.result.user.displayName
            };
            await axios.post('/createUser', user)
            .then((response) => {
                user= {
                    ...user,
                    userId: response.data.userId
                }
                localStorage.setItem('user', JSON.stringify(user));
                teamDetails.forEach((teamPage) => {
                    teamPage.forEach((teamMember) => {
                        if(user.email === teamMember.email){
                            localStorage.setItem('isAdmin', true);
                        }
                    })
                })
                
                props.history.push('/user/'+ response.data.userId + '/projects');
            })
        }
    }

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
                                    <LoginCard handleLogin={handleLogin}/>
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
import React from "react";
import {Button, Grid, Typography, Avatar} from '@material-ui/core';
import teamDetails from '../content/TeamDetails';
import {microsoftAuth} from '../components/firebase/firebaseAuth';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
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

    let user={};
    async function handleLogin() {
        const response = await microsoftAuth();
        if(response.isLoginSuccessful){
            user = {
                email : response.result.user.email,
                name : response.result.user.displayName
            };
            await axios.post('http://localhost:4000/createUser', user)
            .then((response) => {
                user= {
                    ...user,
                    userId: response.data.userId
                }
                console.log("user: ", user);
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
        <Grid container className={classes.main}>
            <Grid item xs={12} className={classes.title}>
                <Avatar className={classes.avatar} src={clubLogo} />
                <Typography variant="h5">ELECTRONICS CLUB</Typography>
            </Grid>
            <Grid item xs={12} className={classes.body}>
                <Typography variant="h5">Login and Apply for Projects</Typography>
            </Grid>
            <Grid item xs={12} className={classes.signInButton}>
                <Button variant="contained" color="secondary" onClick={handleLogin}>Sign In IITG Outlook Id</Button>
            </Grid>
        </Grid>
    )
}

export default LoginCard;
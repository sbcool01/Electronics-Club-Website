import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography, Hidden, Button, Link} from '@material-ui/core';
import project from "../resources/icons/project.png";
import competition from "../resources/icons/competition.png";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "40px",
        paddingTop: "30px",
        paddingBottom: "30px",
        backgroundColor: "#000",
        width: '100% !important'
    },   
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px',
    },
    stepContainer: {
        width: '70%',
        [theme.breakpoints.down('xs')]: {
			width: '90%'
        },
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '30px',
    },
    image: {
        width: '80%',
    },
    attributeText: {
        fontSize: '8px'
    },
    attributeItem: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 'auto',
        marginTop: '20px',
        minHeight: '50px',
        maxHeight: '50px',
        fontSize: '1.2rem',
        paddingTop: '25px',
        paddingBottom: '25px',
    },
    participateText: {
        margin: "40px",
        fontWeight: 500,
        textAlign: 'center',
    },
    heading: {
        fontWeight: 600,
    }
}));

function HowToJoin() {
    const classes=useStyles();
    return (
        <Grid container spacing={2} className={classes.main}>
            <Grid item xs={12} className={classes.alignCenter}>
                <Typography variant="h4" color="primary" className={classes.heading}>How To Join</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} justify="center" alignItems="center" className={classes.stepContainer}>
                    <Hidden xsDown>
                        <Grid item sm={4} md={3}>
                            <img src={project} alt="" className={classes.image}></img>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={8} md={9}>
                        <Typography variant="h5" color="primary">
                            Show your interest by taking up a project with us or if you have interesting idea we would be happy to guide and support you.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} justify="center" alignItems="center" className={classes.stepContainer}>
                    <Grid item xs={12} sm={8} md={9}>
                        <Typography variant="h5" color="primary">
                            Attend the events, workshops and hackathons conducted by Electronics Club
                        </Typography>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item sm={4} md={3}>
                            <img src={competition} alt="" className={classes.image}></img>
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>  
            <Grid item xs={12} className={classes.alignCenter}>
                <Typography variant="h4" color="primary" className={classes.participateText}>Participate and you are among us</Typography>
            </Grid>
            <Grid item xs={12} className={classes.alignCenter}>
                <Button variant="contained" color="secondary" className={classes.button} href='/submitNewIdea'>SUBMIT NEW IDEA</Button>
            </Grid>
            <Grid item xs={12} className={classes.attributeItem}>
                    <Typography className={classes.attributeText} color="primary">
                        {'Items made by '} 
                        <Link href="https://www.flaticon.com/authors/freepik" color="primary">
                            Freepik
                        </Link>
                        {' and '} 
                        <Link href="https://www.flaticon.com/authors/pixel-perfect" color="primary">
                            Pixel perfect
                        </Link>
                        {' from '}
                        <Link href="https://www.flaticon.com/" color="primary">
                            www.flaticon.com
                        </Link>
                    </Typography>
            </Grid>      
        </Grid>
    );
}

export default HowToJoin;
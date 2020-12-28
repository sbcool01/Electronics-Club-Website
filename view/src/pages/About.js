import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Intro from "../components/Intro";
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../resources/images/background.jpg';

const useStyles = makeStyles((theme) => ({
    backgroundDiv: {
        height: "600px",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100%",
        backgroundColor: '#141415',
		backgroundPosition: 'center',
        marginBottom: '20px',
        position: "relative"
    },
    attributeText: {
        fontSize: '8px',
        position: "absolute",
        bottom: "10px",
        right: '0'
    },
    contentDiv: {
        position: "relative",
        width: '100%',
        margin: 'auto',
        paddingTop: '200px',
        textAlign: 'center'
    },
    primaryText: {
        color: 'white',
        marginTop: '40px',
        marginBottom: '40px',
    }
}));


function About() {
    const classes=useStyles();
    return (
        <div>
            <AppHeader appBarTitle="ELECTRONICS CLUB IIT GUWAHATI"/>
            <Intro primaryText="About Us" secondaryText="Who we are and what we do" classes={classes}/>
            <AppFooter />
        </div>
    )
}

export default About;
import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Intro from "../components/Intro";
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../resources/images/background.jpg';
import ContactForm from "../components/ContactForm";

const useStyles = makeStyles((theme) => ({
    backgroundDiv: {
        height: "350px",
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
        paddingTop: '100px',
        textAlign: 'center'
    },
    primaryText: {
        color: 'white',
        marginTop: '15px',
        marginBottom: '15px',
    }
}));

function ContactUs() {
    const classes=useStyles();
    return (
        <div>
            <AppHeader appBarTitle="ELECTRONICS CLUB IIT GUWAHATI"/>
            <Intro primaryText="Contact Us" secondaryText="Excited to have you in Electronics club family" pagename="Contact" classes={classes}/>
            <ContactForm />
            <AppFooter />
        </div>
    )
}

export default ContactUs;
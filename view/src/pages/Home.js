import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Intro from "../components/Intro";
import ClubPerks from "../components/ClubPerks";
import Team from "../components/Team";
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../resources/images/background.jpg';
import HowToJoin from "../components/HowToJoin"

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
    },
    line: {
        marginTop: '60px',
        border: 'none',
        borderTop:'5px dotted #bbbfca',
        height:'5px',
        width:'10%',
    }
}));

function Home() {
    const classes=useStyles();
    return (
        <div>
            <AppHeader appBarTitle="ELECTRONICS CLUB IIT GUWAHATI"/>
            <Intro primaryText="INNOVATION | APPLICATION" secondaryText="WE BELIEVE IN EXCELLENCE" classes={classes}/>
            <ClubPerks />
            <hr className={classes.line}></hr>
            <Team />
            <HowToJoin />
            <AppFooter />
        </div>
    )
}

export default Home;
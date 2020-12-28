import React from "react";
import {Link, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import backgroundImage from '../resources/images/background.jpg';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme();

theme.typography = {
    fontFamily: [
        'Roboto Condensed',
        'sans-serif',
    ].join(','),
};

theme.typography.h3 = {
  fontSize: '2.7rem',
  [theme.breakpoints.down('xs')]: {
    fontSize: '2.2rem',
  }, 
  fontWeight: "550",
};

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

function Intro(props) {
    const classes = useStyles();
    return (
        <div className={classes.backgroundDiv}>
            <div className={classes.contentDiv}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.primaryText}>{props.primaryText}</Typography>
                    <Typography variant="h5" className={classes.primaryText}>{props.secondaryText}</Typography>
                </ThemeProvider>               
            </div>
            <Link href='https://pngtree.com/free-backgrounds' className={classes.attributeText}>free background photos from pngtree.com</Link>
        </div>
    )
}

export default Intro;
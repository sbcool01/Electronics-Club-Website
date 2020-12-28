import React from "react";
import {Link, Typography} from "@material-ui/core";
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

function Intro(props) {
    return (
        <div className={props.classes.backgroundDiv}>
            <div className={props.classes.contentDiv}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={props.classes.primaryText}>{props.primaryText}</Typography>
                    <Typography variant="h5" className={props.classes.primaryText}>{props.secondaryText}</Typography>
                </ThemeProvider>               
            </div>
            <Link href='https://pngtree.com/free-backgrounds' className={props.classes.attributeText}>free background photos from pngtree.com</Link>
        </div>
    )
}

export default Intro;
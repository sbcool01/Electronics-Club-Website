import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link, Typography, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '20px'
    },
}));

function Intro(props) {
    const classes = useStyles();
    return (
        <div className={props.classes.backgroundDiv}>
            <div className={props.classes.contentDiv}>
                <Typography variant="h3" className={props.classes.primaryText}>{props.primaryText}</Typography>
                <Typography variant="h5" className={props.classes.primaryText}>{props.secondaryText}</Typography>
            </div>
            {
                (props.pagename==="Home")? 
                <center><Button variant="contained" color="secondary" className={classes.button} size='large'>Sign In</Button></center>
                :null
            }
            <Link href='https://pngtree.com/free-backgrounds' className={props.classes.attributeText}>free background photos from pngtree.com</Link>
        </div>
    )
}

export default Intro;
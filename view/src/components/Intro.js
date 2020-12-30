import React from "react";
import {Link, Typography} from "@material-ui/core";

function Intro(props) {
    return (
        <div className={props.classes.backgroundDiv}>
            <div className={props.classes.contentDiv}>
                <Typography variant="h3" className={props.classes.primaryText}>{props.primaryText}</Typography>
                <Typography variant="h5" className={props.classes.primaryText}>{props.secondaryText}</Typography>
            </div>
            <Link href='https://pngtree.com/free-backgrounds' className={props.classes.attributeText}>free background photos from pngtree.com</Link>
        </div>
    )
}

export default Intro;
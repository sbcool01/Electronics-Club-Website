import React from "react";
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import axios from "axios";

function ConfirmationDialog(props) {

    function handleDeleteProject() {
        console.log("inHandleDeleteProject");
        axios.delete('/deleteProject/' + props.project._id.toString())
        .then(response => {
            console.log("Deleted Project Succesfully");
            props.setOpenDeleteDialog(false);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <Dialog
        open={props.openDeleteDialog}
        onClose={props.setOpenDeleteDialog}
        >
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.dialogContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={() => props.setOpenDeleteDialog(!props.openDeleteDialog)}>No</Button>
                <Button variant="contained" color="secondary" onClick={handleDeleteProject}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog;
import React, { useState, useRef, useEffect} from "react";
import { makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {Dialog, DialogTitle, Button, Grid, Container, Typography, TextField, MenuItem} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'
import theme from "../components/theme";
import { storage } from "./firebase/firebase.js";
import axios from "axios";

const rawTheme=createMuiTheme({
    ...theme,
    palette: {
        primary: {
            main: '#000'
        },
        secondary: {
            main: '#06c',
        },
        inherit: {
            main: '#000'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
    }
}));

function AddProjectDialog(props) {
    const classes=useStyles();
    const handleClose = () => {
        props.setAddProjectDialog(false);
    };

    const [file, setFile] = useState(null);
    const inputFile = useRef(null);
    let [project, setProject] = useState({
        name: "",
        domain: "",
        status: "",
        desc: "",
        tags: [],
        url: "",
        mentors: [],
        teamMembersWithEmail: [],
        teamMembersWithName: [],
        AddedBy: JSON.parse(localStorage.getItem('user')).email
    });
    let [prevValue, setPrevValue] = useState(false);

    useEffect(() => {
        if((!prevValue)&&(!props.isNewProject)){
            const updateProject = {
                name: props.project.name,
                domain: props.project.domain,
                status: props.project.status,
                desc: props.project.desc,
                tags: props.project.tags,
                url: props.project.url,
                mentors: props.project.mentors,
                teamMembersWithEmail: props.project.teamMembersWithEmail,
                teamMembersWithName: props.project.teamMembersWithName,
                AddedBy: props.project.AddedBy,
            }
            setProject(updateProject);
            setPrevValue(false);
        }
    }, [prevValue, props]);

    function handleChange(event) {
        let element=event.target.name;
        let value=event.target.value;
        setProject(prevValue => {
            return ({
                ...prevValue,
                [element]: value
            })
        })
    }

    function handleAddChip(element, chip) {
        let chips=project[element];
        chips.push(chip);
        setProject(prevValue => {
            return ({
                ...prevValue,
                [element]: chips
            })
        })
    }

    function handleDeleteChip(element, chip, index) {
        let chips=project[element];
        chips.splice(index, 1);
        setProject(prevValue => {
            return ({
                ...prevValue,
                [element]: chips
            })
        })
    }

    function handleFile(event) {
        setFile(event.target.files[0]);
    }

    function removeFile(event) {
        inputFile.current.value='';
        setFile(null);
    }

    function handleURL(url) {
        setProject(prevValue => {
            return ({
                ...prevValue,
                "url": url
            })
        })
    }

    function handleUpload() {    
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", console.log, console.error, () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
                handleURL(url);
            });
        });
    }

    function handleSubmit() {
        if((props.project)&&(props.project._id)){
            axios.post('http://localhost:4000/editProject/' + props.project._id.toString(), project)
            .then((response) => {
                console.log("response: ", response);
            });
            handleClose();
            window.location.reload();
        } else {
            axios.post('http://localhost:4000/addNewProject', project)
            .then((response) => {
                console.log("response: ", response);
            });
            handleClose();
            window.location.reload();
        }       
    }

    return (
        <Container maxWidth="sm" style={{padding: '10px'}}>          
            <Dialog
            fullWidth
            open={props.addProjectDialog}
            onClose={handleClose}
            >
                <DialogTitle>
                    <Typography variant="h5" className={classes.title}>Add New Project</Typography>
                </DialogTitle>
                <ThemeProvider theme={rawTheme}>
                    <form >
                        <Grid container>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <TextField fullWidth variant= "outlined" required name="name" label="Project Name" defaultValue="" value={project.name} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{padding: '10px'}}>
                                <TextField fullWidth variant= "outlined" required name="domain" label="Domain" defaultValue="" value={project.domain} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6} style={{padding: '10px'}}>
                                <TextField select fullWidth variant= "outlined" required name="status" label="Status" defaultValue="" value={project.status} onChange={handleChange}>
                                    <MenuItem key="" value="Active">
                                        Active
                                    </MenuItem>
                                    <MenuItem key="" value="Completed">
                                        Completed
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <TextField fullWidth variant= "outlined" required name="desc" label="Description" value={project.desc} multiline rows={4} rowsMax={8} defaultValue="" onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <ChipInput required fullWidth variant="outlined" name="tags" label="Tags" value={project.tags} onAdd={(chip) => handleAddChip("tags", chip)} onDelete={(chip, index) => handleDeleteChip("tags", chip, index)} />
                            </Grid>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <ChipInput fullWidth variant="outlined" name="mentors" label="Add Mentors By Email"  value={project.mentors} onAdd={(chip) => handleAddChip("mentors", chip)} onDelete={(chip, index) => handleDeleteChip("mentors", chip, index)} />
                            </Grid>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <ChipInput fullWidth variant="outlined" name="teamMembersWithEmail" label="Add Team Members By Email"  value={project.teamMembersWithEmail} onAdd={(chip) => handleAddChip("teamMembersWithEmail", chip)} onDelete={(chip, index) => handleDeleteChip("teamMembers", chip, index)} />
                            </Grid>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <ChipInput fullWidth variant="outlined" name="teamMembersWithName" label="Add Team Members By Name" value={project.teamMembersWithName} onAdd={(chip) => handleAddChip("teamMembersWithName", chip)} onDelete={(chip, index) => handleDeleteChip("otherTeamMembers", chip, index)}/>
                            </Grid>
                            <Grid item xs={12} style={{padding: '10px'}}>
                                <center>
                                <input required type="file" onChange={handleFile} ref={inputFile}/>
                                <Button onClick={removeFile}>Remove File</Button>
                                <Button disabled={!file} onClick={handleUpload}>Upload</Button>
                                </center>
                            </Grid>
                            <Grid item xs={6} sm={4} style={{padding: '10px', margin: 'auto'}}>
                                <center>
                                    <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    disabled={
                                        (!(project.name))||
                                        (!(project.desc))||(!(project.domain))||
                                        (!(project.status))||
                                        ((!project.tags)||((project.tags)&&(project.tags.length===0)))||
                                        (!(project.url))
                                    }
                                    onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </center>
                            </Grid>
                        </Grid>
                    </form>
                </ThemeProvider>
            </Dialog>
        </Container>
    )
}

export default AddProjectDialog;
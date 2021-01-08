import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import theme from "../components/theme";
import axios from 'axios';

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
    container: {
        margin: 'auto',
        marginTop: '60px',
        width: '50%',
        [theme.breakpoints.down('sm')]: {
			width: '70% !important'
		},
        [theme.breakpoints.down('xs')]: {
			width: '100% !important'
		},
    },
    text: {
        textAlign: 'center',
    },
    button: {
        margin: 'auto',
        marginTop: '20px',
        fontSize: '1rem',
        padding: '10px',
        width: '40%'
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function ContactForm (props) {
    const classes=useStyles();

    let [formData, setFormData] = useState({
        name: '',
        from: '',
        subject: '',
        msg: '',
    });

    function handleChange(event) {
        let element=event.target.name;
        let value=event.target.value;
        setFormData(prevValue => {
            return ({
                ...prevValue,
                [element]: value
            })
        })
    }
    
    function sendContactUsData() {
        axios.post('http://localhost:4000/sendDataToEmail/', formData)
        .then((response)=> {
            console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
            window.location.reload();
        })
    }

    return (
        <form >
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.container}>
            <Grid item xs={12} style={{marginBottom: "20px"}}>
                <Typography variant='h5' className={classes.text}>Fill your Details and we will get back to you shortly</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <ThemeProvider theme={rawTheme}>
                    <TextField
                        fullWidth
                        required
                        variant="outlined"
                        id="name"
                        name="name"
                        label="Name"
                        defaultValue=""
                        value={formData.name}
                        onChange={handleChange}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
                <ThemeProvider theme={rawTheme}>
                    <TextField
                        fullWidth
                        required
                        variant="outlined"                    
                        id="email"
                        name="from"
                        label="Contact Email"
                        defaultValue=""
                        value={formData.from}
                        onChange={handleChange}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
                <ThemeProvider theme={rawTheme}>
                    <TextField
                        fullWidth
                        required
                        variant="outlined"
                        id="topic"
                        name="subject"
                        label={(props.pagename === 'ContactUs')? "Topic" : "Domain"}
                        defaultValue=""
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
                <ThemeProvider theme={rawTheme}>
                    <TextField
                        fullWidth
                        multiline
                        required
                        variant="outlined"                   
                        rows={4}
                        rowsMax={10}                      
                        id="msg"
                        name="msg"
                        label={(props.pagename === 'ContactUs')? "Your Message" : "Your Idea"}
                        defaultValue=""
                        value={formData.msg}
                        onChange={handleChange}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item xs={12} className={classes.alignCenter}>
                <Button 
                variant="contained" 
                color="secondary" 
                className={classes.button} 
                onClick={sendContactUsData} 
                disabled={(!formData.name)||(!formData.subject)||(!formData.from)||(!formData.msg)}
                >
                Submit
                </Button>
            </Grid>
            <Grid item xs={12} style={{marginTop: "60px"}}>
                <Typography variant='h5' className={classes.text}>Or Connect with us on Social Media</Typography>
            </Grid>
        </Grid>
        </form>
    );
}

export default ContactForm;
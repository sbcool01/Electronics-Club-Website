import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Grid, TextField, Typography, Button} from '@material-ui/core';
import theme from "../components/theme";

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

function ContactForm () {
    const classes=useStyles();
    return (
        <form>
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.container}>
                <Grid item xs={12} style={{marginBottom: "20px"}}>
                    <Typography variant='h5' className={classes.text}>Fill your Details and we will get back to you shortly</Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <ThemeProvider theme={rawTheme}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="name"
                            label="Name"
                        />
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ThemeProvider theme={rawTheme}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="roll"
                            label="Roll no."
                        />
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12}>
                    <ThemeProvider theme={rawTheme}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="email"
                            label="Email"
                        />
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12}>
                    <ThemeProvider theme={rawTheme}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            rowsMax={10}
                            required
                            id="msg"
                            label="Your Message"
                        />
                    </ThemeProvider>
                </Grid>
                <Grid item xs={12} className={classes.alignCenter}>
                    <Button variant="contained" color="secondary" className={classes.button}>Submit</Button>
                </Grid>
                <Grid item xs={12} style={{marginTop: "60px"}}>
                    <Typography variant='h5' className={classes.text}>Or Connect with us on Social Media</Typography>
                </Grid>
            </Grid>
        </form>
    );
}

export default ContactForm;
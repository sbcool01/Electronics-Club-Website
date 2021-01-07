import React from "react";
import {Button} from '@material-ui/core';
import {microsoftAuth} from '../components/firebase/firebaseAuth';
import axios from "axios";
import teamDetails from '../content/TeamDetails';

function Login(props) {

    let user={};
    async function handleLogin() {
        const response = await microsoftAuth();
        if(response.isLoginSuccessful){
            user = {
                email : response.result.user.email,
                name : response.result.user.displayName
            };
            await axios.post('http://localhost:4000/createUser', user)
            .then((response) => {
                user= {
                    ...user,
                    userId: response.data.userId
                }
                console.log("user: ", user);
                localStorage.setItem('user', JSON.stringify(user));
                teamDetails.forEach((teamPage) => {
                    teamPage.forEach((teamMember) => {
                        if(user.email === teamMember.email){
                            localStorage.setItem('isAdmin', true);
                        }
                    })
                })
                
                props.history.push('/user/'+ response.data.userId + '/projects');
            })
        }
    }

    return (
        <div>
            <Button variant="contained" color="inherit" onClick={handleLogin}>
                Login
            </Button>
        </div>
    )
}

export default Login;
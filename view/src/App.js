import React from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import theme from "./components/theme";
import ProjectsPage from "./pages/ProjectsPage";
import Login from "./pages/Login";
import UserProjects from "./pages/UserProjects";
import ShareNewIdea from "./pages/ShareNewIdea";
import axios from "axios";

var api_url="";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	axios.defaults.baseURL = 'http://localhost:4000';
} else {
	api_url = ""	
}

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <ThemeProvider theme={theme}>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/contact-us" component={ContactUs}/>
                        <Route exact path="/gallery" component={Gallery}/>
                        <Route exact path="/blog" component={Blog}/>
                        <Route exact path="/projects" component={ProjectsPage}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/submitNewIdea" component={ShareNewIdea}/>
                        <Route exact path="/user/:userId/projects" render={(props) => <UserProjects {...props}/>}/>
                    </ThemeProvider>
                </Switch>             
            </div>
        </Router>
    );
}

export default App;

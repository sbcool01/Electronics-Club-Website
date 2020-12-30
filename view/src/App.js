import React from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import theme from "./components/theme";

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
                        {/* <Route strict path="/about" render={(props) => <About {...props} />}/> */}
                    </ThemeProvider>
                </Switch>             
            </div>
        </Router>
    );
}

export default App;

import React from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Gallery from "./pages/Gallery";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/contact-us" component={ContactUs}/>
                    <Route exact path="/gallery" component={Gallery}/>
                    {/* <Route strict path="/about" render={(props) => <About {...props} />}/> */}
                </Switch>             
            </div>
        </Router>
    );
}

export default App;

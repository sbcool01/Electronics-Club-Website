import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    {/* <Route strict path="/about" render={(props) => <About {...props} />}/> */}
                </Switch>             
            </div>
        </Router>
    );
}

export default App;

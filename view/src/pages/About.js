import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Intro from "../components/Intro";

function About() {
    console.log("in about top");
    return (
        <div>
            <AppHeader appBarTitle="ELECTRONICS CLUB IIT GUWAHATI"/>
                <Intro primaryText="About Us" secondaryText="Who we are and what we do"/>
            <AppFooter />
        </div>
    )
}

export default About;
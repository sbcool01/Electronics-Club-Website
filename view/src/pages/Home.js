import React from "react";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Intro from "../components/Intro";

function Home() {
    return (
        <div>
            <AppHeader appBarTitle="ELECTRONICS CLUB IIT GUWAHATI"/>
            <Intro primaryText="INNOVATION | APPLICATION" secondaryText="WE BELIEVE IN EXCELLENCE"/>
            <AppFooter />
        </div>
    )
}

export default Home;
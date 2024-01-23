import React from 'react'; /*,{useEffect, useState}*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from './views/signInView/signIn.js';
import RegisterSiteView from './views/registerSiteView/registerSiteView.js'
import GeneralView from './views/generalView/generalView.js';

import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            {/*<img className="background" src={ImageFond} alt="Fond"></img>
            <NavBar className="navBar" 
                btnLogin={btnLogin} 
                changeStateBtnLogin={changeStateBtnLogin} 
                isLogged={isLogged}
                changeIsLogged={changeIsLogged}
                changeIsAdmin={changeIsAdmin}> 
            </NavBar>
            */}
            <Routes>
                <Route path="*" element={<h1>404: page not found</h1>}/>
                <Route path='/' exact element={<SignIn />} />
                <Route path='/register' exact element={<RegisterSiteView />} />
                <Route path='/general' exact element={<GeneralView />} />
                {/*<Route path='/contact' exact element={<ContactView changeUrl={changeUrl} />}/>
                
                <Route path={"/Sessions/:id"} exact element={<InfoViewSession />} />
                <Route path={'/Sessions'} exact element={<SessionView />} />
                <Route path={"/Athletes/:id"} exact element={<InfoViewAthlete />} />
                <Route path={"/Athletes/:id"} exact element={<InfoTab />} />
                <Route path={"/Bilans/:id"} exact element={<InfoTab />} />
                <Route path='/Sessions/Create' exact element={<SessionForm type="create"/>} />
                <Route path='/Sessions/Update' exact element={<SessionForm />} />
                <Route path='/Athletes' exact element={<AthleteView />} />
                <Route path='/Athletes/Create' exact element={<FormAthlete type="create" />} />
                <Route path='/Athletes/Update' exact element={<FormAthlete />} />>*/}
                
            </Routes>
        </Router> 
    </div>
);
}

export default App;
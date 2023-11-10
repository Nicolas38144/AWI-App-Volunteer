import React, {useState, useEffect} from 'react'; /*,{useEffect, useState}*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/navBar/navBar.js';
import HomeView from './views/homeView/homeView.js'
import ContactView from './views/contactView/contactView.js';

import ImageFond from './images/fond.jpg'

import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <img className="background" src={ImageFond} alt="Fond"></img>
            <NavBar className="navBar" 
                btnLogin={btnLogin} 
                changeStateBtnLogin={changeStateBtnLogin} 
                isLogged={isLogged}
                changeIsLogged={changeIsLogged}
                changeIsAdmin={changeIsAdmin}> 
            </NavBar>
            <Routes>
                <Route path="*" element={<h1>404: page not found</h1>}/>
                <Route path='/' exact element={<HomeView />} />
                <Route path='/home' exact element={<HomeView />} />
                <Route path='/contact' exact element={<ContactView changeUrl={changeUrl} />}/>
                {/*
                <Route path={"/Sessions/:id"} exact element={<InfoViewSession />} />
                <Route path={'/Sessions'} exact element={<SessionView />} />
                <Route path={"/Athletes/:id"} exact element={<InfoViewAthlete />} />
                <Route path={"/Athletes/:id"} exact element={<InfoTab />} />
                <Route path={"/Bilans/:id"} exact element={<InfoTab />} />
                <Route path='/Sessions/Create' exact element={<SessionForm type="create"/>} />
                <Route path='/Sessions/Update' exact element={<SessionForm />} />
                <Route path='/Athletes' exact element={<AthleteView />} />
                <Route path='/Athletes/Create' exact element={<FormAthlete type="create" />} />
                <Route path='/Athletes/Update' exact element={<FormAthlete />} />>
                */}
            </Routes>
        </Router> 
    </div>
);
}

export default App;
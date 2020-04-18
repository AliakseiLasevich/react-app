import React from 'react';

import './App.css';
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <Menu/>
                <Content/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;


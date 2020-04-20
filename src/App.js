import React from 'react';

import './App.css';
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";

function App(props) {

    return (
            <div className="wrapper">
                <Header/>
                <Menu/>
                <Content state={props.state}/>
                <Footer/>
            </div>

    );
}

export default App;


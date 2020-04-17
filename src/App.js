import React from 'react';

import './App.css';
import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";


function App() {
    return (
        <div className="wrapper">
        <Header/>
        <Menu/>
        <Content/>
        <Footer/>
        </div>
    );
}

export default App;

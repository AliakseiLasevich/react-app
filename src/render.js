import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";
import {addFaculty} from "./state/state";

export let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state} addFaculty={addFaculty}/>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
};


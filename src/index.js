import './index.css';
import * as serviceWorker from './serviceWorker';
import state, {addFaculty, redrawTextInput, subscribe} from "./state/state";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import App from "./App";

let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App
                    state={state}
                    addFaculty={addFaculty}
                    redrawTextInput={redrawTextInput} />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

rerenderEntireTree(state);

subscribe(rerenderEntireTree);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import * as axios from "axios";

// DAL LAYER
//not used yet

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080/rest/",
    headers: {
        "Content-Type": "application/json"
    }
});


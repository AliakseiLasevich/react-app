import * as axios from "axios";

// DAL LAYER

const instance = axios.create({
    baseURL: "http://localhost:8080/rest/",
    headers: {
        "Content-Type": "application/json"
    }
});

export const facultyAPI = {
    getFaculties(){
        return instance.get("faculties");
    }
};

export const cathedraAPI = {
    getCathedras() {
        return instance.get("cathedras");
    }
};


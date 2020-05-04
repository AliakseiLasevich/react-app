import * as axios from "axios";

// DAL LAYER

const instance = axios.create({
    baseURL: "http://localhost:8080/rest/",
    headers: {
        "Content-Type": "application/json"
    }
});

export const facultyAPI = {
    getFaculties() {
        return instance.get("faculties");
    },
    getFacultyById(id) {
        return instance.get("faculties/" + id)
    }
};

export const cathedraAPI = {
    getCathedras() {
        return instance.get("cathedras");
    },
    getCathedraById(id) {
        return instance.get("cathedras/" + id)
    }
};

export const teacherAPI = {
    getTeachers() {
        return instance.get("teachers");
    }
};


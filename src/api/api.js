import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/rest/",
    headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    },
});

export const facultyAPI = {
    getFaculties() {
        return instance.get("faculties");
    },
    getFacultyById(id) {
        return instance.get("faculties/" + id)
    },
    postFaculty(name) {
        return instance.post("faculties/", {
            name
        })
    },
    putFaculty(faculty) {
        return instance.put(`faculties/${faculty.id}`, faculty.name)
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


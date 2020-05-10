import * as axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.0.243:8080/rest/",
    headers: {
        'Content-Type': 'application/json',
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
        debugger
        return instance.put(`faculties/${faculty.id}`, {name: faculty.name, active: faculty.active})
    }
};

export const cathedraAPI = {
    getCathedrasWithFaculties() {
        return instance.get("cathedras");
    },
    getCathedraById(id) {
        return instance.get("cathedras/" + id)
    },
    postCathedra(cathedra) {
        debugger
        return instance.post("cathedras/", cathedra);
    },
    putCathedra(cathedra) {
        return instance.put(`cathedras/${cathedra.id}`, cathedra)
    }
};

export const teacherAPI = {
    getTeachers() {
        return instance.get("teachers");
    }
};


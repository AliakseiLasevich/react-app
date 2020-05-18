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
        return instance.put(`faculties/${faculty.id}`,
            {name: faculty.name, active: faculty.active})
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
        return instance.post("cathedras/", cathedra);
    },
    putCathedra(cathedra) {
        return instance.put(`cathedras/${cathedra.id}`, cathedra)
    }
};

export const teacherAPI = {
    getTeachers() {
        return instance.get("teachers");
    },
    getTeacherById(id) {
        return instance.get(`teachers/${id}`);
    },
    postTeacher(teacher) {
        return instance.post("teachers", teacher)
    },
    putTeacher(teacher) {
        return instance.put(`teachers/${teacher.id}`, teacher)
    }
};

export const cabinetAPI = {
    getCabinetById(id) {
        return instance.get(`cabinets/${id}`);
    },
    getCabinetsByBuildingId(buildingId) {
        return instance.get("cabinets", {
            params: {
                buildingId
            }
        })
    },
    postCabinet(cabinet) {
        return instance.post("cabinets", cabinet)
    },
    putCabinet(cabinet) {
        return instance.put(`cabinets/${cabinet.id}`, cabinet)
    }
};

export const buildingAPI = {
    getBuildings() {
        return instance.get("buildings");
    },
    getBuildingById(id) {
        return instance.get(`buildings/${id}`);
    },
    postBuilding(building) {
        return instance.post("buildings", building);
    },
    putBuilding(building) {
        return instance.put(`buildings/${building.id}`, building)
    }
};

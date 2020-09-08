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
    getFacultyById(publicId) {
        return instance.get("faculties/" + publicId)
    },
    postFaculty(faculty) {
        return instance.post("faculties", faculty)
    },
    putFaculty(faculty, facultyId) {
        return instance.put(`faculties/${facultyId}`,
            faculty)
    },
    deleteFaculty(facultyId) {
        return instance.delete(`faculties/${facultyId}`)
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
        return instance.post(`cathedras/faculties/${cathedra.facultyId}`, cathedra);
    },
    putCathedra(cathedra, cathedraId) {
        return instance.put(`cathedras/${cathedraId}`, cathedra);
    },
    deleteCathedra(cathedraId) {
        return instance.delete(`cathedras/${cathedraId}`)
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
    putTeacher(teacher, teacherId) {
        return instance.put(`teachers/${teacherId}`, teacher)
    },
    deleteTeacher(teacherId) {
        return instance.delete(`teachers/${teacherId}`)
    }
};

export const cabinetAPI = {
    getCabinets() {
        return instance.get(`cabinets`)
    },
    postCabinet(cabinet) {
        return instance.post(`cabinets`, cabinet)
    },
    putCabinet(cabinet, publicId) {
        return instance.put(`cabinets/${publicId}`, cabinet)
    },
    deleteCabinet(cabinetId) {
        return instance.delete(`cabinets/${cabinetId}`)
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
    putBuilding(building, buildingId) {
        return instance.put(`buildings/${buildingId}`, building)
    },
    deleteBuilding(buildingId) {
        return instance.delete(`buildings/${buildingId}`)
    }
};

export const specialtyAPI = {
    getSpecialties() {
        return instance.get("specialties");
    },
    getSpecialtyById(id) {
        return instance.get(`specialties/${id}`);
    },
    postSpecialty(specialty) {
        return instance.post("specialties", specialty);
    },
    putSpecialty(specialty, publicId) {
        return instance.put(`specialties/${publicId}`, specialty)
    },
    deleteSpecialty(publicId) {
        return instance.delete(`specialties/${publicId}`)
    },
    getSpecialtyByFacultyId(facultyId) {
        return instance.get(`specialties/faculties/${facultyId}`)
    }
};

export const studentGroupAPI = {
    getStudentGroups() {
        return instance.get("studentGroups");
    },
    getStudentGroupById(id) {
        return instance.get(`studentGroups/${id}`);
    },
    postStudentGroup(studentGroup) {
        return instance.post("studentGroups", studentGroup);
    },
    putStudentGroup(studentGroup) {
        return instance.put(`studentGroups/${studentGroup.id}`, studentGroup)
    },
    deleteStudentGroup(publicId) {
        return instance.put(`studentGroups/${publicId}`)
    }
};

export const studentCourseAPI = {
    postStudentCourse(studentCourse) {
        return instance.post(`student_courses`, studentCourse)
    },
    getAllStudentCourses(){
        return instance.get(`student_courses`)
    }
};

export const learnPlanAPI = {
    postLearnPlan(learnPlan) {
        return instance.post(`learn_plans`, learnPlan)
    },
    deleteLearnPlan(learnPlanId) {
        return instance.delete(`learn_plans/${learnPlanId}`)
    },
    getAllLearnPlans() {
        return instance.get(`learn_plans`)
    },
    getLearnPlanById(publicId) {
        return instance.get(`learn_plans/${publicId}`)
    },
    requestLearnPlansWithDateInclude(date) {
        return instance.get(`learn_plans/`, {
            params: {
                date
            }
        })
    }


};

export const disciplinesAPI = {
    getDisciplines() {
        return instance.get(`disciplines`)
    },
    deleteDiscipline(disciplineId) {
        return instance.delete(`disciplines/${disciplineId}`)
    },
    putDiscipline(discipline, disciplineId) {
        return instance.put(`disciplines/${disciplineId}`, discipline)
    },
    postDiscipline(discipline) {
        return instance.post("disciplines", discipline);
    }
};
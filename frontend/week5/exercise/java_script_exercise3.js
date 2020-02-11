const ELEMENTS = {
    RESULT_TEXT: document.getElementById("resultText"),
    ERROR_MESSAGE: document.getElementById("errorMessage"),
    COURSE: document.getElementById("courseName"),
    STUDENT: document.getElementById("student"),
    STUDENTS: document.getElementById("students"),
    POINTS: document.getElementById("points"),
    CALCULATE_RATING: document.getElementById("calculateRating"),
    TABLES: document.getElementById("tables")
};

const localStorageKey = "courses";
const allStudents = ["Ezra", "Lu", "Ning", "Johanna", "Maja"];
let allCourses = [];


function Student(name, points) {
    this.getName = () => {
        return name;
    };
    this.getPoints = () => {
        return points;
    };
    this.getGrade = () => {
        if (points <= 7) {
            return 0;
        } else if (parseInt(points, 10) === 30) {
            return 5;
        } else {
            return Math.floor(0.25 * points - 1.5);
        }
    };
    this.getGradeType= ()=> {
        if(this.getGrade() == 0){
            return "failed";
        }else if(this.getGrade()<= 2){
            return "satisfactory";
        }else if(this.getGrade()<= 4){
            return "good";
        }else if(this.getGrade()== 5){
            return "excellent";
        }else{
            return "something went wrong"
        }
    };
    this.toJSON = () => {
        return {name: name, points: points};
    };
}

function Course(name) {
    let studentList = [];
    let table = document.createElement("table");
    createTable();

    function createTable() {
        table.classList.add("results");
        // first row contain course name
        let newCourseHeader = table.insertRow(-1);
        let courseCell1 = newCourseHeader.insertCell(0);
        courseCell1.appendChild(document.createTextNode("Course:"));
        let courseCell2 = newCourseHeader.insertCell(1);
        courseCell2.appendChild(document.createTextNode(name));
        // second row contains headers for next rows
        let newRow = table.insertRow(-1);
        let header1 = newRow.insertCell(0);
        header1.appendChild(document.createTextNode("NAME"));
        let header2 = newRow.insertCell(1);
        header2.appendChild(document.createTextNode("POINTS"));
        let header3 = newRow.insertCell(2);
        header3.appendChild(document.createTextNode("GRADE"));
        let header4 = newRow.insertCell(3);
        header4.appendChild(document.createTextNode("GRADE TYPE"));
    }

    function addStudentToTable(newStudent) {
        let newStudentRow = table.insertRow(-1);
        let nameCell = newStudentRow.insertCell(0);
        nameCell.appendChild(document.createTextNode(newStudent.getName()));
        let pointsCell = newStudentRow.insertCell(1);
        pointsCell.appendChild(document.createTextNode(newStudent.getPoints()));
        let ratingCell = newStudentRow.insertCell(2);
        ratingCell.appendChild(document.createTextNode(newStudent.getGrade()));
        let gradeTypeCell = newStudentRow.insertCell(3);
        gradeTypeCell.appendChild(document.createTextNode(newStudent.getGradeType()));
    }

    this.addStudent = (student) => {
        let newStudent = new Student(student.getName(), student.getPoints());
        studentList.push(newStudent);
        addStudentToTable(newStudent);
    };
    this.getName = () => {
        return name;
    };
    this.getTable = () => {
        return table;
    };
    /*this.getStudentsList = function () {
        // Create copy of allStudents so that it is not modified by mistake
        return [...allStudents];
    };*/
    this.toJSON = () => {
        return {name: name, studentList};
    };
}

function createStudentsOption() {
    allStudents.map((student) => {
        let studentOption = document.createElement("option");
        studentOption.value = student;
        ELEMENTS.STUDENTS.appendChild(studentOption);
    });
}

function getCourse(name) {
    let existingCourse = allCourses.find(course => course.getName() === name);
    if (existingCourse) {
        return existingCourse;
    } else {
        let newCourse = new Course(name);
        allCourses.push(newCourse);
        return newCourse;
    }
}

function validateInput() {
    if (!ELEMENTS.COURSE.value) {
        throw new Error("Dont forget to enter all the information!");
    }
    if (!ELEMENTS.STUDENT.value) {
        throw new Error("Don't forget to enter all the information!");
    }else if(!allStudents.includes(ELEMENTS.STUDENT.value)){
        throw new Error("Invalid student!");
    }
    if (!ELEMENTS.POINTS.value) {
        throw new Error("Dont forget to enter all the information!");
    } else if (ELEMENTS.POINTS.value < 0 || ELEMENTS.POINTS.value > 30) {
        throw new Error("Invalid number");
    }
}

function removeChildren(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

function cleanError() {
    removeChildren(ELEMENTS.ERROR_MESSAGE);
}

function printError(errorMessage) {
    let textNode = document.createTextNode(errorMessage + " ");
    ELEMENTS.ERROR_MESSAGE.appendChild(textNode);
}

function printResultTable(table) {
    ELEMENTS.TABLES.appendChild(table);
}

function clearInputs() {
    ELEMENTS.COURSE.value = "";
    ELEMENTS.STUDENT.value = "";
    ELEMENTS.POINTS.value = null;
}

ELEMENTS.CALCULATE_RATING.addEventListener("click", () => {
    cleanError();
    try {
        validateInput();
    } catch (error) {
        printError(error.message);
        return;
    }
    let student = new Student(ELEMENTS.STUDENT.value, ELEMENTS.POINTS.value);
    let givenCourse = getCourse(ELEMENTS.COURSE.value);
    givenCourse.addStudent(student);
    printResultTable(givenCourse.getTable());
    localStorage.setItem(localStorageKey, JSON.stringify(allCourses));
    clearInputs();

});

window.addEventListener("load", () => {
    createStudentsOption();
    if (localStorage.getItem(localStorageKey)) {
        let parsedCourses = JSON.parse(localStorage.getItem(localStorageKey));
        let newCourse;
        allCourses = parsedCourses
            .map((course) => {
                newCourse = new Course(course.name);
                course.studentList.forEach((student) => {
                    let newStudent = new Student(student.name, student.points);
                    newCourse.addStudent(newStudent);
                });
                return newCourse;
            });
        allCourses.forEach((course) => {
            printResultTable(course.getTable());
        });
    }
});

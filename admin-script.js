document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
});

// Add Teacher
document.getElementById("addTeacherBtn").addEventListener("click", () => {
    const name = document.getElementById("teacherName").value.trim();
    const email = document.getElementById("teacherEmail").value.trim();
    const password = document.getElementById("teacherPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill out all teacher details.");
        return;
    }

    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    teachers.push({ name, email, password });
    localStorage.setItem("teachers", JSON.stringify(teachers));
    alert("Teacher added successfully!");
    displayTeachers();
    clearTeacherForm();
});

function displayTeachers() {
    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    const tbody = document.getElementById("teacherTable").querySelector("tbody");
    tbody.innerHTML = "";
    teachers.forEach((teacher, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.password}</td>
            <td><button class="actionBtn" data-index="${index}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".actionBtn").forEach(btn => {
        btn.addEventListener("click", deleteTeacher);
    });
}

function clearTeacherForm() {
    document.getElementById("teacherName").value = "";
    document.getElementById("teacherEmail").value = "";
    document.getElementById("teacherPassword").value = "";
}

function deleteTeacher(e) {
    const index = e.target.getAttribute("data-index");
    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    teachers.splice(index, 1);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    displayTeachers();
}

// Add Student
document.getElementById("addStudentBtn").addEventListener("click", () => {
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const password = document.getElementById("studentPassword").value.trim();
    const studentClass = document.getElementById("studentClass").value;

    if (!name || !email || !password || !studentClass) {
        alert("Please fill out all student details.");
        return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, email, password, class: studentClass });
    localStorage.setItem("students", JSON.stringify(students));
    alert("Student added successfully!");
    displayStudents();
    clearStudentForm();
});

function displayStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const tbody = document.getElementById("studentTable").querySelector("tbody");
    tbody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.password}</td>
            <td>${student.class}</td>
            <td><button class="actionBtn" data-index="${index}">Delete</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll(".actionBtn").forEach(btn => {
        btn.addEventListener("click", deleteStudent);
    });
}

function clearStudentForm() {
    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentPassword").value = "";
    document.getElementById("studentClass").value = "BCS3A";
}

function deleteStudent(e) {
    const index = e.target.getAttribute("data-index");
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Load data on page load
window.addEventListener("load", () => {
    displayTeachers();
    displayStudents();
});
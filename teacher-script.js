document.addEventListener('DOMContentLoaded', () => {
    const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    if (!teacherDetails) {
        alert('Please log in first.');
        window.location.href = 'index.html';
        return;
    }

    // Display teacher's name, email, and password
    document.getElementById('teacherNameHeader').textContent = teacherDetails.name;
    document.getElementById('teacherNameDetail').textContent = teacherDetails.name;
    document.getElementById('teacherEmailDetail').textContent = teacherDetails.email;
    document.getElementById('teacherPasswordDetail').textContent = teacherDetails.password;

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('teachers');
        window.location.href = 'index.html';
    });

    // Load students for attendance
    document.getElementById('loadStudentsBtn').addEventListener('click', () => {
        const selectedClass = document.getElementById('attendanceClass').value;
        const studentData = JSON.parse(localStorage.getItem('students')) || [];
        const studentsInClass = studentData.filter(student => student.class === selectedClass);

        const studentList = document.getElementById('studentList');
        studentList.innerHTML = '';

        if (studentsInClass.length === 0) {
            alert('No students found for the selected class.');
            return;
        }

        studentsInClass.forEach(student => {
            const li = document.createElement('li');
            li.textContent = student.name;

            const presentBtn = document.createElement('button');
            presentBtn.textContent = 'Present';
            presentBtn.addEventListener('click', () => {
                saveAttendance(student, 'Present');
            });

            const absentBtn = document.createElement('button');
            absentBtn.textContent = 'Absent';
            absentBtn.addEventListener('click', () => {
                saveAttendance(student, 'Absent');
            });

            li.appendChild(presentBtn);
            li.appendChild(absentBtn);
            studentList.appendChild(li);
        });
    });

    // Save attendance
    function saveAttendance(student, status) {
        const attendanceClass = document.getElementById('attendanceClass').value;
        const attendanceSubject = document.getElementById('attendanceSubject').value;
        const attendanceDate = document.getElementById('attendanceDate').value;

        if (!attendanceSubject || !attendanceDate) {
            alert('Please fill in all fields.');
            return;
        }

        const attendanceData = JSON.parse(localStorage.getItem('attendance')) || [];
        attendanceData.push({
            studentName: student.name,
            subject: attendanceSubject,
            status: status,
            date: attendanceDate,
            class: attendanceClass,
        });
        localStorage.setItem('attendance', JSON.stringify(attendanceData));
        alert('Attendance saved.');
    }

    // View attendance
    document.getElementById('viewAttendanceBtn').addEventListener('click', () => {
        const selectedClass = document.getElementById('viewAttendanceClass').value;
        const selectedDate = document.getElementById('viewAttendanceDate').value;

        const attendanceData = JSON.parse(localStorage.getItem('attendance')) || [];
        const filteredData = attendanceData.filter(
            record => record.class === selectedClass && record.date === selectedDate
        );

        const tableBody = document.querySelector('#attendanceTable tbody');
        tableBody.innerHTML = '';

        if (filteredData.length === 0) {
            alert('No attendance records found.');
            return;
        }

        filteredData.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.studentName}</td>
                <td>${record.subject}</td>
                <td>${record.status}</td>
                <td>${record.date}</td>
            `;
            tableBody.appendChild(row);
        });
    });
});
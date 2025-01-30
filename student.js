document.addEventListener('DOMContentLoaded', () => {
    const studentDetails = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!studentDetails) {
        alert('Please log in first.');
        window.location.href = 'index.html';
        return;
    }

    // Set the student's name in the welcome message and details section
    document.getElementById('studentName').textContent = studentDetails.name;
    document.getElementById('studentNameDetail').textContent = studentDetails.name;
    document.getElementById('studentEmailDetail').textContent = studentDetails.email;
    document.getElementById('studentClassDetail').textContent = studentDetails.class;
    document.getElementById('studentPasswordDetail').textContent = studentDetails.password; // Display password

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });

    // View attendance
    document.getElementById('viewAttendanceBtn').addEventListener('click', () => {
        const selectedClass = document.getElementById('attendanceClass').value;
        const selectedDate = document.getElementById('attendanceDate').value;

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
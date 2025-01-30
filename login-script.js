// Initialize Admin Credentials
if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify({ email: 'admin@example.com', password: 'admin123' }));
}

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = '';

    // Handle Login
    if (userType === 'admin') {
        const admin = JSON.parse(localStorage.getItem('admin'));
        if (admin.email === email && admin.password === password) {
            window.location.href = 'admin.html';
        } else {
            errorMessage.textContent = 'Invalid Admin Credentials!';
        }
    } else if (userType === 'teacher') {
        const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
        const teacher = teachers.find(t => t.email === email && t.password === password);
        if (teacher) {
            localStorage.setItem('loggedInUser', JSON.stringify({...teacher, userType: 'teacher' }));
            window.location.href = 'teacher.html';
        } else {
            errorMessage.textContent = 'Invalid Teacher Credentials!';
        }
    } else if (userType === 'student') {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students.find(s => s.email === email && s.password === password);
        if (student) {
            localStorage.setItem('loggedInUser', JSON.stringify({...student, userType: 'student' }));
            window.location.href = 'student.html';
        } else {
            errorMessage.textContent = 'Invalid Student Credentials!';
        }
    }
});
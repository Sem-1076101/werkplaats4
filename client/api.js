import axios from 'axios';

const connection = axios.create({
    baseURL: 'http://127.0.0.1:5000',
});

export function enrollStudent(studentId, courseId) {
    return connection.post('/api/enroll', {
        student_id: studentId,
        course_id: courseId
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error enrolling student:', error);
        });
}

export function getDashboardData(studentId) {
    return connection.get('/api/dashboard', { params: { studentnumber: studentId } })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

export default connection;

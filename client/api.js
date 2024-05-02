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

export function get_modules() {
    return connection.get(`/api/modules`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching modules', error);
            throw error;
        });
}

export function checkEnrollment(studentId) {
    return connection.get(`/api/check_enrollment?studentnumber=${studentId}`)
        .then(response => {
            return response.data.course_name;
        })
        .catch(error => {
            console.error('Error checking enrollment:', error);
        });
}

export default connection;

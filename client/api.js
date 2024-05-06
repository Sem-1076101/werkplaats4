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

export function checkEnrollment(studentId) {
    return connection.get(`/api/check_enrollment?studentnumber=${studentId}`)
        .then(response => {
            return response.data.course_name;
        })
        .catch(error => {
            console.error('Error checking enrollment:', error);
        });
}

export function domains() {
    return connection.get('/api/domains')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching domains:', error);
        });
}

export function deleteDomain(courseId) {
    return connection.delete(`/api/domains/${courseId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export function editDomain(courseId, domain) {
    return connection.put(`/api/change-domain/${courseId}`, domain)
        .then(response => {
            if (response) {
                return response.data;
            } else {
                throw new Error('Response is undefined');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // re-throw the error so it can be caught in EditDomain.jsx
        });
}

export function getDomain(courseId) {
    return connection.get(`/api/get-domain/${courseId}`)
    .then(response => {
        if (response) {
            return response.data;
        } else {
            throw new Error('Response is undefined');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        throw error; // re-throw the error so it can be caught in EditDomain.jsx
    });
}

export default connection;

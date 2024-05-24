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


export function get_modules_by_id(id) {
    return connection.get(`/api/modules/${id}`)
        .then(response => {
            if (response) {
                return response.data;
            }
            else {
                throw new Error('Response is undefined');
            }
        })
        .catch(error => {
            console.error('Error fetching modules', error);
            console.error('Error fetching modules details ', error.response.data);
            throw error;
        });
}

export function get_modules(domain_id) {
    return connection.get(`/api/modules/${domain_id}`)
        .then(response => {
            if (response) {
                return response.data;
            }
            else {
                throw new Error('Response is undefined');
            }
        })
        .catch(error => {
            console.error('Error fetching modules', error);
            console.error('Error fetching modules details ', error.response.data);
            throw error;
        });
}

export function get_level(module_id) {
    return connection.get(`/api/levels/${module_id}`)
        .then(response => {
            if (response) {
                return response.data;
            }
            else {
                throw new Error('Response is undefined');
            }
        })
        .catch(error => {
            console.error('Error fetching levels', error);
            console.error('Error fetching levels details ', error.response.data);
            throw error;
        });
}

export function checkEnrollment(studentId) {
    return connection.get(`/api/check_enrollment?studentnumber=${studentId}`)
        .then(response => {
            if (response.data.course_name) {
                return response.data.course_name;
            } else {
                throw new Error('No course name returned from server');
            }
        })
        .catch(error => {
            console.error('Error checking enrollment:', error);
        });
}

export function getModules() {
    return connection.get('/api/modules')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching modules:', error);
        });
}

export function deleteModule(id) {
    return connection.delete(`/api/modules/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export function editModule(id, module) {
    return connection.put(`/api/change-module/${id}`, module)
        .then(response => {
            if (response) {
                return response.data;
            } else {
                throw new Error('Response is undefined');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
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
            throw error;
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

export function addDomain(domain) {
    return connection.post('/api/add-domain/', domain, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response) {
            return response.data;
        } else {
            throw new Error('Response is undefined');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

export default connection;

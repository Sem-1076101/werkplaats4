import axios from 'axios';
import {SERVER_IP} from './config';

const connection = axios.create({
    baseURL: `http://${SERVER_IP}:5000`,
});

export function enrollStudent(studentId, courseId) {
    return connection.post('/api/enroll', {
        student_id: studentId,
        course_id: courseId
    })
}

export function get_modules(domain_id) {
    return connection.get(`/api/modules/${domain_id}`)
        .then(response => {
            if (response && response.data) {
                return response.data;
            } else {
                console.error('Fout bij ophalen van modules: geen data-eigenschap in de reactie');
                throw new Error('Geen data-eigenschap in de reactie');
            }
        })
        .catch(error => {
            console.error('Fout bij ophalen van modules:', error);
            console.error('Fout bij ophalen van modulesdetails:', error.response.data);
            throw error;
        });
}

export function get_levels_from_module(module_id) {
    return connection.get(`/api/levels/${module_id}`)
        .then(response => {
            if (response) {
                return response.data;
            } else {
                throw new Error('Response is undefined');
            }
        })
        .catch(error => {
            console.error('Error fetching levels', error);
            console.error('Error fetching levels details ', error.response.data);
            throw error;
        });
}

export function get_assignment_by_assignment_id(assignment_id) {
    return connection.get(`/api/assignment/${assignment_id}`)
        .then(response => {
            if (response) {
                return response.data;
            } else {
                throw new Error('Response is undefined');
            }
        })
        .catch(error => {
            console.error('Fout bij het ophalen van het assignment:', error);
            throw error;
        });
}

export function checkEnrollment(studentId) {
    return connection.get(`/api/check_enrollment?studentnumber=${studentId}`)
        .then(response => {
                if (response.data.course_name && response.data.course_id) {
                    return {
                        course_name: response.data.course_name,
                        course_id: response.data.course_id
                    };
                }
            }
        )
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

export function addDomain(domain) {
    return axios.post(`http://${SERVER_IP}:5000/api/add-domain/`, domain, {
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

export function addModule(moduleData) {
    return connection.post('/api/add-module/', moduleData)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error adding module:', error);
            throw error;
        });
}



export default connection;

import axios from 'axios';
import { SERVER_IP } from './config';

const connection = axios.create({
    baseURL: `http://${SERVER_IP}:5000`,

});

export function enrollStudent(studentId, courseId) {
    return connection.post('/api/enroll', {
        student_id: studentId,
        course_id: courseId
    })
}

export function get_module_by_id(module_id) {
    return connection.get(`/api/modules/${module_id}`)
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

export function get_level(module_id) {
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

export function get_all_levels() {
    return connection.get('/api/levels')
        .then(response => {
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('Geen data ontvangen van de server');
            }
        })
        .catch(error => {
            console.error('Fout bij het ophalen van niveaus:', error);
            throw error;
        });
}


export function deleteLevel(assignment_id) {
    return connection.delete(`/api/level/${assignment_id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export function editLevel(assignment_id, level) {
    return connection.put(`/api/change-level/${assignment_id}`, level)
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

export function get_level_by_id(assignment_id) {
    return connection.get(`/api/levels/${assignment_id}`)
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


export function getModules() {
    return connection.get('/api/modules')
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
            throw error;
        });
}


export function getSubmissionsForLevel(assignment_id) {
    return connection.get(`/api/submissions/${assignment_id}`)
        .then(response => {
            if (response && response.data) {
                return response.data;
            } else {
                console.error('Fout bij ophalen van ingeleverde opdrachten voor level:', assignment_id);
                throw new Error('Geen data-eigenschap in de reactie');
            }
        })
        .catch(error => {
            console.error('Fout bij ophalen van ingeleverde opdrachten:', error);
            throw error;
        });
}

export function submitTeacherReview(submission_id, teacherReview, rating) {
    return connection.put(`/api/review/${submission_id}`, {
        teacher_review: teacherReview,
        rating: rating
    })
        .then(response => {
            if (response && response.data) {
                return response.data;
            } else {
                console.error('Fout bij opslaan van beoordeling voor inzending:', submission_id);
                throw new Error('Geen data-eigenschap in de reactie');
            }
        })
        .catch(error => {
            console.error('Fout bij opslaan van beoordeling:', error);
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
            } else {
                throw new Error('No course name or course id returned from server');
            }
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
            throw error;
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


export function addLevel(level) {
    return connection.post(`/api/add-level/`, level, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.data) {
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

import sqlite3
import base64
from flask import jsonify


def get_db():
    return sqlite3.connect('./instance/glitch.db')


def get_all_categories_from_database():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM domains")
    columns = [column[0] for column in cursor.description]
    categories = cursor.fetchall()
    conn.close()
    data = []
    for row in categories:
        row_dict = dict(zip(columns, row))
        if row_dict['course_image']:
            row_dict['course_image'] = base64.b64encode(row_dict['course_image']).decode('utf-8')
        data.append(row_dict)
    return data


def enroll_student_in_database(studentnumber, course_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET course_id=? WHERE studentnumber=?", (course_id, studentnumber))
    conn.commit()
    conn.close()


def get_student_domain(studentnumber):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT course_id FROM students WHERE studentnumber=?", (studentnumber,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None


def get_course_name(course_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT course_name FROM domains WHERE course_id=?", (course_id,))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None


def delete_domain_from_database(course_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM domains WHERE course_id=?", (course_id,))
    conn.commit()
    conn.close()


def get_domain_from_database(course_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM domains WHERE course_id=?", (course_id,))
    result = cursor.fetchone()
    conn.close()
    if result:
        columns = [column[0] for column in cursor.description]
        domain = dict(zip(columns, result))
        if domain['course_image']:
            domain['course_image'] = base64.b64encode(domain['course_image']).decode('utf-8')
        return domain
    else:
        return None


def edit_domain_in_database(course_id, domain):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE domains SET course_name=?, course_description=? WHERE course_id=?",
                   (domain['course_name'], domain['course_description'], course_id))
    conn.commit()
    conn.close()


def add_domain_in_database(domain):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO domains (course_name, course_description) VALUES (?, ?)",
                       (domain['course_name'], domain['course_description']))
        conn.commit()
        return jsonify({'id': cursor.lastrowid})
    except Exception as e:
        print('Fout bij het toevoegen van het domein:', e)
        return jsonify({'error': 'Er is een fout opgetreden tijdens het toevoegen van het domein.'}), 500
    finally:
        conn.close()



def get_modules_from_database_by_domain_id(domain_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM modules WHERE domain_id=?", (domain_id,))
    columns = [column[0] for column in cursor.description]
    modules = cursor.fetchall()
    conn.close()
    data = []
    for row in modules:
        row_dict = dict(zip(columns, row))
        data.append(row_dict)
    return data


def get_levels_by_module_id(module_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM levels WHERE module_id=?", (module_id,))
    columns = [column[0] for column in cursor.description]
    levels = cursor.fetchall()
    conn.close()
    data = []
    for row in levels:
        row_dict = dict(zip(columns, row))
        data.append(row_dict)
    return data


def get_assignment_by_assignment_id(assignment_id):
    conn = get_db()  # Je moet nog de get_db() functie implementeren om de databaseverbinding te krijgen
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM levels WHERE assignment_id=?", (assignment_id,))
    columns = [column[0] for column in cursor.description]
    assignment = cursor.fetchone()
    conn.close()
    if assignment:
        assignment_dict = dict(zip(columns, assignment))
        return assignment_dict
    else:
        return None


def add_user_to_db(table, email, password, first_name, last_name, studentnumber):
    conn = sqlite3.connect('instance/glitch.db')
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO {table} (email, password, first_name, last_name, studentnumber) VALUES (?, ?, ?, ?, ?)", (email, password, first_name, last_name, studentnumber))
    conn.commit()
    conn.close()

def get_user_from_db(email):
    conn = sqlite3.connect('instance/glitch.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students WHERE email=?", (email,))
    user = cursor.fetchone()
    conn.close()
    return user


def add_module_in_database(data):
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO modules (module_name, description, domain_id) VALUES (?, ?, ?)",
                       (data['module_name'], data['module_description'], data['domain_id']))
        conn.commit()
        return jsonify({'id': cursor.lastrowid}), 201
    except Exception as e:
        print('Fout bij het toevoegen van de module:', e)
        return jsonify({'error': 'Er is een fout opgetreden tijdens het toevoegen van de module.'}), 500
    finally:
        conn.close()

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


def get_modules_from_database_with_domain_id(domain_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM modules WHERE domain_id=?", (domain_id,))
    result = cursor.fetchall()
    conn.close()
    return result if result else None


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


def get_all_domains_from_database():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM domains")
    columns = [column[0] for column in cursor.description]
    result = cursor.fetchall()
    conn.close()
    if result:
        domains = []
        for row in result:
            domain = dict(zip(columns, row))
            if isinstance(domain['course_image'], tuple):
                domain['course_image'] = bytes(domain['course_image'])
            domain['course_image'] = base64.b64encode(domain['course_image']).decode('utf-8')
            domains.append(domain)
        return domains
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
    finally:
        conn.close()

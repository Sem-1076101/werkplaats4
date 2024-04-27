import sqlite3
import base64

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
        # Convert the BLOB image data to base64
        if row_dict['course_image']:
            row_dict['course_image'] = base64.b64encode(row_dict['course_image']).decode('utf-8')
        data.append(row_dict)
    return data

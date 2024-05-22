from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import datetime
import sqlite3
from database import (get_all_categories_from_database, enroll_student_in_database, get_student_domain,
                      get_course_name, delete_domain_from_database, edit_domain_in_database,
                      get_domain_from_database, add_domain_in_database, get_modules_from_database_by_domain_id, get_level_by_module_id)

app = Flask(__name__)
CORS(app, support_credentials=True)
bcrypt = Bcrypt(app)

@app.context_processor
def inject_current_year():
    return {'current_year': datetime.datetime.now().year}

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    studentnumber = data.get('studentnumber') 

    if not email or not password:
        return jsonify({"error": "E-mail en wachtwoord zijn verplicht"}), 400

    if not email.endswith('@hr.nl'):
        return jsonify({"error": "Registratie is alleen toegestaan voor hr.nl e-mailadressen"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    add_user_to_db('students', email, hashed_password, first_name, last_name, studentnumber)

    return jsonify({"message": "Registratie succesvol"}), 201

def add_user_to_db(table, email, password, first_name, last_name, studentnumber):
    conn = sqlite3.connect('instance/glitch.db')  
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO {table} (email, password, first_name, last_name, studentnumber) VALUES (?, ?, ?, ?, ?)", (email, password, first_name, last_name, studentnumber))
    conn.commit()
    conn.close()

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({"error": "E-mail en wachtwoord zijn verplicht"}), 400
    
    user = get_user_from_db(email)

    if not user:
        return jsonify({"error": "Gebruiker niet gevonden"}), 404

    if not bcrypt.check_password_hash(user[2], password):  
        return jsonify({"error": "Ongeldig wachtwoord"}), 401

    return jsonify({"message": "Inloggen succesvol"}), 200


def get_user_from_db(email):
    conn = sqlite3.connect('instance/glitch.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM students WHERE email=?", (email,))
    user = cursor.fetchone()
    conn.close()
    return user

@app.route('/api/modules/<int:domain_id>', methods=['GET'])
def get_modules(domain_id):
    modules = get_modules_from_database_by_domain_id(domain_id)
    return jsonify(modules)


@app.route('/api/levels/<int:module_id>', methods=['GET'])
def get_level(module_id):
    levels = get_level_by_module_id(module_id)
    print(levels)
    return jsonify(levels)


@app.route('/api/domains', methods=['GET'])
def get_data():
    data = get_all_categories_from_database()
    return jsonify(data)


@app.route('/api/enroll', methods=['POST'])
def enroll_student():
    data = request.get_json()
    studentnumber = data.get('student_id')
    course_id = data.get('course_id')

    if not studentnumber or not course_id:
        return {'message': 'Studentnumber and Course ID are required'}, 400

    enroll_student_in_database(studentnumber, course_id)

    return {'message': 'Student enrolled successfully'}, 200


@app.route('/api/check_enrollment', methods=['GET'])
def check_enrollment():
    studentnumber = request.args.get('studentnumber')

    if not studentnumber:
        return {'message': 'Studentnumber is required'}, 400

    course_id = get_student_domain(studentnumber)
    course_name = get_course_name(course_id)

    return {'course_name': course_name, 'course_id': course_id}, 200


@app.route('/api/domains/<int:course_id>', methods=['DELETE'])
def delete_domain(course_id):
    try:
        delete_domain_from_database(course_id)
        return {'message': 'Domein succesvol verwijderd'}, 200
    except Exception as e:
        return {'message': 'Er is een fout opgetreden bij het verwijderen van het domein: ' + str(e)}, 400
    

@app.route('/api/get-domain/<int:course_id>', methods=['GET'])
def get_domain(course_id):
    domain = get_domain_from_database(course_id)
    if domain:
        return jsonify(domain), 200
    else:
        return jsonify({'message': 'Domein niet gevonden'}), 404


@app.route('/api/change-domain/<int:course_id>', methods=['PUT', 'GET'])
def edit_domain(course_id):
    data = request.get_json()
    try:
        edit_domain_in_database(course_id, data)
        return jsonify({'message': 'Domein succesvol gewijzigd'}), 200
    except Exception as e:
        return jsonify({'message': 'Er is een fout opgetreden bij het wijzigen van het domein: ' + str(e)}), 400


@app.route('/api/add-domain/', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def create_domain():
    if request.method == 'OPTIONS':
        # Preflight request. Reply successfully:
        return jsonify({'message': 'success'}), 200
    else:
        # Actual request; handle POST.
        data = request.get_json()
        result = add_domain_in_database(data)
        return result


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

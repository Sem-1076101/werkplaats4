from flask import Flask, jsonify, request
import datetime
from flask_cors import CORS
from database import get_all_categories_from_database, enroll_student_in_database

app = Flask(__name__)
CORS(app)


@app.context_processor
def inject_current_year():
    return {'current_year': datetime.datetime.now().year}


@app.route('/api/dashboard', methods=['GET'])
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


if __name__ == '__main__':
    app.run(debug=True)

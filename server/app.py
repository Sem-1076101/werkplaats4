from flask import Flask, render_template, jsonify
import datetime
from flask_cors import CORS
from database import get_all_categories_from_database

app = Flask(__name__)
CORS(app)


@app.context_processor
def inject_current_year():
    return {'current_year': datetime.datetime.now().year}


@app.route('/api/dashboard', methods=['GET'])
def get_data():
    data = get_all_categories_from_database()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

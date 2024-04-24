from flask import Flask, render_template, jsonify
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.context_processor
def inject_current_year():
    return {'current_year': datetime.datetime.now().year}


@app.route('/api')
def api():
    data = {'members': ['member1', 'member2', 'member3']}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

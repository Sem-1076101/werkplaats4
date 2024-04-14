from flask import Flask, render_template
import datetime

app = Flask(__name__)

@app.context_processor
def inject_current_year():
    return {'current_year': datetime.datetime.now().year}

@app.route('/')

def index():
    return render_template('pages/index.html')

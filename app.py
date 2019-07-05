from flask import Flask, render_template, url_for


app = Flask(__name__)

@app.route('/')
def index():
    return render_template("main.html")

@app.route('/egg')
def egg():
    return render_template("main.html")

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

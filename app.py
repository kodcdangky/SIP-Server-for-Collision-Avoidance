from flask import Flask, render_template, url_for #, request

app = Flask(__name__)


@app.route("/")
def index():
    # name = request.args.get("name", "world")
    return render_template("index.html", distCalc=url_for("static", filename="distance.js"))

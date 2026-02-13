from flask import Flask, render_template, redirect

app = Flask(__name__)

@app.route("/")
def home():
    return redirect("/tet")   # chỉ redirect 1 chiều

@app.route("/tet")
def tet():
    return render_template("tet.html")

@app.route("/profile")
def profile():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

# Trang chủ → tự redirect về profile
@app.route("/")
def home():
    return redirect(url_for("profile"))

@app.route("/profile")
def profile():
    return render_template("index.html")

@app.route("/hoa")
def hoa():
    return render_template("hoa.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

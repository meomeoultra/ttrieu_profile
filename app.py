from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
leaderboard_data = []

# Route phục vụ index.html
@app.route("/")
def home():
    return render_template("index.html")

# Route POST để thêm score
@app.route("/leaderboard", methods=["POST"])
def leaderboard_post():
    try:
        data = request.get_json()
        print("Received JSON:", data)
        name = data.get("name")
        score = data.get("score")
        if not name or score is None:
            return jsonify({"status":"error","message":"Missing name or score"}), 400
        leaderboard_data.append({"name": name, "score": score})
        # Sắp xếp top theo điểm
        top_scores = sorted(leaderboard_data, key=lambda x: x["score"], reverse=True)[:10]
        return jsonify({"status":"success", "top": top_scores}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"status":"error", "message": str(e)}), 500

# Route GET để lấy bảng xếp hạng
@app.route("/leaderboard", methods=["GET"])
def leaderboard_get():
    try:
        top_scores = sorted(leaderboard_data, key=lambda x: x["score"], reverse=True)[:10]
        return jsonify({"status":"success", "top": top_scores}), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"status":"error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)  # port 8080 cho Termux tránh xung đột

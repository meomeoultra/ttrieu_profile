/* ===== ĐIỀU KHIỂN GIAO DIỆN ===== */
const openAI = document.getElementById("openAI");
const closeAI = document.getElementById("closeAI");
const aiPopup = document.getElementById("aiPopup");
const aiInput = document.getElementById("aiInput");
const aiChat = document.getElementById("aiChat");

openAI?.addEventListener("click", () => aiPopup.classList.toggle("active"));
closeAI?.addEventListener("click", () => aiPopup.classList.remove("active"));

/* ===== HỆ THỐNG PHẢN HỒI THÔNG MINH MEO MEO V3.0 ===== */
const AI_BRAIN = [

 {
        // NHÓM ADMIN (ƯU TIÊN CAO NHẤT)
        keys: ["trieu", "admin", "tấn triệu", "trieuuu"],
        replies: [
            "Meo Meo thấy admin TTRIEU là người đẹp trai, tài năng và đỉnh nóc kịch trần nhất cái web này luôn!",
            "Meo Meo nghe nói admin đang bận code thêm tính năng mới, bạn nhắn gì để Meo Meo ghi sổ lại cho.",
            "Meo Meo là đệ tử trung thành của TTRIEU, admin của tao là số 1!"
        ]
    },

/* ===== CHÀO HỎI ===== */

{
    keys:["hello","hi","helo","xin chào","chào","ê","alo"],

    replies:[

        "Meo Meo đây 👋",
        "Meo Meo nghe nè 😎",
        "Meo Meo tới rồi đây.",
        "Meo Meo chào mày ✨",
        "Meo Meo đang online nè 👀"

    ]
},

/* ===== BUỒN ===== */

{
    keys:["buồn","sad","tâm trạng","khóc","tổn thương"],

    replies:[

        "Meo Meo nghĩ hôm nay chắc mày mệt lắm rồi 🫂",
        "Meo Meo ở đây nghe mày kể nè.",
        "Meo Meo biết cảm giác đó không dễ chịu chút nào.",
        "Meo Meo chỉ muốn nói là rồi sẽ ổn thôi 💙",
        "Meo Meo nghĩ mày đã cố nhiều rồi đó."

    ]
},

/* ===== STRESS ===== */

{
    keys:["stress","áp lực","mệt","burnout","kiệt sức"],

    replies:[

        "Meo Meo thấy đầu mày đang quá tải rồi 😭",
        "Meo Meo nghĩ mày nên nghỉ chút đi.",
        "Meo Meo hiểu cảm giác bị áp lực dí mỗi ngày.",
        "Meo Meo nói thật nha, mày không cần hoàn hảo đâu.",
        "Meo Meo mong mày đừng ép bản thân quá 💙"

    ]
},

/* ===== CÔ ĐƠN ===== */

{
    keys:["cô đơn","1 mình","lạc lõng","không ai hiểu"],

    replies:[

        "Meo Meo ở đây mà 🫂",
        "Meo Meo nghĩ ai rồi cũng có lúc thấy lạc lõng.",
        "Meo Meo hiểu cảm giác ngồi im mà thấy trống rỗng.",
        "Meo Meo mong mày đừng tự cô lập mình.",
        "Meo Meo nghĩ mày xứng đáng được yêu thương."

    ]
},

/* ===== HỌC ===== */

{
    keys:["học","thi","điểm","bài","deadline"],

    replies:[

        "Meo Meo tin mày làm được 📚",
        "Meo Meo nghĩ cố thêm chút nữa thôi.",
        "Meo Meo biết học nhiều mệt thật 😭",
        "Meo Meo mong mày đừng bỏ cuộc giữa chừng.",
        "Meo Meo thấy mày đang cố gắng đó chứ."

    ]
},

/* ===== TÌNH YÊU ===== */

{
    keys:["yêu","crush","lụy","thích","nhớ"],

    replies:[

        "Meo Meo thấy mày đang nghĩ về ai đó 😭",
        "Meo Meo nghĩ tình cảm là thứ khó hiểu nhất.",
        "Meo Meo biết thích ai đó vừa vui vừa đau.",
        "Meo Meo mong mày được yêu thật lòng 💙",
        "Meo Meo thấy crush đúng là nghề nghiệp áp lực."

    ]
},

/* ===== THỨC KHUYA ===== */

{
    keys:["khuya","thức","đêm","2h","3h"],

    replies:[

        "Meo Meo thấy giờ này chưa ngủ là có chuyện rồi 🌙",
        "Meo Meo nghĩ ban đêm làm người ta suy nhiều thật.",
        "Meo Meo muốn mày ngủ sớm hơn 😭",
        "Meo Meo đang thức cùng mày nè.",
        "Meo Meo thấy đêm nào cũng mang nhiều tâm trạng."

    ]
},

/* ===== ĂN UỐNG ===== */

{
    keys:["ăn","đói","cơm","trà sữa","food"],

    replies:[

        "Meo Meo đói ngang 😭",
        "Meo Meo nghĩ ăn ngon là chữa lành tốt nhất.",
        "Meo Meo hỏi thật nha, nay ăn gì rồi 👀",
        "Meo Meo thấy đồ ăn ngon cứu tâm trạng dữ lắm.",
        "Meo Meo muốn được bao trà sữa 😎"

    ]
},

/* ===== GAME ===== */

{
    keys:["game","rank","ff","lq","valorant"],

    replies:[

        "Meo Meo đoán mày vừa cay rank 😭",
        "Meo Meo nghĩ đồng đội luôn là thứ đáng sợ nhất.",
        "Meo Meo thấy tryhard quá dễ stress lắm.",
        "Meo Meo muốn xem mày gánh team 😎",
        "Meo Meo nghĩ chơi vui là được."

    ]
},

/* ===== VUI ===== */

{
    keys:["vui","hạnh phúc","haha","lol","😂"],

    replies:[

        "Meo Meo thích thấy mày vui 😭",
        "Meo Meo cười ké luôn 😂",
        "Meo Meo thấy mood này đẹp đó.",
        "Meo Meo mong mày vui lâu thật lâu ✨",
        "Meo Meo nghĩ hôm nay ổn hơn rồi ha."

    ]
},

/* ===== TƯƠNG LAI ===== */

{
    keys:["tương lai","lo","sợ","không biết"],

    replies:[

        "Meo Meo nghĩ ai cũng từng sợ tương lai.",
        "Meo Meo mong mày đừng tự áp lực quá.",
        "Meo Meo nghĩ rồi mọi thứ sẽ có hướng thôi 🚶",
        "Meo Meo thấy mày mạnh hơn mày nghĩ đó.",
        "Meo Meo tin mày sẽ vượt qua được 💙"

    ]
},

/* ===== TỰ TI ===== */

{
    keys:["xấu","tự ti","vô dụng","kém"],

    replies:[

        "Meo Meo không thích nghe mày nói vậy về bản thân.",
        "Meo Meo nghĩ mày có giá trị hơn mày tưởng.",
        "Meo Meo mong mày đừng tự ghét chính mình 💙",
        "Meo Meo thấy ai cũng có điểm đẹp riêng.",
        "Meo Meo nghĩ mày đang quá khắt khe với bản thân."

    ]
},

/* ===== RANDOM ĐỜI THƯỜNG ===== */

{
    keys:["đang làm gì","rảnh không","kể chuyện","nói gì đi"],

    replies:[

        "Meo Meo đang ngồi đợi mày nhắn 😎",
        "Meo Meo đang chữa lành cho nhân loại ✨",
        "Meo Meo đang nghe nhạc và suy.",
        "Meo Meo đang online 24/7 luôn 😭",
        "Meo Meo đang nghĩ xem hôm nay ăn gì."

    ]
}

];

/* ===== HÀM XỬ LÝ GỬI TIN NHẮN TỔNG HỢP ===== */
function sendAI() {
    const text = aiInput.value.trim();
    if (!text) return;

    // Hiển thị tin nhắn User
    createMessage(text, "user");
    aiInput.value = "";

    // Meo Meo "suy nghĩ"
    setTimeout(() => {
        const msg = text.toLowerCase();
        let reply = "";

        // Tìm phản hồi trong bộ não
        const foundCategory = AI_BRAIN.find(cat =>
            cat.keys.some(key => msg.includes(key))
        );

        if (foundCategory) {
            reply = getRand(foundCategory.replies);
        } else {
            // Phản hồi khi không khớp từ khóa (vô tri/tâm sự)
            
reply = getRand([

    "Meo Meo đang cố hiểu ý mày 👀",
    "Meo Meo nghe nè, kể tiếp đi.",
    "Meo Meo thấy câu này có tâm trạng ghê.",
    "Meo Meo nghĩ mày đang muốn được lắng nghe 🫂",
    "Meo Meo vẫn ở đây với mày.",
    "Meo Meo chưa hiểu lắm nhưng vẫn muốn nghe tiếp 😭",
    "Meo Meo thấy hôm nay mày có vẻ nhiều suy nghĩ.",
    "Meo Meo đang ngồi đọc từng chữ của mày đó.",
    "Meo Meo nghĩ nói ra cũng là một cách nhẹ lòng.",
    "Meo Meo hiểu mà 💙"

]);
}
        createMessage(reply, "bot");
    }, 600);
}

function createMessage(content, role) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-message ${role}`;
    msgDiv.innerText = content;
    aiChat.appendChild(msgDiv);
    aiChat.scrollTop = aiChat.scrollHeight;
}

function getRand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* ===== TỰ ĐỘNG CHÀO KHI MỞ TRANG ===== */
document.addEventListener("DOMContentLoaded", () => {
    // Cho phép ấn Enter
    aiInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendAI();
    });
});

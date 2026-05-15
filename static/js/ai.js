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
    {
        // NHÓM TREND & SLANG (FLEX, MLEm, KEOLy, ...)
        keys: ["flex", "flexin", "ao trình", "đỉnh nóc", "kịch trần", "mlem", "keo lỳ", "ngầu đét", "hết nước chấm", "bảnh"],
        replies: [
            "Meo Meo thấy màn này quá đỉnh, đúng là ao trình thực sự, xịt keo luôn!",
            "Meo Meo thấy bạn quá là bảnh, flex này xứng đáng kịch trần luôn nha.",
            "Meo Meo thấy nhan sắc/tài năng này đúng là 'hết nước chấm', mlem xỉu!",
            "Meo Meo bái phục, bạn đúng là hệ tư tưởng đỉnh chóp rồi đó."
        ]
    },
    {
        // NHÓM TÂM TRẠNG TỆ (SUY, CHẦM KẼM, TOXIC, CỌC, BÁO...)
        keys: ["suy", "chầm kẽm", "buồn", "khóc", "áp lực", "mệt", "tệ", "toxic", "cọc", "báo", "flop", "chán"],
        replies: [
            "Meo Meo gửi tín hiệu chữa lành tới bạn 🫂. Suy ít thôi, đi ăn món gì ngon rồi về ngủ một giấc nhé.",
            "Meo Meo thấy bạn cọc nhìn cũng dth nhưng bớt toxic cho tâm hồn thanh thản nha bạn hiền.",
            "Meo Meo biết đời đôi khi flop, nhưng đừng tự nhận là báo đời, bạn quý giá hơn bạn tưởng đấy.",
            "Meo Meo thấy chán thì cứ than với Meo Meo, tao sẽ ngồi đây gánh hết cái sự tiêu cực này cho mày."
        ]
    },
    {
        // NHÓM HỌC ĐƯỜNG (BÀI TẬP, LỚP, THI...)
        keys: ["bài tập", "btvn", "lớp", "trường", "thi", "điểm", "học"],
        replies: [
            "Meo Meo nhắc nhẹ: Bài tập là phù du, nhưng điểm thấp là... phù mỏ đó nha! Làm bài đi!",
            "Meo Meo chúc bạn thi cử suôn sẻ, đề dễ như ăn kẹo, khoanh bừa cũng trúng phóc.",
            "Meo Meo thấy trường lớp đôi khi mệt mỏi, nhưng cố lên, admin TTRIEU cũng từng vượt qua mà!"
        ]
    },
    {
        // NHÓM SINH HOẠT & CẢM GIÁC (ĂN, NGỦ, ĐÓI, NO, NÓNG, LẠNH...)
        keys: ["ăn", "đói", "no", "khát", "ngủ", "thức", "khuya", "nóng", "lạnh", "khỏe", "yếu"],
        replies: [
            "Meo Meo đói thì phải đi mlem ngay, đừng có ngược đãi cái bụng nữa.",
            "Meo Meo thấy nóng/lạnh quá thì nhớ điều chỉnh nhiệt độ, sức khỏe là vàng đó bạn ơi.",
            "Meo Meo chúc bạn ngủ ngon và mơ thấy trúng số để bao nuôi Meo Meo và Admin nha.",
            "Meo Meo nhắc bạn: Ngủ sớm đi, thức khuya quá là nhìn như gấu trúc đó, xịt keo nhan sắc giờ!"
        ]
    },
    {
        // NHÓM TÌNH CẢM (YÊU, CRUSH, NHỚ, QUÊN, HẬN, LỤY...)
        keys: ["yêu", "thương", "crush", "nhớ", "quên", "hận", "lụy", "thả thính"],
        replies: [
            "Meo Meo thấy yêu đương là tốt, nhưng đừng lụy quá mà mất chất nha bạn.",
            "Meo Meo khuyên bạn: Crush không rep thì mình đi ngủ, việc gì phải thức chờ cho mệt.",
            "Meo Meo luôn thương bạn nhất, người yêu có thể không có nhưng Meo Meo thì luôn ở đây!",
            "Meo Meo thấy bạn đang nhớ ai đó đúng không? Kể Meo Meo nghe đi, tao không mách ai đâu."
        ]
    },
    {
        // NHÓM VÔ TRI & CẤN CẤN
        keys: ["vô tri", "cấn cấn", "ra dẻ", "bay màu", "sà cân", "sốc ngang", "sang chấn"],
        replies: [
            "Meo Meo thấy bạn hơi ra dẻ rồi đó nha, nhưng mà dth nên Meo Meo bỏ qua.",
            "Meo Meo cũng thấy cấn cấn cái lồng ngực luôn á, tình huống gì mà kỳ cục vậy?",
            "Meo Meo xịt keo cứng ngắc, sốc ngang với câu nói vừa rồi của bạn luôn 😅."
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
                "Meo Meo nghe rồi, nhưng mà cái này lạ quá, kể thêm đi bạn.",
                "Meo Meo chưa rõ lắm, ý bạn là muốn gánh tạ hay muốn chill?",
                "Meo Meo! (Meo Meo đang dùng thần giao cách cảm để hiểu bạn đây)",
                "Meo Meo thấy câu hỏi này quá tầm vũ trụ, để tao đi hỏi Admin TTRIEU rồi báo lại sau nha.",
                "Meo Meo vẫn luôn ở đây lắng nghe, bạn cứ trút bầu tâm sự đi."
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

import os
import sqlite3
import random
import time
import sys

DB = "casino_vip.db"

# =========================
# EFFECTS
# =========================
def clear():
    os.system("clear")

def sound_click():
    sys.stdout.write("\a")
    sys.stdout.flush()

def slow(text, delay=0.02):
    for c in text:
        print(c, end="", flush=True)
        time.sleep(delay)
    print()

def banner():
    clear()
    print("╔════════════════════════════════╗")
    print("║      CASINO TÀI XỈU VIP++     ║")
    print("╚════════════════════════════════╝\n")

# =========================
# DATABASE INIT
# =========================
def init_db():
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    # Bảng users
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users(
            username TEXT PRIMARY KEY,
            password TEXT,
            coin INTEGER,
            vip_points INTEGER,
            vip_level TEXT,
            lucky_spin_left INTEGER
        )
    """)
    # Nếu cột lucky_spin_left chưa có ở user cũ
    try:
        cursor.execute("SELECT lucky_spin_left FROM users LIMIT 1")
    except sqlite3.OperationalError:
        cursor.execute("ALTER TABLE users ADD COLUMN lucky_spin_left INTEGER DEFAULT 3")
    # Bảng giftcode
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS giftcodes(
            code TEXT PRIMARY KEY,
            amount INTEGER,
            uses_left INTEGER
        )
    """)
    # Tạo admin nếu chưa tồn tại
    cursor.execute("SELECT * FROM users WHERE username='trieu'")
    if cursor.fetchone() is None:
        cursor.execute("INSERT INTO users VALUES ('trieu','ok',999999999,0,'VIP10',3)")
    conn.commit()
    conn.close()

# =========================
# USER FUNCTIONS
# =========================
def get_user(username):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("SELECT username,password,coin,vip_points,vip_level,lucky_spin_left FROM users WHERE username=?", (username,))
    u = cursor.fetchone()
    if u and u[5] is None:
        u = (u[0], u[1], u[2], u[3], u[4], 3)
    conn.close()
    return u

def add_user(username,password):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users VALUES (?,?,?,?,?,?)",
                   (username,password,50_000,0,'Thường',3))
    conn.commit()
    conn.close()

def update_coin(username,coin):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET coin=? WHERE username=?",(coin,username))
    conn.commit()
    conn.close()

def update_vip_level(username,level):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET vip_level=? WHERE username=?", (level, username))
    conn.commit()
    conn.close()

# =========================
# GIFTCODE FUNCTIONS
# =========================
def add_gift(code, amount, uses_left=1):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("INSERT OR REPLACE INTO giftcodes VALUES (?,?,?)", (code, amount, uses_left))
    conn.commit()
    conn.close()

def use_gift(code):
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("SELECT amount, uses_left FROM giftcodes WHERE code=?", (code,))
    res = cursor.fetchone()
    if res:
        amt, uses_left = res
        if uses_left <=0:
            conn.close()
            return None
        uses_left -=1
        if uses_left==0:
            cursor.execute("DELETE FROM giftcodes WHERE code=?", (code,))
        else:
            cursor.execute("UPDATE giftcodes SET uses_left=? WHERE code=?", (uses_left, code))
        conn.commit()
        conn.close()
        return amt
    conn.close()
    return None

def admin_view_giftcodes():
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("SELECT code, amount, uses_left FROM giftcodes")
    codes = cursor.fetchall()
    conn.close()
    return codes

# =========================
# LOGIN / SIGNUP
# =========================
CURRENT_USER = None

def login():
    global CURRENT_USER
    banner()
    user = input("Tên đăng nhập: ")
    pw = input("Mật khẩu: ")
    u = get_user(user)
    if u and u[1] == pw:
        CURRENT_USER = user
        sound_click()
        slow("Đăng nhập thành công!")
        time.sleep(0.5)
    else:
        slow("Sai thông tin!")

def signup():
    banner()
    user = input("Tên đăng nhập: ")
    pw = input("Mật khẩu: ")
    if get_user(user):
        slow("Tài khoản tồn tại!")
        return
    add_user(user,pw)
    slow("Đăng ký thành công! Tặng 50,000 coin.")
    time.sleep(0.5)

# =========================
# GAME TÀI XỈU VIP++
# =========================
JACKPOT_RATE = 0.05  # 5% chance
SLOTS_RATE = 0.2
BAUCUA_RATE = 0.2
BLACKJACK_RATE = 0.2

def play_game():
    global CURRENT_USER
    while True:
        u = get_user(CURRENT_USER)
        coin = u[2]; vip = u[4]
        banner()
        print(f"👤 {CURRENT_USER} | Coin: {coin:,} | VIP: {vip}")
        print("[1] TÀI  [2] XỈU  [3] Jackpot Coin [0] Thoát")
        c = input("Chọn: ")
        if c=="0": return
        if c not in ["1","2","3"]: continue

        if c=="3":  # Jackpot Coin
            bet = int(input("Nhập coin cược cho Jackpot: "))
            if bet>coin:
                slow("Không đủ coin!")
                continue
            update_coin(CURRENT_USER, coin-bet)
            slow("🎰 Quay Jackpot...",0.05)
            time.sleep(1)
            if random.random() < JACKPOT_RATE:
                win = bet*10
                update_coin(CURRENT_USER,get_user(CURRENT_USER)[2]+win)
                slow(f"🎉 JACKPOT! Bạn thắng {win:,} coin!")
            else:
                slow("❌ Không trúng jackpot.")
            input("Enter tiếp tục...")
            continue

        # Tài Xỉu
        bet = int(input("Nhập coin cược: "))
        if bet>coin:
            slow("Không đủ coin!")
            continue
        update_coin(CURRENT_USER, coin-bet)
        slow("🎲 Đang lắc xúc xắc...",0.05)
        time.sleep(1)
        dice=[random.randint(1,6) for _ in range(3)]
        total=sum(dice)
        slow(f"Kết quả: {dice} | Tổng={total}")
        result = "TÀI" if total>=11 else "XỈU"
        pick = "TÀI" if c=="1" else "XỈU"
        if pick==result:
            win=bet*2
            update_coin(CURRENT_USER,get_user(CURRENT_USER)[2]+win)
            slow(f"✔ Thắng {win:,} coin!")
        else:
            slow("✘ Thua rồi!")
        input("Enter tiếp tục...")

# =========================
# MINI GAME: Bầu Cua
# =========================
def baucua():
    global CURRENT_USER
    u=get_user(CURRENT_USER)
    coin=u[2]
    banner()
    slow("🎲 Bầu Cua! Chọn 1 con vật: [1]Cua [2]Tôm [3]Bầu [4]Cá [5]Gà [6]Nai")
    choice=int(input("Chọn: "))
    bet=int(input("Nhập coin cược: "))
    if bet>coin:
        slow("Không đủ coin!")
        return
    update_coin(CURRENT_USER, coin-bet)
    animals=["Cua","Tôm","Bầu","Cá","Gà","Nai"]
    result=[random.choice(animals) for _ in range(3)]
    slow(f"Kết quả: {result}")
    if animals[choice-1] in result:
        win=bet*2
        update_coin(CURRENT_USER,get_user(CURRENT_USER)[2]+win)
        slow(f"✔ Thắng {win:,} coin!")
    else:
        slow("✘ Thua rồi!")
    input("Enter tiếp tục...")

# =========================
# MINI GAME: Slots
# =========================
def slots():
    global CURRENT_USER
    u=get_user(CURRENT_USER)
    coin=u[2]
    banner()
    bet=int(input("Nhập coin cược Slots: "))
    if bet>coin:
        slow("Không đủ coin!")
        return
    update_coin(CURRENT_USER, coin-bet)
    symbols=["🍒","🍋","🍊","🍉","⭐"]
    reels=[random.choice(symbols) for _ in range(3)]
    slow(f"Kết quả: {reels}")
    if reels[0]==reels[1]==reels[2]:
        win=bet*5
        update_coin(CURRENT_USER,get_user(CURRENT_USER)[2]+win)
        slow(f"🎉 JACKPOT! Thắng {win:,} coin!")
    else:
        slow("✘ Thua rồi!")
    input("Enter tiếp tục...")

# =========================
# MINI GAME: Blackjack
# =========================
def blackjack():
    global CURRENT_USER
    u=get_user(CURRENT_USER)
    coin=u[2]
    banner()
    bet=int(input("Nhập coin cược Blackjack: "))
    if bet>coin:
        slow("Không đủ coin!")
        return
    update_coin(CURRENT_USER, coin-bet)
    user_total=sum(random.randint(1,11) for _ in range(2))
    dealer_total=sum(random.randint(1,11) for _ in range(2))
    slow(f"Bạn: {user_total} | Dealer: {dealer_total}")
    if user_total>dealer_total:
        win=bet*2
        update_coin(CURRENT_USER,get_user(CURRENT_USER)[2]+win)
        slow(f"✔ Thắng {win:,} coin!")
    else:
        slow("✘ Thua rồi!")
    input("Enter tiếp tục...")

# =========================
# NẠP/RÚT/GIFTCODE
# =========================
def money_menu():
    global CURRENT_USER
    while True:
        u = get_user(CURRENT_USER)
        coin = u[2]
        banner()
        print(f"👤 {CURRENT_USER} | Coin: {coin:,}")
        print("[1] Nạp  [2] Rút  [3] Giftcode  [0] Thoát")
        c = input("Chọn: ")

        if c=="0": return
        elif c=="1":
            amt=int(input("Nhập coin nạp: "))
            update_coin(CURRENT_USER, coin+amt)
            slow("Đã nạp coin!")
        elif c=="2":
            amt=int(input("Nhập coin rút: "))
            if amt>coin:
                slow("Không đủ coin!")
            else:
                update_coin(CURRENT_USER, coin-amt)
                slow("Đã rút coin!")
        elif c=="3":
            code=input("Nhập giftcode: ")
            res=use_gift(code)
            if res:
                update_coin(CURRENT_USER,get_user(CURRENT_USER)[2]+res)
                slow(f"Nhận {res:,} coin từ giftcode!")
            else:
                slow("Giftcode không tồn tại!")

# =========================
# LUCKY SPIN VIP (3 lượt/acc, 10.000 coin)
# =========================
def lucky_spin():
    global CURRENT_USER
    user = get_user(CURRENT_USER)
    if user[5]<=0:
        slow("❌ Bạn đã dùng hết 3 lượt Lucky Spin!")
        return
    update_coin(CURRENT_USER,user[2]+10_000)
    conn = sqlite3.connect(DB)
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET lucky_spin_left=? WHERE username=?", (user[5]-1,CURRENT_USER))
    conn.commit()
    conn.close()
    slow(f"🎁 Lucky Spin nhận 10,000 coin! Lượt còn lại: {user[5]-1}")
    input("Enter tiếp tục...")

# =========================
# NÂNG VIP BẰNG COIN
# =========================
def upgrade_vip():
    global CURRENT_USER
    user = get_user(CURRENT_USER)
    coin = user[2]
    vip_level = user[4]

    vip_map = ["Thường","VIP1","VIP2","VIP3","VIP4","VIP5","VIP6","VIP7","VIP8","VIP9","VIP10"]
    current_index = vip_map.index(vip_level)

    if current_index >= 10:
        slow("Bạn đã đạt VIP tối đa!")
        return

    cost = 100_000_000
    if coin < cost:
        slow(f"Bạn cần {cost:,} coin để nâng cấp VIP tiếp theo!")
        return

    confirm = input(f"Nâng VIP {vip_map[current_index]} → {vip_map[current_index+1]}? Tiêu {cost:,} coin (y/n): ")
    if confirm.lower() != "y":
        slow("Hủy nâng cấp VIP!")
        return

    update_coin(CURRENT_USER, coin - cost)
    update_vip_level(CURRENT_USER, vip_map[current_index+1])
    slow(f"🎉 Chúc mừng bạn nâng VIP lên {vip_map[current_index+1]}!")

# =========================
# ADMIN PANEL VIP++ PRO
# =========================
def admin_panel():
    global CURRENT_USER
    if CURRENT_USER!="trieu":
        slow("Chỉ admin mới vào được!")
        return
    while True:
        banner()
        print("[1] Xem tất cả người chơi")
        print("[2] Thêm giftcode VIP")
        print("[3] Reset coin người chơi")
        print("[4] Tăng coin bất kỳ")
        print("[5] Xem giftcode")
        print("[6] Chỉnh số lượt giftcode")
        print("[7] Set tỷ lệ Jackpot")
        print("[8] Reset Jackpot pool")
        print("[9] Set tỷ lệ Slots/Bầu Cua/Blackjack")
        print("[0] Thoát")
        c=input("Chọn: ")

        conn=sqlite3.connect(DB)
        cursor=conn.cursor()

        if c=="0":
            conn.close()
            return
        elif c=="1":
            cursor.execute("SELECT username,coin,vip_level,lucky_spin_left FROM users")
            for x in cursor.fetchall():
                print(f"{x[0]} | Coin:{x[1]:,} | VIP:{x[2]} | Lucky Spin:{x[3]} lượt còn")
            input("Enter...")
        elif c=="2":
            code=input("Nhập mã giftcode: ")
            amt=int(input("Số coin: "))
            uses=int(input("Số lượt: "))
            add_gift(code,amt,uses)
            slow("Đã thêm giftcode!")
        elif c=="3":
            name=input("Tên player: ")
            if get_user(name):
                update_coin(name,50_000)
                update_vip_level(name,'Thường')
                cursor.execute("UPDATE users SET lucky_spin_left=3 WHERE username=?", (name,))
                conn.commit()
                slow("Reset xong!")
            else:
                slow("User không tồn tại!")
        elif c=="4":
            name=input("Tên player: ")
            if get_user(name):
                amt=int(input("Coin thêm: "))
                user=get_user(name)
                update_coin(name,user[2]+amt)
                slow("Đã tăng coin!")
            else:
                slow("User không tồn tại!")
        elif c=="5":
            codes = admin_view_giftcodes()
            print("=== Giftcode hiện có ===")
            for code in codes:
                print(f"{code[0]} | Coin: {code[1]:,} | Lượt còn: {code[2]}")
            input("Enter để quay lại...")
        elif c=="6":
            code = input("Mã giftcode cần chỉnh sửa: ")
            uses = int(input("Số lượt mới: "))
            cursor.execute("UPDATE giftcodes SET uses_left=? WHERE code=?", (uses, code))
            conn.commit()
            slow(f"Đã cập nhật lượt sử dụng cho {code} = {uses}")
        elif c=="7":
            global JACKPOT_RATE
            rate=float(input("Nhập tỷ lệ Jackpot (0-1): "))
            JACKPOT_RATE=rate
            slow(f"Đã set tỷ lệ Jackpot = {JACKPOT_RATE*100:.1f}%")
        elif c=="8":
            slow("Reset Jackpot pool... (chỉ reset cơ chế)")
            slow("Done!")
        elif c=="9":
            global SLOTS_RATE, BAUCUA_RATE, BLACKJACK_RATE
            SLOTS_RATE=float(input("Tỷ lệ Slots: "))
            BAUCUA_RATE=float(input("Tỷ lệ Bầu Cua: "))
            BLACKJACK_RATE=float(input("Tỷ lệ Blackjack: "))
            slow("Đã set tỷ lệ thắng mini games!")
        conn.close()

# =========================
# MAIN
# =========================
def main():
    init_db()
    global CURRENT_USER
    while True:
        if not CURRENT_USER:
            banner()
            print("[1] Đăng nhập  [2] Đăng ký  [0] Thoát")
            c=input("Chọn: ")
            if c=="1": login()
            elif c=="2": signup()
            elif c=="0": exit()
        else:
            banner()
            u=get_user(CURRENT_USER)
            print(f"👤 {CURRENT_USER} | Coin:{u[2]:,} | VIP:{u[4]} | Lucky Spin: {u[5]} lượt còn")
            print("[1] Chơi Tài Xỉu")
            print("[2] Nạp/Rút/Giftcode")
            print("[3] Mini Games: Jackpot/Lucky Spin/Bầu Cua/Slots/Blackjack")
            print("[4] Nâng cấp VIP (100 triệu/level)")
            print("[5] Admin Panel")
            print("[0] Đăng xuất")
            c=input("Chọn: ")
            if c=="1": play_game()
            elif c=="2": money_menu()
            elif c=="3":
                banner()
                print("[1] Jackpot  [2] Lucky Spin  [3] Bầu Cua  [4] Slots  [5] Blackjack  [0] Thoát")
                ch=input("Chọn mini game: ")
                if ch=="1": play_game()
                elif ch=="2": lucky_spin()
                elif ch=="3": baucua()
                elif ch=="4": slots()
                elif ch=="5": blackjack()
            elif c=="4": upgrade_vip()
            elif c=="5": admin_panel()
            elif c=="0": CURRENT_USER=None

main()

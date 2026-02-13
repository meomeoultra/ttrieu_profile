
import random, ui, db, effects

def roll_dice():
    d = [random.randint(1,6) for _ in range(3)]
    effects.dice_animation()
    print(f"Kết quả: {d} → Tổng = {sum(d)}")
    return sum(d)

def play():
    ui.clear()
    print("===== TÀI XỈU PRO MAX =====")
    user = db.get_user()
    print(f"Coin của bạn: {user['coin']}")
    bet = int(input("Nhập số coin cược: "))
    if bet > user['coin']:
        print("Không đủ coin!")
        return
    choice = input("Tài (T) hay Xỉu (X): ").lower()
    total = roll_dice()
    win = (total >= 11 and choice=="t") or (total <= 10 and choice=="x")
    if win:
        print("Bạn thắng!")
        db.update_coin(user['username'], user['coin'] + bet)
    else:
        print("Bạn thua!")
        db.update_coin(user['username'], user['coin'] - bet)

import pyfiglet
import time
import os

colors = ["31", "32", "33", "34", "35", "36"]  # đỏ, xanh lá, vàng, xanh dương, tím, cyan

big_text = pyfiglet.figlet_format("HELLO WORLD", font="standard")

while True:
    for c in colors:
        os.system("clear")
        print(f"\033[{c}m{big_text}\033[0m")   # chữ to đổi màu
        print(f"\033[{c}mTắn Chju Meo Meo\033[0m")  # dòng text thường đổi màu
        time.sleep(0.9)

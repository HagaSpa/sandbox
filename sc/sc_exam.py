import sys
import math

def main(lines):
    """
    1. 与えられたwとhから現在BMIを算出
    2. 現在BMIが目標BMI以下なら0を表示（ans = 0）
    3. 現在BMIが目標BMIより高ければ、最低何kg落とせばいいのかを小数点切り上で表示する
    - 目標BMIになるためには、wを幾つにする必要があるかを考える
    """
    w = int(lines[0])
    h = int(lines[1])
    # 目標BMI
    goal_bmi = int(lines[2])

    # 現在BMIの算出
    current_bmi = math.floor(10000 * w / h / h)

    # 現在BMIが目標BMI以下なら0を表示（ans = 0）
    if current_bmi <= goal_bmi:
        print(0)
        return
    
    # 目標BMIになるために必要なwを算出
    required_w = math.floor(goal_bmi * h * h / 10000)

    # 目標BMIになるためにあと何kg減らす必要があるのか？
    ans = required_w - w
    ans = -1 * ans

    # 1kg切っていたら1kgに切り上げ処理が必要
    if ans < 1:
        ans = 1
    print(ans)



if __name__ == '__main__':
    a = input()
    lines = a.split(" ") 
    main(lines)

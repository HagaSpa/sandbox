from functools import reduce

"""
1以上の整数nが与えられたとき 1からnまでの整数のうち 5で割り切れない数の合計を出力する関数をコーディングしてください

"""

def calc(n):
    li = [i for i in range(n) if i%5 != 0]
    return reduce(lambda x,y: x+y, li)

print(calc(10))
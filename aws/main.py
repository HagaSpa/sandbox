import argparse
from functools import reduce
from operator import mul


def create_en_li(n):
    li = [i for i in range(1,n) if i%2==0]
    return li

def mul_ele(li):
    r = reduce(mul, li)
    return r

"""
整数n（n>=2）が与えられた時、1~nまでの全ての偶数を乗算した結果を出力する
"""
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("n", type=int)
    args = parser.parse_args()
    en_li = create_en_li(args.n)
    print(mul_ele(en_li))
    pass
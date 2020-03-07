import argparse
from functools import reduce


def calc(n):
    li = [2**i for i in range(n)]
    return reduce(lambda x,y: x+y, li)


"""
エラーが発生した場合のリトライ処理として、n回目の場合は2^n-1秒だけ待機する。
その時n回目のリトライ実行までにトータルで何秒待機するかを出力すること。

要はn回までの待機秒数の合計を返却しろってこと？？
"""
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("n", type=int)
    args = parser.parse_args()
    r = calc(args.n)
    print("Total waiting seconds: {} sec".format(r))
    pass
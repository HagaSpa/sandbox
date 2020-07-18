"""
与えられたカンマ区切りの文字列から、奇数番目を削除した状態で、カンマ区切りの文字列として出力せよ
ただし、１つ前の要素が同じ値の場合、削除してはいけない。

in: 1,2,3,4,4,6,7
expected: 2,4,4,6
"""

a = input()
li = a.split(",") 

# 0番目は1つ前が存在しないから必ず消す
del li[0]
for i in range(len(li)):
    if (i+2) % 2 != 0 and li[i] != li[i-1]:
        li[i] = "" 

r = ','.join(list(filter(lambda x: x != "", li)))

print(r)

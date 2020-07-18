"""
標準入力から与えられた英文文字列に含まれる単語のうち、先頭が大文字か数字で始まっている単語の個数を数える。
（同じ単語が複数回出てきた場合、1回とみなす）

in : M3 is a company which provides medical-related services through the use of the Internet since 2000.
out: 3
"""

a = input()
li = a.split(" ") 

# trim
li = list(filter(lambda x: x != "", li))

s = set()

count = 0
for l in li:
    if l[0].isdecimal() or l[0].isupper():
        if l not in s:
            s.add(l)
            count += 1
print(count)
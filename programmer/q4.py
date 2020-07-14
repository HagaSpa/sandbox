
def maximum_number(li):
    """
    与えられた正の整数リストから、結合して作成可能な最大数を返す
    """

    # liの中から一番左の桁に対して、降順で並び替えて要素ごとに文字列化
    for i in range(len(li)):
        for j in range(i+1, len(li)):
            # 隣の要素の方が一番左端の数字が大きければ並び替える or 一番左の桁が同じ数の場合intで比較して並び替える
            if int(str(li[i])[0]) < int(str(li[j])[0]) or li[i] < li[j]:
                tmp = li[j]
                li[j] = li[i]
                li[i] = tmp
    
    # str化
    sli = map(lambda x: str(x), li)
    r = "".join(sli)
    n = int(r)
    return n


print(maximum_number([50, 2, 1, 9]))  # 95021
print(maximum_number([50, 52, 1, 9])) # 952501
print(maximum_number([5, 50, 56]))    # 56550 じゃなきゃダメじゃね？

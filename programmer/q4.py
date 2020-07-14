
def maximum_number(li):
    """
    与えられた正の整数リストから、結合して作成可能な最大数を返す
    """

    # liの中から一番左の桁に対して、降順で並び替えて要素ごとに文字列化
    for i in range(len(li)):
        for j in range(i+1, len(li)):
            # 隣の要素の方が一番左端の数字が大きければ、並び替える
            if int(str(li[i])[0]) < int(str(li[j])[0]):
                tmp = str(li[j])
                li[j] = str(li[i])
                li[i] = tmp
    
    r = "".join(li)
    n = int(r)
    return n



li = [50, 2, 1, 9]
print(maximum_number(li)) # 95021
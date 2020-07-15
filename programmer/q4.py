
def maximum_number(li):
    """
    与えられた正の整数リストから、結合して作成可能な最大数を返す.

    各要素の中から最大桁数に合わせて、一番左の桁数を末尾にパッディングする。その後整数比較を行い降順に結合していけば求める値が算出できる。
    """

    # パディングする際の桁数把握のため、要素内の最大桁数を取得
    m_digit = 0
    for l in li:
        if m_digit < len(str(l)):
              m_digit = len(str(l))

    # 比較を行う。最大桁数を満たしていない要素は比較時にパディング処理を行う。
    for i in range(len(li)):
        for j in range(i+1, len(li)):
            # paddingして比較を行いソートする
            if __padding(li[i], m_digit) < __padding(li[j], m_digit):
                tmp = li[j]
                li[j] = li[i]
                li[i] = tmp
    
    # str化
    sli = map(lambda x: str(x), li)
    r = "".join(sli)
    n = int(r)
    return n


def __padding(n, d):
    """
    nの桁数がdの桁数になるまで、一番左端桁の数値をコピーして末尾に追加する、パディングを行う
    （nの桁数がd以上なら、nをそのまま返却する）
    """
    sn = str(n)
    if len(sn) < d:
        tsn = sn[0] * (d-len(sn))
        return int(sn + tsn)
    else:
        return n


print(maximum_number([50, 2, 1, 9]))  # 95021
print(maximum_number([50, 52, 1, 9])) # 952501
print(maximum_number([5, 50, 56]))    # 56550
print(maximum_number([420, 42, 423])) # 42423420

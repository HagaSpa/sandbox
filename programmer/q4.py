
def maximum_number(li):
    """
    与えられた正の整数リストから、結合して作成可能な最大数を返す
    """

    # パディングする際の桁数把握のため、要素内の最大桁数を取得
    m_digit = 0
    for l in li:
        if m_digit < len(str(l)):
              m_digit = len(str(l))

    # 比較を行う。最大桁数を満たしていない要素は比較時にパディング処理を行う。
    for i in range(len(li)):
        for j in range(i+1, len(li)):
            comp_i = 0 # 比較用整数
            comp_j = 0
            s_i = str(li[i])
            s_j = str(li[j])

            if len(s_i) < m_digit:
                d = m_digit - len(s_i)
                trans = s_i[0] * d  #一番左端の桁数を最大桁数分パディングする
                comp_i = int(s_i+trans)
            else:
                comp_i = li[i]
            if len(s_j) < m_digit:
                d = m_digit - len(s_j)
                trans = s_j[0] * d
                comp_j = int(s_j+trans)
            else:
                comp_j = li[j]

            # 比較してソート
            if comp_i < comp_j:
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
print(maximum_number([5, 50, 56]))    # 56550
print(maximum_number([420, 42, 423])) # 42423420

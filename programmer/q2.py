
def join_list(li1, li2):
    # Which list has more element?
    m = 0
    if len(li1) >= len(li2):
        m = len(li1)
    else:
        m = len(li2)
    
    # Loop for maximum elements
    res = []
    for i in range(m):
        l1 = li1[i] if len(li1) > i else ""
        l2 = li2[i] if len(li2) > i else ""
        ele = l1 + l2
        res.append(ele)
    return res


li1 = ["a", "b", "c"]
li2 = ["1", "2", "3"]
print(join_list(li1, li2))
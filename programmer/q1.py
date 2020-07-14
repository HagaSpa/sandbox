
def for_sum(li):
    s = 0
    for l in li:
        s = s + l
    return s


def while_sum(li):
    s = 0
    i = 0
    while i < len(li):
        s = s + li[i]
        i += 1
    return s


def recursive_sum(li, s):
    if len(li) == 0:
        return s
    s = s + li.pop(0)
    return recursive_sum(li, s)


li = [1, 2, 3, 4, 5]

print("for: {}".format(for_sum(li)))
print("while: {}".format(while_sum(li)))
print("recursive: {}".format(recursive_sum(li, 0)))
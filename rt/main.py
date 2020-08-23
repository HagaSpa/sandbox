

def solution(A):
    # convert to 10 base number
    num = 0
    for k,v in enumerate(A):
        if v == 1:
            if k % 2 == 0:
                num = num + 2**k
            else:
                num += -(2 ** k)
    # ceiling
    num = float(num)/float(2)
    num = (num*2+1)//2
    num = int(num)
    
    # convert to -2 base number
    ans = []
    while num != 0:
        i = num % -2
        if i < 0:
            i = -i 
        ans.append(i)
        num = int(num/-2)
        if num < 0:
            num = -num

    print(ans)
    return




if __name__ == '__main__':
    # a = input()
    # lines = a.split(",")
    # i_lines = map(lambda x: int(x), lines)

    # i_lines = [1,0,0,1,1] # ok
    i_lines = [1,0,0,1,1,1] # TODO: invalid
    solution(i_lines)
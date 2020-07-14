"""
Create Fibonacci sequence up to 100th 
"""
def fibonacci():
    li = [0,1]
    while len(li) <= 100:
        last_ele = li[len(li)-1]
        two_before_ele = li[len(li)-2]
        s = last_ele + two_before_ele
        li.append(s)
    return li

print(fibonacci())
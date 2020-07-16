

"""
1,2,…,9の数をこの順序で、"+"、"-"、またはななにもせず結果が100となるあらゆる組合せを出力するプログラムを記述せよ。
例えば、1 + 2 + 34 – 5 + 67 – 8 + 9 = 100となる

わかんないから、下のパクリ
https://blog.svpino.com/2015/05/08/solution-to-problem-5-and-some-other-thoughts-about-this-type-of-questions
"""
values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
target_sum = 100


def add(digit: int, sign: str, branches: list) -> list:
    for i in range(len(branches)):
        branches[i]= str(digit) + sign + str(branches[i])
    return branches


def f(sum: int, number: int, index: int) -> list:
    digit = abs(number % 10) if number > 0 else abs(-number % 10)
    if index >= len(values):
        if sum == number:
            result = []
            result.append(str(digit))
            return result
        else:
            return []
    
    # 1 + f
    branch1 = f(sum - number, values[index], index + 1)
    # 1 - f
    branch2 = f(sum - number, -values[index], index + 1)

    concatenatedNumber = 10 * number + values[index] if number >=0 else 10 * number - values[index]
    
    # 12 + f
    branch3 = f(sum, concatenatedNumber, index + 1)

    results = []
    results.extend(add(digit, "+", branch1))
    results.extend(add(digit, "-", branch2))
    results.extend(add(digit, "", branch3))
    return results


def main():
    results = f(target_sum, values[0], 1)
    for r in results:
        print(r)


main()
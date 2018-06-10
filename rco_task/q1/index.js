const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];

// 標準入力を待ち受ける処理
reader.on('line', (line) => {
    lines.push(line);

    if (lines.length > 1) {
        // 検索処理を呼ぶ
        console.log(search(lines[0], lines[1]));
        reader.close();
    }
});

/**
 * 検索対象の文字列に、部分文字列としていくつ含まれるかを返す
 * 
 * @param {String} s 検索対象の文字列
 * @param {String} r 検索する文字列
 * @return {Number}
 */
const search = (s, r) => {
    // 各文字列の長さを取得
    const sLength = s.length;
    const rLength = r.length;

    // sの文字列の長さだけ回している。これはsの文字列をすべて検索対象とするため
    for (let i = 0; i < sLength; i++) {
        // sよりもrの方が長い場合、検索を実施せずに-1を返す。(=sにrは含まれないため)
        if (i + rLength > sLength) return -1;

        let j = 0;
        // rの文字列をすべて回す
        while (j < rLength) {
            // 同じ文字ならrの次の文字へ
            if (s.substr(i+j, 1) === r.substr(j, 1)) {
                j++;
                continue;
            }
            // 同じ文字列ではないならwhileを抜ける
            break;
        }
        // jがrLengthと同じ = rをすべて取り出したのでjを返却する。
        if (j === rLength) return j;
    }
    // sの中にrが見つからない場合
    return -1;
}
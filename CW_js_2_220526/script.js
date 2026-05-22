// --- 2. Смена знака ---
function signCount(arr) {
    let count = 0;
    let lastSign = arr[0] >= 0 ? 1 : -1;
    for (let i = 1; i < arr.length; i++) {
        let currentSign = arr[i] >= 0 ? 1 : -1;
        if (arr[i] !== 0 && currentSign !== lastSign) {
            count++;
            lastSign = currentSign;
        }
    }
    return count;
}
function run2() {
    const raw = document.getElementById('inp2').value;
    const arr = raw.split(',').map(Number);
    document.getElementById('res2').textContent = signCount(arr);
}

// --- 4. Строго возрастающая последовательность (LIS) ---
function createAsc(arr) {
    const n = arr.length;
    const dp = Array(n).fill(1);
    const prev = Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
    }
    let lastIdx = 0;
    for (let i = 1; i < n; i++) {
        if (dp[i] > dp[lastIdx]) lastIdx = i;
    }
    const res = [];
    while (lastIdx !== -1) {
        res.unshift(arr[lastIdx]);
        lastIdx = prev[lastIdx];
    }
    return res;
}
function run4() {
    const raw = document.getElementById('inp4').value;
    const arr = raw.split(',').map(Number);
    document.getElementById('res4').textContent = JSON.stringify(createAsc(arr));
}

// --- 6. Промис 50/50 ---
function task6Func() {
    return new Promise((resolve, reject) => {
        Math.random() < 0.5 ? resolve('Resolved (успех)') : reject('Rejected (отказ)');
    });
}
function run6() {
    const res = document.getElementById('res6');
    res.textContent = 'Ожидание...';
    task6Func()
        .then(msg => res.textContent = msg)
        .catch(err => res.textContent = err);
}

// --- 8. Температура ---
function CtoF(c) { return Math.round((c * 9/5 + 32) * 10000) / 10000; }
function FtoC(f) { return Math.round((f - 32) * 5/9 * 10000) / 10000; }
function run8C() {
    const val = parseFloat(document.getElementById('inp8').value);
    document.getElementById('res8').textContent = CtoF(val);
}
function run8F() {
    const val = parseFloat(document.getElementById('inp8').value);
    document.getElementById('res8').textContent = FtoC(val);
}

// --- 10. Строка без цифр ---
function clearStr(s) {
    return s.replace(/\d/g, '');
}
function run10() {
    const s = document.getElementById('inp10').value;
    document.getElementById('res10').textContent = clearStr(s);
}

// --- 12. Самое редкое слово ---
function mostRare(s) {
    const words = s.trim().split(/\s+/);
    const map = {};
    for (let w of words) {
        map[w] = (map[w] || 0) + 1;
    }
    let rareWord = words[0], minCnt = Infinity;
    for (let [key, cnt] of Object.entries(map)) {
        if (cnt < minCnt) { minCnt = cnt; rareWord = key; }
    }
    return rareWord;
}
function run12() {
    const s = document.getElementById('inp12').value;
    document.getElementById('res12').textContent = mostRare(s);
}

// --- 14. Случайное число ---
function randomRange(N, M) {
    return Math.floor(Math.random() * (M - N + 1)) + N;
}
function run14() {
    const n = parseInt(document.getElementById('inp14N').value);
    const m = parseInt(document.getElementById('inp14M').value);
    document.getElementById('res14').textContent = randomRange(n, m);
}

// --- 16. Замыкания setTimeout ---
function run16Var() {
    const res = document.getElementById('res16');
    res.textContent = 'Ждите 1 сек (смотрите консоль)...';
    for(var i = 1; i <= 3; i++) {
        setTimeout(() => console.log('Var:', i), 1000);
    }
    setTimeout(() => res.textContent = 'См. консоль: 4,4,4', 1500);
}
function run16Let() {
    const res = document.getElementById('res16');
    res.textContent = 'Ждите 1 сек (смотрите консоль)...';
    for(let i = 1; i <= 3; i++) {
        setTimeout(() => console.log('Let:', i), 1000);
    }
    setTimeout(() => res.textContent = 'См. консоль: 1,2,3', 1500);
}

// --- 18. Самый длинный палиндром ---
function longestPalindrome(s) {
    let longest = '';
    for (let i = 0; i < s.length; i++) {
        // Нечетная длина
        let left = i, right = i;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > longest.length) longest = s.substring(left, right + 1);
            left--; right++;
        }
        // Четная длина
        left = i; right = i + 1;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > longest.length) longest = s.substring(left, right + 1);
            left--; right++;
        }
    }
    return longest;
}
function run18() {
    const s = document.getElementById('inp18').value;
    document.getElementById('res18').textContent = longestPalindrome(s);
}

// --- 20. Пара чисел ---
function findPair(arr, target) {
    const set = new Set();
    for (let num of arr) {
        if (set.has(target - num)) return true;
        set.add(num);
    }
    return false;
}
function run20() {
    const raw = document.getElementById('inp20_arr').value;
    const arr = raw.split(',').map(Number);
    const sum = parseInt(document.getElementById('inp20_sum').value);
    document.getElementById('res20').textContent = findPair(arr, sum);
}
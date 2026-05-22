// Задача 1.1: максимальная разница
function maxDifference(arr) {
    if (!arr || arr.length === 0) return undefined;
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    return max - min;
}

// Задача 1.2: уникальные элементы (сохраняем порядок)
function uniqueArray(arr) {
    return [...new Set(arr)];
}

// Задача 1.3: фильтр по isDone === true
function filterIsDone(arr) {
    return arr.filter(item => item.isDone === true);
}

// Задача 2.1: элементы больше порога
function filterGreaterThan(arr, threshold) {
    return arr.filter(x => x > threshold);
}

// Задача 2.2: «плоский» массив
function flattenArray(arr) {
    const result = [];
    function flatten(subArr) {
        for (const item of subArr) {
            if (Array.isArray(item)) {
                flatten(item);
            } else {
                result.push(item);
            }
        }
    }
    flatten(arr);
    return result;
}

// Задача 3.1: пары, сумма 0
function countZeroSumPairs(arr) {
    const freq = {};
    for (const num of arr) {
        freq[num] = (freq[num] || 0) + 1;
    }
    let pairs = 0;
    for (const key in freq) {
        const num = parseInt(key);
        if (num === 0) {
            pairs += Math.floor((freq[num] || 0) / 2);
        } else if (num > 0) {
            const negCount = freq[-num] || 0;
            pairs += Math.min(freq[num], negCount);
        }
    }
    return pairs;
}

// Задача 3.2: тройки, сумма 0
function countZeroSumTriplets(arr) {
    let count = 0;
    const n = arr.length;
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                if (arr[i] + arr[j] + arr[k] === 0) {
                    count++;
                }
            }
        }
    }
    return count;
}

// ===== Вспомогательные функции для парсинга =====
function parseNumberArray(str) {
    const trimmed = str.trim();
    if (trimmed === '') return [];
    return trimmed.split(',').map(s => {
        const num = Number(s.trim());
        if (isNaN(num)) throw new Error(`Некорректное число: "${s.trim()}"`);
        return num;
    });
}

function parseJson(str) {
    const trimmed = str.trim();
    if (trimmed === '') throw new Error('Пустая строка');
    let parsed;
    try {
        parsed = JSON.parse(trimmed);
    } catch (e) {
        throw new Error('Ошибка разбора JSON: ' + e.message);
    }
    if (!Array.isArray(parsed)) {
        throw new Error('Ожидается массив');
    }
    return parsed;
}

function showResult(elementId, value, isError = false) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = value;
    el.className = isError ? 'error' : 'result';
}

document.addEventListener('DOMContentLoaded', () => {

    // Задача 1.1
    document.getElementById('btn1_1').addEventListener('click', () => {
        const input = document.getElementById('arr1_1').value;
        try {
            const arr = parseNumberArray(input);
            const res = maxDifference(arr);
            showResult('res1_1', `Результат: ${res !== undefined ? res : '—'}`);
        } catch (e) {
            showResult('res1_1', e.message, true);
        }
    });

    // Задача 1.2
    document.getElementById('btn1_2').addEventListener('click', () => {
        const input = document.getElementById('arr1_2').value;
        try {
            const arr = parseNumberArray(input);
            const res = uniqueArray(arr);
            showResult('res1_2', `Результат: [${res.join(', ')}]`);
        } catch (e) {
            showResult('res1_2', e.message, true);
        }
    });

    // Задача 1.3
    document.getElementById('btn1_3').addEventListener('click', () => {
        const input = document.getElementById('arr1_3').value;
        try {
            const arr = parseJson(input);
            // Проверим, что элементы – объекты (хотя бы поверхностно)
            const res = filterIsDone(arr);
            showResult('res1_3', `Результат: ${JSON.stringify(res)}`);
        } catch (e) {
            showResult('res1_3', e.message, true);
        }
    });

    // Задача 2.1
    document.getElementById('btn2_1').addEventListener('click', () => {
        const arrInput = document.getElementById('arr2_1').value;
        const threshold = Number(document.getElementById('num2_1').value);
        try {
            const arr = parseNumberArray(arrInput);
            if (isNaN(threshold)) throw new Error('Введите число');
            const res = filterGreaterThan(arr, threshold);
            showResult('res2_1', `Результат: [${res.join(', ')}]`);
        } catch (e) {
            showResult('res2_1', e.message, true);
        }
    });

    // Задача 2.2
    document.getElementById('btn2_2').addEventListener('click', () => {
        const input = document.getElementById('arr2_2').value;
        try {
            const arr = parseJson(input);
            const res = flattenArray(arr);
            showResult('res2_2', `Результат: [${res.join(', ')}]`);
        } catch (e) {
            showResult('res2_2', e.message, true);
        }
    });

    // Задача 3.1
    document.getElementById('btn3_1').addEventListener('click', () => {
        const input = document.getElementById('arr3_1').value;
        try {
            const arr = parseNumberArray(input);
            const res = countZeroSumPairs(arr);
            showResult('res3_1', `Количество пар: ${res}`);
        } catch (e) {
            showResult('res3_1', e.message, true);
        }
    });

    // Задача 3.2
    document.getElementById('btn3_2').addEventListener('click', () => {
        const input = document.getElementById('arr3_2').value;
        try {
            const arr = parseNumberArray(input);
            const res = countZeroSumTriplets(arr);
            showResult('res3_2', `Количество троек: ${res}`);
        } catch (e) {
            showResult('res3_2', e.message, true);
        }
    });

});
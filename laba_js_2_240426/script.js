const task_1 = function () {
    // 1. Реверс числа
    let num = prompt("Введите число для реверса:");
    if (num === null)
    {
        return;
    }
    const reverse = (n) => String(n).split('').reverse().join('');
    alert(`Реверс: ${reverse(num)}`);

    // 2. Без повторений
    num = prompt("Введите число для удаления дубликатов:");
    if (num === null)
    {
        return;
    }
    const uniqueDigits = (n) => [...new Set(String(n))].join('');
    alert(`Без повторов: ${uniqueDigits(num)}`);

    // 3. Подсчет вхождений цифры
    num = prompt("Введите число для подсчета вхождений цифры:");
    const digitToFind = prompt("Введите цифру для поиска в числе:");
    if (num === null || digitToFind === null)
    {
        return;
    }
    const countDigit = (n, d) => String(n).split('').filter(char => char === String(d)).length;
    alert(`Количество цифр ${digitToFind}: ${countDigit(num, digitToFind)}`);

    // 4. Самая длинная последовательность (0/1) в двоичной записи
    num = prompt("Самая длинная последовательность (0/1) в двоичной записи:");
    if (num === null)
    {
        return;
    }
    const longestSequence = (n) => {
        const bin = Number(n).toString(2);
        const matches = bin.match(/(0+|1+)/g) || [];
        return matches.reduce((max, curr) => Math.max(max, curr.length), 0);
    };
    alert(`Двоичная запись: ${Number(num).toString(2)}`);
    alert(`Макс. последовательность: ${longestSequence(num)}`);
}

const task_2 = function () {
    // 1. Первый неповторяющийся символ
    let text = prompt("Введите строку, для определения первого неповторяющегося символа:");
    if (text === null)
    {
        return;
    }
    const firstUnique = (str) => {
        return str.split('').find(char => str.indexOf(char) === str.lastIndexOf(char)) || 'Нет таких';
    };
    alert(`Первый неповторяющийся: ${firstUnique(text)}`);

    // 2. Генерация строки
    const length = Number(prompt("Введите длину для генерации случайной строки:"));
    if (length === null)
    {
        return;
    }
    const generateStr = (len) => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };
    alert(`Случайная строка: ${generateStr(length)}`);
    
    // 3. Только уникальные символы
    text = prompt("Введите строку:");
    if (text === null)
    {
        return;
    }
    const uniqueChars = (str) => [...new Set(str)].join('');
    alert(`Уникальные символы: ${uniqueChars(text)}`);
}

let exit = true;

while(exit == true)
{
    let a = Number(prompt("Введите номер задания: (7 - выход)"));
    switch (a) {
        case 1:
            task_1();
            break;
        case 2:
            task_2();
            break;
        case 7:
            exit = false;
            break;
        default:
            alert("Повторите операцию");
    }
}
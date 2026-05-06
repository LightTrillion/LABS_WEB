// Вспомогательная функция вывода
const display = (id, text) => {
    document.getElementById(id).textContent = "Результат: " + text;
};

// Задание 1.1: Реверс
window.res1_1 = function() {
    const val = document.getElementById('in1_1').value;
    const res = String(val).split('').reverse().join('');
    display('out1_1', res);
};

// Задание 1.2: Без повторений
window.res1_2 = function() {
    const val = document.getElementById('in1_2').value;
    const res = [...new Set(String(val))].join('');
    display('out1_2', res);
};

// Задание 1.3: Подсчет цифр
window.res1_3 = function() {
    const num = document.getElementById('in1_3_num').value;
    const digit = document.getElementById('in1_3_digit').value;
    const res = String(num).split('').filter(char => char === String(digit)).length;
    display('out1_3', res);
};

// Задание 2.1: Первый уникальный символ
window.res2_1 = function() {
    const str = document.getElementById('in2_1').value;
    const res = str.split('').find(char => str.indexOf(char) === str.lastIndexOf(char)) || 'Нет уникальных';
    display('out2_1', res);
};

// Задание 2.2: Генерация строки
window.res2_2 = function() {
    const len = Number(document.getElementById('in2_2').value);
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const res = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    display('out2_2', res);
};
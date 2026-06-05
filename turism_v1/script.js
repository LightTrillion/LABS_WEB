(function() {
    // Лёгкое уведомление: при клике на регион будет сообщение
    const regions = document.querySelectorAll('.region');
    regions.forEach(region => {
        region.addEventListener('click', (e) => {
            const regionName = region.getAttribute('data-region') || 'регион';
            console.log(`Нажат регион: ${regionName} — здесь будет подсветка и вывод информации`);
            alert(`✨ Вы выбрали регион: ${regionName.toUpperCase()}. Скоро здесь появится динамическая смена данных!`);
        });
    });
})();
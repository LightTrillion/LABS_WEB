(function() {
    const regionData = {
    north: { 
      title: 'Северная Норвегия', 
      desc: 'Nordkapp, Тромсё, Лофотенские острова. Полярный день летом, северное сияние с сентября по апрель, китовые сафари и рыболовецкие деревни.' 
    },
    central: { 
      title: 'Центральная Норвегия', 
      desc: 'Тронхейм с Нидаросским собором, национальный парк Рондане, горнолыжные курорты и веломаршруты. Историческое сердце викингов.' 
    },
    south: { 
      title: 'Южная Норвегия / Осло-фьорд', 
      desc: 'Столица Осло, музей кораблей викингов, опера, каякинг по фьордам и рестораны Michelin. Самый густонаселённый регион страны.' 
    }
  };

  const regions  = document.querySelectorAll('.region');
  const infoBox  = document.getElementById('region-info');
  const infoTitle = document.getElementById('info-title');
  const infoDesc  = document.getElementById('info-desc');

  regions.forEach(region => {
    region.style.cursor = 'pointer';
    region.style.transition = 'all 0.3s ease';
    
    region.addEventListener('mouseenter', () => {
      region.setAttribute('fill', 'rgba(244, 162, 97, 0.5)');
      region.setAttribute('stroke-width', '5');
    });
    
    region.addEventListener('mouseleave', () => {
      if (!region.classList.contains('active')) {
        const key = region.getAttribute('data-region');
        const colors = { north: 'rgba(147, 197, 164, 0.35)', 
                         central: 'rgba(192, 160, 128, 0.35)', 
                         south: 'rgba(127, 170, 154, 0.35)' };
        region.setAttribute('fill', colors[key]);
        region.setAttribute('stroke-width', '3');
      }
    });

    region.addEventListener('click', () => {
      const key  = region.getAttribute('data-region');
      const data = regionData[key];
      if (!data) return;

      regions.forEach(r => {
        r.classList.remove('active');
        const k = r.getAttribute('data-region');
        const colors = { north: 'rgba(147, 197, 164, 0.35)', 
                         central: 'rgba(192, 160, 128, 0.35)', 
                         south: 'rgba(127, 170, 154, 0.35)' };
        r.setAttribute('fill', colors[k]);
        r.setAttribute('stroke-width', '3');
      });

      region.classList.add('active');
      region.setAttribute('fill', 'rgba(244, 162, 97, 0.6)');
      region.setAttribute('stroke', '#c4450c');
      region.setAttribute('stroke-width', '6');

      infoTitle.textContent = data.title;
      infoDesc.textContent  = data.desc;
      infoBox.style.display = 'block';
      infoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
})();
document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const popupContainer = document.querySelector('.popup-container');
    const popupImage = document.getElementById('popup-image');
    const closePopup = document.querySelector('.close-popup');
    const musicToggle = document.querySelector('.music-control');
    const backgroundMusic = document.getElementById('background-music');

    // Iestatām sākotnējo mūzikas stāvokli un sākam atskaņošanu
    let isMusicPlaying = true;
    backgroundMusic.play();
    musicToggle.textContent = '🔇 Apklusināt';

    // Mūzikas kontrole
    musicToggle.addEventListener('click', () => {
        if (!isMusicPlaying) {
            backgroundMusic.play();
            musicToggle.textContent = '🔇 Apklusināt';
            isMusicPlaying = true;
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Mūzika';
            isMusicPlaying = false;
        }
    });

    // Dienu dati - definējiet saites tikai tām dienām, kurām tās ir
    const dayData = {
        1: { image: 'day-1.jpg', link: 'https://www.liepaja.biblioteka.lv' },
        2: { image: 'day-2.jpg' },
        3: { image: 'day-3.jpg' },
        4: { image: 'day-4.jpg', link: 'https://example.com/day4' },
        5: { image: 'day-5.jpg' },
        6: { image: 'day-6.jpg' },
        7: { image: 'day-7.jpg' },
        8: { image: 'day-8.jpg' },
        9: { image: 'day-9.jpg' },
        10: { image: 'day-10.jpg' },
        11: { image: 'day-11.jpg' },
        12: { image: 'day-12.jpg' },
        13: { image: 'day-13.jpg' },
        14: { image: 'day-14.jpg' },
        15: { image: 'day-15.jpg' },
        16: { image: 'day-16.jpg' },
        17: { image: 'day-17.jpg' },
        18: { image: 'day-18.jpg' },
        19: { image: 'day-19.jpg' },
        20: { image: 'day-20.jpg' },
        21: { image: 'day-21.jpg' },
        22: { image: 'day-22.jpg' },
        23: { image: 'day-23.jpg' },
        24: { image: 'day-24.jpg' }
    };

    // Kalendāra dienu ģenerēšana
    function generateCalendar() {
        // Vispirms attīram esošo saturu
        calendarGrid.innerHTML = '';
        
        for (let day = 1; day <= 24; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            // Pārbauda vai diena ir aktīva
            const currentDate = new Date();
            const currentDay = currentDate.getDate();
            const isActive = currentDay >= day;

            if (!isActive) {
                dayElement.classList.add('inactive');
            }

            dayElement.addEventListener('click', () => {
                if (isActive) {
                    openPopup(day);
                } else {
                    dayElement.classList.add('inactive');
                }
            });

            calendarGrid.appendChild(dayElement);
        }
    }

    // Pop-up atvēršana
    function openPopup(day) {
        const dayInfo = dayData[day];
        if (!dayInfo) return;

        const popupContent = document.querySelector('.popup-content');
        
        // Attīra iepriekšējo saiti, ja tāda ir
        const oldLink = popupContent.querySelector('.popup-link');
        if (oldLink) oldLink.remove();

        popupImage.onload = () => {
            popupContainer.style.display = 'flex';
            
            // Pievieno saiti TIKAI ja tā eksistē un nav tukša
            if (dayInfo.link && dayInfo.link.trim() !== '') {
                const link = document.createElement('a');
                link.href = dayInfo.link;
                link.className = 'popup-link';
                link.textContent = 'Uzzināt vairāk';
                link.target = '_blank';
                popupContent.appendChild(link);
            }
        };

        popupImage.onerror = () => {
            alert(`Attēls dienai ${day} nav pieejams`);
        };

        popupImage.src = `images/${dayInfo.image}`;
    }

    // Pop-up aizvēršana
    closePopup.addEventListener('click', () => {
        popupContainer.style.display = 'none';
    });

    // Aizver pop-up, ja noklikšķina ārpus tā
    popupContainer.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = 'none';
        }
    });

    // ESC taustiņa apstrāde
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            popupContainer.style.display = 'none';
        }
    });

    // Ģenerējam kalendāru
    generateCalendar();

    // Pievienojam apstrādi lapas pārlādēšanai
    window.addEventListener('beforeunload', () => {
        calendarGrid.innerHTML = '';
    });
});
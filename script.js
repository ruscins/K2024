document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const popupContainer = document.getElementById('popup-container');
    const popupImage = document.getElementById('popup-image');
    const closePopup = document.querySelector('.close-popup');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');

    // Mūzikas kontrole
    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '🔇 Apklusināt';
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵 Mūzika';
        }
    });

    // Kalendāra dienu ģenerēšana
    function generateCalendar() {
        for (let day = 1; day <= 24; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            dayElement.addEventListener('click', () => openPopup(day));
            calendarGrid.appendChild(dayElement);
        }
    }

    // Pop-up atvēršana
    function openPopup(day) {
        const imagePath = `images/day-${day}.jpg`;

        // Pārbauda bildes ielādi
        popupImage.onload = () => {
            popupContainer.style.display = 'flex';
        };

        popupImage.onerror = () => {
            console.error(`Neizdevās ielādēt bildi: ${imagePath}`);
            alert(`Attēls dienai ${day} nav pieejams`);
        };

        popupImage.src = imagePath;
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

    generateCalendar();
});
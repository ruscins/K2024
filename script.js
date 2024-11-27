document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const popupContainer = document.querySelector('.popup-container');
    const popupImage = document.getElementById('popup-image');
    const closePopup = document.querySelector('.close-popup');
    const musicToggle = document.querySelector('.music-control');
    const backgroundMusic = document.getElementById('background-music');

    // Iestatām sākotnējo mūzikas stāvokli un sākam atskaņošanu
    let isMusicPlaying = true;
    backgroundMusic.play().catch(() => {
        // Klusām apstrādājam kļūdu, ja autoplay nav atļauts
        isMusicPlaying = false;
        musicToggle.textContent = '🎵 Mūzika';
    });
    
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
        1: { image: 'day-1.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=239897' },
        2: { image: 'day-2.jpg' },
        3: { image: 'day-3.jpg' , link: 'https://digitalabiblioteka.lv/?q=ziemassv%C4%93tku%20apsveikumi&tab=2&subject[]=Atkl%C4%81tnes' },
        4: { image: 'day-4.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=12473' },
        5: { image: 'day-5.jpg' },
        6: { image: 'day-6.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=237307' },
        7: { image: 'day-7.jpg' },
        8: { image: 'day-8.jpg' },
        9: { image: 'day-9.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=237307' },
        10: { image: 'day-10.jpg', link: 'https://digitalabiblioteka.lv/?q=ziemassv%C4%93tki&rights[]=Pieejams%20t%C4%ABmekl%C4%AB&tab=4' },
        11: { image: 'day-11.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=446945' },
        12: { image: 'day-12.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=256517' },
        13: { image: 'day-13.jpg' },
        14: { image: 'day-14.jpg' },
        15: { image: 'day-15.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=289906' },
        16: { image: 'day-16.jpg', link: 'https://play.google.com/store/apps/details?id=com.latvijas.latvijas_radio&hl=lv&pli=1' },
        17: { image: 'day-17.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=264632' },
        18: { image: 'day-18.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=71871' },
        19: { image: 'day-19.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=237121' },
        20: { image: 'day-20.jpg' },
        21: { image: 'day-21.jpg', link: 'https://liepaja.biblioteka.lv/Alise/lv/book.aspx/bibliographic?id=59269' },
        22: { image: 'day-22.jpg', link: 'https://open.spotify.com/album/6LlBepL9Gt1xscOL7AiIrL' },
        23: { image: 'day-23.jpg', link: 'https://www.filmas.lv/movie/1180/' },
        24: { image: 'day-24.jpg' }
    };

    // Funkcija mēneša locījuma izveidei - bez laika
    function formatDateInLV(date) {
        const day = date.getDate();
        const months = {
            0: 'janvārī',
            1: 'februārī',
            2: 'martā',
            3: 'aprīlī',
            4: 'maijā',
            5: 'jūnijā',
            6: 'jūlijā',
            7: 'augustā',
            8: 'septembrī',
            9: 'oktobrī',
            10: 'novembrī',
            11: 'decembrī'
        };
        
        return `${day}. ${months[date.getMonth()]}`;
    }

    // Funkcija, kas pārbauda vai konkrētā diena ir aktīva
    function isDayActive(day) {
        const now = new Date();
        const rigaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Riga' }));
        const startDate = new Date('2024-11-10T08:00:00');
        startDate.setDate(startDate.getDate() + (day - 1));
        
        return rigaTime >= startDate;
    }

    // Kalendāra dienu ģenerēšana
    function generateCalendar() {
        calendarGrid.innerHTML = '';
        
        for (let day = 1; day <= 24; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            const isActive = isDayActive(day);

            if (!isActive) {
                dayElement.classList.add('inactive');
            }

            dayElement.addEventListener('click', () => {
                if (isActive) {
                    openPopup(day);
                } else {
                    // Aprēķinam, kad būs pieejams šis lodziņš
                    const availableDate = new Date('2024-11-10T08:00:00');
                    availableDate.setDate(availableDate.getDate() + (day - 1));
                    
                    const formattedDate = formatDateInLV(availableDate);
                    alert(`Šis lodziņš būs pieejams ${formattedDate}! Iegriezies vēlāk, lai uzzinātu, kas slēpjas aiz tā! 🎄✨`);
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

    // Atjaunojam kalendāru ik pēc minūtes
    setInterval(generateCalendar, 60000);

    // Pievienojam apstrādi lapas pārlādēšanai
    window.addEventListener('beforeunload', () => {
        calendarGrid.innerHTML = '';
    });
});
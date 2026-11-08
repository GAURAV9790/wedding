// Wedding Application Logic & Scrollytelling Engine - Ladki Wale Special Edition
// Bride: Tejasvi Pant (d/o Smt. Meena Pant & Shri Manoj Pant)
// Groom: Nainesh Oli (s/o Smt. Devki Devi & Shri Mohan Chandra Oli)

document.addEventListener('DOMContentLoaded', () => {
    initPetalCanvas();
    initCountdown();
    initScrollAnimations();
    initEnvelopeOpener();
    initAudioControls();
    initRitualModals();
});

/* =========================================
   1. PETAL CANVAS (Pink Rose, Lotus, Marigold & Gold Sparkle)
   ========================================= */
function initPetalCanvas() {
    const canvas = document.getElementById('petal-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petals = [];
    // Bridal Palette: Rose Pink, Rani Pink, Lotus Blush, Marigold Yellow & Pichora Amber
    const petalColors = [
        'rgba(244, 63, 94, 0.85)',   // Rose pink
        'rgba(190, 24, 93, 0.85)',   // Deep Rani Pink
        'rgba(245, 158, 11, 0.85)',  // Marigold yellow
        'rgba(251, 113, 133, 0.85)', // Peachy Rose
        'rgba(245, 197, 24, 0.85)',  // Pichora Gold
        'rgba(225, 29, 72, 0.8)'     // Festive Ruby Pink
    ];

    const petalCount = window.innerWidth < 768 ? 26 : 48;

    for (let i = 0; i < petalCount; i++) {
        petals.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: 6 + Math.random() * 8,
            speedY: 1 + Math.random() * 1.8,
            speedX: (Math.random() - 0.5) * 1.2,
            angle: Math.random() * 360,
            angleSpeed: (Math.random() - 0.5) * 2,
            color: petalColors[Math.floor(Math.random() * petalColors.length)],
            oscillation: Math.random() * 100
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        petals.forEach(p => {
            p.y += p.speedY;
            p.oscillation += 0.02;
            p.x += Math.sin(p.oscillation) * 1.2 + p.speedX;
            p.angle += p.angleSpeed;

            if (p.y > height + 20) {
                p.y = -20;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.angle * Math.PI) / 180);

            ctx.fillStyle = p.color;
            ctx.beginPath();
            // Draw smooth organic petal shape
            ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        });

        requestAnimationFrame(render);
    }

    render();
}

/* =========================================
   2. COUNTDOWN TIMER (Target: 19 November 2026, 04:00 PM - Sangeet)
   ========================================= */
function initCountdown() {
    const targetDate = new Date('2026-11-19T16:00:00+05:30').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function update() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (daysEl) daysEl.innerText = '00';
            if (hoursEl) hoursEl.innerText = '00';
            if (minutesEl) minutesEl.innerText = '00';
            if (secondsEl) secondsEl.innerText = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* =========================================
   3. ENVELOPE OPENER & AUDIO TRIGGER
   ========================================= */
function initEnvelopeOpener() {
    const overlay = document.getElementById('envelope-overlay');
    const openBtn = document.getElementById('open-invitation-btn');

    if (openBtn && overlay) {
        openBtn.addEventListener('click', () => {
            overlay.classList.add('opened');
            
            // Auto start auspicious background music ("आज से तेरी")
            if (window.weddingAudio) {
                window.weddingAudio.start();
                updateMusicButtonState(true);
            }

            // Play festive bell chime
            if (window.weddingAudio && window.weddingAudio.playTempleBell) {
                window.weddingAudio.playTempleBell();
            }

            // Shower celebratory petals
            triggerConfettiPetals();
        });
    }
}

function triggerConfettiPetals() {
    const badge = document.querySelector('.shubh-vivah-badge');
    if (badge) {
        badge.classList.add('pulse');
    }
}

/* =========================================
   4. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================= */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
}

/* =========================================
   5. MUSIC CONTROLS (Floating & Nav)
   ========================================= */
function initAudioControls() {
    const musicBtns = document.querySelectorAll('.music-toggle-btn');

    musicBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!window.weddingAudio) return;

            const isNowPlaying = window.weddingAudio.toggle();
            updateMusicButtonState(isNowPlaying);
        });
    });
}

function updateMusicButtonState(isPlaying) {
    const labels = document.querySelectorAll('.music-toggle-label');
    const pulses = document.querySelectorAll('.music-pulse');

    labels.forEach(label => {
        if (label.closest('.royal-nav')) {
            label.innerText = isPlaying ? '🎵 आज से तेरी (रोकें)' : 'संगीत बजाएं';
        } else {
            label.innerText = isPlaying ? 'रोकें' : 'संगीत';
        }
    });

    pulses.forEach(pulse => {
        pulse.style.display = isPlaying ? 'inline-block' : 'none';
    });
}

/* =========================================
   6. RITUAL DETAIL MODALS & CALENDAR INTEGRATION
   ========================================= */
const ritualData = {
    sangeet: {
        title: 'सुरमयी संगीत संध्या (Sangeet Ceremony)',
        date: '19 नवम्बर 2026',
        time: 'शाम 04:00 बजे',
        venue: 'छीनी गोठ, टनकपुर (चंपावत, उत्तराखंड)',
        theme: 'उत्सवी जामुनी, गुलाबी व पारंपरिक परिधान',
        dress: 'पारंपरिक लोकगीत, ढोलक-दमाऊं व संगीत संध्या',
        desc: 'लाडली तेजस्वी के परिणय उत्सव के उल्लास, आत्मीय हंसी-खुशी और सुर-ताल से सजी इस विशेष महिला संगीत संध्या में सपरिवार सम्मिलित होकर उत्सव के पावन पलों को अविस्मरणीय बनाएं।',
        quote: '॥ आनंदो वर्धते नित्यं, मंगलं भवतु सर्वदा ॥'
    },
    mehendi: {
        title: 'सगुन की मेहंदी (Shubh Mehendi)',
        date: '19 नवम्बर 2026',
        time: 'रात 08:00 बजे',
        venue: 'छीनी गोठ, टनकपुर (चंपावत, उत्तराखंड)',
        theme: 'सौभाग्य हिना एवं उत्सव (Emerald Festive & Rani Pink)',
        dress: 'सगुन हिना सज्जा व सुहाग उत्सव',
        desc: 'वधू तेजस्वी के कर-कमलों में सौभाग्य, स्नेह और सुहाग की सगुन मेहंदी रचने की इस मनोरम संध्या में आप सभी स्वजनों व स्नेहीजनों की गरिमामयी उपस्थिति सादर प्रार्थनीय है।',
        quote: '॥ ॐ श्रीं ह्रीं क्लीं सौभाग्यवर्धिन्यै नमः ॥'
    },
    haldi: {
        title: 'शुभ हल्दी एवं उबटन संस्कार (Haldi Ceremony)',
        date: '21 नवम्बर 2026',
        time: 'सुबह 06:00 बजे (प्रातः वेला)',
        venue: 'खेतीखान, तल्ली बाज़ार (उत्तराखंड)',
        theme: 'पीत वर्ण व मांगलिक आभा (Golden Auspicious)',
        dress: 'केसर-हल्दी उबटन एवं मंगल कलश पूजन',
        desc: 'मांगलिक हल्दी लेपन एवं पावन उबटन संस्कार की शुभ प्रभात वेला में कन्या तेजस्वी को अपने स्नेह, वात्सल्य एवं शुभाशीषों से अभिभूत करने हेतु आप सादर आमंत्रित हैं।',
        quote: '॥ ॐ भद्रं कर्णेभिः शृणुयाम देवा भद्रं पश्येमाक्षभिर्यजत्राः ॥'
    },
    wedding: {
        title: 'शुभ विवाह - पाणिग्रहण व सप्तपदी (Main Wedding Ceremony)',
        date: '21 नवम्बर 2026',
        time: 'दिन में 12:00 बजे (दोपहर 12:00 PM)',
        venue: 'खेतीखान, तल्ली बाज़ार (उत्तराखंड)',
        theme: 'शाही रानी गुलाबी, महरून व स्वर्णिम पिछौड़ा',
        dress: 'वैदिक सप्तपदी, कन्यादान एवं पाणिग्रहण संस्कार',
        desc: 'पवित्र वैदिक अग्नि को साक्षी मानकर, सप्तपदी (सात फेरे) एवं पाणिग्रहण संस्कार के साथ दो पवित्र आत्माओं का अमर बंधन संपन्न होगा। इस ऐतिहासिक मंगल घड़ी में आपकी उपस्थिति हमारे लिए अनमोल है।\n\n📜 पवित्र सात वचन:\n१. पहला वचन: तीर्थ-व्रत एवं धर्म कार्यों में सहभागिता\n२. दूसरा वचन: परिवार एवं माता-पिता का सम्मान\n३. तीसरा वचन: जीवन की सभी अवस्थाओं में एक-दूसरे का साथ\n४. चौथा वचन: घर-गृहस्थी के निर्णयों में परस्पर सम्मति\n५. पांचवां वचन: सुख-दुख में समान सहभागिता\n६. छठा वचन: मर्यादा, निष्ठा एवं सम्मान की रक्षा\n७. सातवां वचन: आजीवन अटूट प्रेम और विश्वास का निर्वाह',
        quote: '॥ यदेतद्धृदयं तव तदस्तु हृदयं मम, यदिदं हृदयं मम तदस्तु हृदयं तव ॥'
    }
};

function initRitualModals() {
    const modal = document.getElementById('ritual-modal');
    const closeBtn = document.getElementById('close-ritual-modal');
    const ritualCards = document.querySelectorAll('[data-ritual-key]');

    ritualCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-ritual-key');
            openRitualDetails(key);
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('show');
        });
    }

    // Original Card Modal
    const cardModal = document.getElementById('card-image-modal');
    const openCardBtns = document.querySelectorAll('.open-card-modal-btn');
    const closeCardBtn = document.getElementById('close-card-modal');

    openCardBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cardModal) cardModal.classList.add('show');
        });
    });

    if (closeCardBtn && cardModal) {
        closeCardBtn.addEventListener('click', () => {
            cardModal.classList.remove('show');
        });
        cardModal.addEventListener('click', (e) => {
            if (e.target === cardModal) cardModal.classList.remove('show');
        });
    }
}

function openRitualDetails(key) {
    const data = ritualData[key];
    if (!data) return;

    if (window.weddingAudio && window.weddingAudio.playAuspiciousChime) {
        window.weddingAudio.playAuspiciousChime();
    }

    const modal = document.getElementById('ritual-modal');
    document.getElementById('modal-ritual-title').innerText = data.title;
    document.getElementById('modal-ritual-date').innerText = data.date;
    document.getElementById('modal-ritual-time').innerText = data.time;
    document.getElementById('modal-ritual-venue').innerText = data.venue;
    document.getElementById('modal-ritual-dress').innerText = data.dress;
    document.getElementById('modal-ritual-desc').innerText = data.desc;
    document.getElementById('modal-ritual-quote').innerText = data.quote;

    const calBtn = document.getElementById('modal-ritual-calendar');
    if (calBtn) {
        calBtn.onclick = () => {
            let start = '20261119T103000Z';
            let end = '20261119T143000Z';
            if (key === 'sangeet') {
                start = '20261119T103000Z'; // 4:00 PM IST
                end = '20261119T143000Z';
            } else if (key === 'mehendi') {
                start = '20261119T143000Z'; // 8:00 PM IST
                end = '20261119T173000Z';
            } else if (key === 'haldi') {
                start = '20261121T003000Z'; // 6:00 AM IST
                end = '20261121T033000Z';
            } else if (key === 'wedding') {
                start = '20261121T063000Z'; // 12:00 PM IST
                end = '20261121T113000Z';
            }
            addToGoogleCalendar(data.title, data.desc, data.venue, start, end);
        };
    }

    modal.classList.add('show');
}

/* =========================================
   7. GOOGLE CALENDAR & SHARE UTILS
   ========================================= */
function addToGoogleCalendar(title, details, location, startIso, endIso) {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${startIso || '20261119T103000Z'}/${endIso || '20261121T123000Z'}`;
    window.open(url, '_blank');
}

window.addToCalendarMain = function() {
    addToGoogleCalendar(
        'तेजस्वी पंत संग नैनेश ओली - शुभ विवाह महोत्सव (वधू पक्ष)',
        'मांगलिक कार्यक्रम:\n• 19 नवम्बर 2026: शाम 4 बजे संगीत, रात 8 बजे मेहंदी (छीनी गोठ, टनकपुर)\n• 21 नवम्बर 2026: सुबह 6 बजे हल्दी, दिन में 12 बजे मुख्य शुभ विवाह (खेतीखान तल्ली बाज़ार)\nसमस्त पंत परिवार (मीना पंत एवं मनोज पंत) सादर आमंत्रित करता है।',
        'छीनी गोठ, टनकपुर एवं खेतीखान तल्ली बाज़ार (उत्तराखंड)',
        '20261119T103000Z',
        '20261121T123000Z'
    );
};

window.shareWeddingInvite = function() {
    const shareData = {
        title: 'तेजस्वी संग नैनेश - शुभ विवाह निमंत्रण (कन्या पक्ष)',
        text: '॥ शुभ विवाह ॥ स्नेह, प्रेम और शुभाशीषों के साथ हम आपको हमारी सुपुत्री तेजस्वी पंत एवं नैनेश ओली के विवाह समारोह में सादर आमंत्रित करते हैं।\n📅 19 नवम्बर: शाम 4 बजे संगीत, रात 8 बजे मेहंदी (छीनी गोठ, टनकपुर)\n📅 21 नवम्बर: सुबह 6 बजे हल्दी, दिन में 12 बजे शुभ विवाह (खेतीखान तल्ली बाज़ार)\n— निवेदक: श्रीमती मीना पंत एवं श्री मनोज पंत',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('विवाह निमंत्रण लिंक कॉपी हो गया है! अब आप इसे WhatsApp या SMS पर शेयर कर सकते हैं।');
        });
    }
};

window.openWhatsAppRSVP = function() {
    const msg = encodeURIComponent('नमस्ते मीना पंत जी एवं मनोज पंत जी!\n\nहम तेजस्वी और नैनेश के शुभ विवाह उत्सव (19 एवं 21 नवम्बर 2026) के पावन अवसर पर अपनी शुभकामनाओं सहित सहर्ष उपस्थित होंगे।\n\n— सादर प्रणाम 🙏');
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
};

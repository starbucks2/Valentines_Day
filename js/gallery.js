document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const startOverlay = document.getElementById('start-overlay');
    const startBtn = document.getElementById('start-btn');
    const galleryContainer = document.getElementById('gallery-container');
    const audio = document.getElementById('bg-music');

    const memories = [
        { img: 'assets/images/566534859_1468874514407613_7774874024737827070_n.jpg', text: 'Every laugh we share is a treasure... ✨' },
        { img: 'assets/images/567191916_1727512627912323_6396658769674244738_n.jpg', text: 'Thank you for being by my side. 💕' },
        { img: 'assets/images/567518539_854299633827546_3780076338919840200_n.jpg', text: 'To more adventures together! 🚀' },
        { img: 'assets/images/578935847_788799967483223_7752816186707259158_n.jpg', text: 'You make the world much brighter. 🌟' },
        { img: 'assets/images/582075356_846720401033570_5367904308817339943_n.jpg', text: 'Grateful for our beautiful friendship. ❤️' },
        { img: 'assets/images/584353775_829694049683553_2342184341483655481_n.jpg', text: 'Happy moments, lasting memories. 📸' },
        { img: 'assets/images/609287407_1212831326839427_5034023222714246004_n.jpg', text: 'You are simply the best! 🏆' },
        { img: 'assets/images/611903221_731303693026841_4921171746723092295_n.jpg', text: 'Love the energy we share! ⚡' },
        { img: 'assets/images/614229502_1071617875095876_8053552938678307226_n.jpg', text: 'So lucky to have friends like you. 🍀' },
        { img: 'assets/images/614755248_2306673956513480_3656696732192792364_n.jpg', text: 'Blessed and grateful. 🙏' },
        { img: 'assets/images/617377832_1791350514763355_1294734042243966790_n.jpg', text: 'Keep shining, everyone! ✨' },
        { img: 'assets/images/624099937_2004879740442699_4822377940642282919_n.jpg', text: 'A journey worth celebrating. 🎉' },
        { img: 'assets/images/624327359_4322193738057255_1581592566144642996_n.jpg', text: 'Happy Valentine’s Day to all of you! 💖' }
    ];

    // Create a shuffled copy of the memories
    const shuffledMemories = [...memories].sort(() => Math.random() - 0.5);

    let currentIndex = 0;
    let autoPlayInterval;
    let isShowFinished = false;

    // Background Particles
    const hearts = ['❤️', '💖', '💕', '💗'];
    const flowers = ['🌸', '🌺', '🌹', '🌼', '🌻', '🌷'];
    const flowerColors = ['flower-purple', 'flower-red', 'flower-blue', 'flower-yellow'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const isFlower = Math.random() > 0.4;

        if (isFlower) {
            particle.innerText = flowers[Math.floor(Math.random() * flowers.length)];
            particle.classList.add(flowerColors[Math.floor(Math.random() * flowerColors.length)]);
        } else {
            particle.innerText = hearts[Math.floor(Math.random() * hearts.length)];
            particle.classList.add('heart-particle');
        }

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${6 + Math.random() * 8}s`;
        particle.style.fontSize = `${15 + Math.random() * 25}px`;
        particle.style.opacity = 0.8 + Math.random() * 0.2;

        heartContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 10000);
    }
    setInterval(createParticle, 500);

    // Memory Logic
    function showMemory(index) {
        const currentCard = galleryContainer.querySelector('.memory-card');
        if (currentCard) {
            currentCard.style.opacity = '0';
            const exitY = Math.random() > 0.5 ? -40 : 40;
            const exitRotate = (Math.random() - 0.5) * 20;
            currentCard.style.transform = `scale(0.8) translateY(${exitY}px) rotate(${exitRotate}deg)`;
        }

        setTimeout(() => {
            const cards = galleryContainer.querySelectorAll('.memory-card, .btn');
            cards.forEach(card => card.remove());

            const memory = shuffledMemories[index];
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.style.display = 'block';

            const entryRotate = (Math.random() - 0.5) * 10;
            card.style.transform = `rotate(${entryRotate}deg)`;

            card.innerHTML = `
                <img src="${memory.img}" class="memory-image" alt="Memory">
                <h2 class="memory-text">${memory.text}</h2>
            `;
            galleryContainer.appendChild(card);

            if (index === shuffledMemories.length - 1) {
                isShowFinished = true;
                checkShowEnd();
            }
        }, 500);
    }

    function checkShowEnd() {
        // Show back to home button only if slides are done AND song is done
        if (isShowFinished && audio.ended) {
            const currentBtn = galleryContainer.querySelector('.btn');
            if (!currentBtn) {
                const finishBtn = document.createElement('button');
                finishBtn.className = 'btn';
                finishBtn.style.marginTop = '20px';
                finishBtn.innerText = 'Back to Home 🏠';
                finishBtn.onclick = () => {
                    window.location.href = 'index.html';
                };
                galleryContainer.appendChild(finishBtn);
            }
        }
    }

    // Monitor audio for completion
    audio.addEventListener('ended', () => {
        checkShowEnd();
    });

    function nextMemory() {
        if (currentIndex < shuffledMemories.length - 1) {
            currentIndex++;
            showMemory(currentIndex);
        } else {
            clearInterval(autoPlayInterval);
        }
    }

    startBtn.addEventListener('click', () => {
        startOverlay.classList.add('hidden');
        audio.loop = false; // Disable loop to detect 'ended' event
        audio.play().catch(e => console.log("Audio play blocked"));
        showMemory(0);

        autoPlayInterval = setInterval(nextMemory, 4000);
    });
});

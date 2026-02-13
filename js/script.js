document.addEventListener('DOMContentLoaded', () => {
    // Fade in main content
    const mainContent = document.querySelector('.main-content');
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 100);

    // Particle Animation (Hearts + Flowers)
    const heartContainer = document.getElementById('heart-container');
    const hearts = ['❤️', '💖', '💕', '💗'];
    const flowers = ['🌸', '🌺', '🌹', '🌼', '🌻', '🌷'];
    const flowerColors = ['flower-purple', 'flower-red', 'flower-blue', 'flower-yellow'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Randomly choose between heart and flower
        const isFlower = Math.random() > 0.4;

        if (isFlower) {
            particle.innerText = flowers[Math.floor(Math.random() * flowers.length)];
            // Assign one of the requested colors
            const colorClass = flowerColors[Math.floor(Math.random() * flowerColors.length)];
            particle.classList.add(colorClass);
        } else {
            particle.innerText = hearts[Math.floor(Math.random() * hearts.length)];
            particle.classList.add('heart-particle');
        }

        const startLeft = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const size = 15 + Math.random() * 25;

        particle.style.left = `${startLeft}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.fontSize = `${size}px`;
        particle.style.opacity = 0.8 + Math.random() * 0.2;

        heartContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Continuous particle generation
    setInterval(createParticle, 500);

    // Gallery Reveal Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });

    // Music Player Logic
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play()
                .then(() => {
                    isPlaying = true;
                    musicBtn.innerHTML = 'Stop: Best Friend ⏹️';
                    musicBtn.style.background = '#c9184a';
                })
                .catch(err => {
                    console.error("Audio playback failed:", err);
                    alert("Click again to play music!");
                });
        } else {
            audio.pause();
            isPlaying = false;
            musicBtn.innerHTML = 'Happy Valentine 🎵';
            musicBtn.style.background = '#ff4d6d';
        }
    });
});

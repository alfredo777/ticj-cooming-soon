
        document.addEventListener('DOMContentLoaded', () => {
            // --- COUNTDOWN LOGIC (Sin cambios) ---
            const tournamentDate = new Date('2026-05-14T10:00:00-05:00');
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            const countdownEl = document.getElementById('countdown');
            const startedEl = document.getElementById('tournament-started');

            function updateCountdown() {
                const now = new Date();
                const diff = tournamentDate - now;

                if (diff <= 0) {
                    countdownEl.style.display = 'none';
                    startedEl.style.display = 'block';
                    clearInterval(countdownInterval);
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diff % (1000 * 60)) / 1000);

                daysEl.innerText = String(d).padStart(2, '0');
                hoursEl.innerText = String(h).padStart(2, '0');
                minutesEl.innerText = String(m).padStart(2, '0');
                secondsEl.innerText = String(s).padStart(2, '0');
            }

            const countdownInterval = setInterval(updateCountdown, 1000);
            updateCountdown();

            // --- GSAP ANIMATION LOGIC (Sin cambios, sigue funcionando correctamente) ---
            const isPortrait = window.matchMedia("(orientation: portrait)").matches;
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            if (isPortrait) {
                gsap.set(['.header-content', '.main-content-wrapper', '.footer-content'], { opacity: 0, y: 30 });
                
                tl.to(['.header-content', '.main-content-wrapper', '.footer-content'], {
                      opacity: 1,
                      y: 0,
                      stagger: 0.3,
                      duration: 1,
                      delay: 0.5
                  });

            } else {
                gsap.set('.header-content', { opacity: 0, x: -50 });
                gsap.set('.main-content-wrapper', { opacity: 0, x: 50 });
                gsap.set('.footer-content', { opacity: 0, y: 30 });

                tl.to('.header-content', { opacity: 1, x: 0, duration: 1 }, 0.5)
                  .to('.main-content-wrapper', { opacity: 1, x: 0, duration: 1 }, "<0.2")
                  .to('.footer-content', { opacity: 1, y: 0, duration: 0.8 }, "<0.1");
            }
        });
    
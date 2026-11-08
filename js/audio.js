// Wedding Music & Audio Controller - Ladki Wale Special Edition
// Featuring the romantic wedding song: "आज से तेरी" (Aaj Se Teri - Padman)
// Along with Auspicious Temple Bells and Chimes via Web Audio API

class WeddingAudioController {
    constructor() {
        this.isPlaying = false;
        this.audio = null;
        this.ctx = null;
        this.gainNode = null;
        this.songTitle = "आज से तेरी (Padman)";
        this.initAudioElement();
    }

    initAudioElement() {
        if (typeof window === 'undefined') return;

        // Check if audio element already exists in DOM or create new one
        let existingAudio = document.getElementById('wedding-bg-audio');
        if (!existingAudio) {
            this.audio = new Audio('assets/bg-music.mp4');
            this.audio.id = 'wedding-bg-audio';
            this.audio.loop = true;
            this.audio.preload = 'auto';
            this.audio.volume = 0.75;
            document.body ? document.body.appendChild(this.audio) : null;
        } else {
            this.audio = existingAudio;
            this.audio.loop = true;
            this.audio.volume = 0.75;
        }

        // Keep state in sync with native audio events
        this.audio.addEventListener('play', () => {
            this.isPlaying = true;
            if (typeof updateMusicButtonState === 'function') {
                updateMusicButtonState(true);
            }
        });

        this.audio.addEventListener('pause', () => {
            this.isPlaying = false;
            if (typeof updateMusicButtonState === 'function') {
                updateMusicButtonState(false);
            }
        });

        this.audio.addEventListener('ended', () => {
            // Audio is looped, but if it ends, restart
            this.audio.currentTime = 0;
            this.audio.play().catch(() => {});
        });
    }

    initSynthContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
                this.gainNode = this.ctx.createGain();
                this.gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
                this.gainNode.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    start() {
        if (!this.audio) {
            this.initAudioElement();
        }

        this.initSynthContext();

        if (this.audio) {
            const playPromise = this.audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.isPlaying = true;
                    if (typeof updateMusicButtonState === 'function') {
                        updateMusicButtonState(true);
                    }
                }).catch(err => {
                    console.log("Audio play gesture required by browser:", err);
                    this.isPlaying = false;
                });
            }
        }
    }

    stop() {
        if (this.audio) {
            this.audio.pause();
        }
        this.isPlaying = false;
        if (typeof updateMusicButtonState === 'function') {
            updateMusicButtonState(false);
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.stop();
            return false;
        } else {
            this.start();
            return true;
        }
    }

    // Auspicious Temple Bell (मंदिर की पावन घंटी) for envelope opening
    playTempleBell() {
        this.initSynthContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const partials = [1200, 1920, 2640, 3800];
        
        partials.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.frequency.setValueAtTime(freq + (Math.random() * 5), now);

            gain.gain.setValueAtTime(0.04 / (i + 1), now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

            osc.connect(gain);
            gain.connect(this.gainNode || this.ctx.destination);

            osc.start(now);
            osc.stop(now + 3.0);
        });
    }

    // Sacred interactive chime when clicking any ritual ceremony card
    playAuspiciousChime() {
        this.initSynthContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
        
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const startTime = now + (idx * 0.07);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0.06, startTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

            osc.connect(gain);
            gain.connect(this.gainNode || this.ctx.destination);

            osc.start(startTime);
            osc.stop(startTime + 1.2);
        });
    }
}

// Global instance available across scripts
window.weddingAudio = new WeddingAudioController();

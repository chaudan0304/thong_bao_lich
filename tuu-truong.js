// JavaScript logic for Dedicated "Thông Báo Lịch Tựu Trường" Page

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initControls();
});

// Lightbox Modal Zoom for Polaroid Photos
function openModal(imgSrc, captionText) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');

    if (modal && modalImg && caption) {
        modal.style.display = 'flex';
        modalImg.src = imgSrc;
        caption.innerText = captionText;
    }
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) modal.style.display = 'none';
}

function closeCountdownModal() {
    const modal = document.getElementById('countdown-modal');
    if (modal) modal.style.display = 'none';
}

// Countdown Timer specifically for Ngày Tựu Trường
function initCountdown() {
    // Target: 24/08/2026 lúc 07h30 sáng
    const tuuTruongTarget = new Date('2026-08-24T07:30:00+07:00').getTime();

    function updateTimers() {
        const now = new Date().getTime();
        const diffTT = tuuTruongTarget - now;

        const daysEl = document.getElementById('tt-days');
        const hoursEl = document.getElementById('tt-hours');
        const minsEl = document.getElementById('tt-minutes');
        const secsEl = document.getElementById('tt-seconds');

        if (diffTT > 0) {
            if (daysEl) daysEl.innerText = String(Math.floor(diffTT / (1000 * 60 * 60 * 24))).padStart(2, '0');
            if (hoursEl) hoursEl.innerText = String(Math.floor((diffTT % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            if (minsEl) minsEl.innerText = String(Math.floor((diffTT % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            if (secsEl) secsEl.innerText = String(Math.floor((diffTT % (1000 * 60)) / 1000)).padStart(2, '0');
        } else {
            const container = document.getElementById('timer-tuu-truong');
            if (container) {
                container.innerHTML = "<p style='color:#15803d; font-size:1.2rem; font-weight:800; padding:10px;'>🎉 Đã đến ngày Tựu trường! Chúc các em một năm học mới nhiều niềm vui và thành tích xuất sắc! 🎈</p>";
            }
        }
    }

    updateTimers();
    setInterval(updateTimers, 1000);
}

// Web Audio API: Cheerful School Bell / Chime Melody
let isPlayingAudio = false;
let audioCtx = null;
let audioInterval = null;

function playSchoolChime() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const notes = [
        { freq: 523.25, dur: 0.3 }, // C5
        { freq: 659.25, dur: 0.3 }, // E5
        { freq: 783.99, dur: 0.3 }, // G5
        { freq: 1046.50, dur: 0.5 }, // C6
        { freq: 783.99, dur: 0.3 }, // G5
        { freq: 1046.50, dur: 0.6 }  // C6
    ];

    function playSequence() {
        let currentTime = audioCtx.currentTime;
        notes.forEach(note => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(note.freq, currentTime);

            gain.gain.setValueAtTime(0, currentTime);
            gain.gain.linearRampToValueAtTime(0.2, currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, currentTime + note.dur);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(currentTime);
            osc.stop(currentTime + note.dur);

            currentTime += note.dur + 0.1;
        });
    }

    playSequence();
    audioInterval = setInterval(playSequence, 4000);
}

function stopSchoolChime() {
    if (audioInterval) {
        clearInterval(audioInterval);
        audioInterval = null;
    }
}

// Confetti Cannon
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);
    }
}

// Controls Initialization
function initControls() {
    // Sound Button
    const btnSound = document.getElementById('btn-sound');
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            if (!isPlayingAudio) {
                playSchoolChime();
                isPlayingAudio = true;
                btnSound.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Nhạc: Bật</span>';
                btnSound.style.background = '#2e7d32';
            } else {
                stopSchoolChime();
                isPlayingAudio = false;
                btnSound.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Âm thanh</span>';
                btnSound.style.background = 'rgba(255, 255, 255, 0.15)';
            }
        });
    }

    // Countdown Modal Button
    const btnCountdown = document.getElementById('btn-countdown');
    if (btnCountdown) {
        btnCountdown.addEventListener('click', () => {
            const modal = document.getElementById('countdown-modal');
            if (modal) modal.style.display = 'flex';
        });
    }

    // Confetti Button
    const btnConfetti = document.getElementById('btn-confetti');
    if (btnConfetti) {
        btnConfetti.addEventListener('click', () => {
            triggerConfetti();
        });
    }

    // Print Button
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', () => {
            window.print();
        });
    }

    // Download HD Banner Button
    const btnDownload = document.getElementById('btn-download');
    if (btnDownload) {
        btnDownload.addEventListener('click', downloadBanner);
    }

    // Fullscreen Button
    const btnFullscreen = document.getElementById('btn-fullscreen');
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', toggleFullscreen);
    }
}

// Download HD Banner
function downloadBanner() {
    const poster = document.getElementById('poster-canvas');
    if (!poster || typeof html2canvas !== 'function') return;

    showToast('Đang tạo ảnh HD Thông báo Tựu trường, vui lòng chờ...');

    html2canvas(poster, {
        scale: 2, // 2x resolution for ultra-crisp output
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#cbeeff',
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Thong_Bao_Lich_Tuu_Truong_2026_Quynh_Loc_B.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('✅ Đã tải thành công ảnh Thông báo Tựu trường HD!');
        triggerConfetti();
    }).catch(err => {
        console.error(err);
        showToast('❌ Lỗi xuất ảnh. Vui lòng thử lại!');
    });
}

function showToast(msg) {
    let toast = document.querySelector('.download-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'download-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

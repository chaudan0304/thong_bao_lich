// JavaScript logic for 16:9 Interactive School Poster Web App

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initControls();
});

// Lightbox Modal Zoom for Polaroid Photos
function openModal(imgSrc, captionText) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');

    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    caption.innerText = captionText;
}

function closeModal() {
    document.getElementById('image-modal').style.display = 'none';
}

function closeCountdownModal() {
    document.getElementById('countdown-modal').style.display = 'none';
}

// Countdown Timers Logic
function initCountdown() {
    const tuuTruongTarget = new Date('2026-08-24T07:30:00+07:00').getTime();
    const khaiGiangTarget = new Date('2026-09-05T07:30:00+07:00').getTime();

    function updateTimers() {
        const now = new Date().getTime();

        // Tựu trường timer
        const ttDays = document.getElementById('tt-days');
        const timerTT = document.getElementById('timer-tuu-truong');
        if (ttDays && timerTT) {
            const diffTT = tuuTruongTarget - now;
            if (diffTT > 0) {
                document.getElementById('tt-days').innerText = String(Math.floor(diffTT / (1000 * 60 * 60 * 24))).padStart(2, '0');
                document.getElementById('tt-hours').innerText = String(Math.floor((diffTT % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                document.getElementById('tt-minutes').innerText = String(Math.floor((diffTT % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                document.getElementById('tt-seconds').innerText = String(Math.floor((diffTT % (1000 * 60)) / 1000)).padStart(2, '0');
            } else {
                timerTT.innerHTML = "<p class='color-green' style='font-size:1.2rem; font-weight:bold;'>Đã diễn ra ngày Tựu Trường! 🎉</p>";
            }
        }

        // Khai giảng timer
        const kgDays = document.getElementById('kg-days');
        const timerKG = document.getElementById('timer-khai-giang');
        if (kgDays && timerKG) {
            const diffKG = khaiGiangTarget - now;
            if (diffKG > 0) {
                document.getElementById('kg-days').innerText = String(Math.floor(diffKG / (1000 * 60 * 60 * 24))).padStart(2, '0');
                document.getElementById('kg-hours').innerText = String(Math.floor((diffKG % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                document.getElementById('kg-minutes').innerText = String(Math.floor((diffKG % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                document.getElementById('kg-seconds').innerText = String(Math.floor((diffKG % (1000 * 60)) / 1000)).padStart(2, '0');
            } else {
                timerKG.innerHTML = "<p class='color-blue' style='font-size:1.2rem; font-weight:bold;'>Đã diễn ra Lễ Khai Giảng! 🎈</p>";
            }
        }
    }

    updateTimers();
    setInterval(updateTimers, 1000);
}

// Control Bar Buttons
let isPlayingAudio = false;
let audioCtx = null;
let audioInterval = null;

function initControls() {
    // Sound Button
    const btnSound = document.getElementById('btn-sound');
    btnSound.addEventListener('click', () => {
        if (!isPlayingAudio) {
            playSchoolChime();
            isPlayingAudio = true;
            btnSound.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>Âm thanh: Bật</span>';
            btnSound.style.background = '#2e7d32';
        } else {
            stopSchoolChime();
            isPlayingAudio = false;
            btnSound.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>Âm thanh</span>';
            btnSound.style.background = 'rgba(255, 255, 255, 0.15)';
        }
    });

    // Countdown Modal Button
    document.getElementById('btn-countdown').addEventListener('click', () => {
        document.getElementById('countdown-modal').style.display = 'flex';
    });

    // Confetti Celebration Button
    document.getElementById('btn-confetti').addEventListener('click', () => {
        triggerConfetti();
    });

    // Download HD Banner Button
    const btnDownload = document.getElementById('btn-download');
    if (btnDownload) {
        btnDownload.addEventListener('click', downloadBanner);
    }

    // Fullscreen 16:9 Canvas Button
    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        const elem = document.getElementById('poster-canvas');
        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
}

// Download Banner HD Function
async function downloadBanner() {
    const btn = document.getElementById('btn-download');
    const originalText = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Đang tạo ảnh...</span>';
    btn.disabled = true;

    showToast('<i class="fa-solid fa-spinner fa-spin"></i> Đang xuất ảnh Banner 16:9 độ phân giải cao...');

    try {
        const posterElem = document.getElementById('poster-canvas');
        
        // Render canvas with high scale (2.5x for crisp print & display quality)
        const canvas = await html2canvas(posterElem, {
            scale: 2.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false
        });

        // Trigger file download
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'Banner-Ngay-Tuu-Truong-16x9-HD.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Celebration confetti & success toast
        triggerConfetti();
        showToast('<i class="fa-solid fa-circle-check"></i> Đã tải về thành công file Banner 16:9 HD!');

        btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Đã Tải Xong!</span>';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2500);

    } catch (err) {
        console.error('Download error:', err);
        showToast('<i class="fa-solid fa-triangle-exclamation"></i> Có lỗi xảy ra, vui lòng thử lại!');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// Toast notification helper
function showToast(message) {
    let toast = document.querySelector('.download-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'download-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Trigger Confetti Effect
function triggerConfetti() {
    if (typeof confetti === 'function') {
        // Confetti burst from bottom corners
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Web Audio Synthesizer for School Bell & Cheerful Melody
function playSchoolChime() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    // Play school bell chime pattern (Do-Mi-Sol-Do)
    const notes = [261.63, 329.63, 392.00, 523.25];
    let noteIdx = 0;

    audioInterval = setInterval(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIdx], audioCtx.currentTime);

        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);

        noteIdx = (noteIdx + 1) % notes.length;
    }, 500);
}

function stopSchoolChime() {
    if (audioInterval) {
        clearInterval(audioInterval);
        audioInterval = null;
    }
}

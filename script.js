// script.js
let timer;
let seconds = 0;
let timerRunning = false;

document.getElementById('firstHalfBtn').addEventListener('click', function() {
    if (!timerRunning || seconds >= 2700) {
        seconds = 0;  // Reset to 00:00 for first half
        startTimer();
    }
});

document.getElementById('secondHalfBtn').addEventListener('click', function() {
    if (!timerRunning || seconds < 2700) {
        seconds = 2700;  // Set to 45:00 for second half
        startTimer();
    }
});

document.getElementById('saveLogBtn').addEventListener('click', function() {
    const logContent = document.getElementById('eventLog').innerText;
    const blob = new Blob([logContent], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event_log.txt';
    a.click();
});

function startTimer() {
    clearInterval(timer);
    timer = setInterval(function() {
        seconds++;
        document.getElementById('timerDisplay').textContent = formatTime(seconds);
    }, 1000);
    timerRunning = true;
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const buttons = document.querySelectorAll('.eventBtn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const event = this.getAttribute('data-event');
        const time = document.getElementById('timerDisplay').textContent;
        logEvent(`${time} - ${event}`);
    });
});

function logEvent(eventDescription) {
    const log = document.getElementById('eventLog');
    const entry = document.createElement('div');
    entry.textContent = eventDescription;
    log.appendChild(entry);
}

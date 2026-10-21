let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let timerId = null;
let isRunning = false;
let currentMode = 'work';

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const timerLabel = document.getElementById('timer-label');
const workModeBtn = document.getElementById('work-mode');
const breakModeBtn = document.getElementById('break-mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = 'Start';
        startBtn.classList.remove('running');
    } else {
        isRunning = true;
        startBtn.textContent = 'Pause';
        startBtn.classList.add('running');
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timerId);
                isRunning = false;
                startBtn.textContent = 'Start';
                startBtn.classList.remove('running');
                alert(currentMode === 'work' ? 'Work session complete! Take a break.' : 'Break over! Time to focus.');
                setMode(currentMode === 'work' ? 'break' : 'work');
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.classList.remove('running');
    timeLeft = currentMode === 'work' ? workTime : breakTime;
    updateDisplay();
}

function setMode(mode) {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.classList.remove('running');
    currentMode = mode;

    if (mode === 'work') {
        workModeBtn.classList.add('active');
        breakModeBtn.classList.remove('active');
        timerLabel.textContent = 'Time to focus!';
        timeLeft = workTime;
    } else {
        breakModeBtn.classList.add('active');
        workModeBtn.classList.remove('active');
        timerLabel.textContent = 'Time for a break!';
        timeLeft = breakTime;
    }
    updateDisplay();
}

updateDisplay();

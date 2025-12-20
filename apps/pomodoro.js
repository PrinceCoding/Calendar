// Pomodoro Timer Widget
(function() {
  'use strict';

  const floatingPomo = document.getElementById('floatingPomo');
  const pomoTimer = document.getElementById('pomoTimer');
  const pomoStart = document.getElementById('pomoStart');
  const pomoReset = document.getElementById('pomoReset');

  let pomoSeconds = 25 * 60;
  let pomoRunning = false;
  let pomoInterval = null;

  function updatePomoDisplay() {
    const m = Math.floor(pomoSeconds / 60);
    const s = pomoSeconds % 60;
    if (pomoTimer) {
      pomoTimer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
  }

  if (pomoStart) {
    pomoStart.onclick = () => {
      pomoRunning = !pomoRunning;
      pomoStart.textContent = pomoRunning ? '⏸' : '▶';
      if (pomoRunning) {
        pomoInterval = setInterval(() => {
          if (pomoSeconds > 0) {
            pomoSeconds--;
            updatePomoDisplay();
          } else {
            pomoRunning = false;
            pomoStart.textContent = '▶';
            clearInterval(pomoInterval);
            alert('Pomodoro session complete!');
          }
        }, 1000);
      } else {
        clearInterval(pomoInterval);
      }
    };
  }

  if (pomoReset) {
    pomoReset.onclick = () => {
      pomoRunning = false;
      pomoStart.textContent = '▶';
      clearInterval(pomoInterval);
      pomoSeconds = 25 * 60;
      updatePomoDisplay();
    };
  }

  updatePomoDisplay();

  // Export for main script
  window.PomodoroWidget = {
    element: floatingPomo,
    reset: () => pomoReset.click()
  };
})();

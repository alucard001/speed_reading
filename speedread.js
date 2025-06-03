document.addEventListener('DOMContentLoaded', () => {
  const speedReadContent = document.getElementById('speedReadContent');
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const resetButton = document.getElementById('resetButton');
  const rpmInput = document.getElementById('rpmInput');
  const currentWordSpan = document.getElementById('currentWord');
  const loadingOverlay = document.getElementById('loadingOverlay');

  let textToRead = '';
  let words = [];
  let currentWordIndex = 0;
  let intervalId = null;
  let rpm = 350;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "panelReadyCheck") {
      // Respond to background script that panel is ready
      chrome.runtime.sendMessage({ type: "panelReady" });
    } else if (message.type === "selectedText") {
      loadingOverlay.style.display = 'flex'; // Show loading overlay
      textToRead = message.text;
      // Split text by words for English and characters for Chinese
      // This regex splits by spaces for English words, and by individual characters for Chinese.
      // It also handles punctuation attached to words.
      words = textToRead.match(/[a-zA-Z0-9']+|[\u4e00-\u9fa5]|[^\s\w]/g).filter(word => word.length > 0);
      speedReadContent.textContent = textToRead;
      resetReading();
      loadingOverlay.style.display = 'none'; // Hide loading overlay
    }
  });

  rpmInput.value = rpm;

  rpmInput.addEventListener('change', (event) => {
    rpm = parseInt(event.target.value, 10);
    if (intervalId) {
      stopReading();
      startReading();
    }
  });

  startButton.addEventListener('click', startReading);
  stopButton.addEventListener('click', stopReading);
  resetButton.addEventListener('click', resetReading);

  function startReading() {
    if (words.length === 0) return;

    const delay = 60000 / rpm; // milliseconds per word

    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      if (currentWordIndex < words.length) {
        currentWordSpan.textContent = words[currentWordIndex];
        currentWordIndex++;
      } else {
        stopReading();
      }
    }, delay);
  }

  function stopReading() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function resetReading() {
    stopReading();
    currentWordIndex = 0;
    currentWordSpan.textContent = '';
    if (words.length > 0) {
      speedReadContent.textContent = words.join(' ');
    } else {
      speedReadContent.textContent = textToRead;
    }
  }
});
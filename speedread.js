document.addEventListener('DOMContentLoaded', () => {
  const speedReadContent = document.getElementById('speedReadContent');
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const rpmInput = document.getElementById('rpmInput');
  const currentWordSpan = document.getElementById('currentWord');

  let textToRead = '';
  let words = [];
  let currentWordIndex = 0;
  let intervalId = null;
  let rpm = 300;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "selectedText") {
      textToRead = message.text;
      // Split text by words for English and characters for Chinese
      // This regex splits by spaces for English words, and by individual characters for Chinese.
      // It also handles punctuation attached to words.
      words = textToRead.match(/[a-zA-Z0-9']+|[\u4e00-\u9fa5]|[^\s\w]/g).filter(word => word.length > 0);
      speedReadContent.textContent = textToRead;
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
});
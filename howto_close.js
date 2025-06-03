document.addEventListener('DOMContentLoaded', () => {
    const closeGuideButton = document.getElementById('closeGuide');
    closeGuideButton.addEventListener('click', () => {
        window.close();
    });
});
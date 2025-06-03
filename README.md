# Active Speed Reading Chrome Extension

- [Active Speed Reading Chrome Extension](#active-speed-reading-chrome-extension)
  - [Overview](#overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Development](#development)
    - [Project Structure](#project-structure)
    - [Key Files](#key-files)
  - [License](#license)

## Overview

Active Speed Reading is a Chrome extension designed to enhance your reading efficiency by allowing you to speed read selected text directly within your browser. It supports both English and Chinese text, providing a seamless experience for a wide range of content.

## Features

*   **Context Menu Integration:** Easily initiate speed reading by selecting text on any webpage and choosing "Speed read this" from the right-click context menu.
*   **Side Panel Display:** The selected text is displayed in a dedicated side panel, ensuring a focused reading environment without distractions.
*   **Adjustable Reading Speed (RPM):** Customize your reading pace by adjusting the Words Per Minute (WPM) or Characters Per Minute (CPM) using a dedicated RPM input.
*   **Play, Stop, and Reset Controls:** Full control over the reading process with intuitive play, stop, and reset buttons.
*   **Multilingual Support:** Intelligent text segmentation for both English (word-by-word) and Chinese (character-by-character) content.
*   **Robust Message Handshake:** Implements a reliable handshake mechanism between the background script and the side panel to ensure smooth communication and prevent "Receiving end does not exist" errors, even on slower systems.
*   **Loading Indicator:** A visual loading overlay is displayed while text is being processed, improving user experience and providing feedback.
*   **Accessibility (WCAG 2.2):**
    *   Proper language declaration (`lang="en"`).
    *   `aria-live="polite"` for the current word display.
    *   Descriptive `aria-label` attributes for control buttons.
    *   Associated `label` and `input` for RPM control using `for` and `aria-labelledby`.
    *   Dynamic `aria-hidden` and `role="status"` for the loading overlay.

## Installation

1.  **Download the Extension:** Obtain the extension files (e.g., by cloning this repository).
2.  **Open Chrome Extensions:** Navigate to `chrome://extensions/` in your Chrome browser.
3.  **Enable Developer Mode:** Toggle on "Developer mode" in the top right corner.
4.  **Load Unpacked:** Click on the "Load unpacked" button.
5.  **Select Extension Folder:** Browse to and select the directory where you downloaded the extension files.
6.  **Pin the Extension (Optional):** For easy access, click the puzzle piece icon in the Chrome toolbar and pin "Active Speed Reading."

## Usage

1.  **Select Text:** On any webpage, highlight the text you wish to speed read.
2.  **Right-Click:** Right-click on the selected text.
3.  **Choose "Speed read this":** From the context menu, select "Speed read this."
4.  **Side Panel Appears:** The speed reading side panel will open with your selected text.
5.  **Adjust RPM:** Use the RPM input to set your desired reading speed.
6.  **Control Reading:** Use the "Play," "Stop," and "Reset" buttons to manage your reading session.

## Development

### Project Structure

```
. \
├── LICENSE
├── README.md
├── background.js         # Handles context menu, side panel opening, and message handshake.
├── images\               # Extension icons.
├── manifest.json         # Extension manifest file.
├── speedread.css         # Styling for the side panel UI.
├── speedread.html        # HTML structure for the side panel.
└── speedread.js          # Core speed reading logic, UI interactions, and message handling.
```

### Key Files

*   <mcfile name="manifest.json" path="c:\projects\speed_reading\manifest.json"></mcfile>: Defines the extension's properties, permissions, and entry points.
*   <mcfile name="background.js" path="c:\projects\speed_reading\background.js"></mcfile>: Manages background processes, context menu creation, and the handshake mechanism for opening the side panel and sending selected text.
*   <mcfile name="speedread.html" path="c:\projects\speed_reading\speedread.html"></mcfile>: The user interface for the speed reading side panel.
*   <mcfile name="speedread.css" path="c:\projects\speed_reading\speedread.css"></mcfile>: Provides the visual styling for the side panel.
*   <mcfile name="speedread.js" path="c:\projects\speed_reading\speedread.js"></mcfile>: Contains the main logic for text processing, word display, RPM calculation, and UI event handling.

## License

This project is licensed under the MIT License - see the <mcfile name="LICENSE" path="c:\projects\speed_reading\LICENSE"></mcfile> file for details.
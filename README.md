# Playlist Grabber and Downloader

**Playlist Grabber and Downloader** is a two-part tool designed to extract song information from platforms like YouTube Music and SoundCloud and download the extracted songs as MP3 files using YouTube.

## Purpose

This tool is intended for educational purposes only. It demonstrates how to use browser scripting and Python automation to collect and process song data. Users must ensure they comply with local copyright laws and the terms of service of the platforms they interact with. The authors are not responsible for any misuse of this tool.

---

## Features

### `playlist_graber.js`
- A JavaScript script that extracts song titles and artists from:
  - **YouTube Music**
  - **SoundCloud**
- Saves the extracted data into a CSV file (`playlist_songs.csv`).
- Designed to be run in the browser console (via Developer Tools).

### `playlist_download.py`
- A Python script that:
  - Reads the CSV file created by `playlist_graber.js`.
  - Downloads the songs in MP3 format from YouTube using [yt-dlp](https://github.com/yt-dlp/yt-dlp).
  - Saves the MP3 files in a `downloads` folder.

---

## How to Use

### Step 1: Extract Song Data
1. Open **YouTube Music** or **SoundCloud** in your browser.
2. Open the browser's **Developer Tools** (F12 or right-click > Inspect).
3. Copy and paste the content of `playlist_graber.js` into the console and press Enter.
4. A CSV file (`playlist_songs.csv`) will be downloaded automatically.

### Step 2: Download Songs
1. Place the downloaded `playlist_songs.csv` file in the same directory as `playlist_download.py`.
2. Install the required Python libraries:
   ```bash
   pip install yt-dlp
   ```
3. Run the Python script:
   ```bash
   python playlist_download.py
   ```
4. The songs will be downloaded as MP3 files into a `downloads` folder.

---

## Disclaimer

This project is for educational purposes only. Use it responsibly and ensure you respect the terms of service of the platforms involved. The authors do not condone or support copyright infringement or the unauthorized distribution of copyrighted material.

---

## Prerequisites

### For `playlist_graber.js`:
- A Chromium-based browser (e.g., Google Chrome, Microsoft Edge).

### For `playlist_download.py`:
- Python 3.6+ installed.
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) Python library.

---

## Contributions

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request.

---

If you find this project helpful, consider giving it a ⭐ on GitHub!


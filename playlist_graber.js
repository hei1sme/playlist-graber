// Function to scrape songs from YouTube Music
function scrapeSongsFromYouTubeMusic() {
    const songs = [];
    const songElements = document.querySelectorAll('ytmusic-responsive-list-item-renderer'); // Selector for song items

    songElements.forEach(song => {
        const titleElement = song.querySelector('.yt-simple-endpoint'); // Selector for song title
        const artistElement = song.querySelector('a.yt-simple-endpoint.style-scope.yt-formatted-string[href^="channel/"]'); // Selector for artist name
        const title = titleElement ? titleElement.innerText : 'Unknown Title'; // Extract song title
        const artist = artistElement ? artistElement.innerText : 'Unknown Artist'; // Extract artist name

        songs.push({ title, artist });
    });

    return songs; // Return the songs array
}

// Function to scrape songs from SoundCloud
function scrapeSongsFromSoundCloud() {
    const songs = [];
    const songElements = document.querySelectorAll('.trackItem__trackTitle'); // Selector for song title

    songElements.forEach(song => {
        const title = song.innerText; // Extract song title
        const artistElement = song.closest('.trackItem').querySelector('.trackItem__username'); // Selector for artist name
        const artist = artistElement ? artistElement.innerText : 'Unknown Artist'; // Extract artist name

        songs.push({ title, artist });
    });

    return songs; // Return the songs array
}

// Main function to detect platform and scrape songs
function scrapeSongs() {
    let songs = [];
    const url = window.location.href;

    if (url.includes('music.youtube.com')) {
        songs = scrapeSongsFromYouTubeMusic();
    } else if (url.includes('soundcloud.com')) {
        songs = scrapeSongsFromSoundCloud();
    } else {
        console.log("Unsupported platform or not on a music site.");
        return;
    }

    // Log the list of songs
    console.table(songs);

    // Convert the songs array to CSV format
    const csvContent = "Title,Artist\n" // Header
        + songs.map(e => {
            const title = e.title.replace(/"/g, '""');
            const artist = e.artist.replace(/"/g, '""');
            return `"${title}","${artist}"`;
        }).join("\n"); // Data rows

    // Create a Blob with UTF-8 encoding
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const urlBlob = URL.createObjectURL(blob);
    
    link.setAttribute("href", urlBlob);
    link.setAttribute("download", "playlist_songs.csv");
    document.body.appendChild(link); // Required for Firefox

    link.click(); // Automatically click the link to trigger the download
    document.body.removeChild(link); // Clean up the DOM
}

// Run the function
scrapeSongs();
import os
import csv
from yt_dlp import YoutubeDL

def download_song_youtube(title, artist, download_folder):
    # Clean up the title and artist for the search query
    query = f"ytsearch1:{title} {artist}".replace("(", "").replace(")", "").replace("'", "").replace("&", "and")
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s'),
        'quiet': False,
        'no_warnings': False,
        'extract_flat': False,
        # Add cookies file if needed
        # 'cookiefile': 'cookies.txt',
    }

    with YoutubeDL(ydl_opts) as ydl:
        try:
            # First, extract the video info to get the actual URL
            result = ydl.extract_info(query, download=False)
            if result and 'entries' in result and result['entries']:
                # Take first search result
                video = result['entries'][0]
                # Now download using the actual video URL
                ydl.download([video['webpage_url']])
                print(f"Successfully downloaded: {title} by {artist}")
            else:
                print(f"No results found for: {title} by {artist}")
        except Exception as e:
            print(f"Error downloading {title} by {artist}: {str(e)}")

def read_songs_from_csv(file_path):
    songs = []
    try:
        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                songs.append((row['Title'], row['Artist']))
    except Exception as e:
        print(f"Error reading CSV file: {str(e)}")
        return []
    return songs

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    download_folder = os.path.join(script_dir, 'downloads')

    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    csv_path = os.path.join(script_dir, 'playlist_songs.csv')
    songs = read_songs_from_csv(csv_path)

    if not songs:
        print("No songs found in the CSV file.")
        return

    for title, artist in songs:
        print(f"\nAttempting to download: {title} by {artist}")
        download_song_youtube(title, artist, download_folder)

if __name__ == "__main__":
    main()
# Soundify Music Player

A modern, responsive web-based music player inspired by popular streaming services. This project is built with HTML, CSS, and vanilla JavaScript to demonstrate frontend web development techniques. Now with YouTube Music integration!

![Soundify Screenshot](https://via.placeholder.com/800x450?text=Soundify+Music+Player)

## Features

- **Modern UI**: Clean, dark-themed interface with responsive design
- **Music Playback**: Play, pause, skip tracks, and control volume
- **Playlist Management**: Browse and select from featured playlists
- **Progress Control**: Seek through tracks with an interactive progress bar
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Additional Controls**: Shuffle, repeat, and like functionality
- **YouTube Integration**: Search and play real music from YouTube

## Technologies Used

- **HTML5**: Semantic markup for structured content
- **CSS3**: Modern styling with Grid layout, Flexbox, and CSS variables
- **JavaScript**: Vanilla JS for all interactive functionality
- **Font Awesome**: Icon library for music controls and navigation
- **Google Fonts**: Montserrat font family for typography
- **YouTube Data API v3**: Integration with YouTube for real music content

## Project Structure

```
├── musicplayer.html        # Main HTML document
├── musicplayer.css         # CSS styles
├── musicplayer.js          # Core JavaScript functionality
├── youtubeIntegration.js   # YouTube API integration
├── YOUTUBE_API_SETUP.md    # Guide for YouTube API setup
└── README.md               # Documentation
```

## Getting Started

### Basic Setup
1. Clone this repository or download the files
2. Open `musicplayer.html` in your web browser
3. Enjoy browsing through the interface and playing the sample tracks

### YouTube Integration Setup
To use the YouTube integration (for real music):
1. Follow the instructions in `YOUTUBE_API_SETUP.md` to get a YouTube API key
2. Add your API key to the `youtubeIntegration.js` file
3. Open `musicplayer.html` in your web browser
4. Use the search box to find and play real music from YouTube

## Usage

- **Basic Controls**:
  - Click on a playlist or track to load it
  - Use the play/pause button to control playback
  - Adjust volume using the volume slider
  - Navigate between tracks with previous/next buttons
  - Click on the progress bar to seek through the current track
  - Toggle repeat and shuffle modes with their respective buttons
  - Click the heart icon to like/unlike the current track

- **YouTube Mode**:
  - Enter search terms in the search box at the top
  - Press Enter to search for music on YouTube
  - Click on any result to load and play it
  - All player controls work with YouTube content

## Mock Data vs. YouTube Content

The player operates in two modes:

1. **Demo Mode**: Uses mock data for playlists and tracks, with sample audio from SoundHelix
2. **YouTube Mode**: Uses the YouTube Data API to search for and play real music

The player will automatically switch to YouTube mode if YouTube integration is set up correctly.

## Responsive Design

The music player is fully responsive and works on:
- Desktop (1200px and above)
- Laptop (992px - 1199px)
- Tablet (768px - 991px)
- Mobile (below 768px)

On mobile devices, the sidebar is hidden to maximize content space, and the player controls are reorganized for better usability.

## Future Enhancements

Potential improvements for future versions:
- User authentication system
- Personal playlists that persist across sessions
- Enhanced YouTube integration with video display option
- Integration with additional music APIs (Spotify, SoundCloud, etc.)
- User profile customization
- Social sharing features
- Recommendation algorithm
- Mobile app versions using frameworks like React Native

## Legal Notice

This project is created for educational purposes only and is not intended for commercial use. It's inspired by popular music streaming services but is not affiliated with any of them.

When using the YouTube API integration, you must comply with the [YouTube API Services Terms of Service](https://developers.google.com/youtube/terms/api-services-terms-of-service).

## License

This project is available under the MIT License. See the LICENSE file for more information. 
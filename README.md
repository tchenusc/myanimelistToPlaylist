# MyAnimeList to Spotify Playlist Converter

**MyAnimeList to Playlist** is a web and backend application that **automatically generates Spotify playlists** based on a user’s favorite anime from MyAnimeList. The app leverages **REST APIs, OAuth authentication, and dynamic data processing**, demonstrating full-stack development, API integration, and user experience optimization.

---

## Project Overview

This project combines **frontend, backend, and third-party API integration** to create a seamless user experience:

1. Users enter their **MyAnimeList profile URL**.  
2. The app fetches the user’s **top-rated anime list** from the MyAnimeList API.  
3. For each anime, the app finds the **corresponding opening songs (OPs)** on Spotify.  
4. Generates a **Spotify playlist** with tracks, including album art customization.  
5. Returns an **embedded playlist** for users to play directly on the page.

> This project highlights skills in **API orchestration, OAuth flows, data transformation, asynchronous operations, and gamified content generation**.

---

## 🧩 Key Features

- **User Authentication**  
  - OAuth 2.0 flow with Spotify (authorization code flow)  
  - Secure token handling with access/refresh tokens  

- **Data Integration & API Usage**  
  - Fetch user anime data from **MyAnimeList API**  
  - Search for anime opening tracks on **Spotify Web API**  
  - Create and update Spotify playlists dynamically  
  - Retrieve and embed playlist album covers  

- **Backend Automation**  
  - Flask API endpoints for playlist generation  
  - Token management including **refreshing expired tokens**  
  - Rate-limited, polite API requests with `time.sleep`  
  - Playlist shuffling using **Fisher-Yates algorithm**  

- **Frontend Interaction**  
  - Responsive, intuitive UI using **vanilla JS, HTML, and CSS**  
  - Displays **playlist embedding** dynamically  
  - Handles OAuth redirect and localStorage for seamless user flow  
  - Loading indicators with smooth fade-in/out animations  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Flask, Flask-CORS |
| APIs | MyAnimeList API, Spotify Web API |
| Authentication | OAuth 2.0 (Authorization Code Flow) |
| Data | JSON, RESTful API Responses |
| Deployment | Replit, GitHub Pages (frontend) |

---

## 💡 Technical Skills Demonstrated

- **Full-Stack Development**: End-to-end integration of backend APIs with frontend UI  
- **Third-Party API Integration**: Orchestrating multiple APIs (MyAnimeList + Spotify) for real-time data processing  
- **Authentication & Security**: OAuth 2.0 flows, secure token storage, token refresh automation  
- **Data Handling & Transformation**: Extract, filter, and transform JSON responses into structured playlists  
- **Asynchronous Operations & Rate-Limiting**: Respectful API requests, shuffling playlists, and batching calls  
- **Responsive Frontend Design**: Dynamic DOM updates, playlist embedding, and user feedback (loading states)  
- **Debugging & Logging**: Print and error handling for API responses and token operations  

---

## ⚡ Installation & Usage

### Frontend
1. Clone or download the repository.  
2. Open `index.html` in a browser.  

### Backend
1. Set environment variables:
   ```bash
   export MAL_CLIENT_ID="your_mal_client_id"
   export SPOTIFY_CLIENT_ID="your_spotify_client_id"
   export SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"

2. Install dependencies:

   ```bash
   pip install flask flask-cors requests
3. Run the Flask server:

   ```bash
   python app.py
4. Connect the frontend to your backend endpoint (adjust `fetch` URL in `script.js`).

---

## ⚙️ How It Works

1. Frontend captures MyAnimeList profile URL and generates Spotify authorization redirect
2. Backend receives `code` from Spotify, fetches `access_token` and `refresh_token`
3. Backend fetches user anime list from MyAnimeList API
4. Backend searches Spotify for matching anime opening tracks, filtering by popularity
5. Playlist is created in user’s Spotify account, tracks are added, and album cover is updated
6. Frontend displays an embedded playlist ready to play

---

## 📝 Future Improvements

* **Enhanced Playlist Features**: Sorting by anime score, genre, or release year
* **Caching & Performance**: Store frequently accessed anime data to reduce API calls
* **Error Handling**: More robust recovery from failed API calls
* **Cross-Platform UI**: Mobile-optimized design for better usability

// Spotify App Credentials
const redirectUri = 'https://tchenusc.github.io/myanimelistToPlaylist/';
const CLIENT_ID = "e2d6b76d1df2445dadbe5248700bc4f2";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('malForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const malUrl = document.getElementById('malUrl').value;
        const username = extractUsernameFromMalUrl(malUrl);

        if (!username) {
            alert("Invalid MyAnimeList URL. Please enter a valid profile link.");
            return;
        }

        // Store the username for later use after redirect
        localStorage.setItem("mal_username", username);

        // Generate a random state parameter for security
        const state = generateRandomString(16);

        // Spotify authorization endpoint
        const scope = encodeURIComponent('user-read-private user-read-email playlist-modify-public playlist-modify-private ugc-image-upload');
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&show_dialogue=true`;

        // Redirect the user to the Spotify authorization page
        window.location.href = authUrl;
    });
});

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function extractUsernameFromMalUrl(url) {
    try {
        const parsedUrl = new URL(url);
        const segments = parsedUrl.pathname.split('/');
        const profileIndex = segments.indexOf("animelist");
        if (profileIndex !== -1 && segments.length > profileIndex + 1) {
            return segments[profileIndex + 1];
        }
    } catch (e) {
        return null;
    }
    return null;
}

function onPageLoad() {
    if (window.location.search.length > 0) {
        const code = handleRedirect();
        connectWithBackend(code);
    }
}

function handleRedirect() {
    const code = getCode();
    window.history.pushState("", "", redirectUri); // clean up the URL
    return code;
}

function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code');
    }
    return code;
}

function connectWithBackend(code) {
    const username = localStorage.getItem("mal_username");

    if (!username) {
        console.error("Username not found. Please restart the process.");
        alert("Link error, please try again!")
        return;
    }

    const url = `https://636de87a-4cb8-44a9-b7d1-7965468b1d6c-00-x7tu5fwiji0d.kirk.replit.dev/top_rated_anime?code=${encodeURIComponent(code)}&username=${encodeURIComponent(username)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const playlistUrl = data.anime_playlist_url;
            const embedUrl = playlistUrl.replace("open.spotify.com/playlist", "open.spotify.com/embed/playlist");

            const resultSection = document.getElementById("resultSection");
            const playlistContainer = document.getElementById("playlistContainer");

            resultSection.style.display = "block";

            playlistContainer.innerHTML = `
                <iframe style="border-radius:12px"
                        src="${embedUrl}"
                        width="100%" height="580" frameborder="0" allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                </iframe>
            `;
        })
        .catch(error => console.error('Error:', error));
}


var redirectUri = 'https://tchenusc.github.io/myanimelistToPlaylist/';
var CLIENT_ID = "e2d6b76d1df2445dadbe5248700bc4f2";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('malForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientId = CLIENT_ID;

        // Generate a random state parameter for security
        const state = generateRandomString(16);

        // Spotify authorization endpoint
        const scope = encodeURIComponent('user-read-private user-read-email playlist-modify-public playlist-modify-private ugc-image-upload'); // Example scopes
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&show_dialogue=true`;

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

function onPageLoad()
{
    if (window.location.search.length > 0) {
        var code = handleRedirect();
        connectWithBackend(code);
    }
}

function connectWithBackend(c) {
    const username = "tonyisyh44";
    const code = c;
    const url = `https://636de87a-4cb8-44a9-b7d1-7965468b1d6c-00-x7tu5fwiji0d.kirk.replit.dev/top_rated_anime?code=${encodeURIComponent(code)}&username=${encodeURIComponent(username)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const playlistUrl = data.anime_playlist_url;

            // Convert to Spotify embed URL
            const embedUrl = playlistUrl.replace("open.spotify.com/playlist", "open.spotify.com/embed/playlist");

            const resultSection = document.getElementById("resultSection");
            const playlistContainer = document.getElementById("playlistContainer");

            resultSection.style.display = "block";

            playlistContainer.innerHTML = `
                <iframe style="border-radius:12px"
                        src="${embedUrl}"
                        width="100%" height="380" frameborder="0" allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy">
                </iframe>
            `;
        })
        .catch(error => console.error('Error:', error));
}

function handleRedirect() {
    let code = getCode();
    window.history.pushState("", "", redirectUri);
    return code
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

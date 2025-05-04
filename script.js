
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
        const scope = encodeURIComponent('user-read-private user-read-email'); // Example scopes
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
        handleRedirect();
        connectWithBackend();
    }
}

function connectWithBackend() {
    fetch('https://636de87a-4cb8-44a9-b7d1-7965468b1d6c-00-x7tu5fwiji0d.kirk.replit.dev/top_rated_anime')
    .then(response => response.json())
    .then(data => {
        console.log(data.message); 
        alert(data.message); // For demonstration
    })
    .catch(error => console.error('Error:', error));

}
function handleRedirect() {
    let code = getCode();
    window.history.pushState("", "", redirectUri);
    alert(code);
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
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('spotifyForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const clientId = document.getElementById('clientId').value.trim();
        if (!clientId) {
            alert('Please enter a valid Spotify Client ID.');
            return;
        }

        // Generate a random state parameter for security
        const state = generateRandomString(16);

        // Spotify authorization endpoint
        const redirectUri = encodeURIComponent(window.location.origin); // Redirect back to the current origin
        const scope = encodeURIComponent('user-read-private user-read-email'); // Example scopes
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;

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
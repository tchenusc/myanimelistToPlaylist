document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('malForm');
    const resultSection = document.getElementById('resultSection');
    const playlistContainer = document.getElementById('playlistContainer');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const malUrl = document.getElementById('malUrl').value;
        const username = extractUsername(malUrl);
        
        if (!username) {
            showError('Please enter a valid MyAnimeList profile URL');
            return;
        }

        try {
            // Show loading state
            playlistContainer.innerHTML = '<div class="loading">Loading your anime list...</div>';
            resultSection.style.display = 'block';

            // Fetch anime list from MyAnimeList
            const animeList = await fetchAnimeList(username);
            
            // Display the playlist
            displayPlaylist(animeList);
        } catch (error) {
            showError('Failed to fetch anime list. Please try again later.');
            console.error('Error:', error);
        }
    });
});

function extractUsername(url) {
    const match = url.match(/myanimelist\.net\/profile\/([^\/]+)/);
    return match ? match[1] : null;
}

async function fetchAnimeList(username) {
    // Note: MyAnimeList API requires authentication
    // For now, we'll use a mock response
    // In a real implementation, you would need to:
    // 1. Set up proper authentication with MyAnimeList API
    // 2. Make authenticated requests to fetch the user's anime list
    
    // Mock response for demonstration
    return [
        { title: 'Attack on Titan', status: 'Completed', score: 9 },
        { title: 'Death Note', status: 'Completed', score: 10 },
        { title: 'Fullmetal Alchemist: Brotherhood', status: 'Completed', score: 10 },
        { title: 'Steins;Gate', status: 'Completed', score: 9 },
        { title: 'Hunter x Hunter', status: 'Completed', score: 9 }
    ];
}

function displayPlaylist(animeList) {
    playlistContainer.innerHTML = '';
    
    if (animeList.length === 0) {
        playlistContainer.innerHTML = '<p>No anime found in your list.</p>';
        return;
    }

    const playlist = document.createElement('div');
    playlist.className = 'playlist';

    animeList.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.className = 'anime-item';
        animeItem.innerHTML = `
            <h3>${anime.title}</h3>
            <div class="anime-details">
                <span class="status">${anime.status}</span>
                <span class="score">Score: ${anime.score}/10</span>
            </div>
        `;
        playlist.appendChild(animeItem);
    });

    playlistContainer.appendChild(playlist);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    form.insertBefore(errorDiv, form.firstChild);
} 
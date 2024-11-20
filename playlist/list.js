document.addEventListener('DOMContentLoaded', function () {
    const songList = document.getElementById('song-items');
    const addSongForm = document.getElementById('add-song-form');
    const songNameInput = document.getElementById('song-name');
    const songArtistInput = document.getElementById('song-artist');
    const searchInput = document.getElementById('search-input');

    // Function to add a song to the list
    function addSongToList(songName, songArtist) {
        const newSongItem = document.createElement('li');
        newSongItem.innerHTML = `
            <span class="song">${songName}</span>
            <span class="artist">${songArtist}</span>
            <button class="delete">Delete</button>
        `;

        // Add delete functionality to each song
        const deleteButton = newSongItem.querySelector('.delete');
        deleteButton.addEventListener('click', function () {
            songList.removeChild(newSongItem);
        });

        songList.appendChild(newSongItem);
    }

    // Add song event
    addSongForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission

        const songName = songNameInput.value.trim();
        const songArtist = songArtistInput.value.trim();

        if (songName === '' || songArtist === '') {
            alert('Please enter both the song title and the artist.');
            return;
        }

        addSongToList(songName, songArtist);

        // Clear input fields after adding
        songNameInput.value = '';
        songArtistInput.value = '';
    });

    // Search functionality
    searchInput.addEventListener('input', function () {
        const filter = searchInput.value.toLowerCase();
        const songs = songList.querySelectorAll('li');

        songs.forEach(function (song) {
            const songName = song.querySelector('.song').textContent.toLowerCase();
            const songArtist = song.querySelector('.artist').textContent.toLowerCase();

            // Check if the song name or artist matches the search input
            if (songName.includes(filter) || songArtist.includes(filter)) {
                song.style.display = ''; // Show matching songs
            } else {
                song.style.display = 'none'; // Hide non-matching songs
            }
        });
    });
});

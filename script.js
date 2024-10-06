const postsContainer = document.getElementById('posts-container');
let postCount = 0; // To keep track of how many posts are loaded

// Function to load posts from the JSONPlaceholder API
function loadPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${postCount}&_limit=4`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                postsContainer.appendChild(postElement);
            });
            postCount += 3;
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Initial load of posts
loadPosts();

// Infinite scroll functionality
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        loadPosts();
    }
});

loadPosts();

const weatherContainer = document.getElementById('weather-container');

const locations = [
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 }
];

function fetchWeather() {
    weatherContainer.innerHTML = ''; 

    locations.forEach(location => {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weather = data.current_weather;
                const weatherBox = document.createElement('div');
                weatherBox.classList.add('weather-box');
                
                weatherBox.innerHTML = `
                    <h3>${location.name}</h3>
                    <p>Temperature: <span class="temperature">${weather.temperature}°C</span></p>
                    <p>Windspeed: ${weather.windspeed} km/h</p>
                    <p>Direction: ${weather.winddirection}°</p>
                `;

                weatherContainer.appendChild(weatherBox);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    });
}

// Fetch the weather data initially
fetchWeather();

// Update the weather data every 30 seconds
setInterval(fetchWeather, 30000); // 30 seconds = 30000 ms

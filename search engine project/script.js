document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearHistoryButton = document.getElementById("clearHistoryButton");
    const searchHistoryList = document.getElementById("searchHistory");
    const themeToggle = document.getElementById("themeToggle");

    // Load search history from localStorage
    const loadSearchHistory = () => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        history.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            searchHistoryList.appendChild(li);
        });
    };

    // Add search term to history
    const addToSearchHistory = (term) => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        if (!history.includes(term)) {
            history.push(term);
            localStorage.setItem("searchHistory", JSON.stringify(history));
        }
        displaySearchHistory();
    };

    // Display search history
    const displaySearchHistory = () => {
        searchHistoryList.innerHTML = '';
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        history.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            searchHistoryList.appendChild(li);
        });
    };

    // Clear search history
    clearHistoryButton.addEventListener("click", () => {
        localStorage.removeItem("searchHistory");
        searchHistoryList.innerHTML = '';
    });

    // Handle search button click
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            addToSearchHistory(searchTerm);
            searchInput.value = ''; // Clear input after search
        }
    });

    // Load current theme from localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        themeToggle.checked = currentTheme === 'dark';
    }

    // Event listener for theme toggle
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });

    loadSearchHistory();
});

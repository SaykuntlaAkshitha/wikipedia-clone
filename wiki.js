document.getElementById('searchnow').addEventListener('click', function () {
    const searchText = document.getElementById('searchText').value;
    if (searchText) {
        searchWikipedia(searchText);
    }
});

function searchWikipedia(query) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=5&srsearch=${query}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            displayResults(data.query.search);
        })
        .catch(error => {
            console.error('Error fetching Wikipedia data:', error);
        });
}

function displayResults(results) {
    const searchResultContainer = document.querySelector('.searchResult');
    searchResultContainer.innerHTML = '';

    if (results.length === 0) {
        searchResultContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('searchResultContent');

        resultElement.innerHTML = `
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank" class="title">${result.title}</a>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank" class="link">https://en.wikipedia.org/?curid=${result.pageid}</a>
            <p>${result.snippet}...</p>
        `;

        searchResultContainer.appendChild(resultElement);
    });
}



function init() {
    console.log('Recipe page loaded successfully!');
    
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
}

function handleSearch(event) {
    event.preventDefault();
    
    const searchInput = document.querySelector('#search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm) {
        console.log('Searching for:', searchTerm);
        filterRecipes(searchTerm);
    } else {
        showAllRecipes();
    }
}

function filterRecipes(searchTerm) {
    const recipes = document.querySelectorAll('.recipe');
    let foundCount = 0;
    
    recipes.forEach(recipe => {
        const title = recipe.querySelector('h2').textContent.toLowerCase();
        const description = recipe.querySelector('.recipe-description')?.textContent.toLowerCase() || '';
        const tags = Array.from(recipe.querySelectorAll('.tag'))
            .map(tag => tag.textContent.toLowerCase())
            .join(' ');
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
            recipe.style.display = '';
            foundCount++;
        } else {
            recipe.style.display = 'none';
        }
    });
    
    if (foundCount === 0) {
        showNoResultsMessage();
    } else {
        removeNoResultsMessage();
    }
}

function showAllRecipes() {
    const recipes = document.querySelectorAll('.recipe');
    recipes.forEach(recipe => {
        recipe.style.display = '';
    });
    removeNoResultsMessage();
}

function showNoResultsMessage() {
    removeNoResultsMessage(); 
    
    const recipesSection = document.querySelector('.recipes');
    const message = document.createElement('p');
    message.className = 'no-results';
    message.textContent = 'No recipes found. Try a different search term.';
    message.style.textAlign = 'center';
    message.style.fontSize = '1.2em';
    message.style.color = '#666';
    message.style.gridColumn = '1 / -1';
    
    recipesSection.appendChild(message);
}

function removeNoResultsMessage() {
    const message = document.querySelector('.no-results');
    if (message) {
        message.remove();
    }
}

document.addEventListener('DOMContentLoaded', init);
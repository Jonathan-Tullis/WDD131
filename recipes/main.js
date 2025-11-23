// Import recipes from recipes.mjs
import recipes from './recipes.mjs';

// Generate a random number between 0 and num-1
function random(num) {
    return Math.floor(Math.random() * num);
}

// Get a random entry from a list
function getRandomListEntry(list) {
    const listLength = list.length;
    const randomNum = random(listLength);
    return list[randomNum];
}

// Template for recipe tags
function tagsTemplate(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

// Template for recipe rating
function ratingTemplate(rating) {
    let html = `<span
        class="rating"
        role="img"
        aria-label="Rating: ${rating} out of 5 stars">`;
    
    // Loop from 1 to 5 to create stars
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    
    html += `</span>`;
    return html;
}

// Template for a single recipe
function recipeTemplate(recipe) {
    return `
        <article class="recipe">
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.name}">
            </div>
            <div class="recipe-info">
                <div class="recipe-tags">
                    ${tagsTemplate(recipe.tags)}
                </div>
                <h2>${recipe.name}</h2>
                ${ratingTemplate(recipe.rating)}
                <p class="recipe-description">
                    ${recipe.description}
                </p>
            </div>
        </article>
    `;
}

// Render recipes to the page
function renderRecipes(recipeList) {
    const recipesContainer = document.querySelector('.recipes');
    const html = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipesContainer.innerHTML = html;
}

// Filter recipes based on search query
function filterRecipes(query) {
    const filtered = recipes.filter(recipe => {
        const nameMatch = recipe.name.toLowerCase().includes(query);
        const descriptionMatch = recipe.description.toLowerCase().includes(query);
        const tagMatch = recipe.tags.find(tag => tag.toLowerCase().includes(query));
        const ingredientMatch = recipe.ingredients.find(ingredient => 
            ingredient.toLowerCase().includes(query)
        );
        
        return nameMatch || descriptionMatch || tagMatch || ingredientMatch;
    });
    
    const sorted = filtered.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    
    return sorted;
}

// Handle search form submission
function searchHandler(event) {
    event.preventDefault();
    
    const searchInput = document.querySelector('#search');
    const query = searchInput.value.toLowerCase().trim();
    
    if (query) {
        const filteredRecipes = filterRecipes(query);
        renderRecipes(filteredRecipes);
        
        if (filteredRecipes.length === 0) {
            const recipesContainer = document.querySelector('.recipes');
            recipesContainer.innerHTML = '<p style="text-align: center; padding: 40px;">No recipes found. Try a different search term.</p>';
        }
    } else {
        init();
    }
}

// Initialize the page
function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

// Set up search functionality
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', searchHandler);

// Initialize the page when it loads
init();
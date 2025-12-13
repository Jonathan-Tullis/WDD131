import projects from './projects.js';

function initDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }
    
    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';
    toggleButton.innerHTML = '🌙';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    document.querySelector('header').appendChild(toggleButton);
    
    toggleButton.addEventListener('click', toggleDarkMode);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        document.querySelector('#dark-mode-toggle').innerHTML = '☀️';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        document.querySelector('#dark-mode-toggle').innerHTML = '🌙';
    }
}

function animateProjectCounter() {
    const counterElement = document.querySelector('.project-counter');
    
    if (!counterElement) return;
    
    const completedProjects = projects.filter(project => project.featured === true);
    const totalCount = completedProjects.length;
    
    let currentCount = 0;
    const duration = 2000; 
    const increment = totalCount / (duration / 50);
    
    const counter = setInterval(() => {
        currentCount += increment;
        
        if (currentCount >= totalCount) {
            counterElement.textContent = totalCount;
            clearInterval(counter);
        } else {
            counterElement.textContent = Math.floor(currentCount);
        }
    }, 50);
}

function initProjectFilters() {
    const filterContainer = document.querySelector('.filter-buttons');
    
    if (!filterContainer) return;
    
    const filters = ['all', 'game-dev', '3d-art'];
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.classList.add('filter-btn');
        button.dataset.filter = filter;
        button.textContent = filter === 'all' ? 'All Projects' : 
                             filter === 'game-dev' ? 'Game Development' : '3D Art';
        
        if (filter === 'all') button.classList.add('active');
        
        button.addEventListener('click', handleFilterClick);
        filterContainer.appendChild(button);
    });
}

function handleFilterClick(event) {
    const clickedButton = event.target;
    const filterValue = clickedButton.dataset.filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    clickedButton.classList.add('active');
    
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return; 
    
    projectsGrid.innerHTML = '';
    
    const projectHTML = projects.map(project => {
        return `
            <div class="project-item" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" class="project-img" data-id="${project.id}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Tools:</strong> ${project.tools}</p>
            </div>
        `;
    }).join('');
    
    projectsGrid.innerHTML = projectHTML;
    
    document.querySelectorAll('.project-img').forEach(img => {
        img.addEventListener('click', openImageModal);
    });
}

function openImageModal(event) {
    const clickedImage = event.target;
    const imageSrc = clickedImage.src;
    const imageAlt = clickedImage.alt;
    
    let modal = document.querySelector('.image-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.classList.add('image-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    } else {
        modal.querySelector('.modal-image').src = imageSrc;
        modal.querySelector('.modal-image').alt = imageAlt;
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    
    if (!contactForm) return; 
    
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault(); 
    
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    
    clearErrors();
    
    let isValid = true;
    
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    }
    
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    }
    
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    }
    

    if (isValid) {
        showSuccessMessage();
        document.querySelector('#contact-form').reset();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const field = document.querySelector(`#${fieldId}`);
    const error = document.createElement('span');
    error.classList.add('error-message');
    error.textContent = message;
    field.parentElement.appendChild(error);
    field.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.classList.add('success-message');
    successDiv.textContent = 'Thank you! Your message has been sent.';
    document.querySelector('#contact-form').appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    animateProjectCounter();
    initProjectFilters();
    renderProjects();
    initContactForm();
});
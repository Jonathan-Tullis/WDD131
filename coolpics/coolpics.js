
const menuButton = document.querySelector('#menu-button');
const navLinks = document.querySelector('.nav-links');


const gallery = document.querySelector('.gallery');


menuButton.addEventListener('click', toggleMenu);


function toggleMenu() {
    navLinks.classList.toggle('show');
}


function handleResize() {
    if (window.innerWidth > 1000) {
        navLinks.classList.remove('hide');
    } else {
        navLinks.classList.add('hide');
    }
}


window.addEventListener('resize', handleResize);


handleResize();


function viewerTemplate(imageSrc, altText) {
    return `
        <img src="${imageSrc}" alt="${altText}">
        <button class="close-viewer">X</button>
    `;
}


function viewHandler(event) {
    // Get the clicked image
    const clickedImage = event.target.closest('img');
    
    
    if (clickedImage) {
        
        const src = clickedImage.src;
        const newSrc = src.replace('-sm.jpeg', '-full.jpeg');
        const alt = clickedImage.alt;
        
        
        const modal = document.createElement('dialog');
        
        
        modal.innerHTML = viewerTemplate(newSrc, alt);
        
        
        document.body.appendChild(modal);
        
        
        modal.showModal();
        
        
        const closeButton = modal.querySelector('.close-viewer');
        closeButton.addEventListener('click', () => {
            modal.close();
            modal.remove();
        });
        
        
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.close();
                modal.remove();
            }
        });
    }
}

gallery.addEventListener('click', viewHandler);
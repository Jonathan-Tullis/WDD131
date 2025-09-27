const themeSelector = document.querySelector('#theme-selector');

function changeTheme() {
    const currentTheme = themeSelector.value;
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        // Make sure this path is correct
        document.querySelector('footer img').src = 'images/byui-logo_white.png';
    } else {
        document.body.classList.remove('dark');
        // Make sure this path is correct  
        document.querySelector('footer img').src = 'images/byui-logo_blue.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);
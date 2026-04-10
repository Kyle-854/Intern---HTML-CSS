function dropdownMenu(){
    const menu = document.querySelector('.menu');
    const dropdown = document.querySelector('.dropdown');

    menu.addEventListener('click', () => {
        const temp = window.getComputedStyle(dropdown).visibility;

        if (temp === 'hidden'){
            dropdown.style.visibility = 'visible';
        } else {
            dropdown.style.visibility = 'hidden';
        }
    });
}
dropdownMenu();
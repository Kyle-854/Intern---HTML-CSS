document.addEventListener('DOMContentLoaded', () => {
    const upButton = document.getElementById('up-button');
    const downButton = document.getElementById('down-button');
    const wrapper = document.querySelector('.shopping-ads__wrapper');

    let autoPlay;

    const getScrollAmount = () =>{
        const rows = document.querySelectorAll('.items-container');
        if(rows.length >= 2){
            return rows[1].offsetTop - rows[0].offsetTop;
        }

        const row = document.querySelector('.items-container');
        return row ? row.offsetHeight : 0;
    };


    const slideDown = () =>{
        const scrollAmount = getScrollAmount();

        if(wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 10){
            wrapper.scrollTo({top: 0, behavior: 'smooth'});
        } else{
            wrapper.scrollBy({top: scrollAmount, behavior: 'smooth'});
        }
    };

    const slideUp = () =>{
        const scrollAmount = getScrollAmount();

        if(wrapper.scrollTop <= 0){
            wrapper.scrollTo({top: wrapper.scrollHeight, behavior: 'smooth'});
        } else{
            wrapper.scrollBy({top: -scrollAmount, behavior: 'smooth'});
        }
    };

    const startAutoPlay = () =>{
        autoPlay = setInterval(slideDown, 3000);
    };

    const resetAutoPlay = () =>{
        clearInterval(autoPlay);
        // startAutoPlay();
    };

    downButton.addEventListener('click', () =>{
        slideDown();
        resetAutoPlay();
    });

    upButton.addEventListener('click', () =>{
        slideUp();
        resetAutoPlay();
    });

    // startAutoPlay();
})
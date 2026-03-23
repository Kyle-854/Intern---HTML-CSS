document.addEventListener('DOMContentLoaded', function(){
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const container = document.querySelector('.items-container');

    let autoPlay;

    const getScrollAmount = () =>{
        const items = document.querySelectorAll('.item');
        if(items.length >= 2){
            return items[1].offsetLeft - items[0].offsetLeft;
        }

        const item = document.querySelector('.item');
        return item ? item.offsetLeft : 0;
    };


    const slideNext = () =>{
        const scrollAmount = getScrollAmount();

        if(container.scrollLeft + container.clientWidth >= container.scrollWidth - 10){
            container.scrollTo({left: 0, behavior: 'smooth'});
        } else{
            container.scrollBy({left: scrollAmount, behavior: 'smooth'});
        }
    };

    const slidePrev = () =>{
        const scrollAmount = getScrollAmount();

        if(container.scrollLeft <= 0){
            container.scrollTo({left: container.scrollWidth, behavior: 'smooth'});
        } else{
            container.scrollBy({left: -scrollAmount, behavior: 'smooth'});
        }
    };

    const startAutoPlay = () =>{
        autoPlay = setInterval(slideNext, 3000);
    };

    const resetAutoPlay = () =>{
        clearInterval(autoPlay);
        startAutoPlay();
    };

    nextButton.addEventListener('click', () =>{
        slideNext();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () =>{
        slidePrev();
        resetAutoPlay();
    });

    startAutoPlay();
});
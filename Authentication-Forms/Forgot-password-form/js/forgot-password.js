document.addEventListener('DOMContentLoaded', () => {
    xuLyCountdown();
});

function xuLyCountdown() {
    let time = 120;
    const countdowm = document.querySelector("#countdown");

    const timer = setInterval(() => {
        time--;
        countdowm.innerHTML = time + 's';

        if(time === 0 ){
            clearInterval(timer);
            countdowm.innerHTML = '0s';

        }
    }, 1000);

}


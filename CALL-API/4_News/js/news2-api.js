async function loadData(limit) {
    try {
        const res = await fetch(`http://localhost:3001/creatives?type=news&_limit=${limit}`);
        const data = (await res.json())[0];

        //-------------------- XỬ LÝ ---------------------
        //url
            const news = document.querySelector('.news');
            if(news && data.url) {
                news.addEventListener('click', () => {
                    window.open(data.url, '_blank');
                });
            }
        //title
            const title = document.querySelector('.news__title');
            if (title && data.title) {
                title.innerText = data.title;
            }
        //img__url
            const img = document.querySelector('.news__img img');
            if (img && data.img__url) {
                img.src = data.img__url;
            }
        //brand__name
            const brand__name = document.querySelector('.partner strong');
            if (brand__name && data.brand__name) {
                brand__name.innerText = data.brand__name;
            }
        //cta__url
            const cta = document.querySelector('.news__button');
            if (cta && data.cta__url) {
                cta.href = data.cta__url;
                cta.target = '_blank';

                cta.addEventListener('click', function(event){
                    event.stopPropagation();
                });
            }
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

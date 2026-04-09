async function loadData(limit) {
    try {
        const res = await fetch(`https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=news&page=1&limit=${limit}`);
        const data = (await res.json())[0];

        //-------------------- XỬ LÝ ---------------------
        //url
            // const news = document.querySelector('.news');
            // if(news && data.url) {
            //     news.addEventListener('click', () => {
            //         window.open(data.url, '_blank');
            //     });
            // }

            const url = data.url ?? '#';
        //title
            const title = document.querySelector('.news__title');
            if (title && data.title) {
                title.innerText = data.title;

                title.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //img__url
            const img = document.querySelector('.news__img img');
            if (img && data.img_url) {
                img.src = data.img_url;

                img.addEventListener('click', () => {
                    window.open(url, '_blank');
                });
            }
        //brand__name
            const brand__name = document.querySelector('.partner strong');
            if (brand__name && data.brand_name) {
                brand__name.innerText = data.brand_name;
            }
        //brand_url
            const brand_url = data.brand_url ?? '#';
            const partner = document.querySelector('.partner');
            if (partner) {
                partner.href = brand_url
            }
        //cta__url
            const cta = document.querySelector('.news__button');
            if (cta && data.cta_url) {
                cta.href = data.cta_url;
                cta.target = '_blank';

                cta.addEventListener('click', function(event){
                    event.stopPropagation();
                });
            }
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}

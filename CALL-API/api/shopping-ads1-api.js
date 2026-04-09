async function loadData(limit) {
    try {
        const res = await fetch(`https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=shopping-ads&page=1&limit=${limit}`);
        const data = await res.json();
    
        //-------------------- XỬ LÝ ---------------------
        const container = document.querySelector('.items-container');
        const temp = document.querySelector('.temp');

        data.forEach((item) => {
            const clone = temp.cloneNode(true); //tương đương .news__item

            if (clone) {
                clone.style.display = 'flex';

                clone.classList.remove('temp');

                //url
                    // if (item.url) {
                    //     clone.addEventListener('click', () => {
                    //         window.open(item.url, '_blank');
                    //     });
                    // }

                    const url = item.url ?? '#';

                //img_url
                    const news__img = clone.querySelector('.item__img img');
                    if (news__img && item.img_url) {
                        news__img.src = item.img_url;

                        news__img.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
                    }
                //title
                    const title = clone.querySelector('.item__name');
                    if (title && item.title) {
                        title.innerText = item.title;

                        title.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
                    }
                //price2
                    const price2 = clone.querySelector('.price2');
                    if (price2 && item.price2) {
                        price2.innerText = item.price2;

                        price2.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
                    }
                //price1
                    const price1 = clone.querySelector('.price1');
                    if (price1 && item.price1) {
                        price1.innerText = item.price1;

                        price1.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
                    }

                    if(!item.price1){
                        const item__price1 = clone.querySelector('.item__price1');
                        if(item__price1){
                            item__price1.style.visibility = 'hidden';
                        }
                        price2.style.color = '#222222';
                        const unit2 = clone.querySelector('.unit2');
                        if(unit2){
                            unit2.style.color = '#222222';
                        }
                    }
                //recommend
                    const recommend = clone.querySelector('.item__recommend');
                    if (recommend && item.recommend) {
                        recommend.innerText = item.recommend;

                        recommend.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
                    }

                    if(!item.recommend && recommend){
                        recommend.style.visibility = 'hidden';
                    }
                //brand_logo
                    const brand_logo = clone.querySelector('.brand__logo');
                    if (brand_logo && item.brand_logo) {
                        brand_logo.src = item.brand_logo;
                    }
                //brand_name
                    const brand_name = clone.querySelector('.brand__name');
                    if (brand_name && item.brand_name) {
                        brand_name.innerText = item.brand_name;
                    }
                //brand_url
                    const brand_url = item.brand_url ?? '#';
                    const item__brand = clone.querySelector('.item__brand');

                    if (item__brand){
                        item__brand.href = brand_url;
                    }

                container.appendChild(clone);
            }
        });
        temp.remove();
        
    } catch (error) {
        console.error('Lỗi: ', error);
    }
}
// loadData();
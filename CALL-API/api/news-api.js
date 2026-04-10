async function loadData(limit) {
    try {
        const res = await fetch(`https://69d315a1336103955f8e8baa.mockapi.io/creatives?type=news&page=1&limit=${limit}`);
        const data = await res.json();
    
        //-------------------- XỬ LÝ ---------------------
        const container = document.querySelector('.news__items-container');
        const temp = document.querySelector('.temp');

        data.forEach((item) => {
            const clone = temp.cloneNode(true); //tương đương .news__item

            if (clone) {
                clone.style.display = 'flex';

                clone.classList.remove('temp');

                //url
                    const url = item.url ?? '#';
                //title
                    const title = clone.querySelector('.news__title');
                    if (title && item.title) {
                        title.innerText = item.title;

                        title.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
                    }
                //decription
                    const decription = clone.querySelector('.news__decription');
                    if (decription && item.decription) {
                        decription.innerText = item.decription;

                        decription.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
                    }
                //img_url
                    const news__img = clone.querySelector('.news__img img');
                    if (news__img && item.img_url) {
                        news__img.src = item.img_url;

                        news__img.addEventListener('click', () => {
                            window.open(url, '_blank');
                        });
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